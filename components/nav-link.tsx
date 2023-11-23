"use client"

import { useCallback, useContext, useEffect } from "react"
import { debounce } from "lodash"

import { ActiveSectionContext } from "@/lib/contexts/ActiveSectionContext"

// or your preferred debounce function
interface NavLinkProps {
  href: string
  title: string
}
const VISIBILITY_THRESHOLD = 50 // Percentage of visibility to consider a section active

const NavLink: React.FC<NavLinkProps> = ({ href, title }) => {
  const { activeSection, setActiveSection } = useContext(ActiveSectionContext) // Use the context

  const checkIfActive = useCallback(() => {
    const section = document.querySelector(href) as HTMLElement
    if (section) {
      const bounding = section.getBoundingClientRect()
      const viewportHeight = window.innerHeight
      const isVisible = bounding.top < viewportHeight && bounding.bottom > 0
      if (isVisible) {
        const visibleHeight =
          Math.min(bounding.bottom, viewportHeight) - Math.max(bounding.top, 0)
        const totalHeight = bounding.height
        const visiblePercentage = (visibleHeight / totalHeight) * 100
        if (visiblePercentage > VISIBILITY_THRESHOLD) {
          setActiveSection((prev) => {
            if (prev?.id === href) {
              return prev
            }
            return { id: href, percentage: visiblePercentage }
          })
        }
      }
    }
  }, [href, setActiveSection])
  useEffect(() => {
    const handleScroll = debounce(() => {
      checkIfActive()
    }, 100) // Adjust debounce time as needed

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Initial check on mount

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [checkIfActive])

  const isActive = activeSection?.id === href

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    const section = document.querySelector(href) as HTMLElement
    section?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className={`group flex cursor-pointer items-center space-x-2  ${
        isActive ? "text-white" : "text-gray-500"
      }`}
    >
      {/* Line that expands when the link is active */}
      <span
        className={`inline-block h-[1px] transition-all duration-300 group-hover:w-16 group-hover:bg-white ${
          isActive ? "w-16 bg-white" : "w-6  bg-gray-500"
        }`}
      ></span>
      {/* Text of the link */}
      <span
        className={`text-xs font-bold uppercase tracking-wider transition-colors duration-300 hover:text-gray-500 group-hover:text-white `}
      >
        {title}
      </span>
    </a>
  )
}

export default NavLink
