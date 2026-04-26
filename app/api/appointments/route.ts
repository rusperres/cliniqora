import { NextRequest } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { successResponse, errorResponse } from "@/lib/api-response"
import { getAllAppointments, getAppointmentsByUser, createAppointment } from "@/services/appointment.service"

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

    const url = new URL(req.url)
    const roleParam = url.searchParams.get("role")
    const todayParam = url.searchParams.get("today")

    if (roleParam === "staff") {
      if (appUser.role !== "STAFF" && appUser.role !== "ADMIN") {
        return errorResponse("Forbidden", 403)
      }

      // Getting all appointments
      const allAppointments = await getAllAppointments()
      let mapped = allAppointments.map((a: any) => ({
        id: a.id,
        patientId: a.userId,
        patientName: a.user?.name || a.user?.email || "Unknown",
        doctorName: a.doctor?.name || "Unknown",
        serviceName: a.service?.name || "Unknown",
        status: a.status,
        scheduledAt: a.scheduledAt
      }))

      if (todayParam === "true") {
        const start = new Date()
        start.setHours(0, 0, 0, 0)
        const end = new Date()
        end.setHours(23, 59, 59, 999)
        mapped = mapped.filter((a: any) => {
           const d = new Date(a.scheduledAt)
           return d >= start && d < end
        })      
      }

      return successResponse(mapped)
    }

    const appointments = await getAppointmentsByUser(appUser.id)
    return successResponse(appointments)
  } catch (err: any) {
    return errorResponse(err.message || "Server error")
  }
}

export async function POST(req: NextRequest) {
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

    const body = await req.json()
    const { doctorId, serviceId, scheduledAt, notes } = body

    if (!doctorId || !serviceId || !scheduledAt) {
      return errorResponse("Missing required fields", 400)
    }

    const appointment = await createAppointment({
      userId: appUser.id,
      doctorId,
      serviceId,
      scheduledAt: new Date(scheduledAt),
      notes
    })

    return successResponse(appointment)
  } catch (err: any) {
    return errorResponse(err.message || "Server error")
  }
}