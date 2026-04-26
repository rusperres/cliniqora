import { prisma } from "@/lib/prisma/client"

export async function getAllServices(options?: {
  skip?: number
  take?: number
  search?: string
  sortBy?: string
  order?: "asc" | "desc"
}) {
  const whereClause = options?.search
    ? {
        OR: [
          { name: { contains: options.search, mode: "insensitive" as const } },
          { description: { contains: options.search, mode: "insensitive" as const } }
        ]
      }
    : {}

  return prisma.service.findMany({
    where: whereClause,
    skip: options?.skip,
    take: options?.take,
    orderBy: {
      [options?.sortBy || "name"]: options?.order || "asc"
    },
    select: {
      id: true,
      name: true,
      price: true,
      durationMin: true
    }
  })
}
