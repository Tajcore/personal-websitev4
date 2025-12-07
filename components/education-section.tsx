import { GraduationCap, Calendar, Award } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import type { Education } from "@/lib/types"

interface EducationSectionProps {
  education: Education[]
}

export function EducationSection({ education }: EducationSectionProps) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return ""
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section id="education" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Education</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The foundation of knowledge that powers my engineering journey.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {education.map((edu) => (
            <Card key={edu.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="flex items-start gap-6">
                  {/* Icon */}
                  <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-8 w-8 text-primary" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="font-serif text-xl font-bold mb-1">{edu.institution}</h3>
                    <p className="text-primary font-medium mb-2">
                      {edu.degree} in {edu.field_of_study}
                      {edu.minor && <span className="text-muted-foreground"> · Minor in {edu.minor}</span>}
                    </p>

                    {/* Date */}
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="h-4 w-4" />
                      {formatDate(edu.start_date)} - {formatDate(edu.end_date)}
                    </div>

                    {/* Achievements */}
                    {edu.achievements && edu.achievements.length > 0 && (
                      <div className="space-y-2">
                        {edu.achievements.map((achievement, i) => (
                          <div key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <Award className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                            <span>{achievement}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
