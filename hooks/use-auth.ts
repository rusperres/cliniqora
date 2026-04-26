"use client"

import { useEffect, useState } from "react"
import { Role } from "@prisma/client"

type AuthUser = {
  id: string
  email: string
  name?: string | null
  role: Role
}

export function useAuth() {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadUser() {
      try {
        const res = await fetch("/api/users/me") // optional endpoint later
        if (!res.ok) throw new Error()

        const data = await res.json()
        setUser(data.user)
      } catch {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    loadUser()
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