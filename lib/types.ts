export interface Profile {
  id: string
  full_name: string
  title: string
  bio: string | null
  email: string | null
  phone: string | null
  github_url: string | null
  linkedin_url: string | null
  website_url: string | null
  avatar_url: string | null
  location: string | null
  created_at: string
  updated_at: string
}

export interface SkillCategory {
  id: string
  name: string
  color: string
  icon: string | null
  sort_order: number
  created_at: string
}

export interface Skill {
  id: string
  name: string
  category_id: string | null
  proficiency: number
  years_experience: number | null
  is_featured: boolean
  created_at: string
  updated_at: string
  category?: SkillCategory
}

export interface Company {
  id: string
  name: string
  logo_url: string | null
  website_url: string | null
  location: string | null
  description: string | null
  created_at: string
}

export interface Experience {
  id: string
  company_id: string
  title: string
  start_date: string
  end_date: string | null
  is_current: boolean
  description: string | null
  achievements: string[] | null
  sort_order: number
  created_at: string
  updated_at: string
  company?: Company
  skills?: Skill[]
}

export interface Project {
  id: string
  title: string
  slug: string | null
  short_description: string | null
  company_id: string | null
  experience_id: string | null
  thumbnail_url: string | null
  live_url: string | null
  github_url: string | null
  is_featured: boolean
  is_published: boolean
  start_date: string | null
  end_date: string | null
  created_at: string
  updated_at: string
  company?: Company
  skills?: Skill[]
  case_study?: CaseStudy
}

export interface CaseStudy {
  id: string
  project_id: string
  overview: string | null
  challenge: string | null
  approach: string | null
  solution: string | null
  results: string | null
  lessons_learned: string | null
  content_blocks: unknown[]
  created_at: string
  updated_at: string
}

export interface Certification {
  id: string
  name: string
  issuer: string
  issue_date: string | null
  expiry_date: string | null
  credential_id: string | null
  credential_url: string | null
  badge_url: string | null
  is_featured: boolean
  created_at: string
}

export interface Learning {
  id: string
  title: string
  platform: string | null
  instructor: string | null
  completion_date: string | null
  certificate_url: string | null
  topics: string[] | null
  notes: string | null
  is_completed: boolean
  is_featured: boolean
  created_at: string
}

export interface RoleTemplate {
  id: string
  name: string
  slug: string | null
  description: string | null
  color: string
  icon: string | null
  is_active: boolean
  sort_order: number
  created_at: string
  skills?: Skill[]
  experiences?: Experience[]
}

export interface Education {
  id: string
  institution: string
  degree: string
  field_of_study: string | null
  minor: string | null
  start_date: string | null
  end_date: string | null
  gpa: number | null
  achievements: string[] | null
  created_at: string
}

export interface Interest {
  id: string
  name: string
  icon: string | null
  description: string | null
  sort_order: number
  created_at: string
}
