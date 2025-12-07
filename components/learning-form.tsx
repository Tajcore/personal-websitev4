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
import type { Learning } from "@/lib/types"
import { X, Plus } from "lucide-react"

interface LearningFormProps {
  learning?: Learning
}

export function LearningForm({ learning }: LearningFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    title: learning?.title || "",
    platform: learning?.platform || "",
    instructor: learning?.instructor || "",
    completion_date: learning?.completion_date || "",
    certificate_url: learning?.certificate_url || "",
    notes: learning?.notes || "",
    is_completed: learning?.is_completed || false,
    is_featured: learning?.is_featured || false,
  })

  const [topics, setTopics] = useState<string[]>(learning?.topics || [])
  const [newTopic, setNewTopic] = useState("")

  const addTopic = () => {
    if (newTopic.trim() && !topics.includes(newTopic.trim())) {
      setTopics([...topics, newTopic.trim()])
      setNewTopic("")
    }
  }

  const removeTopic = (topic: string) => {
    setTopics(topics.filter((t) => t !== topic))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const data = {
      title: formData.title,
      platform: formData.platform || null,
      instructor: formData.instructor || null,
      completion_date: formData.completion_date || null,
      certificate_url: formData.certificate_url || null,
      notes: formData.notes || null,
      topics: topics.length > 0 ? topics : null,
      is_completed: formData.is_completed,
      is_featured: formData.is_featured,
    }

    if (learning) {
      const { error } = await supabase.from("learning").update(data).eq("id", learning.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("learning").insert(data)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    }

    router.push("/admin/learning")
    router.refresh()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Course/Learning Title</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., Machine Learning Fundamentals"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <Input
                id="platform"
                value={formData.platform}
                onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                placeholder="e.g., Coursera, Udemy, YouTube"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instructor">Instructor</Label>
              <Input
                id="instructor"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                placeholder="e.g., Andrew Ng"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="completion_date">Completion Date</Label>
            <Input
              id="completion_date"
              type="date"
              value={formData.completion_date}
              onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificate_url">Certificate URL</Label>
            <Input
              id="certificate_url"
              type="url"
              value={formData.certificate_url}
              onChange={(e) => setFormData({ ...formData, certificate_url: e.target.value })}
              placeholder="https://certificate.example.com/..."
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Topics Covered</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {topics.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {topics.map((topic) => (
                <Badge key={topic} variant="secondary" className="gap-1 pr-1">
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(topic)}
                    className="ml-1 hover:bg-muted rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>
          )}
          <div className="flex gap-2">
            <Input
              value={newTopic}
              onChange={(e) => setNewTopic(e.target.value)}
              placeholder="Add a topic..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault()
                  addTopic()
                }
              }}
            />
            <Button type="button" variant="outline" onClick={addTopic} className="bg-transparent">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            placeholder="Your notes about this learning experience..."
            rows={4}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="completed">Completed</Label>
              <p className="text-sm text-muted-foreground">Mark as finished</p>
            </div>
            <Switch
              id="completed"
              checked={formData.is_completed}
              onCheckedChange={(checked) => setFormData({ ...formData, is_completed: checked })}
            />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured</Label>
              <p className="text-sm text-muted-foreground">Show prominently on portfolio</p>
            </div>
            <Switch
              id="featured"
              checked={formData.is_featured}
              onCheckedChange={(checked) => setFormData({ ...formData, is_featured: checked })}
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
          {isLoading ? "Saving..." : learning ? "Update Learning" : "Add Learning"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
