"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { AppUser } from "@/types/user"

type Role = "ADMIN" | "STAFF" | "PATIENT"

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

      const res = await fetch("/api/users/me")
      if (!res.ok) {
        setUser(null)
        setLoading(false)
        return
      }

      const data = await res.json()

      setUser(data.data)
      setLoading(false)
    }

    load()
  }, [])

  return {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === "ADMIN",
    isStaff: user?.role === "STAFF",
    isPatient: user?.role === "PATIENT"
  }
}