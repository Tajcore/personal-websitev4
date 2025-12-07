-- Add markdown content field to case_studies table
-- This allows for flexible, rich markdown-based case studies

ALTER TABLE public.case_studies 
ADD COLUMN IF NOT EXISTS content TEXT;

-- Comment for documentation
COMMENT ON COLUMN public.case_studies.content IS 'Full markdown content for the case study. Supports headers, lists, code blocks, images, and more.';
