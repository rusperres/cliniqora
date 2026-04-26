import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { successResponse, errorResponse } from "@/lib/api-response"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user: authUser },
      error
    } = await supabase.auth.getUser()

    if (error || !authUser) {
      return errorResponse("Unauthorized", 401)
    }

    const appUser = await getAppUser(authUser.id)

    if (!appUser) {
      return errorResponse("User not found", 404)
    }

    // returning standard API response but keeping .user for hook compatibility
    return new Response(JSON.stringify({ success: true, user: appUser }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    })
  } catch (err: any) {
    return errorResponse(err.message || "Server error")
  }
}
