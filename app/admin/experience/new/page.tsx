import { ExperienceForm } from "@/components/experience-form"
import { createClient } from "@/lib/server"

export default async function NewExperiencePage() {
  const supabase = await createClient()
  const { data: companies } = await supabase.from("companies").select("*").order("name")

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add Experience</h1>
        <p className="text-muted-foreground mt-1">Add a new role to your work history</p>
      </div>
      <ExperienceForm companies={companies || []} />
    </div>
  )
}
