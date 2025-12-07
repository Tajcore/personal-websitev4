import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Calendar, MapPin, Building2 } from "lucide-react"
import Link from "next/link"
import { DeleteExperienceButton } from "@/components/delete-experience-button"

export default async function ExperiencePage() {
  const supabase = await createClient()

  const [{ data: experiences }, { data: companies }] = await Promise.all([
    supabase.from("experiences").select("*").order("sort_order"),
    supabase.from("companies").select("*"),
  ])

  const getCompany = (companyId: string) => companies?.find((c) => c.id === companyId)

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "Present"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Experience</h1>
          <p className="text-muted-foreground mt-1">Manage your work history and roles</p>
        </div>
        <Link href="/admin/experience/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Experience
          </Button>
        </Link>
      </div>

      {experiences?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No experience entries yet. Add your work history.</p>
            <Link href="/admin/experience/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Experience
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {experiences?.map((exp) => {
            const company = getCompany(exp.company_id)
            return (
              <Card key={exp.id} className="group">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Building2 className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif text-lg font-bold">{exp.title}</h3>
                          {exp.is_current && (
                            <Badge className="bg-green-500/10 text-green-600 border-green-500/30">Current</Badge>
                          )}
                        </div>
                        {company && <p className="text-primary font-medium">{company.name}</p>}
                        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mt-2">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {formatDate(exp.start_date)} - {formatDate(exp.end_date)}
                          </div>
                          {company?.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {company.location}
                            </div>
                          )}
                        </div>
                        {exp.description && (
                          <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{exp.description}</p>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/experience/${exp.id}/edit`}>
                        <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                          <Pencil className="h-3 w-3" />
                          Edit
                        </Button>
                      </Link>
                      <DeleteExperienceButton experienceId={exp.id} experienceTitle={exp.title} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
