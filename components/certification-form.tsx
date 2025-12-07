"use client"

import type React from "react"
import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { useRouter } from "next/navigation"
import type { Certification } from "@/lib/types"

interface CertificationFormProps {
  certification?: Certification
}

export function CertificationForm({ certification }: CertificationFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: certification?.name || "",
    issuer: certification?.issuer || "",
    issue_date: certification?.issue_date || "",
    expiry_date: certification?.expiry_date || "",
    credential_id: certification?.credential_id || "",
    credential_url: certification?.credential_url || "",
    badge_url: certification?.badge_url || "",
    is_featured: certification?.is_featured || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    const data = {
      name: formData.name,
      issuer: formData.issuer,
      issue_date: formData.issue_date || null,
      expiry_date: formData.expiry_date || null,
      credential_id: formData.credential_id || null,
      credential_url: formData.credential_url || null,
      badge_url: formData.badge_url || null,
      is_featured: formData.is_featured,
    }

    if (certification) {
      const { error } = await supabase.from("certifications").update(data).eq("id", certification.id)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    } else {
      const { error } = await supabase.from("certifications").insert(data)
      if (error) {
        setError(error.message)
        setIsLoading(false)
        return
      }
    }

    router.push("/admin/certifications")
    router.refresh()
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Certification Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g., AWS Solutions Architect"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="issuer">Issuing Organization</Label>
            <Input
              id="issuer"
              value={formData.issuer}
              onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
              placeholder="e.g., Amazon Web Services"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="issue_date">Issue Date</Label>
              <Input
                id="issue_date"
                type="date"
                value={formData.issue_date}
                onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="expiry_date">Expiry Date</Label>
              <Input
                id="expiry_date"
                type="date"
                value={formData.expiry_date}
                onChange={(e) => setFormData({ ...formData, expiry_date: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Leave empty if no expiration</p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential_id">Credential ID</Label>
            <Input
              id="credential_id"
              value={formData.credential_id}
              onChange={(e) => setFormData({ ...formData, credential_id: e.target.value })}
              placeholder="e.g., ABC123XYZ"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="credential_url">Verification URL</Label>
            <Input
              id="credential_url"
              type="url"
              value={formData.credential_url}
              onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
              placeholder="https://credential.verify.com/..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="badge_url">Badge Image URL</Label>
            <Input
              id="badge_url"
              type="url"
              value={formData.badge_url}
              onChange={(e) => setFormData({ ...formData, badge_url: e.target.value })}
              placeholder="https://example.com/badge.png"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label htmlFor="featured">Featured Certification</Label>
              <p className="text-sm text-muted-foreground">Show prominently on your portfolio</p>
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
              {isLoading ? "Saving..." : certification ? "Update Certification" : "Add Certification"}
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
