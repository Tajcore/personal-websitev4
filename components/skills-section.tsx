"use client"

import type React from "react"

import { Code, Layers, Wrench, Database, Workflow } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import type { SkillCategory, Skill } from "@/lib/types"

interface SkillsSectionProps {
  categories: SkillCategory[]
  skills: (Skill & { category?: SkillCategory })[]
}

const categoryIcons: Record<string, React.ReactNode> = {
  "Programming Languages": <Code className="h-5 w-5" />,
  "Libraries & Frameworks": <Layers className="h-5 w-5" />,
  "Tools & Platforms": <Wrench className="h-5 w-5" />,
  "Database Tools": <Database className="h-5 w-5" />,
  "Data Engineering": <Workflow className="h-5 w-5" />,
}

export function SkillsSection({ categories, skills }: SkillsSectionProps) {
  const getSkillsByCategory = (categoryId: string) => {
    return skills.filter((skill) => skill.category_id === categoryId)
  }

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Skills Arsenal</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built over years of tackling diverse challenges across the software engineering
            spectrum.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => {
            const categorySkills = getSkillsByCategory(category.id)
            return (
              <Card key={category.id} className="group hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-3">
                    <div
                      className="p-2 rounded-lg"
                      style={{ backgroundColor: `${category.color}15`, color: category.color }}
                    >
                      {categoryIcons[category.name] || <Code className="h-5 w-5" />}
                    </div>
                    <span className="text-lg">{category.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categorySkills.slice(0, 6).map((skill) => (
                      <div key={skill.id}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="font-medium">{skill.name}</span>
                          <span className="text-muted-foreground">{skill.proficiency}%</span>
                        </div>
                        <Progress
                          value={skill.proficiency}
                          className="h-2"
                          style={{ "--primary": category.color } as React.CSSProperties}
                        />
                      </div>
                    ))}
                    {categorySkills.length > 6 && (
                      <p className="text-sm text-muted-foreground pt-2">+{categorySkills.length - 6} more skills</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
