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
import { useRouter } from "next/navigation"
import type { Experience, Company } from "@/lib/types"
import { Plus, X } from "lucide-react"

interface ExperienceFormProps {
  experience?: Experience
  companies: Company[]
}

export function ExperienceForm({ experience, companies }: ExperienceFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: experience?.title || "",
    company_id: experience?.company_id || "",
    start_date: experience?.start_date || "",
    end_date: experience?.end_date || "",
    is_current: experience?.is_current || false,
    description: experience?.description || "",
    sort_order: experience?.sort_order?.toString() || "0",
  })

  const [achievements, setAchievements] = useState<string[]>(experience?.achievements || [""])

  const addAchievement = () => {
    setAchievements([...achievements, ""])
  }

  const removeAchievement = (index: number) => {
    setAchievements(achievements.filter((_, i) => i !== index))
  }

  const updateAchievement = (index: number, value: string) => {
    const updated = [...achievements]
    updated[index] = value
    setAchievements(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const filteredAchievements = achievements.filter((a) => a.trim() !== "")

    const data = {
      title: formData.title,
      company_id: formData.company_id || null,
      start_date: formData.start_date,
      end_date: formData.is_current ? null : formData.end_date || null,
      is_current: formData.is_current,
      description: formData.description || null,
      achievements: filteredAchievements.length > 0 ? filteredAchievements : null,
      sort_order: Number.parseInt(formData.sort_order) || 0,
    }

    if (experience) {
      const { error } = await supabase.from("experiences").update(data).eq("id", experience.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("experiences").insert(data)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    }

    router.push("/admin/experience")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Role Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Job Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Software Engineer"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Select
              value={formData.company_id}
              onValueChange={(value) => setFormData({ ...formData, company_id: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a company" />
              </SelectTrigger>
              <SelectContent>
                {companies.map((company) => (
                  <SelectItem key={company.id} value={company.id}>
                    {company.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                disabled={formData.is_current}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="current">Current Position</Label>
              <p className="text-sm text-muted-foreground">I currently work here</p>
            </div>
            <Switch
              id="current"
              checked={formData.is_current}
              onCheckedChange={(checked) => setFormData({ ...formData, is_current: checked })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Brief description of your role..."
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="sort_order">Sort Order</Label>
            <Input
              id="sort_order"
              type="number"
              value={formData.sort_order}
              onChange={(e) => setFormData({ ...formData, sort_order: e.target.value })}
              placeholder="1"
            />
            <p className="text-xs text-muted-foreground">Lower numbers appear first</p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Key Achievements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex gap-2">
              <Input
                value={achievement}
                onChange={(e) => updateAchievement(index, e.target.value)}
                placeholder="Describe an achievement or responsibility..."
              />
              {achievements.length > 1 && (
                <Button type="button" variant="ghost" size="icon" onClick={() => removeAchievement(index)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addAchievement} className="gap-1 bg-transparent">
            <Plus className="h-3 w-3" />
            Add Achievement
          </Button>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : experience ? "Update Experience" : "Add Experience"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
