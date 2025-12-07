"use client"

import { useState } from "react"
import { createClient } from "@/lib/client"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

interface DeleteRoleButtonProps {
  roleId: string
  roleName: string
}

export function DeleteRoleButton({ roleId, roleName }: DeleteRoleButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false)
  const router = useRouter()

  const handleDelete = async () => {
    setIsDeleting(true)
    const supabase = createClient()
    await supabase.from("role_skills").delete().eq("role_id", roleId)
    await supabase.from("role_templates").delete().eq("id", roleId)
    router.refresh()
    setIsDeleting(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="gap-1 text-destructive hover:text-destructive bg-transparent">
          <Trash2 className="h-3 w-3" />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Role Template</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete &quot;{roleName}&quot;? This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={isDeleting}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
