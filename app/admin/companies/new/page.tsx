import { CompanyForm } from "@/components/company-form"

export default function NewCompanyPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add New Company</h1>
        <p className="text-muted-foreground mt-1">Add a company to associate with your work experience</p>
      </div>
      <CompanyForm />
    </div>
  )
}
