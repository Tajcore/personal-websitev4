import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, ExternalLink, Eye, EyeOff, FileText } from "lucide-react"
import Link from "next/link"
import { DeleteProjectButton } from "@/components/delete-project-button"

export default async function ProjectsPage() {
  const supabase = await createClient()

  const { data: projects } = await supabase.from("projects").select("*").order("created_at", { ascending: false })

  const { data: companies } = await supabase.from("companies").select("*")

  const { data: caseStudies } = await supabase.from("case_studies").select("project_id, content")

  const getCompanyName = (companyId: string | null) => {
    if (!companyId) return null
    return companies?.find((c) => c.id === companyId)?.name
  }

  const hasCaseStudy = (projectId: string) => {
    const cs = caseStudies?.find((c) => c.project_id === projectId)
    return cs && cs.content && cs.content.trim().length > 0
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-1">Manage your portfolio projects and case studies</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Project
          </Button>
        </Link>
      </div>

      {projects?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No projects yet. Add your first project to showcase your work.</p>
            <Link href="/admin/projects/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Project
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {projects?.map((project) => (
            <Card key={project.id} className="group">
              <CardContent className="p-6">
                <div className="flex items-start gap-6">
                  {/* Thumbnail */}
                  <div className="w-32 h-20 rounded-lg bg-muted flex-shrink-0 overflow-hidden">
                    {project.thumbnail_url ? (
                      <img
                        src={project.thumbnail_url || "/placeholder.svg"}
                        alt={project.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/20">
                        <span className="font-serif text-xl font-bold text-primary/50">{project.title.charAt(0)}</span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-lg font-bold">{project.title}</h3>
                        {getCompanyName(project.company_id) && (
                          <p className="text-sm text-primary">{getCompanyName(project.company_id)}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        {project.is_featured && <Badge>Featured</Badge>}
                        {hasCaseStudy(project.id) && (
                          <Badge
                            variant="secondary"
                            className="gap-1 bg-green-500/10 text-green-600 border-green-500/20"
                          >
                            <FileText className="h-3 w-3" />
                            Case Study
                          </Badge>
                        )}
                        {project.is_published ? (
                          <Badge variant="secondary" className="gap-1">
                            <Eye className="h-3 w-3" />
                            Published
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="gap-1">
                            <EyeOff className="h-3 w-3" />
                            Draft
                          </Badge>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{project.short_description}</p>

                    {/* Actions */}
                    <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/projects/${project.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <Link href={`/admin/projects/${project.id}/case-study`}>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <FileText className="h-3 w-3" />
                          Case Study
                        </Button>
                      </Link>
                      {project.live_url && (
                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                          <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                            <ExternalLink className="h-3 w-3" />
                            View Live
                          </Button>
                        </a>
                      )}
                      <DeleteProjectButton projectId={project.id} projectTitle={project.title} />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
