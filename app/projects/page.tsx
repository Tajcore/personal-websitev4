import { createClient } from "@/lib/server"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, ArrowRight, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export default async function ProjectsPage() {
  const supabase = await createClient()

  const [{ data: projects }, { data: companies }, { data: projectSkills }, { data: skills }] = await Promise.all([
    supabase.from("projects").select("*").eq("is_published", true).order("created_at", { ascending: false }),
    supabase.from("companies").select("*"),
    supabase.from("project_skills").select("*"),
    supabase.from("skills").select("*"),
  ])

  const getCompanyName = (companyId: string | null) => {
    if (!companyId) return null
    return companies?.find((c) => c.id === companyId)?.name
  }

  const getProjectSkills = (projectId: string) => {
    const skillIds = projectSkills?.filter((ps) => ps.project_id === projectId).map((ps) => ps.skill_id) || []
    return skills?.filter((s) => skillIds.includes(s.id)) || []
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <div className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>

          <div className="mb-12">
            <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">All Projects</h1>
            <p className="text-lg text-muted-foreground max-w-2xl">
              A comprehensive collection of projects showcasing problem-solving and technical expertise across different
              domains.
            </p>
          </div>

          {projects?.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <p className="text-muted-foreground">No projects available yet. Check back soon!</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects?.map((project) => {
                const projectSkillsList = getProjectSkills(project.id)
                return (
                  <Card key={project.id} className="group hover:shadow-lg transition-all overflow-hidden">
                    {/* Thumbnail */}
                    <div className="aspect-video bg-muted relative overflow-hidden">
                      <img
                        src={"/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                        {project.live_url && (
                          <a
                            href={project.live_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          >
                            <ExternalLink className="h-5 w-5 text-white" />
                          </a>
                        )}
                        {project.github_url && (
                          <a
                            href={project.github_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                          >
                            <Github className="h-5 w-5 text-white" />
                          </a>
                        )}
                      </div>
                    </div>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="font-serif text-lg font-bold">{project.title}</h3>
                        {project.is_featured && <Badge>Featured</Badge>}
                      </div>
                      {getCompanyName(project.company_id) && (
                        <p className="text-sm text-primary mb-2">{getCompanyName(project.company_id)}</p>
                      )}
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{project.short_description}</p>

                      {/* Skills */}
                      {projectSkillsList.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-4">
                          {projectSkillsList.slice(0, 4).map((skill) => (
                            <Badge key={skill.id} variant="outline" className="text-xs">
                              {skill.name}
                            </Badge>
                          ))}
                          {projectSkillsList.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{projectSkillsList.length - 4}
                            </Badge>
                          )}
                        </div>
                      )}

                      {project.slug && (
                        <Link
                          href={`/projects/${project.slug}`}
                          className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                        >
                          View Case Study
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      )}
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}
