import { createClient } from "@/lib/server"
import { redirect } from "next/navigation"
import { ResumeGenerator } from "@/components/resume-generator"

export default async function AdminResumeGeneratorPage() {
  const supabase = await createClient()

  // Check authentication
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const [
    { data: roles },
    { data: skills },
    { data: skillCategories },
    { data: experiences },
    { data: companies },
    { data: education },
    { data: certifications },
    { data: roleSkills },
  ] = await Promise.all([
    supabase.from("role_templates").select("*").eq("is_active", true).order("sort_order"),
    supabase.from("skills").select("*").order("name"),
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("companies").select("*"),
    supabase.from("education").select("*"),
    supabase.from("certifications").select("*").order("issue_date", { ascending: false }),
    supabase.from("role_skills").select("*"),
  ])

  // Combine experiences with companies
  const experiencesWithCompanies =
    experiences?.map((exp) => ({
      ...exp,
      company: companies?.find((c) => c.id === exp.company_id),
    })) || []

  // Combine skills with categories
  const skillsWithCategories =
    skills?.map((skill) => ({
      ...skill,
      category: skillCategories?.find((c) => c.id === skill.category_id),
    })) || []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Resume Generator</h1>
        <p className="text-muted-foreground">
          Create custom resumes by selecting roles and skills. This tool is private to you.
        </p>
      </div>

      <ResumeGenerator
        roles={roles || []}
        skills={skillsWithCategories}
        experiences={experiencesWithCompanies}
        education={education || []}
        certifications={certifications || []}
        roleSkills={roleSkills || []}
        isAdmin={true}
      />
    </div>
  )
}
