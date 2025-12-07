import { CompanyForm } from "@/components/company-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditCompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: company } = await supabase.from("companies").select("*").eq("id", id).single()

  if (!company) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Company</h1>
        <p className="text-muted-foreground mt-1">Update company details</p>
      </div>
      <CompanyForm company={company} />
    </div>
  )
}
