import { ExperienceForm } from "@/components/experience-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: experience }, { data: companies }] = await Promise.all([
    supabase.from("experiences").select("*").eq("id", id).single(),
    supabase.from("companies").select("*").order("name"),
  ])

  if (!experience) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Experience</h1>
        <p className="text-muted-foreground mt-1">Update your role details</p>
      </div>
      <ExperienceForm experience={experience} companies={companies || []} />
    </div>
  )
}
