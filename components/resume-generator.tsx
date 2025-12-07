"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import type { RoleTemplate, Skill, Experience, Education, Certification, Company, SkillCategory } from "@/lib/types"
import {
  Settings,
  Download,
  Printer,
  Mail,
  Phone,
  MapPin,
  Github,
  Globe,
  Calendar,
  GraduationCap,
  Award,
  ChevronDown,
  ChevronUp,
  Linkedin,
} from "lucide-react"

interface ResumeGeneratorProps {
  roles: RoleTemplate[]
  skills: (Skill & { category?: SkillCategory })[]
  experiences: (Experience & { company?: Company })[]
  education: Education[]
  certifications: Certification[]
  roleSkills: { role_id: string; skill_id: string }[]
  isAdmin?: boolean
}

// Role color mapping
const roleColors: Record<string, string> = {
  "Frontend Developer": "#e53935",
  "Full Stack Engineer": "#1e88e5",
  "Data Engineer": "#43a047",
  "Search Consultant": "#fdd835",
  "Software Engineer": "#212121",
}

export function ResumeGenerator({
  roles,
  skills,
  experiences,
  education,
  certifications,
  roleSkills,
  isAdmin = false,
}: ResumeGeneratorProps) {
  const [selectedRoles, setSelectedRoles] = useState<string[]>([])
  const [selectedSkillIds, setSelectedSkillIds] = useState<string[]>([])
  const [selectedExperienceIds, setSelectedExperienceIds] = useState<string[]>(experiences.map((e) => e.id))
  const [showAllSkills, setShowAllSkills] = useState(false)
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    skills: true,
    experience: true,
  })
  const resumeRef = useRef<HTMLDivElement>(null)

  // Get skills for selected roles
  const getSkillsForRoles = (roleIds: string[]) => {
    const skillIds = roleSkills.filter((rs) => roleIds.includes(rs.role_id)).map((rs) => rs.skill_id)
    return [...new Set(skillIds)]
  }

  // Handle role selection
  const toggleRole = (roleId: string) => {
    const newSelectedRoles = selectedRoles.includes(roleId)
      ? selectedRoles.filter((id) => id !== roleId)
      : [...selectedRoles, roleId]

    setSelectedRoles(newSelectedRoles)

    // Auto-select skills for the selected roles
    const roleSkillIds = getSkillsForRoles(newSelectedRoles)
    setSelectedSkillIds(roleSkillIds)
  }

  // Toggle skill selection
  const toggleSkill = (skillId: string) => {
    setSelectedSkillIds((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  // Toggle experience selection
  const toggleExperience = (expId: string) => {
    setSelectedExperienceIds((prev) => (prev.includes(expId) ? prev.filter((id) => id !== expId) : [...prev, expId]))
  }

  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }))
  }

  // Get combined role title
  const getCombinedTitle = () => {
    if (selectedRoles.length === 0) return "Software Engineer"
    const roleNames = selectedRoles.map((id) => roles.find((r) => r.id === id)?.name).filter(Boolean)
    if (roleNames.length === 1) return roleNames[0]
    return roleNames.join(" / ")
  }

  // Get primary color based on first selected role
  const getPrimaryColor = () => {
    if (selectedRoles.length === 0) return "#a67c52"
    const firstRole = roles.find((r) => r.id === selectedRoles[0])
    return roleColors[firstRole?.name || ""] || firstRole?.color || "#a67c52"
  }

  // Print resume
  const handlePrint = () => {
    window.print()
  }

  // Format date
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  // Get selected data
  const selectedSkills = skills.filter((s) => selectedSkillIds.includes(s.id))
  const selectedExperiences = experiences.filter((e) => selectedExperienceIds.includes(e.id))
  const displayedSkills = showAllSkills ? skills : selectedSkills

  // Group skills by category
  const groupedSkills = displayedSkills.reduce(
    (acc, skill) => {
      const categoryName = skill.category?.name || "Other"
      if (!acc[categoryName]) acc[categoryName] = []
      acc[categoryName].push(skill)
      return acc
    },
    {} as Record<string, typeof displayedSkills>,
  )

  return (
    <div className={isAdmin ? "" : "min-h-screen bg-background"}>
      {/* Header - only show when not in admin */}
      {!isAdmin && (
        <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50 print:hidden">
          <div className="container mx-auto px-4 py-4 flex items-center justify-end">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2 bg-transparent">
                <Printer className="h-4 w-4" />
                Print
              </Button>
              <Button size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export PDF
              </Button>
            </div>
          </div>
        </header>
      )}

      <div className={isAdmin ? "" : "container mx-auto px-4 py-8"}>
        <div className="grid lg:grid-cols-[350px_1fr] gap-8">
          {/* Sidebar - Configuration */}
          <aside className="space-y-6 print:hidden">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  Resume Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Role Selection */}
                <div>
                  <Label className="text-sm font-semibold mb-3 block">Select Role(s)</Label>
                  <div className="space-y-2">
                    {roles.map((role) => {
                      const isSelected = selectedRoles.includes(role.id)
                      return (
                        <button
                          key={role.id}
                          onClick={() => toggleRole(role.id)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all text-left ${
                            isSelected ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
                          }`}
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0"
                            style={{ backgroundColor: roleColors[role.name] || role.color }}
                          />
                          <span className="font-medium text-sm">{role.name}</span>
                          {isSelected && <Badge className="ml-auto">Selected</Badge>}
                        </button>
                      )
                    })}
                  </div>
                </div>

                <Separator />

                {/* Skills Section */}
                <div>
                  <button
                    onClick={() => toggleSection("skills")}
                    className="w-full flex items-center justify-between text-sm font-semibold mb-3"
                  >
                    <span>Skills ({selectedSkillIds.length} selected)</span>
                    {expandedSections.skills ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                  </button>
                  {expandedSections.skills && (
                    <>
                      <div className="flex items-center gap-2 mb-3">
                        <Checkbox
                          id="showAllSkills"
                          checked={showAllSkills}
                          onCheckedChange={(checked) => setShowAllSkills(!!checked)}
                        />
                        <Label htmlFor="showAllSkills" className="text-sm">
                          Show all skills
                        </Label>
                      </div>
                      <div className="max-h-64 overflow-y-auto space-y-2">
                        {skills.map((skill) => (
                          <div key={skill.id} className="flex items-center gap-2">
                            <Checkbox
                              id={skill.id}
                              checked={selectedSkillIds.includes(skill.id)}
                              onCheckedChange={() => toggleSkill(skill.id)}
                            />
                            <Label htmlFor={skill.id} className="text-sm cursor-pointer">
                              {skill.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                {/* Experience Section */}
                <div>
                  <button
                    onClick={() => toggleSection("experience")}
                    className="w-full flex items-center justify-between text-sm font-semibold mb-3"
                  >
                    <span>Experience ({selectedExperienceIds.length} selected)</span>
                    {expandedSections.experience ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  {expandedSections.experience && (
                    <div className="space-y-2">
                      {experiences.map((exp) => (
                        <div key={exp.id} className="flex items-start gap-2">
                          <Checkbox
                            id={exp.id}
                            checked={selectedExperienceIds.includes(exp.id)}
                            onCheckedChange={() => toggleExperience(exp.id)}
                            className="mt-0.5"
                          />
                          <Label htmlFor={exp.id} className="text-sm cursor-pointer">
                            <span className="font-medium">{exp.title}</span>
                            <span className="text-muted-foreground block text-xs">{exp.company?.name}</span>
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Print/Export buttons for admin */}
                {isAdmin && (
                  <>
                    <Separator />
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handlePrint} className="flex-1 gap-2 bg-transparent">
                        <Printer className="h-4 w-4" />
                        Print
                      </Button>
                      <Button size="sm" onClick={handlePrint} className="flex-1 gap-2">
                        <Download className="h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </aside>

          {/* Resume Preview */}
          <div className="print:m-0">
          <div
            ref={resumeRef}
            id="print-resume"
            className="bg-white text-black rounded-lg shadow-lg overflow-hidden print:shadow-none print:rounded-none"
            style={{ "--accent-color": getPrimaryColor() } as React.CSSProperties}
          >
              {/* Resume Header */}
              <div className="p-8 pb-6" style={{ borderBottom: `3px solid ${getPrimaryColor()}` }}>
                <h1 className="text-3xl font-bold tracking-tight mb-1">Tahjyei Thompson</h1>
                <p className="text-xl mb-4" style={{ color: getPrimaryColor() }}>
                  {getCombinedTitle()}
                </p>
                <p className="text-gray-600 text-sm max-w-2xl mb-4">
                  Experienced software engineer with a focus on data analysis, machine learning, and building performant
                  data pipelines. Adaptable professional who thrives in diverse technical environments.
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
                {(selectedSkillIds.length > 0 || showAllSkills) && (
                  <section>
                    <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: getPrimaryColor() }}>
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
                {selectedExperiences.length > 0 && (
                  <section>
                    <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: getPrimaryColor() }}>
                      Experience
                    </h2>
                    <div className="space-y-5">
                      {selectedExperiences.map((exp) => (
                        <div key={exp.id}>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="font-bold">{exp.title}</h3>
                              <p style={{ color: getPrimaryColor() }}>{exp.company?.name}</p>
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
                    <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: getPrimaryColor() }}>
                      Education
                    </h2>
                    {education.map((edu) => (
                      <div key={edu.id} className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-bold flex items-center gap-2">
                            <GraduationCap className="h-4 w-4" style={{ color: getPrimaryColor() }} />
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
                    <h2 className="text-lg font-bold mb-3 pb-1 border-b-2" style={{ borderColor: getPrimaryColor() }}>
                      Certifications
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                      {certifications.slice(0, 4).map((cert) => (
                        <div key={cert.id} className="flex items-start gap-2 text-sm">
                          <Award className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: getPrimaryColor() }} />
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
