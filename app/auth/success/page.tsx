import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"

export default async function AuthSuccessPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  // Get user type from database
  const { data: userData } = await supabase.from("users").select("user_type").eq("id", user.id).single()

  // Redirect based on user type
  if (userData?.user_type === "driver") {
    redirect("/driver/dashboard")
  } else {
    redirect("/rider/dashboard")
  }
}
