import { LearningForm } from "@/components/learning-form"
import { createClient } from "@/lib/server"
import { notFound } from "next/navigation"

export default async function EditLearningPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  const { data: learning } = await supabase.from("learning").select("*").eq("id", id).single()

  if (!learning) {
    notFound()
  }

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Edit Learning</h1>
        <p className="text-muted-foreground mt-1">Update learning details</p>
      </div>
      <LearningForm learning={learning} />
    </div>
  )
}
