import { createClient } from "@supabase/supabase-js"
import { prisma } from "@/lib/prisma/client"
import { Role } from "@prisma/client"

/**
 * =========================
 * SUPABASE SERVER CLIENT
 * =========================
 * Used ONLY on server (API routes, server actions, middleware)
 */
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // server-only secret
)

/**
 * =========================
 * GET CURRENT AUTH USER
 * =========================
 * Fetches Supabase Auth user from request context (server-side)
 */
export async function getAuthUser(accessToken: string) {
  const { data, error } = await supabase.auth.getUser(accessToken)

  if (error || !data.user) return null

  return data.user
}

/**
 * =========================
 * GET APP USER (PRISMA)
 * =========================
 * Maps Supabase user → your database user
 */
export async function getAppUser(supabaseUserId: string) {
  return prisma.user.findUnique({
    where: {
      supabaseId: supabaseUserId,
    },
  })
}

/**
 * =========================
 * AUTH CONTEXT (FULL USER)
 * =========================
 * Combines Supabase + Prisma user
 */
export async function getCurrentUser(accessToken: string) {
  const authUser = await getAuthUser(accessToken)
  if (!authUser) return null

  const appUser = await getAppUser(authUser.id)
  if (!appUser) return null

  return {
    auth: authUser,
    user: appUser,
  }
}

/**
 * =========================
 * ROLE CHECKS
 * =========================
 */

export function requireRole(userRole: Role, allowed: Role[]) {
  return allowed.includes(userRole)
}

/**
 * Strict guards (for API routes)
 */
export function assertRole(userRole: Role, allowed: Role[]) {
  if (!allowed.includes(userRole)) {
    throw new Error("Unauthorized")
  }
}

/**
 * =========================
 * ROLE HELPERS
 * =========================
 */

export const isAdmin = (role: Role) => role === Role.ADMIN
export const isStaff = (role: Role) => role === Role.STAFF
export const isPatient = (role: Role) => role === Role.PATIENT

/**
 * =========================
 * ACCESS MATRIX (OPTIONAL)
 * =========================
 * Central permission rules for your system
 */
export const ROLE_PERMISSIONS = {
  [Role.PATIENT]: {
    canBook: true,
    canViewAllPatients: false,
    canManageDoctors: false,
  },

  [Role.STAFF]: {
    canBook: true,
    canViewAllPatients: true,
    canManageDoctors: false,
  },

  [Role.ADMIN]: {
    canBook: true,
    canViewAllPatients: true,
    canManageDoctors: true,
  },
}