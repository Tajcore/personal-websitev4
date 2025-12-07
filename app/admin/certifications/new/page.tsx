import { CertificationForm } from "@/components/certification-form"

export default function NewCertificationPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add Certification</h1>
        <p className="text-muted-foreground mt-1">Add a new professional certification</p>
      </div>
      <CertificationForm />
    </div>
  )
}
