-- Seed initial data from Tahjyei's resume

-- Skill Categories (Ranger-themed colors)
INSERT INTO public.skill_categories (name, color, icon, sort_order) VALUES
('Programming Languages', '#e53935', 'code', 1),       -- Red Ranger
('Libraries & Frameworks', '#1e88e5', 'layers', 2),    -- Blue Ranger
('Tools & Platforms', '#000000', 'wrench', 3),         -- Black Ranger
('Database Tools', '#fdd835', 'database', 4),          -- Yellow Ranger
('Data Engineering', '#43a047', 'workflow', 5);        -- Green Ranger

-- Skills
INSERT INTO public.skills (name, category_id, proficiency, years_experience, is_featured)
SELECT 'JavaScript', id, 95, 4, true FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'TypeScript', id, 90, 3, true FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'Python', id, 85, 3, true FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'Swift', id, 70, 1, false FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'C#', id, 70, 1, false FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'HTML', id, 95, 4, false FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'CSS', id, 95, 4, false FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'Sass', id, 85, 3, false FROM public.skill_categories WHERE name = 'Programming Languages'
UNION ALL
SELECT 'SQL', id, 85, 3, true FROM public.skill_categories WHERE name = 'Programming Languages';

INSERT INTO public.skills (name, category_id, proficiency, years_experience, is_featured)
SELECT 'Vue.js', id, 90, 3, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'React', id, 90, 3, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Next.js', id, 90, 3, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Svelte / SvelteKit', id, 80, 2, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'LangChain', id, 75, 1, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Tailwind CSS', id, 95, 3, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Node.js', id, 90, 3, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT '.NET', id, 70, 1, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Strapi', id, 80, 2, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Django', id, 75, 1, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Apache Spark', id, 80, 1, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Apache Kafka', id, 75, 1, false FROM public.skill_categories WHERE name = 'Libraries & Frameworks'
UNION ALL
SELECT 'Apache Airflow', id, 80, 1, true FROM public.skill_categories WHERE name = 'Libraries & Frameworks';

INSERT INTO public.skills (name, category_id, proficiency, years_experience, is_featured)
SELECT 'Git', id, 95, 4, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'GitHub', id, 95, 4, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Netlify', id, 85, 3, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Vercel', id, 90, 3, true FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Heroku', id, 80, 2, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'WordPress', id, 75, 2, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Docker', id, 80, 2, true FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Webpack', id, 80, 2, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Algolia', id, 85, 2, true FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Firebase', id, 80, 2, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Storybook', id, 85, 2, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'Figma', id, 80, 3, false FROM public.skill_categories WHERE name = 'Tools & Platforms'
UNION ALL
SELECT 'AWS (S3, EC2, Lambda)', id, 80, 2, true FROM public.skill_categories WHERE name = 'Tools & Platforms';

INSERT INTO public.skills (name, category_id, proficiency, years_experience, is_featured)
SELECT 'Snowflake', id, 80, 1, true FROM public.skill_categories WHERE name = 'Database Tools'
UNION ALL
SELECT 'Redshift', id, 75, 1, false FROM public.skill_categories WHERE name = 'Database Tools'
UNION ALL
SELECT 'PostgreSQL', id, 85, 3, true FROM public.skill_categories WHERE name = 'Database Tools'
UNION ALL
SELECT 'MySQL', id, 80, 2, false FROM public.skill_categories WHERE name = 'Database Tools';

-- Companies
INSERT INTO public.companies (name, location, description) VALUES
('Intellibus', 'Remote', 'Data engineering and analytics consulting'),
('RealDecoy', 'Jamaica / Remote', 'Digital transformation and software development agency'),
('Radeos Technologies', 'Jamaica', 'Technology solutions and software development');

-- Experiences
INSERT INTO public.experiences (company_id, title, start_date, end_date, is_current, description, achievements, sort_order)
SELECT id, 'Data Engineer', '2025-04-01', NULL, true, 
'Conducting audits and optimizing data pipelines for improved data quality and accessibility.',
ARRAY[
  'Conducted audits of existing database practices, identifying areas for improvement in data modeling, pipeline efficiency, and data governance',
  'Refined and optimized data pipelines to improve data quality, reduce processing times, and enhance data accessibility for downstream analytical purposes',
  'Contributed to the design and implementation of data solutions, ensuring adherence to best practices for data integrity and system performance',
  'Collaborated with cross-functional teams to understand data requirements and translate them into technical specifications for data pipeline development',
  'Assisted in monitoring and troubleshooting data systems, ensuring data reliability and timely resolution of issues'
], 1
FROM public.companies WHERE name = 'Intellibus';

INSERT INTO public.experiences (company_id, title, start_date, end_date, is_current, description, achievements, sort_order)
SELECT id, 'Software Engineer', '2023-10-01', '2025-04-01', false,
'Building and shipping high-quality production code for diverse clients.',
ARRAY[
  'Build and ship high-quality, robust production code for a diverse array of projects for clients including VM Wealth, Grace Kennedy Insurance, SoftwareSecured and more',
  'Work alongside creative directors to lead the research, development, and architecture of technical solutions to fulfill business requirements',
  'Collaborate with designers, project managers, and other engineers to transform creative concepts into refined digital experiences at an agile cadence',
  'Provide leadership within engineering department through close collaboration, knowledge shares, and mentorship',
  'Lead company-wide accessibility initiatives such as creating templates for various technologies to include in engineering department best practices'
], 2
FROM public.companies WHERE name = 'RealDecoy';

INSERT INTO public.experiences (company_id, title, start_date, end_date, is_current, description, achievements, sort_order)
SELECT id, 'Associate Software Engineer', '2022-04-01', '2023-10-01', false,
'Started journey at RealDecoy building foundations in enterprise software development.',
ARRAY[
  'Developed and maintained client-facing web applications',
  'Collaborated with senior engineers on complex technical solutions',
  'Participated in agile ceremonies and contributed to sprint planning'
], 3
FROM public.companies WHERE name = 'RealDecoy';

INSERT INTO public.experiences (company_id, title, start_date, end_date, is_current, description, achievements, sort_order)
SELECT id, 'Software Developer', '2021-11-01', '2022-04-01', false,
'Led enhancements for Laravel-based backend and React frontend applications.',
ARRAY[
  'Led enhancements for a Laravel-based backend and React frontend application, solidifying platform performance',
  'Successfully propelled order processing speeds, leveraging feature optimization and meticulous code refactor',
  'Strategically reduced warehouse errors by pinpointing and rectifying system bottlenecks and bugs',
  'Played a central role in the consistent upkeep of the system, encompassing bug resolutions, performance tuning, and new feature integration',
  'Orchestrated the conception and development of a cutting-edge SaaS product, offering pivotal media presence insights across a broad spectrum of platforms'
], 4
FROM public.companies WHERE name = 'Radeos Technologies';

-- Education
INSERT INTO public.education (institution, degree, field_of_study, minor, start_date, end_date) VALUES
('University of the West Indies', 'Bachelor of Science', 'Computer Science', 'Economics', '2017-09-01', '2021-06-01');

-- Role Templates (The Morphin Feature!)
INSERT INTO public.role_templates (name, slug, description, color, icon, sort_order) VALUES
('Frontend Developer', 'frontend-developer', 'Crafting beautiful, accessible user interfaces with modern frameworks', '#e53935', 'layout', 1),
('Full Stack Engineer', 'fullstack-engineer', 'Building complete web applications from database to UI', '#1e88e5', 'layers', 2),
('Data Engineer', 'data-engineer', 'Designing and optimizing data pipelines and infrastructure', '#43a047', 'database', 3),
('Search Consultant', 'search-consultant', 'Implementing powerful search solutions with Algolia and more', '#fdd835', 'search', 4),
('Software Engineer', 'software-engineer', 'General-purpose software development across the stack', '#000000', 'code', 5);

-- Interests
INSERT INTO public.interests (name, icon, description, sort_order) VALUES
('Gaming', 'gamepad-2', 'Enjoying video games across various platforms', 1),
('Manga/Manhwa', 'book-open', 'Reading Japanese manga and Korean manhwa', 2),
('Musicals', 'music', 'Occasional musical theater enthusiast', 3),
('Movies', 'film', 'Film appreciation across genres', 4),
('Power Rangers', 'zap', 'Lifelong fan of the morphin heroes', 5);

-- Added Projects section with sample projects from resume experience
-- Projects
INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order, company_id)
SELECT 
  'VM Wealth Digital Platform',
  'vm-wealth-platform',
  'Enterprise financial platform with modern UI/UX for wealth management services.',
  'A comprehensive digital transformation project for VM Wealth, delivering a modern, accessible web platform for financial services and wealth management.',
  NULL,
  NULL,
  NULL,
  ARRAY['Vue.js', 'TypeScript', 'Tailwind CSS', 'Node.js', 'PostgreSQL'],
  true,
  1,
  id
FROM public.companies WHERE name = 'RealDecoy';

INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order, company_id)
SELECT 
  'Grace Kennedy Insurance Portal',
  'gk-insurance-portal',
  'Insurance management portal with streamlined claims processing and policy management.',
  'Built a robust insurance management system enabling customers to manage policies, file claims, and access insurance services through an intuitive digital interface.',
  NULL,
  NULL,
  NULL,
  ARRAY['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Algolia'],
  true,
  2,
  id
FROM public.companies WHERE name = 'RealDecoy';

INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order, company_id)
SELECT 
  'Media Presence Analytics SaaS',
  'media-presence-saas',
  'SaaS platform providing media presence insights across multiple platforms.',
  'Orchestrated the conception and development of a cutting-edge SaaS product offering pivotal media presence insights across a broad spectrum of platforms, helping businesses track and analyze their digital footprint.',
  NULL,
  NULL,
  NULL,
  ARRAY['React', 'Laravel', 'MySQL', 'AWS', 'Docker'],
  true,
  3,
  id
FROM public.companies WHERE name = 'Radeos Technologies';

INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order, company_id)
SELECT 
  'Data Pipeline Optimization',
  'data-pipeline-optimization',
  'Enterprise data pipeline audit and optimization for improved data quality.',
  'Conducted comprehensive audits of existing database practices, identifying areas for improvement in data modeling, pipeline efficiency, and data governance. Refined and optimized data pipelines to improve data quality and reduce processing times.',
  NULL,
  NULL,
  NULL,
  ARRAY['Python', 'Apache Spark', 'Apache Airflow', 'Snowflake', 'SQL'],
  true,
  4,
  id
FROM public.companies WHERE name = 'Intellibus';

INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order, company_id)
SELECT 
  'Accessibility Component Library',
  'accessibility-component-library',
  'Company-wide accessible component templates and best practices documentation.',
  'Led company-wide accessibility initiatives, creating templates for various technologies to include in engineering department best practices. Built reusable, WCAG-compliant component patterns.',
  NULL,
  NULL,
  NULL,
  ARRAY['React', 'Vue.js', 'TypeScript', 'Storybook', 'ARIA'],
  false,
  5,
  id
FROM public.companies WHERE name = 'RealDecoy';

INSERT INTO public.projects (title, slug, short_description, long_description, thumbnail_url, live_url, github_url, technologies, is_featured, sort_order)
VALUES (
  'Personal Portfolio',
  'personal-portfolio',
  'Dynamic portfolio website with role-based resume generation and case studies.',
  'Built a personal portfolio website featuring dynamic resume generation based on role presets, markdown-powered case studies, and a comprehensive admin dashboard for content management.',
  NULL,
  'https://tahjyei.com',
  NULL,
  ARRAY['Next.js', 'TypeScript', 'Tailwind CSS', 'Supabase', 'PostgreSQL'],
  true,
  6,
  NULL
);
