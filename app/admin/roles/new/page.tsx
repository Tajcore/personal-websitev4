import { RoleForm } from "@/components/role-form"
import { createClient } from "@/lib/server"

export default async function NewRolePage() {
  const supabase = await createClient()
  const { data: skills } = await supabase.from("skills").select("*").order("name")

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add Role Template</h1>
        <p className="text-muted-foreground mt-1">Create a new role configuration for resume generation</p>
      </div>
      <RoleForm skills={skills || []} />
    </div>
  )
}
