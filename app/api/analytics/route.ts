import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { prisma } from "@/lib/prisma/client"
import { Role } from "@prisma/client"

/**
 * GET - fetch current user's appointments
 */
export async function GET(req: NextRequest) {
  try {
    // -----------------------------
    // 1. AUTH (Supabase)
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
    // 2. MAP TO PRISMA USER
    // -----------------------------
    const appUser = await getAppUser(authUser.id)

    if (!appUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // -----------------------------
    // 3. FETCH APPOINTMENTS (SECURE)
    // -----------------------------
    const appointments = await prisma.appointment.findMany({
      where: {
        userId: appUser.id
      },
      include: {
        doctor: {
          select: {
            name: true,
            specialty: true
          }
        },
        service: {
          select: {
            name: true,
            price: true
          }
        }
      },
      orderBy: {
        scheduledAt: "desc"
      }
    })

    return NextResponse.json({ appointments })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}

/**
 * POST - create appointment (authenticated user only)
 */
export async function POST(req: NextRequest) {
  try {
    // -----------------------------
    // 1. AUTH
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
    // 2. MAP USER
    // -----------------------------
    const appUser = await getAppUser(authUser.id)

    if (!appUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      )
    }

    // -----------------------------
    // 3. BODY
    // -----------------------------
    const body = await req.json()

    const { doctorId, serviceId, scheduledAt, notes } = body

    if (!doctorId || !serviceId || !scheduledAt) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // -----------------------------
    // 4. CREATE APPOINTMENT
    // -----------------------------
    const appointment = await prisma.appointment.create({
      data: {
        userId: appUser.id,
        doctorId,
        serviceId,
        scheduledAt: new Date(scheduledAt),
        notes: notes || "",
        status: "PENDING"
      },
      include: {
        doctor: true,
        service: true
      }
    })

    return NextResponse.json({ appointment })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}