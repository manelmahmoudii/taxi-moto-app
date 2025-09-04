"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function AuthCallback() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Get the hash fragment from the URL
        const hashFragment = window.location.hash.substring(1)
        const params = new URLSearchParams(hashFragment)

        const accessToken = params.get("access_token")
        const refreshToken = params.get("refresh_token")

        if (accessToken && refreshToken) {
          // Set the session with the tokens
          const { data, error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          })

          if (error) {
            console.error("Error setting session:", error)
            setError("Failed to authenticate. Please try again.")
            return
          }

          if (data.user) {
            // Get user type from metadata
            const userType = data.user.user_metadata?.user_type || "rider"

            // Redirect based on user type
            if (userType === "driver") {
              router.push("/driver/dashboard")
            } else {
              router.push("/rider/dashboard")
            }
          }
        } else {
          setError("Invalid authentication tokens.")
        }
      } catch (err) {
        console.error("Auth callback error:", err)
        setError("An unexpected error occurred.")
      } finally {
        setLoading(false)
      }
    }

    handleAuthCallback()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin text-green-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Completing your registration...</h2>
          <p className="text-gray-600">Please wait while we set up your account.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
            <h2 className="text-lg font-semibold text-red-800 mb-2">Authentication Error</h2>
            <p className="text-red-600">{error}</p>
          </div>
          <button
            onClick={() => router.push("/auth/login")}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Login
          </button>
        </div>
      </div>
    )
  }

  return null
}
