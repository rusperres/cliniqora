import { prisma } from "@/lib/prisma/client"
import { Role } from "@prisma/client"

/**
 * Get app user from Prisma using Supabase user id
 */
export async function getAppUser(supabaseUserId: string) {
  return prisma.user.findUnique({
    where: { supabaseId: supabaseUserId }
  })
}

/**
 * Role helpers (keep this)
 */
export const isAdmin = (role: Role) => role === Role.ADMIN
export const isStaff = (role: Role) => role === Role.STAFF
export const isPatient = (role: Role) => role === Role.PATIENT