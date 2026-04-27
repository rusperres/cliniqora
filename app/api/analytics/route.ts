import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import { successResponse } from "@/lib/api-response"
import {
  getDashboardStats,
  getAppointmentsByMonth
} from "@/services/analytics.service"

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
    // ROLE CHECK
    // -----------------------------
    if (
      appUser.role !== Role.ADMIN &&
      appUser.role !== Role.STAFF
    ) {
      return NextResponse.json(
        { error: "Forbidden" },
        { status: 403 }
      )
    }

    // -----------------------------
    // DATA
    // -----------------------------
    const [stats, chart] = await Promise.all([
      getDashboardStats(),
      getAppointmentsByMonth()
    ])

    // -----------------------------
    // RESPONSE (CONSISTENT)
    // -----------------------------
    return successResponse({
      stats,
      chart
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}