import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Github, ArrowLeft, Calendar, Building2 } from "lucide-react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: project } = await supabase.from("projects").select("title, short_description").eq("slug", slug).single()
  if (!project) {
    return {
      title: "Project | Tahjyei Thompson",
    }
  }
  const title = `${project.title} | Project Case Study`
  return {
    title,
    description: project.short_description || "Project case study and detailed write-up.",
    openGraph: {
      title,
      description: project.short_description || undefined,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: project.short_description || undefined,
    },
  }
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: project } = await supabase.from("projects").select("*").eq("slug", slug).single()

  if (!project) {
    notFound()
  }

  const [{ data: company }, { data: caseStudy }, { data: projectSkills }, { data: skills }] = await Promise.all([
    project.company_id ? supabase.from("companies").select("*").eq("id", project.company_id).single() : { data: null },
    supabase.from("case_studies").select("*").eq("project_id", project.id).maybeSingle(),
    supabase.from("project_skills").select("skill_id").eq("project_id", project.id),
    supabase.from("skills").select("*"),
  ])

  const projectSkillsList = skills?.filter((s) => projectSkills?.some((ps) => ps.skill_id === s.id)) || []

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "long", year: "numeric" })
  }

  return (
    <main className="min-h-screen bg-background">
      <Navigation />

      <article className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Projects
          </Link>

          {/* Header */}
          <header className="mb-12">
            <div className="aspect-video rounded-lg overflow-hidden mb-8 bg-muted">
              <img
                src={"/placeholder.svg"}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex items-start justify-between gap-4 mb-4">
              <h1 className="font-serif text-4xl md:text-5xl font-bold tracking-tight">{project.title}</h1>
              {project.is_featured && <Badge>Featured</Badge>}
            </div>

            <p className="text-xl text-muted-foreground mb-6">{project.short_description}</p>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
              {company && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4" />
                  {company.name}
                </div>
              )}
              {project.start_date && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {formatDate(project.start_date)}
                  {project.end_date && ` - ${formatDate(project.end_date)}`}
                </div>
              )}
            </div>

            {/* Skills */}
            {projectSkillsList.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {projectSkillsList.map((skill) => (
                  <Badge key={skill.id} variant="secondary">
                    {skill.name}
                  </Badge>
                ))}
              </div>
            )}

            {/* Links */}
            <div className="flex gap-4">
              {project.live_url && (
                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                  <Button className="gap-2">
                    <ExternalLink className="h-4 w-4" />
                    View Live
                  </Button>
                </a>
              )}
              {project.github_url && (
                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2 bg-transparent">
                    <Github className="h-4 w-4" />
                    Source Code
                  </Button>
                </a>
              )}
            </div>
          </header>

          {/* Case Study Content */}
          {caseStudy?.content ? (
            <div className="border-t border-border pt-8">
              <MarkdownRenderer content={caseStudy.content} />
            </div>
          ) : caseStudy ? (
            // Fallback to old format if no markdown content but has legacy fields
            <div className="prose prose-lg max-w-none">
              {caseStudy.overview && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Overview</h2>
                  <p className="text-muted-foreground">{caseStudy.overview}</p>
                </section>
              )}
              {caseStudy.challenge && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">The Challenge</h2>
                  <p className="text-muted-foreground">{caseStudy.challenge}</p>
                </section>
              )}
              {caseStudy.approach && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Approach</h2>
                  <p className="text-muted-foreground">{caseStudy.approach}</p>
                </section>
              )}
              {caseStudy.solution && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Solution</h2>
                  <p className="text-muted-foreground">{caseStudy.solution}</p>
                </section>
              )}
              {caseStudy.results && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Results</h2>
                  <p className="text-muted-foreground">{caseStudy.results}</p>
                </section>
              )}
              {caseStudy.lessons_learned && (
                <section className="mb-12">
                  <h2 className="font-serif text-2xl font-bold mb-4">Lessons Learned</h2>
                  <p className="text-muted-foreground">{caseStudy.lessons_learned}</p>
                </section>
              )}
            </div>
          ) : (
            <div className="py-12 text-center text-muted-foreground">
              <p>Case study coming soon.</p>
            </div>
          )}
        </div>
      </article>

      <Footer />
    </main>
  )
}
