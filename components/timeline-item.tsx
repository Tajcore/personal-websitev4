"use client"

// TimelineItem.tsx
import React from "react"

import { Icons } from "./icons"

interface TimelineItemProps {
  startDate: string
  endDate: string
  role: string
  company: string
  description: string
  technologies: string[]
  link?: string
  isDimmed?: boolean
}

const TimelineItem: React.FC<TimelineItemProps> = ({
  startDate,
  endDate,
  role,
  company,
  description,
  technologies,
  link,
  isDimmed,
}) => {
  const handleOnClick = () => {
    if (link) {
      window.open(link, "_blank")
    }
  }

  return (
    <div
      onClick={handleOnClick}
      className={`timeline-item hov group rounded-lg py-12 text-white shadow-md transition-all duration-75 ease-linear hover:cursor-pointer hover:shadow-lg lg:px-4 ${isDimmed ? 'lg:opacity-50' : 'lg:hover:bg-gray-900'}`}
    >
      <div className="flex w-full flex-col items-start justify-start gap-2 lg:flex-row lg:gap-0">
        <div className="flex w-56 items-start justify-start">
          <span className="text-xs uppercase tracking-wider text-muted-foreground">
            {startDate} – {endDate}
          </span>
          {/* This should be replaced with an appropriate icon */}
        </div>
        <div className=" relative flex w-full grow flex-col gap-2">
          <h3 className="text font-bold group-hover:text-green-600">
            {company}{" "}
            {link && (
              <a
                href={link}
                className="absolute top-1 transition-all duration-75 ease-linear group-hover:-translate-y-1 group-hover:translate-x-1"
              >
                <Icons.link className="h-4 w-4" />
              </a>
            )}
          </h3>
          <p className="font-bold text-muted-foreground">{role}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          <div className="flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-green-700/20 px-3 py-1 text-xs font-semibold text-green-600"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default TimelineItem
