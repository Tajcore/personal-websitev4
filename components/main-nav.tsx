import * as React from "react"
import Image from "next/image"
import Link from "next/link"

import { NavItem } from "@/types/nav"
import { siteConfig } from "@/config/site"
import { cn } from "@/lib/utils"
import { Icons } from "@/components/icons"

import Logo from "../public/logo.png"
import NavLink from "./nav-link"

interface MainNavProps {
  items?: NavItem[]
}

export function MainNav({ items }: MainNavProps) {
  return (
    <div className="flex flex-col gap-3 md:gap-6">
      <Link href="/" className="flex items-center space-x-2">
        <div className="flex h-8 w-8 items-center rounded-md bg-blue-700 p-2 lg:h-9 lg:w-9">
          <Image src={Logo} alt="logo" />
        </div>
        <span className="inline-block text-2xl font-bold lg:text-3xl">
          {siteConfig.name}
        </span>
      </Link>
      <p className="text-lg font-bold lg:text-xl">{siteConfig.role}</p>
      <p className="text-muted-foreground">{siteConfig.summary}</p>
      {items?.length ? (
        <nav className="nav hidden h-full grow flex-col gap-3 lg:flex">
          {items?.map(
            (item, index) =>
              item.href && (
                <NavLink
                  href={item.href}
                  title={item.title}
                  key={`nav-item-${index}`}
                />
              )
          )}
        </nav>
      ) : null}
      <div className="flex w-full flex-row gap-3">
        <a
          href={siteConfig.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10 flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-2 transition-all duration-75 ease-linear hover:bg-blue-700 lg:h-9 lg:w-9"
        >
          <Icons.gitHub className="h-4 w-4" />
        </a>
        <a
          href={siteConfig.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10  flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-2 transition-all duration-75 ease-linear hover:bg-blue-700 lg:h-9 lg:w-9"
        >
          <Icons.linkedin className="h-4 w-4" />
        </a>
        <a
          href={siteConfig.socials.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="z-10  flex h-8 w-8 items-center justify-center rounded-full bg-gray-800 p-2 transition-all duration-75 ease-linear hover:bg-blue-700 lg:h-9 lg:w-9"
        >
          <Icons.twitter className="h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
