"use client"

import type React from "react"

import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { useRouter } from "next/navigation"
import type { Skill, SkillCategory } from "@/lib/types"

interface SkillFormProps {
  skill?: Skill
  categories: SkillCategory[]
}

export function SkillForm({ skill, categories }: SkillFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: skill?.name || "",
    category_id: skill?.category_id || "",
    proficiency: skill?.proficiency || 80,
    years_experience: skill?.years_experience?.toString() || "",
    is_featured: skill?.is_featured || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const data = {
      name: formData.name,
      category_id: formData.category_id || null,
      proficiency: formData.proficiency,
      years_experience: formData.years_experience ? Number.parseFloat(formData.years_experience) : null,
      is_featured: formData.is_featured,
    }

    if (skill) {
      const { error } = await supabase.from("skills").update(data).eq("id", skill.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("skills").insert(data)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    }

    router.push("/admin/skills")
    router.refresh()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="name">Skill Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., React, Python, Docker"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select
              value={formData.category_id}
              onValueChange={(value) => setFormData({ ...formData, category_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id}>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded" style={{ backgroundColor: category.color }} />
                      {category.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Proficiency ({formData.proficiency}%)</Label>
            <Slider
              value={[formData.proficiency]}
              onValueChange={([value]) => setFormData({ ...formData, proficiency: value })}
              max={100}
              step={5}
              className="py-4"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="years">Years of Experience</Label>
            <Input
              id="years"
              type="number"
              step="0.5"
              min="0"
              value={formData.years_experience}
              onChange={(e) => setFormData({ ...formData, years_experience: e.target.value })}
              placeholder="e.g., 3.5"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Skill</Label>
              <p className="text-sm text-muted-foreground">Show this skill prominently on your portfolio</p>
            </div>
            <Switch
              id="featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
            />
          </div>

          {error && (
            <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
              <p className="text-sm text-destructive">{error}</p>
            </div>
          )}

          <div className="flex gap-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : skill ? "Update Skill" : "Add Skill"}
            </Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
