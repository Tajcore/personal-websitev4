import { SkillForm } from "@/components/skill-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: skill }, { data: categories }] = await Promise.all([
    supabase.from("skills").select("*").eq("id", id).single(),
    supabase.from("skill_categories").select("*").order("sort_order"),
  ])

  if (!skill) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Skill</h1>
        <p className="text-muted-foreground mt-1">Update skill details</p>
      </div>
      <SkillForm skill={skill} categories={categories || []} />
    </div>
  )
}
