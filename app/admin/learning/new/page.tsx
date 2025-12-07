import { LearningForm } from "@/components/learning-form"

export default function NewLearningPage() {
  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <h1 className="font-serif text-3xl font-bold tracking-tight">Add Learning</h1>
        <p className="text-muted-foreground mt-1">Track a new course or learning activity</p>
      </div>
      <LearningForm />
    </div>
  )
}
