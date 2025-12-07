import { Briefcase, Calendar, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Experience, Company } from "@/lib/types"

interface ExperienceSectionProps {
  experiences: (Experience & { company?: Company })[]
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <section id="experience" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Battle History</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every mission has shaped me into the engineer I am today. Here&apos;s the journey so far.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-1/2" />

            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className={`relative flex flex-col md:flex-row gap-8 mb-12 ${index % 2 === 0 ? "md:flex-row-reverse" : ""}`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-0 md:left-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background md:-translate-x-1/2 z-10" />

                {/* Content */}
                <div className={`md:w-1/2 pl-8 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                  <Card className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          <h3 className="font-serif text-xl font-bold">{exp.title}</h3>
                          <div className="flex items-center gap-2 text-primary font-medium">
                            <Briefcase className="h-4 w-4" />
                            {exp.company?.name}
                          </div>
                        </div>
                        {exp.is_current && (
                          <Badge variant="default" className="bg-green-500/10 text-green-600 border-green-500/30">
                            Current
                          </Badge>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                        </div>
                        {exp.company?.location && (
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {exp.company.location}
                          </div>
                        )}
                      </div>

                      {/* Description */}
                      {exp.description && <p className="text-muted-foreground mb-4">{exp.description}</p>}

                      {/* Achievements */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <ul className="space-y-2">
                          {exp.achievements.slice(0, 3).map((achievement, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex gap-2">
                              <span className="text-primary mt-1">•</span>
                              <span>{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="hidden md:block md:w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
