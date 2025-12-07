"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Code,
  Briefcase,
  Building2,
  FolderOpen,
  Award,
  BookOpen,
  Layers,
  GraduationCap,
  Heart,
  User,
  FileText,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/skills", label: "Skills", icon: Code },
  { href: "/admin/companies", label: "Companies", icon: Building2 },
  { href: "/admin/experience", label: "Experience", icon: Briefcase },
  { href: "/admin/projects", label: "Projects", icon: FolderOpen },
  { href: "/admin/certifications", label: "Certifications", icon: Award },
  { href: "/admin/learning", label: "Learning", icon: BookOpen },
  { href: "/admin/roles", label: "Role Templates", icon: Layers },
  { href: "/admin/education", label: "Education", icon: GraduationCap },
  { href: "/admin/interests", label: "Interests", icon: Heart },
  { href: "/admin/resume-generator", label: "Resume Generator", icon: FileText },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card border-r border-border min-h-screen flex flex-col">
      <div className="p-6 border-b border-border">
        <Link href="/admin" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <LayoutDashboard className="h-5 w-5 text-primary" />
          </div>
          <div>
            <span className="font-serif font-bold block">Admin Panel</span>
            <span className="text-xs text-muted-foreground">Portfolio Management</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                isActive ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-muted",
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border">
        <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground">
          <span>← View Portfolio</span>
        </Link>
      </div>
    </aside>
  )
}
