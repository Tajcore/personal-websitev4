import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resume | Tahjyei Thompson",
  description:
    "Download or print a tailored resume generated from my skills, experience, and role presets.",
}
import { createClient } from "@/lib/server"
import { PublicResume } from "@/components/public-resume"

interface Props {
  searchParams: Promise<{ r?: string }>
}

export default async function PublicResumePage({ searchParams }: Props) {
  const supabase = await createClient()
  const params = await searchParams
  const roleSlug = params.r

  let roleTemplate = null
  let roleSkillIds: string[] = []

  if (roleSlug) {
    const { data: template } = await supabase
      .from("role_templates")
      .select("*")
      .eq("slug", roleSlug)
      .eq("is_active", true)
      .single()

    if (template) {
      roleTemplate = template

      // Get skills associated with this role
      const { data: roleSkills } = await supabase
        .from("role_skills")
        .select("skill_id")
        .eq("role_template_id", template.id)

      roleSkillIds = roleSkills?.map((rs) => rs.skill_id) || []
    }
  }

  const [
    { data: skills },
    { data: skillCategories },
    { data: experiences },
    { data: companies },
    { data: education },
    { data: certifications },
  ] = await Promise.all([
    supabase.from("skills").select("*").order("proficiency", { ascending: false }),
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("companies").select("*"),
    supabase.from("education").select("*"),
    supabase.from("certifications").select("*").order("issue_date", { ascending: false }),
  ])

  const filteredSkills = roleSkillIds.length > 0 ? skills?.filter((s) => roleSkillIds.includes(s.id)) : skills

  // Combine experiences with companies
  const experiencesWithCompanies =
    experiences?.map((exp) => ({
      ...exp,
      company: companies?.find((c) => c.id === exp.company_id),
    })) || []

  // Combine skills with categories
  const skillsWithCategories =
    filteredSkills?.map((skill) => ({
      ...skill,
      category: skillCategories?.find((c) => c.id === skill.category_id),
    })) || []

  return (
    <PublicResume
      skills={skillsWithCategories}
      experiences={experiencesWithCompanies}
      education={education || []}
      certifications={certifications || []}
      roleTemplate={roleTemplate}
    />
  )
}
