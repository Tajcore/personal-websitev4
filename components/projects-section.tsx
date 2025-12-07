import { ExternalLink, Github, ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import type { Project } from "@/lib/types"
import Link from "next/link"

interface ProjectsSectionProps {
  projects: Project[]
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  if (projects.length === 0) {
    return (
      <section id="projects" className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Projects showcasing real-world problem solving and technical expertise.
            </p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Projects coming soon. Check back later!</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold tracking-tight mb-4">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A selection of projects where I&apos;ve made meaningful impact, from concept to deployment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {projects.map((project) => (
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
                <h3 className="font-serif text-lg font-bold mb-2">{project.title}</h3>
                <p className="text-sm text-muted-foreground line-clamp-2">{project.short_description}</p>
                {project.slug && (
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1 text-sm text-primary mt-4 hover:underline"
                  >
                    View Case Study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/projects">
            <Button variant="outline" size="lg" className="gap-2 bg-transparent">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
