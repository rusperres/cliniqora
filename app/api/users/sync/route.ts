import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client"
import { Role } from "@prisma/client"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const user = await prisma.user.create({
      data: {
        supabaseId: body.supabaseId,
        email: body.email,
        name: body.name,
        role: Role.PATIENT
      }
    })

    return NextResponse.json({ user })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    )
  }
}