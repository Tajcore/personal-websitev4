import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, BookOpen, Calendar, CheckCircle, Circle, ExternalLink } from "lucide-react"
import Link from "next/link"
import { DeleteLearningButton } from "@/components/delete-learning-button"

export default async function LearningPage() {
  const supabase = await createClient()
  const { data: learningItems } = await supabase.from("learning").select("*").order("created_at", { ascending: false })

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Learning</h1>
          <p className="text-muted-foreground mt-1">Track courses, tutorials, and continuous learning</p>
        </div>
        <Link href="/admin/learning/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Learning
          </Button>
        </Link>
      </div>

      {learningItems?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">No learning items yet. Track your educational journey.</p>
            <Link href="/admin/learning/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Learning
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {learningItems?.map((item) => (
            <Card key={item.id} className="group">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <BookOpen className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-serif font-bold">{item.title}</h3>
                          {item.is_completed ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : (
                            <Circle className="h-4 w-4 text-muted-foreground" />
                          )}
                        </div>
                        {item.platform && <p className="text-sm text-primary">{item.platform}</p>}
                        {item.instructor && <p className="text-sm text-muted-foreground">by {item.instructor}</p>}
                      </div>
                      <div className="flex items-center gap-1">
                        {item.is_featured && <Badge>Featured</Badge>}
                        {item.is_completed ? (
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600 border-green-500/30">
                            Completed
                          </Badge>
                        ) : (
                          <Badge variant="outline">In Progress</Badge>
                        )}
                      </div>
                    </div>

                    {item.completion_date && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-2">
                        <Calendar className="h-3 w-3" />
                        Completed {formatDate(item.completion_date)}
                      </div>
                    )}

                    {item.topics && item.topics.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {item.topics.slice(0, 5).map((topic: string, i: number) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {topic}
                          </Badge>
                        ))}
                        {item.topics.length > 5 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.topics.length - 5} more
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/learning/${item.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  {item.certificate_url && (
                    <a href={item.certificate_url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                        <ExternalLink className="h-3 w-3" />
                        Certificate
                      </Button>
                    </a>
                  )}
                  <DeleteLearningButton learningId={item.id} learningTitle={item.title} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
