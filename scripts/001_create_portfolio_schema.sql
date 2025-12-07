-- Portfolio Database Schema for Tahjyei Thompson
-- Power Rangers Morphin' Portfolio - Where skills combine to form any role!

-- Profile table for storing personal information
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL DEFAULT 'Tahjyei Thompson',
  title TEXT DEFAULT 'Software Engineer',
  bio TEXT,
  email TEXT,
  phone TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  website_url TEXT,
  avatar_url TEXT,
  location TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skill categories (like Ranger colors - each represents a domain)
CREATE TABLE IF NOT EXISTS public.skill_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  color TEXT NOT NULL DEFAULT '#a67c52', -- ranger color theme
  icon TEXT, -- icon name for display
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Skills table
CREATE TABLE IF NOT EXISTS public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.skill_categories(id) ON DELETE SET NULL,
  proficiency INTEGER DEFAULT 80 CHECK (proficiency >= 0 AND proficiency <= 100),
  years_experience NUMERIC(3,1),
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Companies/Organizations
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  location TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Work Experience
CREATE TABLE IF NOT EXISTS public.experiences (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  start_date DATE NOT NULL,
  end_date DATE, -- NULL means current
  is_current BOOLEAN DEFAULT false,
  description TEXT,
  achievements TEXT[], -- Array of bullet points
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  short_description TEXT,
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE SET NULL,
  thumbnail_url TEXT,
  live_url TEXT,
  github_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_published BOOLEAN DEFAULT true,
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project Case Studies (detailed write-ups)
CREATE TABLE IF NOT EXISTS public.case_studies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE UNIQUE,
  overview TEXT,
  challenge TEXT,
  approach TEXT,
  solution TEXT,
  results TEXT,
  lessons_learned TEXT,
  content_blocks JSONB DEFAULT '[]', -- For flexible content sections
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Project-Skill junction table (what skills were used in each project)
CREATE TABLE IF NOT EXISTS public.project_skills (
  project_id UUID REFERENCES public.projects(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (project_id, skill_id)
);

-- Experience-Skill junction table (what skills used in each role)
CREATE TABLE IF NOT EXISTS public.experience_skills (
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  PRIMARY KEY (experience_id, skill_id)
);

-- Certifications & Learning
CREATE TABLE IF NOT EXISTS public.certifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  issuer TEXT NOT NULL,
  issue_date DATE,
  expiry_date DATE,
  credential_id TEXT,
  credential_url TEXT,
  badge_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Learning/Courses
CREATE TABLE IF NOT EXISTS public.learning (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  platform TEXT, -- Coursera, Udemy, etc.
  instructor TEXT,
  completion_date DATE,
  certificate_url TEXT,
  topics TEXT[],
  notes TEXT,
  is_completed BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role Templates (the "Morphin" feature - combine skills into different roles)
CREATE TABLE IF NOT EXISTS public.role_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL, -- e.g., "Frontend Developer", "Data Engineer"
  slug TEXT UNIQUE,
  description TEXT,
  color TEXT DEFAULT '#a67c52', -- Each role gets a ranger color
  icon TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Role-Skill junction (which skills belong to which role template)
CREATE TABLE IF NOT EXISTS public.role_skills (
  role_id UUID REFERENCES public.role_templates(id) ON DELETE CASCADE,
  skill_id UUID REFERENCES public.skills(id) ON DELETE CASCADE,
  importance INTEGER DEFAULT 1 CHECK (importance >= 1 AND importance <= 5), -- How important is this skill for the role
  PRIMARY KEY (role_id, skill_id)
);

-- Role-Experience junction (which experiences are relevant to which role)
CREATE TABLE IF NOT EXISTS public.role_experiences (
  role_id UUID REFERENCES public.role_templates(id) ON DELETE CASCADE,
  experience_id UUID REFERENCES public.experiences(id) ON DELETE CASCADE,
  relevance INTEGER DEFAULT 1 CHECK (relevance >= 1 AND relevance <= 5),
  PRIMARY KEY (role_id, experience_id)
);

-- Education
CREATE TABLE IF NOT EXISTS public.education (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  institution TEXT NOT NULL,
  degree TEXT NOT NULL,
  field_of_study TEXT,
  minor TEXT,
  start_date DATE,
  end_date DATE,
  gpa NUMERIC(3,2),
  achievements TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Interests/Hobbies (for the personal touch)
CREATE TABLE IF NOT EXISTS public.interests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  icon TEXT,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skill_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.project_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.interests ENABLE ROW LEVEL SECURITY;

-- Public read policies (portfolio is public)
CREATE POLICY "Public read profiles" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Public read skill_categories" ON public.skill_categories FOR SELECT USING (true);
CREATE POLICY "Public read skills" ON public.skills FOR SELECT USING (true);
CREATE POLICY "Public read companies" ON public.companies FOR SELECT USING (true);
CREATE POLICY "Public read experiences" ON public.experiences FOR SELECT USING (true);
CREATE POLICY "Public read projects" ON public.projects FOR SELECT USING (is_published = true);
CREATE POLICY "Public read case_studies" ON public.case_studies FOR SELECT USING (true);
CREATE POLICY "Public read project_skills" ON public.project_skills FOR SELECT USING (true);
CREATE POLICY "Public read experience_skills" ON public.experience_skills FOR SELECT USING (true);
CREATE POLICY "Public read certifications" ON public.certifications FOR SELECT USING (true);
CREATE POLICY "Public read learning" ON public.learning FOR SELECT USING (true);
CREATE POLICY "Public read role_templates" ON public.role_templates FOR SELECT USING (is_active = true);
CREATE POLICY "Public read role_skills" ON public.role_skills FOR SELECT USING (true);
CREATE POLICY "Public read role_experiences" ON public.role_experiences FOR SELECT USING (true);
CREATE POLICY "Public read education" ON public.education FOR SELECT USING (true);
CREATE POLICY "Public read interests" ON public.interests FOR SELECT USING (true);

-- Admin write policies (authenticated users can modify)
CREATE POLICY "Auth write profiles" ON public.profiles FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write skill_categories" ON public.skill_categories FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write skills" ON public.skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write companies" ON public.companies FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write experiences" ON public.experiences FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write projects" ON public.projects FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write case_studies" ON public.case_studies FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write project_skills" ON public.project_skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write experience_skills" ON public.experience_skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write certifications" ON public.certifications FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write learning" ON public.learning FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write role_templates" ON public.role_templates FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write role_skills" ON public.role_skills FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write role_experiences" ON public.role_experiences FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write education" ON public.education FOR ALL USING (auth.uid() IS NOT NULL);
CREATE POLICY "Auth write interests" ON public.interests FOR ALL USING (auth.uid() IS NOT NULL);
