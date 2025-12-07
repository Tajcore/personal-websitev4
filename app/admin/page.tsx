import { createClient } from "@/lib/server"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Code, Briefcase, FolderOpen, Award, BookOpen, Layers } from "lucide-react"
import Link from "next/link"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch counts
  const [
    { count: skillsCount },
    { count: experiencesCount },
    { count: projectsCount },
    { count: certificationsCount },
    { count: learningCount },
    { count: rolesCount },
  ] = await Promise.all([
    supabase.from("skills").select("*", { count: "exact", head: true }),
    supabase.from("experiences").select("*", { count: "exact", head: true }),
    supabase.from("projects").select("*", { count: "exact", head: true }),
    supabase.from("certifications").select("*", { count: "exact", head: true }),
    supabase.from("learning").select("*", { count: "exact", head: true }),
    supabase.from("role_templates").select("*", { count: "exact", head: true }),
  ])

  const stats = [
    { label: "Skills", count: skillsCount || 0, icon: Code, href: "/admin/skills", color: "text-red-500" },
    {
      label: "Experiences",
      count: experiencesCount || 0,
      icon: Briefcase,
      href: "/admin/experience",
      color: "text-blue-500",
    },
    {
      label: "Projects",
      count: projectsCount || 0,
      icon: FolderOpen,
      href: "/admin/projects",
      color: "text-green-500",
    },
    {
      label: "Certifications",
      count: certificationsCount || 0,
      icon: Award,
      href: "/admin/certifications",
      color: "text-yellow-500",
    },
    { label: "Learning", count: learningCount || 0, icon: BookOpen, href: "/admin/learning", color: "text-purple-500" },
    { label: "Role Templates", count: rolesCount || 0, icon: Layers, href: "/admin/roles", color: "text-primary" },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Manage your portfolio content from here.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer h-full">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  {stat.label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">{stat.count}</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link
              href="/admin/skills/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Code className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Add New Skill</span>
            </Link>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <FolderOpen className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Add New Project</span>
            </Link>
            <Link
              href="/admin/certifications/new"
              className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <Award className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Add Certification</span>
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">Your recent content updates will appear here.</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Portfolio Preview</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">See how your portfolio looks to visitors.</p>
            <Link
              href="/"
              target="_blank"
              className="text-sm text-primary hover:underline inline-flex items-center gap-1"
            >
              View Live Site
              <span className="text-xs">↗</span>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
