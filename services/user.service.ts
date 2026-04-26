import { prisma } from "@/lib/prisma/client"
import { Role } from "@prisma/client"

/**
 * USER SERVICE
 * - Handles user creation and lookup logic
 * - Bridges Supabase Auth → Prisma User
 */

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id }
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email }
  })
}

/**
 * IMPORTANT:
 * This is your "sync step" between Supabase Auth and Prisma
 */
export async function createUser(data: {
  email: string
  name?: string
  supabaseId: string
  role?: Role
}) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      role: data.role ?? Role.PATIENT,
      // you will add this field in schema:
      // supabaseId: data.supabaseId
    }
  })
}

export async function listUsers() {
  return prisma.user.findMany({
    orderBy: { createdAt: "desc" }
  })
}