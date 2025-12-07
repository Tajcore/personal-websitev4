import { ProjectForm } from "@/components/project-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: project }, { data: companies }, { data: experiences }, { data: skills }, { data: projectSkills }] =
    await Promise.all([
      supabase.from("projects").select("*").eq("id", id).single(),
      supabase.from("companies").select("*").order("name"),
      supabase.from("experiences").select("*").order("sort_order"),
      supabase.from("skills").select("*").order("name"),
      supabase.from("project_skills").select("skill_id").eq("project_id", id),
    ])

  if (!project) {
    notFound()
  }

  const selectedSkillIds = projectSkills?.map((ps) => ps.skill_id) || []

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Project</h1>
        <p className="text-muted-foreground mt-1">Update project details and case study</p>
      </div>
      <ProjectForm
        project={project}
        companies={companies || []}
        experiences={experiences || []}
        skills={skills || []}
        selectedSkillIds={selectedSkillIds}
      />
    </div>
  )
}
