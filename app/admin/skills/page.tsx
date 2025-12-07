import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil } from "lucide-react"
import Link from "next/link"
import { DeleteSkillButton } from "@/components/delete-skill-button"

export default async function SkillsPage() {
  const supabase = await createClient()

  const { data: categories } = await supabase.from("skill_categories").select("*").order("sort_order")

  const { data: skills } = await supabase.from("skills").select("*").order("name")

  const getSkillsByCategory = (categoryId: string) => {
    return skills?.filter((skill) => skill.category_id === categoryId) || []
  }

  const uncategorizedSkills = skills?.filter((skill) => !skill.category_id) || []

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Skills</h1>
          <p className="text-muted-foreground mt-1">Manage your technical skills and expertise</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/skills/categories">
            <Button variant="outline">Manage Categories</Button>
          </Link>
          <Link href="/admin/skills/new">
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add Skill
            </Button>
          </Link>
        </div>
      </div>

      {/* Skills by Category */}
      <div className="space-y-6">
        {categories?.map((category) => {
          const categorySkills = getSkillsByCategory(category.id)
          return (
            <Card key={category.id}>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className="w-4 h-4 rounded" style={{ backgroundColor: category.color }} />
                  {category.name}
                  <Badge variant="secondary">{categorySkills.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {categorySkills.length === 0 ? (
                  <p className="text-sm text-muted-foreground">No skills in this category yet.</p>
                ) : (
                  <div className="grid gap-3">
                    {categorySkills.map((skill) => (
                      <div
                        key={skill.id}
                        className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group"
                      >
                        <div className="flex items-center gap-4">
                          <span className="font-medium">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-24 h-2 bg-muted rounded-full overflow-hidden">
                              <div
                                className="h-full rounded-full"
                                style={{
                                  width: `${skill.proficiency}%`,
                                  backgroundColor: category.color,
                                }}
                              />
                            </div>
                            <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                          </div>
                          {skill.is_featured && <Badge variant="default">Featured</Badge>}
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href={`/admin/skills/${skill.id}/edit`}>
                            <Button variant="ghost" size="icon">
                              <Pencil className="h-4 w-4" />
                            </Button>
                          </Link>
                          <DeleteSkillButton skillId={skill.id} skillName={skill.name} />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          )
        })}

        {/* Uncategorized Skills */}
        {uncategorizedSkills.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                Uncategorized
                <Badge variant="secondary">{uncategorizedSkills.length}</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {uncategorizedSkills.map((skill) => (
                  <div key={skill.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg group">
                    <div className="flex items-center gap-4">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-sm text-muted-foreground">{skill.proficiency}%</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Link href={`/admin/skills/${skill.id}/edit`}>
                        <Button variant="ghost" size="icon">
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </Link>
                      <DeleteSkillButton skillId={skill.id} skillName={skill.name} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
