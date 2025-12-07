"use client"

import { Button } from "@/components/ui/button"
import type { Skill, Experience, Education, Certification, Company, SkillCategory, RoleTemplate } from "@/lib/types"
import {
  Download,
  Mail,
  Phone,
  MapPin,
  Github,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  ArrowLeft,
  Linkedin,
} from "lucide-react"
import Link from "next/link"

interface PublicResumeProps {
  skills: (Skill & { category?: SkillCategory })[]
  experiences: (Experience & { company?: Company })[]
  education: Education[]
  certifications: Certification[]
  roleTemplate?: RoleTemplate | null
}

export function PublicResume({ skills, experiences, education, certifications, roleTemplate }: PublicResumeProps) {
  const handleDownload = () => {
    window.print()
  }

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  // Group skills by category
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      const categoryName = skill.category?.name || "Other"
      if (!acc[categoryName]) acc[categoryName] = []
      acc[categoryName].push(skill)
      return acc
    },
    {} as Record<string, typeof skills>,
  )

  const accentColor = roleTemplate?.color || "#a67c52" // Use role color or default vintage paper theme
  const displayTitle = roleTemplate?.name || "Software Engineer"

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 print:hidden">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Portfolio</span>
          </Link>
          <div className="flex items-center gap-2">
            <Button size="sm" className="gap-2" onClick={handleDownload}>
              <Download className="h-4 w-4" />
              Download Resume
            </Button>
          </div>
        </div>
      </header>

      {roleTemplate && (
        <div className="container mx-auto px-4 py-3 max-w-4xl print:hidden">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: accentColor }}
          >
            <span className="opacity-80">Viewing as:</span>
            <span>{roleTemplate.name}</span>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Resume */}
        <div id="print-resume" className="bg-white text-black rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none">
          {/* Resume Header */}
          <div className="p-8 pb-6" style={{ borderBottom: `3px solid ${accentColor}` }}>
            <h1 className="text-3xl font-bold tracking-tight mb-1">Tahjyei Thompson</h1>
            <p className="text-xl mb-4" style={{ color: accentColor }}>
              {displayTitle}
            </p>
            <p className="text-gray-600 text-sm max-w-2xl mb-4">
              {roleTemplate?.description ||
                "Experienced software engineer with a focus on data analysis, machine learning, and building performant data pipelines. Adaptable professional who thrives in diverse technical environments from frontend development to search infrastructure."}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <a href="mailto:tahjyeithompson@gmail.com" className="flex items-center gap-1 hover:text-black">
                <Mail className="h-4 w-4" />
                tahjyeithompson@gmail.com
              </a>
              <span className="flex items-center gap-1">
                <Phone className="h-4 w-4" />
                (876) 521-9214
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Jamaica / Remote
              </span>
              <a
                href="https://github.com/tajcore"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-black"
              >
                <Github className="h-4 w-4" />
                tajcore
              </a>
              <a
                href="https://linkedin.com/in/tahjyei"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-black"
              >
                <Linkedin className="h-4 w-4" />
                tahjyei
              </a>
              <a
                href="https://tahjyei.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 hover:text-black"
              >
                <Globe className="h-4 w-4" />
                tahjyei.com
              </a>
            </div>
          </div>

          <div className="p-8 space-y-6">
            {/* Skills Section */}
            {Object.keys(groupedSkills).length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                  Skills
                </h2>
                <div className="space-y-2">
                  {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                    <div key={category} className="text-sm">
                      <span className="font-semibold">{category}:</span>{" "}
                      <span className="text-gray-700">{categorySkills.map((s) => s.name).join(", ")}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Experience Section */}
            {experiences.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                  Experience
                </h2>
                <div className="space-y-5">
                  {experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold">{exp.title}</h3>
                          <p style={{ color: accentColor }}>{exp.company?.name}</p>
                        </div>
                        <div className="text-sm text-gray-500 flex items-center gap-1 whitespace-nowrap">
                          <Calendar className="h-3 w-3" />
                          {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                        </div>
                      </div>
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="mt-2 text-sm text-gray-700 space-y-1 list-disc list-outside ml-4">
                          {exp.achievements.map((achievement, i) => (
                            <li key={i}>{achievement}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education Section */}
            {education.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                  Education
                </h2>
                {education.map((edu) => (
                  <div key={edu.id} className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold flex items-center gap-2">
                        <GraduationCap className="h-4 w-4" style={{ color: accentColor }} />
                        {edu.institution}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {edu.degree} in {edu.field_of_study}
                        {edu.minor && ` · Minor in ${edu.minor}`}
                      </p>
                    </div>
                    <div className="text-sm text-gray-500 whitespace-nowrap">{formatDate(edu.end_date)}</div>
                  </div>
                ))}
              </section>
            )}

            {/* Certifications Section */}
            {certifications.length > 0 && (
              <section>
                <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: accentColor }}>
                  Certifications
                </h2>
                <div className="grid grid-cols-2 gap-3">
                  {certifications.map((cert) => (
                    <div key={cert.id} className="flex items-start gap-2 text-sm">
                      <Award className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: accentColor }} />
                      <div>
                        <span className="font-medium">{cert.name}</span>
                        <span className="text-gray-500 block text-xs">{cert.issuer}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
        </div>

        {/* Contact CTA for visitors */}
        <div className="mt-8 text-center print:hidden">
          <p className="text-muted-foreground mb-4">Interested in working together?</p>
          <div className="flex items-center justify-center gap-4">
            <Button asChild variant="outline" className="gap-2 bg-transparent">
              <a href="mailto:tahjyeithompson@gmail.com">
                <Mail className="h-4 w-4" />
                Get in Touch
              </a>
            </Button>
            <Button asChild className="gap-2">
              <Link href="/projects">View My Projects</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Print styles */}
      <style jsx global>{`
        @media print {
          @page {
            size: auto;
            margin: 12mm;
          }
          html, body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          body * {
            visibility: hidden;
          }
          .print\\:hidden {
            display: none !important;
          }
          #print-resume, #print-resume * {
            visibility: visible;
          }
          #print-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100% !important;
            box-shadow: none !important;
            border-radius: 0 !important;
          }
          .container {
            max-width: 100% !important;
            padding: 0 !important;
          }
        }
      `}</style>
    </div>
  )
}
