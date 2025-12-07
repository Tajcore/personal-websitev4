import { createClient } from "@/lib/server"
import { HeroSection } from "@/components/hero-section"
import { SkillsSection } from "@/components/skills-section"
import { ExperienceSection } from "@/components/experience-section"
import { ProjectsSection } from "@/components/projects-section"
import { RoleMorpherSection } from "@/components/role-morpher-section"
import { EducationSection } from "@/components/education-section"
import { InterestsSection } from "@/components/interests-section"
import { Footer } from "@/components/footer"
import { Navigation } from "@/components/navigation"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch all data in parallel
  const [
    { data: skillCategories },
    { data: skills },
    { data: experiences },
    { data: companies },
    { data: projects },
    { data: roleTemplates },
    { data: education },
    { data: interests },
  ] = await Promise.all([
    supabase.from("skill_categories").select("*").order("sort_order"),
    supabase.from("skills").select("*").order("name"),
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("companies").select("*"),
    supabase.from("projects").select("*").eq("is_featured", true).limit(6),
    supabase.from("role_templates").select("*").order("sort_order"),
    supabase.from("education").select("*"),
    supabase.from("interests").select("*").order("sort_order"),
  ])

  // Combine experiences with their companies
  const experiencesWithCompanies = experiences?.map((exp) => ({
    ...exp,
    company: companies?.find((c) => c.id === exp.company_id),
  }))

  // Combine skills with their categories
  const skillsWithCategories = skills?.map((skill) => ({
    ...skill,
    category: skillCategories?.find((c) => c.id === skill.category_id),
  }))

  return (
    <main className="min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <RoleMorpherSection roles={roleTemplates || []} skills={skillsWithCategories || []} />
      <SkillsSection categories={skillCategories || []} skills={skillsWithCategories || []} />
      <ExperienceSection experiences={experiencesWithCompanies || []} />
      <ProjectsSection projects={projects || []} />
      <EducationSection education={education || []} />
      <InterestsSection interests={interests || []} />
      <Footer />
    </main>
  )
}
