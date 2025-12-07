"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import type { RoleTemplate, Skill } from "@/lib/types"
import { X } from "lucide-react"

interface RoleFormProps {
  role?: RoleTemplate
  skills: Skill[]
  selectedSkillIds?: string[]
}

const roleColors = [
  { name: "Red Ranger", color: "#e53935" },
  { name: "Blue Ranger", color: "#1e88e5" },
  { name: "Green Ranger", color: "#43a047" },
  { name: "Yellow Ranger", color: "#fdd835" },
  { name: "Black Ranger", color: "#212121" },
  { name: "Pink Ranger", color: "#ec407a" },
  { name: "White Ranger", color: "#9e9e9e" },
]

export function RoleForm({ role, skills, selectedSkillIds = [] }: RoleFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: role?.name || "",
    slug: role?.slug || "",
    description: role?.description || "",
    color: role?.color || "#a67c52",
    is_active: role?.is_active ?? true,
    sort_order: role?.sort_order?.toString() || "0",
  })

  const [selectedSkills, setSelectedSkills] = useState<string[]>(selectedSkillIds)

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      slug: role?.slug || generateSlug(name),
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
      name: formData.name,
      slug: formData.slug || null,
      description: formData.description || null,
      color: formData.color,
      is_active: formData.is_active,
      sort_order: Number.parseInt(formData.sort_order) || 0,
    }

    let roleId = role?.id

    if (role) {
      const { error } = await supabase.from("role_templates").update(data).eq("id", role.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { data: newRole, error } = await supabase.from("role_templates").insert(data).select().single()
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
      roleId = newRole.id
    }

    // Update role skills
    if (roleId) {
      await supabase.from("role_skills").delete().eq("role_id", roleId)
      if (selectedSkills.length > 0) {
        const roleSkillsData = selectedSkills.map((skillId) => ({
          role_id: roleId,
          skill_id: skillId,
          importance: 3,
        }))
        await supabase.from("role_skills").insert(roleSkillsData)
      }
    }

    router.push("/admin/roles")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Role Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleNameChange(e.target.value)}
                placeholder="e.g., Frontend Developer"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                placeholder="frontend-developer"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of this role..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label>Ranger Color</Label>
            <div className="flex flex-wrap gap-2">
              {roleColors.map((rc) => (
                <button
                  key={rc.color}
                  type="button"
                  onClick={() => setFormData({ ...formData, color: rc.color })}
                  className={`w-10 h-10 rounded-lg border-2 transition-all ${
                    formData.color === rc.color ? "ring-2 ring-offset-2 ring-primary" : "border-transparent"
                  }`}
                  style={{ backgroundColor: rc.color }}
                  title={rc.name}
                />
              ))}
              <Input
                type="color"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-10 h-10 p-1 cursor-pointer"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sort_order">Sort Order</Label>
              <Input
                id="sort_order"
                type="number"
                value={formData.sort_order}
                onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="active">Active</Label>
              <p className="text-sm text-muted-foreground">Show this role in the morphing selector</p>
            </div>
            <Switch
              id="active"
              checked={formData.is_active}
              onCheckedChange={(checked) => setFormData({ ...formData, is_active: checked })}
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Associated Skills</CardTitle>
        </CardHeader>
        <CardContent>
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

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : role ? "Update Role" : "Create Role"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
