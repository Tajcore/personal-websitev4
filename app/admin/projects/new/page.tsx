import { ProjectForm } from "@/components/project-form"
import { createClient } from "@/lib/server"

export default async function NewProjectPage() {
  const supabase = await createClient()

  const [{ data: companies }, { data: experiences }, { data: skills }] = await Promise.all([
    supabase.from("companies").select("*").order("name"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("name"),
  ])

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add New Project</h1>
        <p className="text-muted-foreground mt-1">Add a new project to showcase in your portfolio</p>
      </div>
      <ProjectForm companies={companies || []} experiences={experiences || []} skills={skills || []} />
    </div>
  )
}
