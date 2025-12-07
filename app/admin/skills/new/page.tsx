import { SkillForm } from "@/components/skill-form"
import { createClient } from "@/lib/server"

export default async function NewSkillPage() {
  const supabase = await createClient()
  const { data: categories } = await supabase.from("skill_categories").select("*").order("sort_order")

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add New Skill</h1>
        <p className="text-muted-foreground mt-1">Add a new skill to your portfolio</p>
      </div>
      <SkillForm categories={categories || []} />
    </div>
  )
}
