import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(
        cookiesToSet: {
          name: string
          value: string
          options?: {
            path?: string
            domain?: string
            maxAge?: number
            expires?: string | Date
            httpOnly?: boolean
            secure?: boolean
            sameSite?: "lax" | "strict" | "none"
          }
        }[],
      ) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => {
            const normalizedOptions =
              options && typeof options.expires === "string"
                ? { ...options, expires: new Date(options.expires) }
                : options
            cookieStore.set(name, value, normalizedOptions as any)
          })
        } catch {
          // The "setAll" method was called from a Server Component.
          // This can be ignored if you have proxy refreshing user sessions.
        }
      },
    },
  })
}
