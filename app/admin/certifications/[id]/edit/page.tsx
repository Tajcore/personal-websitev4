import { CertificationForm } from "@/components/certification-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditCertificationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: certification } = await supabase.from("certifications").select("*").eq("id", id).single()

  if (!certification) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Certification</h1>
        <p className="text-muted-foreground mt-1">Update certification details</p>
      </div>
      <CertificationForm certification={certification} />
    </div>
  )
}
