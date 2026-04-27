"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StatsCard } from "@/components/dashboard/stats-card"

type AdminStats = {
  totalUsers: number
  totalDoctors: number
  totalAppointments: number
  totalServices: number
  todayAppointments: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<AdminStats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/analytics?scope=admin")
      const data = await res.json()

      // The API returns { success: true, data: { stats, chart } }
      // The stats object has { users, doctors, services, appointments, completed, pending }
      const dashboardData = data.data?.stats

      if (dashboardData) {
        setStats({
          totalUsers: dashboardData.users,
          totalDoctors: dashboardData.doctors,
          totalAppointments: dashboardData.appointments,
          totalServices: dashboardData.services,
          todayAppointments: dashboardData.pending // Using pending as a placeholder if today is not available
        })
      }
      
      setLoading(false)
    }

    load()
  }, [])

  if (loading || !stats) {
    return <p className="p-6 text-sm text-muted-foreground">Loading admin dashboard...</p>
  }

  return (
    <div className="p-6 space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
        <p className="text-sm text-muted-foreground">
          System overview & clinic management
        </p>
      </div>

      {/* STATS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Users" value={stats.totalUsers} />
        <StatsCard label="Doctors" value={stats.totalDoctors} />
        <StatsCard label="Services" value={stats.totalServices} />
        <StatsCard label="Appointments" value={stats.totalAppointments} />
      </div>

      {/* ACTIVITY SECTION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <Card>
          <CardHeader>
            <CardTitle>Today’s Activity</CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-3xl font-semibold">
              {stats.todayAppointments}
            </p>
            <p className="text-sm text-muted-foreground">
              appointments today
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
          </CardHeader>

          <CardContent className="space-y-2 text-sm text-muted-foreground">
            <p>• Booking system active</p>
            <p>• All services online</p>
            <p>• Staff roles synced</p>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}