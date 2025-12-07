import { createClient } from "@/lib/server"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Pencil, Layers, Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { DeleteRoleButton } from "@/components/delete-role-button"

export default async function RolesPage() {
  const supabase = await createClient()
  const { data: roles } = await supabase.from("role_templates").select("*").order("sort_order")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-3xl font-bold tracking-tight">Role Templates</h1>
          <p className="text-muted-foreground mt-1">Define the roles you can morph into for custom resumes</p>
        </div>
        <Link href="/admin/roles/new">
          <Button className="gap-2">
            <Plus className="h-4 w-4" />
            Add Role
          </Button>
        </Link>
      </div>

      {roles?.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <p className="text-muted-foreground mb-4">
              No role templates yet. Create roles to enable the morphing feature.
            </p>
            <Link href="/admin/roles/new">
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Add Role
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles?.map((role) => (
            <Card key={role.id} className="group overflow-hidden">
              <div className="h-2" style={{ backgroundColor: role.color }} />
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ backgroundColor: `${role.color}20` }}
                    >
                      <Layers className="h-5 w-5" style={{ color: role.color }} />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold">{role.name}</h3>
                      {role.slug && <p className="text-xs text-muted-foreground">/{role.slug}</p>}
                    </div>
                  </div>
                  {role.is_active ? (
                    <Badge variant="secondary" className="gap-1">
                      <Eye className="h-3 w-3" />
                      Active
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="gap-1">
                      <EyeOff className="h-3 w-3" />
                      Inactive
                    </Badge>
                  )}
                </div>
                {role.description && (
                  <p className="text-sm text-muted-foreground mt-3 line-clamp-2">{role.description}</p>
                )}
                <div className="flex items-center gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Link href={`/admin/roles/${role.id}/edit`}>
                    <Button variant="outline" size="sm" className="gap-1 bg-transparent">
                      <Pencil className="h-3 w-3" />
                      Edit
                    </Button>
                  </Link>
                  <DeleteRoleButton roleId={role.id} roleName={role.name} />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
