import { NextRequest, NextResponse } from "next/server"
import { createAppointment, getAllAppointments } from "@/services/appointment.service"
import { getCurrentUser } from "@/lib/auth"

/**
 * GET /api/appointments
 * - admin/staff: all appointments
 * - patient: only their own (later we can refine)
 */
export async function GET(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getCurrentUser(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const appointments = await getAllAppointments()

    return NextResponse.json({ data: appointments })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}

export async function POST(req: NextRequest) {
  try {
    const token = req.headers.get("authorization")?.replace("Bearer ", "")

    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const user = await getCurrentUser(token)

    if (!user) {
      return NextResponse.json({ error: "Invalid session" }, { status: 401 })
    }

    const body = await req.json()

    const appointment = await createAppointment({
      userId: user.user.id,
      doctorId: body.doctorId,
      serviceId: body.serviceId,
      scheduledAt: new Date(body.scheduledAt),
      notes: body.notes
    })

    return NextResponse.json({ data: appointment })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}