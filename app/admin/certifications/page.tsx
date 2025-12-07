import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Award, Calendar, ExternalLink } from "lucide-react"
import Link from "next/link"
import { DeleteCertificationButton } from "@/components/delete-certification-button"

export default async function CertificationsPage() {
  const supabase = await createClient()
  const { data: certifications } = await supabase
    .from("certifications")
    .select("*")
    .order("issue_date", { ascending: false })

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  const isExpired = (expiryDate: string | null) => {
    if (!expiryDate) return false
    return new Date(expiryDate) < new Date()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Certifications</h1>
          <p className="text-muted-foreground mt-1">Manage your professional certifications</p>
        </div>
        <Link href="/admin/certifications/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Certification
          </Button>
        </Link>
      </div>

      {certifications?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No certifications yet. Add your professional credentials.</p>
            <Link href="/admin/certifications/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Certification
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {certifications?.map((cert) => (
            <Card key={cert.id} className="group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-500/10 flex items-center justify-center flex-shrink-0">
                    {cert.badge_url ? (
                      <img
                        src={cert.badge_url || "/placeholder.svg"}
                        alt={cert.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Award className="h-6 w-6 text-yellow-600" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif font-bold">{cert.name}</h3>
                        <p className="text-sm text-primary">{cert.issuer}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        {cert.is_featured && <Badge>Featured</Badge>}
                        {isExpired(cert.expiry_date) && <Badge variant="destructive">Expired</Badge>}
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-2">
                      {cert.issue_date && (
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Issued {formatDate(cert.issue_date)}
                        </div>
                      )}
                      {cert.expiry_date && (
                        <div className="flex items-center gap-1">Expires {formatDate(cert.expiry_date)}</div>
                      )}
                    </div>
                    {cert.credential_id && (
                      <p className="text-xs text-muted-foreground mt-2">ID: {cert.credential_id}</p>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/certifications/${cert.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  {cert.credential_url && (
                    <a href={cert.credential_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <ExternalLink className="h-3 w-3" />
                        Verify
                      </Button>
                    </a>
                  )}
                  <DeleteCertificationButton certificationId={cert.id} certificationName={cert.name} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
