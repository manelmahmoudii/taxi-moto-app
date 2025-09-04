import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 animate-in fade-in-0 duration-500">
      <div className="w-full max-w-md animate-in slide-in-from-bottom-4 duration-700">
        <Card className="border-0 shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4 animate-pulse">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check Your Email</CardTitle>
            <CardDescription>We've sent you a confirmation link</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-sm text-muted-foreground">
              Please check your email and click the confirmation link to activate your MotoRide account.
            </p>
            <p className="text-xs text-muted-foreground">
              Didn't receive the email? Check your spam folder or{" "}
              <Link href="/auth/register" className="text-primary hover:underline">
                try signing up again
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
