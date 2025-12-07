import { RoleForm } from "@/components/role-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditRolePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const [{ data: role }, { data: skills }, { data: roleSkills }] = await Promise.all([
    supabase.from("role_templates").select("*").eq("id", id).single(),
    supabase.from("skills").select("*").order("name"),
    supabase.from("role_skills").select("skill_id").eq("role_id", id),
  ])

  if (!role) {
    notFound()
  }

  const selectedSkillIds = roleSkills?.map((rs) => rs.skill_id) || []

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Role Template</h1>
        <p className="text-muted-foreground mt-1">Update role configuration</p>
      </div>
      <RoleForm role={role} skills={skills || []} selectedSkillIds={selectedSkillIds} />
    </div>
  )
}
