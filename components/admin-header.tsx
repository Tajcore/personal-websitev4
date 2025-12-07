"use client"

import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, UserIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

interface AdminHeaderProps {
  user: User
}

export function AdminHeader({ user }: AdminHeaderProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/auth/login")
  }

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <div>
        <h2 className="text-sm font-medium text-muted-foreground">Welcome back,</h2>
        <p className="font-medium">{user.email}</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="rounded-full">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <UserIcon className="h-4 w-4 text-primary" />
            </div>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleSignOut} className="text-destructive cursor-pointer">
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </header>
  )
}
