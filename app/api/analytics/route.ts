import { NextRequest, NextResponse } from "next/server"
import { getDashboardStats, getAppointmentsByMonth } from "@/services/analytics.service"
import { getCurrentUser } from "@/lib/auth"
import { Role } from "@prisma/client"

export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getCurrentUser(token)

    if (!user || (user.user.role !== Role.ADMIN && user.user.role !== Role.STAFF)) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const [stats, chart] = await Promise.all([
      getDashboardStats(),
      getAppointmentsByMonth()
    ])

    return NextResponse.json({
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