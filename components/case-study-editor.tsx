"use client"

import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useRouter } from "next/navigation"
import { MarkdownRenderer } from "@/components/markdown-renderer"
import type { Project } from "@/lib/types"
import { ArrowLeft, Save, Eye, Code } from "lucide-react"
import Link from "next/link"

interface CaseStudy {
  id: string
  project_id: string
  content?: string
  overview?: string
  challenge?: string
  approach?: string
  solution?: string
  results?: string
  lessons_learned?: string
}

interface CaseStudyEditorProps {
  project: Project
  caseStudy: CaseStudy | null
}

const EXAMPLE_TEMPLATE = `## Overview

A brief introduction to the project and its purpose. What problem does it solve? Who is it for?

## The Challenge

Describe the main challenges or problems you were trying to solve. What made this project interesting or difficult?

- Challenge point one
- Challenge point two
- Challenge point three

## Approach

How did you approach solving this problem? What was your thought process?

### Research & Discovery

What research did you conduct? How did you validate your approach?

### Technical Decisions

What key technical decisions did you make and why?

## Solution

Describe the solution you built. What are the key features?

### Architecture

\`\`\`
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│    API      │────▶│  Database   │
└─────────────┘     └─────────────┘     └─────────────┘
\`\`\`

### Key Features

1. **Feature One** - Description of the feature
2. **Feature Two** - Description of the feature
3. **Feature Three** - Description of the feature

## Results

What were the outcomes? Include metrics if available.

> "Quote from a user or stakeholder about the impact"

- **50%** reduction in processing time
- **10x** improvement in throughput
- **99.9%** uptime achieved

## Lessons Learned

What did you learn from this project? What would you do differently?

---

*Built with [Technology Stack]*
`

export function CaseStudyEditor({ project, caseStudy }: CaseStudyEditorProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [content, setContent] = useState(caseStudy?.content || "")
  const [activeTab, setActiveTab] = useState<string>("write")

  const handleSave = async () => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    const supabase = createClient()

    if (caseStudy) {
      const { error } = await supabase
        .from("case_studies")
        .update({ content, updated_at: new Date().toISOString() })
        .eq("id", caseStudy.id)

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("case_studies").insert({ project_id: project.id, content })

      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    }

    setSuccess(true)
    setIsLoading(false)
    router.refresh()
  }

  const loadTemplate = () => {
    if (content && !window.confirm("This will replace your current content. Continue?")) {
      return
    }
    setContent(EXAMPLE_TEMPLATE)
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Projects
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={loadTemplate} className="bg-transparent">
            Load Template
          </Button>
          <Button onClick={handleSave} disabled={isLoading} className="gap-2">
            <Save className="h-4 w-4" />
            {isLoading ? "Saving..." : "Save Case Study"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      {success && (
        <div className="p-3 rounded-lg bg-green-500/10 border border-green-500/20">
          <p className="text-sm text-green-600">Case study saved successfully!</p>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-md">
          <TabsTrigger value="write" className="gap-2">
            <Code className="h-4 w-4" />
            Write
          </TabsTrigger>
          <TabsTrigger value="preview" className="gap-2">
            <Eye className="h-4 w-4" />
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="write" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Markdown Content</CardTitle>
              <p className="text-sm text-muted-foreground">
                Write your case study using markdown. Supports headers, lists, code blocks, blockquotes, and more.
              </p>
            </CardHeader>
            <CardContent>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="## Overview&#10;&#10;Start writing your case study..."
                className="min-h-[600px] font-mono text-sm"
              />
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Markdown Reference</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground font-mono">
              <p>
                <code># Heading 1</code> - Main title
              </p>
              <p>
                <code>## Heading 2</code> - Section title
              </p>
              <p>
                <code>### Heading 3</code> - Subsection
              </p>
              <p>
                <code>**bold**</code> - <strong>Bold text</strong>
              </p>
              <p>
                <code>*italic*</code> - <em>Italic text</em>
              </p>
              <p>
                <code>`code`</code> - Inline code
              </p>
              <p>
                <code>```language</code> - Code block (close with ```)
              </p>
              <p>
                <code>- item</code> - Bullet list
              </p>
              <p>
                <code>1. item</code> - Numbered list
              </p>
              <p>
                <code>&gt; quote</code> - Blockquote
              </p>
              <p>
                <code>[text](url)</code> - Link
              </p>
              <p>
                <code>---</code> - Horizontal rule
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent>
              {content ? (
                <MarkdownRenderer content={content} />
              ) : (
                <p className="text-muted-foreground italic">Start writing to see the preview...</p>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
