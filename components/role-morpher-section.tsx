"use client"

import { useState } from "react"
import { Layers, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RoleTemplate, Skill } from "@/lib/types"
import Link from "next/link"

interface RoleMorpherSectionProps {
  roles: RoleTemplate[]
  skills: Skill[]
}

const roleColors: Record<string, { bg: string; text: string; border: string; glow: string }> = {
  "Frontend Developer": {
    bg: "bg-red-500/10",
    text: "text-red-600",
    border: "border-red-500/30",
    glow: "shadow-red-500/20",
  },
  "Full Stack Engineer": {
    bg: "bg-blue-500/10",
    text: "text-blue-600",
    border: "border-blue-500/30",
    glow: "shadow-blue-500/20",
  },
  "Data Engineer": {
    bg: "bg-green-500/10",
    text: "text-green-600",
    border: "border-green-500/30",
    glow: "shadow-green-500/20",
  },
  "Search Consultant": {
    bg: "bg-yellow-500/10",
    text: "text-yellow-600",
    border: "border-yellow-500/30",
    glow: "shadow-yellow-500/20",
  },
  "Software Engineer": {
    bg: "bg-gray-500/10",
    text: "text-gray-600",
    border: "border-gray-500/30",
    glow: "shadow-gray-500/20",
  },
}

export function RoleMorpherSection({ roles, skills }: RoleMorpherSectionProps) {
  const [activeRole, setActiveRole] = useState<string | null>(roles[0]?.name || null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const handleRoleSelect = (roleName: string) => {
    if (roleName === activeRole) return
    setIsTransitioning(true)
    setTimeout(() => {
      setActiveRole(roleName)
      setIsTransitioning(false)
    }, 300)
  }

  const activeRoleData = roles.find((r) => r.name === activeRole)
  const colors = activeRole
    ? roleColors[activeRole] || roleColors["Software Engineer"]
    : roleColors["Software Engineer"]

  const getRoleSkills = (roleName: string) => {
    const skillMappings: Record<string, string[]> = {
      "Frontend Developer": [
        "JavaScript",
        "TypeScript",
        "React",
        "Vue.js",
        "Next.js",
        "Tailwind CSS",
        "HTML",
        "CSS",
        "Sass",
      ],
      "Full Stack Engineer": [
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "PostgreSQL",
        "Next.js",
        "Docker",
        "AWS (S3, EC2, Lambda)",
      ],
      "Data Engineer": [
        "Python",
        "SQL",
        "Apache Spark",
        "Apache Kafka",
        "Apache Airflow",
        "Snowflake",
        "PostgreSQL",
        "Docker",
      ],
      "Search Consultant": ["JavaScript", "TypeScript", "Algolia", "PostgreSQL", "Node.js", "React"],
      "Software Engineer": ["JavaScript", "TypeScript", "Python", "React", "Node.js", "PostgreSQL", "Git", "Docker"],
    }
    const roleSkillNames = skillMappings[roleName] || []
    return skills.filter((s) => roleSkillNames.includes(s.name))
  }

  const displaySkills = activeRole ? getRoleSkills(activeRole) : []

  return (
    <section id="roles" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">Role Flexibility</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4 text-balance">
            One Engineer, Many Roles
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            I adapt to the needs of each project. Select a role to see my relevant skills and experience tailored for
            that position.
          </p>
        </div>

        {/* Role Selector */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {roles.map((role) => {
            const roleColor = roleColors[role.name] || roleColors["Software Engineer"]
            const isActive = activeRole === role.name
            return (
              <button
                key={role.id}
                onClick={() => handleRoleSelect(role.name)}
                className={`px-6 py-3 rounded-lg border-2 font-medium transition-all duration-300 ${
                  isActive
                    ? `${roleColor.bg} ${roleColor.text} ${roleColor.border} shadow-lg ${roleColor.glow}`
                    : "bg-card border-border text-muted-foreground hover:border-primary/50"
                }`}
              >
                {role.name}
              </button>
            )
          })}
        </div>

        {/* Active Role Display */}
        <Card
          className={`max-w-4xl mx-auto overflow-hidden transition-all duration-300 ${isTransitioning ? "opacity-50 scale-98" : "opacity-100 scale-100"}`}
        >
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Role Icon */}
              <div
                className={`flex-shrink-0 w-20 h-20 rounded-2xl ${colors.bg} ${colors.border} border-2 flex items-center justify-center`}
              >
                <Layers className={`h-10 w-10 ${colors.text}`} />
              </div>

              {/* Role Info */}
              <div className="flex-1">
                <h3 className={`font-serif text-2xl font-bold mb-2 ${colors.text}`}>{activeRoleData?.name}</h3>
                <p className="text-muted-foreground mb-6">{activeRoleData?.description}</p>

                {/* Skills for this role */}
                <div className="mb-6">
                  <h4 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Core Skills
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {displaySkills.map((skill) => (
                      <Badge key={skill.id} variant="secondary" className="px-3 py-1">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <Link href={`/resume?r=${activeRoleData?.slug}`}>
                  <Button className="gap-2">
                    View {activeRoleData?.name} Resume
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
