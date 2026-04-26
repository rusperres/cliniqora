import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma/client"

export async function GET() {
  try {
    const services = await prisma.service.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        durationMin: true
      },
      orderBy: {
        name: "asc"
      }
    })

    return NextResponse.json({
      data: services
    })
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Failed to fetch services" },
      { status: 500 }
    )
  }
}