import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Pencil, Building2, MapPin, Globe } from "lucide-react"
import Link from "next/link"
import { DeleteCompanyButton } from "@/components/delete-company-button"

export default async function CompaniesPage() {
  const supabase = await createClient()
  const { data: companies } = await supabase.from("companies").select("*").order("name")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Companies</h1>
          <p className="text-muted-foreground mt-1">Manage companies you&apos;ve worked with</p>
        </div>
        <Link href="/admin/companies/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Company
          </Button>
        </Link>
      </div>

      {companies?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No companies yet. Add companies to associate with your experience.
            </p>
            <Link href="/admin/companies/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Company
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {companies?.map((company) => (
            <Card key={company.id} className="group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {company.logo_url ? (
                      <img
                        src={company.logo_url || "/placeholder.svg"}
                        alt={company.name}
                        className="w-8 h-8 object-contain"
                      />
                    ) : (
                      <Building2 className="h-6 w-6 text-primary" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-serif font-bold">{company.name}</h3>
                    {company.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <MapPin className="h-3 w-3" />
                        {company.location}
                      </div>
                    )}
                    {company.website_url && (
                      <a
                        href={company.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-sm text-primary hover:underline mt-1"
                      >
                        <Globe className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>
                </div>
                {company.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{company.description}</p>
                )}
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/companies/${company.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteCompanyButton companyId={company.id} companyName={company.name} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
