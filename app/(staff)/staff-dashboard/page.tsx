"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { StatsCard } from "@/components/dashboard/stats-card"
import { AppointmentTable } from "@/components/dashboard/appointment-table"
import { useAuth } from "@/hooks/use-auth"

type RawAppointment = {
  id: string
  patientName: string
  doctorName: string
  serviceName: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  scheduledAt: string
}

export default function StaffDashboardPage() {
  const { user } = useAuth()

  const [appointments, setAppointments] = useState<RawAppointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/appointments?role=staff&today=true")
      const data = await res.json()

      setAppointments(data.data || [])
      setLoading(false)
    }

    load()
  }, [])

  // KPIs with safety checks
  const safeAppointments = appointments || []
  const todayTotal = safeAppointments.length
  const completed = safeAppointments.filter(a => a.status === "COMPLETED").length
  const pending = safeAppointments.filter(a => a.status === "PENDING").length
  const cancelled = safeAppointments.filter(a => a.status === "CANCELLED").length

  // IMPORTANT: transform ONLY for UI compatibility
  const tableData = appointments.map((a) => ({
    id: a.id,
    patientName: a.patientName,
    doctorName: a.doctorName,
    serviceName: a.serviceName,
    status: a.status,
    scheduledAt: a.scheduledAt,
  }))

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">
          Staff Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Welcome back, {user?.name || "Staff"}
        </p>
      </div>

      {/* STATS ROW */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatsCard label="Today" value={todayTotal} />
        <StatsCard label="Completed" value={completed} />
        <StatsCard label="Pending" value={pending} />
        <StatsCard label="Cancelled" value={cancelled} />
      </div>

      {/* MAIN CONTENT */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* LEFT TABLE */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Today’s Schedule</CardTitle>
            </CardHeader>

            <CardContent>
              {loading ? (
                <p className="text-sm text-muted-foreground">
                  Loading appointments...
                </p>
              ) : (
                <AppointmentTable data={tableData} />
              )}
            </CardContent>
          </Card>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="space-y-4">

          <Card>
            <CardHeader>
              <CardTitle>Quick Status</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Active Today</span>
                <Badge>{pending}</Badge>
              </div>

              <div className="flex justify-between text-sm">
                <span>Completed</span>
                <Badge variant="secondary">{completed}</Badge>
              </div>

              <div className="flex justify-between text-sm">
                <span>Cancelled</span>
                <Badge variant="destructive">{cancelled}</Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Workflow Tips</CardTitle>
            </CardHeader>

            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Confirm pending appointments early</p>
              <p>• Mark patients as completed immediately</p>
              <p>• Update cancellations to avoid slot blocking</p>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}