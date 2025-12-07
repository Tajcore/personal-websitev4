"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import type { Project, Company, Experience, Skill } from "@/lib/types"
import { X } from "lucide-react"

interface ProjectFormProps {
  project?: Project
  companies: Company[]
  experiences: Experience[]
  skills: Skill[]
  selectedSkillIds?: string[]
}

export function ProjectForm({ project, companies, experiences, skills, selectedSkillIds = [] }: ProjectFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: project?.title || "",
    slug: project?.slug || "",
    short_description: project?.short_description || "",
    company_id: project?.company_id || "",
    experience_id: project?.experience_id || "",
    thumbnail_url: project?.thumbnail_url || "",
    live_url: project?.live_url || "",
    github_url: project?.github_url || "",
    is_featured: project?.is_featured || false,
    is_published: project?.is_published ?? true,
  })

  const [selectedSkills, setSelectedSkills] = useState<string[]>(selectedSkillIds)

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: project?.slug || generateSlug(title),
    })
  }

  const toggleSkill = (skillId: string) => {
    setSelectedSkills((prev) => (prev.includes(skillId) ? prev.filter((id) => id !== skillId) : [...prev, skillId]))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const data = {
      title: formData.title,
      slug: formData.slug || null,
      short_description: formData.short_description || null,
      company_id: formData.company_id || null,
      experience_id: formData.experience_id || null,
      thumbnail_url: formData.thumbnail_url || null,
      live_url: formData.live_url || null,
      github_url: formData.github_url || null,
      is_featured: formData.is_featured,
      is_published: formData.is_published,
    }

    let projectId = project?.id

    if (project) {
      const { error } = await supabase.from("projects").update(data).eq("id", project.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { data: newProject, error } = await supabase.from("projects").insert(data).select().single()
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
      projectId = newProject.id
    }

    // Update project skills
    if (projectId) {
      // Delete existing project skills
      await supabase.from("project_skills").delete().eq("project_id", projectId)

      // Insert new project skills
      if (selectedSkills.length > 0) {
        const projectSkillsData = selectedSkills.map((skillId) => ({
          project_id: projectId,
          skill_id: skillId,
        }))
        await supabase.from("project_skills").insert(projectSkillsData)
      }
    }

    router.push("/admin/projects")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g., E-commerce Platform"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="e-commerce-platform"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Short Description</Label>
            <Textarea
              id="description"
              value={formData.short_description}
              onChange={(e) => setFormData({ ...formData, short_description: e.target.value })}
              placeholder="A brief description of the project..."
              rows={3}
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company">Associated Company</Label>
              <Select
                value={formData.company_id}
                onValueChange={(value) => setFormData({ ...formData, company_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Company</SelectItem>
                  {companies.map((company) => (
                    <SelectItem key={company.id} value={company.id}>
                      {company.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Related Experience</Label>
              <Select
                value={formData.experience_id}
                onValueChange={(value) => setFormData({ ...formData, experience_id: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select an experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Experience</SelectItem>
                  {experiences.map((exp) => (
                    <SelectItem key={exp.id} value={exp.id}>
                      {exp.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Links & Media</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Input
              id="thumbnail"
              type="url"
              value={formData.thumbnail_url}
              onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="live_url">Live URL</Label>
              <Input
                id="live_url"
                type="url"
                value={formData.live_url}
                onChange={(e) => setFormData({ ...formData, live_url: e.target.value })}
                placeholder="https://project.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="github_url">GitHub URL</Label>
              <Input
                id="github_url"
                type="url"
                value={formData.github_url}
                onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                placeholder="https://github.com/user/repo"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Skills Used</CardTitle>
        </CardHeader>
        <CardContent>
          {/* Selected Skills */}
          {selectedSkills.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {selectedSkills.map((skillId) => {
                const skill = skills.find((s) => s.id === skillId)
                return skill ? (
                  <Badge key={skillId} variant="secondary" className="gap-1 pr-1">
                    {skill.name}
                    <button
                      type="button"
                      onClick={() => toggleSkill(skillId)}
                      className="ml-1 hover:bg-muted rounded-full p-0.5"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ) : null
              })}
            </div>
          )}

          {/* Available Skills */}
          <div className="flex flex-wrap gap-2">
            {skills
              .filter((s) => !selectedSkills.includes(s.id))
              .map((skill) => (
                <Badge
                  key={skill.id}
                  variant="outline"
                  className="cursor-pointer hover:bg-primary/10"
                  onClick={() => toggleSkill(skill.id)}
                >
                  + {skill.name}
                </Badge>
              ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Visibility</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Project</Label>
              <p className="text-sm text-muted-foreground">Show this project prominently on the homepage</p>
            </div>
            <Switch
              id="featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="published">Published</Label>
              <p className="text-sm text-muted-foreground">Make this project visible on your portfolio</p>
            </div>
            <Switch
              id="published"
              checked={formData.is_published}
              onCheckedChange={(checked) => setFormData({ ...formData, is_published: checked })}
            />
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : project ? "Update Project" : "Create Project"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
