import { Role } from "@prisma/client"

export type AppUser = {
  id: string
  email: string
  name: string | null
  role: Role
  supabaseId: string
  createdAt: Date
  updatedAt: Date
}

/**
 * Supabase Auth user (external identity system)
 */
export type SupabaseAuthUser = {
  id: string
  email?: string
}