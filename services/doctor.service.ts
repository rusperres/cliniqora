import { prisma } from "@/lib/prisma/client"
import type { Prisma } from "@prisma/client"

type Doctor = Prisma.DoctorGetPayload<{
  select: {
    id: true
    name: true
    specialty: true
  }
}>

export async function getAllDoctors(options?: {
  skip?: number
  take?: number
  search?: string
  sortBy?: string
  order?: "asc" | "desc"
}): Promise<Doctor[]> {
  const whereClause = options?.search
    ? {
        OR: [
          { name: { contains: options.search, mode: "insensitive" as const } },
          { specialty: { contains: options.search, mode: "insensitive" as const } }
        ]
      }
    : {}

  return prisma.doctor.findMany({
    where: whereClause,
    skip: options?.skip,
    take: options?.take,
    orderBy: {
      [options?.sortBy || "name"]: options?.order || "asc"
    },
    select: {
      id: true,
      name: true,
      specialty: true
    }
  })
}