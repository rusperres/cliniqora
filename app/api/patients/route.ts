import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { getAppUser } from "@/lib/auth"
import { Role } from "@prisma/client"
import { listUsers } from "@/services/user.service"

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient()

    const {
      data: { user: authUser },
      error
    } = await supabase.auth.getUser()

    if (error || !authUser) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const appUser = await getAppUser(authUser.id)

    if (!appUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // STAFF + ADMIN can access patients
    if (appUser.role !== Role.ADMIN && appUser.role !== Role.STAFF) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 })
    }

    const users = await listUsers()

    // FILTER ONLY PATIENTS
    const patients = users.filter((u) => u.role === Role.PATIENT)

    return NextResponse.json({
      data: patients
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    )
  }
}