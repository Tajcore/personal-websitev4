// ProjectList.tsx
"use client"

import React, { useState } from "react"

import ProjectItem from "./project-item"

interface Project {
  title: string
  description: string
  github?: string
  technologies: string[]
  thumbnail: string
  link?: string
}

interface ProjectListProps {
  projects: Project[]
}

const ProjectList: React.FC<ProjectListProps> = ({ projects }) => {

  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null)
  return (
    <div className="experience-list">
      {projects.map((proj, index) => (
        <div
          onMouseEnter={() => setHoveredItemIndex(index)}
          onMouseLeave={() => setHoveredItemIndex(null)}
          key={index}
        >
          <ProjectItem
         {...proj}
          isDimmed={hoveredItemIndex !== null && hoveredItemIndex !== index}          />
        </div>
      ))}
    </div>
  )
}

export default ProjectList
