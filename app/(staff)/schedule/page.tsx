"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

type Appointment = {
  id: string
  patientName: string
  doctorName: string
  serviceName: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
  scheduledAt: string
}

export default function StaffSchedulePage() {
  const { user } = useAuth()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/appointments?role=staff&today=true")
      const data = await res.json()

      setAppointments(data.appointments)
      setLoading(false)
    }

    load()
  }, [])

  // Sort by time (critical for schedule view)
  const sorted = useMemo(() => {
    return [...appointments].sort(
      (a, b) =>
        new Date(a.scheduledAt).getTime() -
        new Date(b.scheduledAt).getTime()
    )
  }, [appointments])

  // Find next upcoming (first non-completed)
  const nextAppointment = sorted.find(
    (a) => a.status !== "COMPLETED" && a.status !== "CANCELLED"
  )

  const getStatusColor = (status: Appointment["status"]) => {
    switch (status) {
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "CONFIRMED":
        return "bg-blue-100 text-blue-700"
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      case "CANCELLED":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Daily Schedule</h1>
        <p className="text-sm text-muted-foreground">
          {user?.name || "Staff"} • Live appointment flow
        </p>
      </div>

      {/* NEXT PATIENT HIGHLIGHT */}
      {nextAppointment && (
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <CardTitle className="text-sm text-muted-foreground">
              Next Patient
            </CardTitle>
          </CardHeader>

          <CardContent className="flex justify-between items-center">
            <div>
              <p className="font-semibold">
                {nextAppointment.patientName}
              </p>
              <p className="text-sm text-muted-foreground">
                {nextAppointment.serviceName} •{" "}
                {new Date(nextAppointment.scheduledAt).toLocaleTimeString(
                  [],
                  { hour: "2-digit", minute: "2-digit" }
                )}
              </p>
            </div>

            <Badge>{nextAppointment.status}</Badge>
          </CardContent>
        </Card>
      )}

      {/* TIMELINE */}
      <Card>
        <CardHeader>
          <CardTitle>Today’s Timeline</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading schedule...
            </p>
          ) : (
            <div className="space-y-3">
              {sorted.map((a) => (
                <div
                  key={a.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  {/* LEFT */}
                  <div className="space-y-1">
                    <p className="font-medium">{a.patientName}</p>
                    <p className="text-xs text-muted-foreground">
                      {a.serviceName} • {a.doctorName}
                    </p>
                  </div>

                  {/* MIDDLE TIME */}
                  <p className="text-sm font-medium">
                    {new Date(a.scheduledAt).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>

                  {/* STATUS */}
                  <Badge
                    className={getStatusColor(a.status)}
                  >
                    {a.status}
                  </Badge>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}