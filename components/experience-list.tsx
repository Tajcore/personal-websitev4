// ExperienceList.tsx
"use client";
import React, { useState } from 'react';
import TimelineItem from './timeline-item';

interface Experience {
  startDate: string;
  endDate: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
}

interface ExperienceListProps {
  experiences: Experience[];
}

const ExperienceList: React.FC<ExperienceListProps> = ({ experiences }) => {
  // Sort experiences by startDate
  const sortedExperiences = experiences.sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime());
  const [hoveredItemIndex, setHoveredItemIndex] = useState<number | null>(null);  return (
    <div className="experience-list">
      {sortedExperiences.map((exp, index) => (
        <div
        onMouseEnter={() => setHoveredItemIndex(index)}
        onMouseLeave={() => setHoveredItemIndex(null)}
        key={index}
      >
        <TimelineItem

          {...exp}
          isDimmed={hoveredItemIndex !== null && hoveredItemIndex !== index}
        />
      </div>
      ))}
    </div>
  );
};

export default ExperienceList;
