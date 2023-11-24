import React from "react"
import Image, { ImageLoader, ImageLoaderProps } from "next/image"

import { Icons } from "./icons"

interface ProjectItemProps {
  title: string
  description: string
  github?: string
  technologies: string[]
  thumbnail: string
  link?: string
  isDimmed?: boolean
}

const ProjectItem: React.FC<ProjectItemProps> = ({
  title,
  description,
  github,
  technologies,
  link,
  isDimmed,
  thumbnail,
}) => {
  // Function to handle click, which will open the link in a new tab
  const handleOnClick = () => {
    if (link) {
      window.open(link, "_blank")
    }
  }

  const imageLoader: ImageLoader = ({ src }: ImageLoaderProps) => {
    // images are in projects folder
    console.log(`/projects/${src}`)
    return `/projects/${src}`
  }

  return (
    <div
      onClick={handleOnClick}
      className={`timeline-item hov group rounded-lg py-12 text-white shadow-md transition-all duration-75 ease-linear hover:cursor-pointer hover:shadow-lg lg:px-4 ${
        isDimmed ? "lg:opacity-50" : "lg:hover:bg-gray-900"
      }`}
    >
      <div className="flex flex-col items-start justify-between gap-3 lg:flex-row">
      <div className="relative h-80 w-full shrink-0 lg:h-36 lg:w-36">
          <Image
            loader={imageLoader}
            src={thumbnail}
            alt={`${title} Thumbnail`}
            layout="fill"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col">
          <h3 className="text-lg font-bold group-hover:text-blue-400">
            {title}
            {link && (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="ml-2 inline-block align-middle"
              >
                <Icons.link className="h-4 w-4" />
              </a>
            )}
          </h3>
          <p className="text-sm text-gray-300">{description}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {technologies.map((tech, index) => (
              <span
                key={index}
                className="rounded-full bg-blue-700/20 px-3 py-1 text-xs font-semibold text-blue-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

      </div>
      {github && (
        <div className="mt-2 flex items-center">
          <Icons.gitHub className="h-5 w-5" />
          <a
            href={github}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs text-gray-400"
          >
            View on GitHub
          </a>
        </div>
      )}
    </div>
  )
}

export default ProjectItem
