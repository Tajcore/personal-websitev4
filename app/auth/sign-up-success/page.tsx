import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function SignUpSuccessPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-2xl bg-green-500/10 flex items-center justify-center">
              <Mail className="h-8 w-8 text-green-600" />
            </div>
          </div>
          <CardTitle className="font-serif text-2xl">Check Your Email</CardTitle>
          <CardDescription>We&apos;ve sent you a confirmation link</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground mb-6">
            Please check your email and click the confirmation link to activate your admin account. Once confirmed,
            you&apos;ll be able to access the Command Center.
          </p>
          <Link href="/auth/login" className="text-primary hover:underline text-sm">
            Return to Login
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
