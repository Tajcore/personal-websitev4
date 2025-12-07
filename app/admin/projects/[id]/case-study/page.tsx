import { createClient } from "@/lib/server"
import { notFound, redirect } from "next/navigation"
import { CaseStudyEditor } from "@/components/case-study-editor"

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: project } = await supabase.from("projects").select("*").eq("id", id).single()

  if (!project) {
    notFound()
  }

  const { data: caseStudy } = await supabase.from("case_studies").select("*").eq("project_id", id).single()

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-serif font-bold">Case Study Editor</h1>
        <p className="text-muted-foreground">Write the case study for: {project.title}</p>
      </div>

      <CaseStudyEditor project={project} caseStudy={caseStudy} />
    </div>
  )
}
