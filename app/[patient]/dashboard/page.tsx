"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"

type DashboardStats = {
  upcomingAppointments: number
  completedAppointments: number
  cancelledAppointments: number
}

export default function PatientDashboardPage() {
  const router = useRouter()
  const supabase = createClient()
  const { user, loading, isPatient } = useAuth()

  const [stats, setStats] = useState<DashboardStats | null>(null)

  // -----------------------
  // AUTH GUARD
  // -----------------------
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
    }

    if (!loading && user && !isPatient) {
      router.push("/")
    }
  }, [user, loading, isPatient, router])

  // -----------------------
  // FETCH DASHBOARD DATA
  // -----------------------
  useEffect(() => {
    async function loadStats() {
      if (!user) return

      const res = await fetch(`/api/analytics?userId=${user.id}`)
      if (!res.ok) return

      const data = await res.json()
      setStats(data.stats)
    }

    loadStats()
  }, [user])

  if (loading || !user) {
    return <p className="p-6">Loading dashboard...</p>
  }

  return (
    <div className="p-6 space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">
          Welcome back, {user.name ?? "Patient"}
        </h1>
        <p className="text-muted-foreground">
          Manage your appointments and health records
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Upcoming</p>
          <p className="text-2xl font-semibold">
            {stats?.upcomingAppointments ?? 0}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Completed</p>
          <p className="text-2xl font-semibold">
            {stats?.completedAppointments ?? 0}
          </p>
        </Card>

        <Card className="p-4">
          <p className="text-sm text-muted-foreground">Cancelled</p>
          <p className="text-2xl font-semibold">
            {stats?.cancelledAppointments ?? 0}
          </p>
        </Card>
      </div>

      {/* QUICK ACTIONS */}
      <Card className="p-6 space-y-3">
        <h2 className="text-xl font-semibold">Quick Actions</h2>

        <div className="flex gap-3">
          <Button onClick={() => router.push("/book")}>
            Book Appointment
          </Button>

          <Button variant="outline" onClick={() => router.push("/appointments")}>
            View Appointments
          </Button>
        </div>
      </Card>
    </div>
  )
}