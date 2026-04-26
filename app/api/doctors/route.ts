import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client"

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      select: {
        id: true,
        name: true,
        specialty: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json({
      data: doctors
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch doctors" },
      { status: 500 }
    )
  }
}