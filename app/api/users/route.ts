import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { listUsers } from "@/services/user.service"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    // -----------------------------
    // AUTH (Supabase)
    // -----------------------------
    const supabase = await createClient()

    const {
      data: { user: authUser },
      error
    } = await supabase.auth.getUser()

    if (error || !authUser) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    // -----------------------------
    // MAP TO APP USER (Prisma)
    // -----------------------------
    const appUser = await getAppUser(authUser.id)

    if (!appUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // -----------------------------
    // ROLE CHECK (ADMIN ONLY)
    // -----------------------------
    if (appUser.role !== Role.ADMIN) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // -----------------------------
    // DATA
    // -----------------------------
    const users = await listUsers()

    return NextResponse.json({
      data: users
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}