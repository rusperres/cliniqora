"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Role } from "@prisma/client"
import { AppUser } from "@/types/user"

type AuthState = {
  user: AppUser | null
  loading: boolean
  isAuthenticated: boolean
  isAdmin: boolean
  isStaff: boolean
  isPatient: boolean
}

export function useAuth(): AuthState {
  const supabase = createClient()

  const [user, setUser] = useState<AppUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const {
        data: { user: authUser }
      } = await supabase.auth.getUser()

      if (!authUser) {
        setUser(null)
        setLoading(false)
        return
      }

      // fetch your DB user (Prisma-backed)
      const res = await fetch("/api/users/me")
      if (!res.ok) {
        setUser(null)
        setLoading(false)
        return
      }

      const data = await res.json()

      setUser(data.user)
      setLoading(false)
    }

    load()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === Role.ADMIN,
    isStaff: user?.role === Role.STAFF,
    isPatient: user?.role === Role.PATIENT
  }
}