"use client"

import { useEffect, useMemo, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Patient = {
  id: string
  name: string
  lastVisit: string
  totalVisits: number
  lastStatus: "COMPLETED" | "CANCELLED" | "PENDING" | "CONFIRMED"
}

type Appointment = {
  id: string
  patientId: string
  patientName: string
  scheduledAt: string
  status: "PENDING" | "CONFIRMED" | "COMPLETED" | "CANCELLED"
}

export default function StaffPatientsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/appointments?role=staff")
      const data = await res.json()

      setAppointments(data.appointments)

      setLoading(false)
    }

    load()
  }, [])

  // 🧠 DERIVE PATIENTS FROM APPOINTMENTS
  const patients: Patient[] = useMemo(() => {
    const map = new Map<string, Patient>()

    for (const a of appointments) {
      const existing = map.get(a.patientId)

      if (!existing) {
        map.set(a.patientId, {
          id: a.patientId,
          name: a.patientName,
          lastVisit: a.scheduledAt,
          totalVisits: 1,
          lastStatus: a.status,
        })
      } else {
        map.set(a.patientId, {
          ...existing,
          totalVisits: existing.totalVisits + 1,
          lastVisit:
            new Date(a.scheduledAt) > new Date(existing.lastVisit)
              ? a.scheduledAt
              : existing.lastVisit,
        })
      }
    }

    return Array.from(map.values()).sort(
      (a, b) =>
        new Date(b.lastVisit).getTime() -
        new Date(a.lastVisit).getTime()
    )
  }, [appointments])

  const getStatusColor = (status: Patient["lastStatus"]) => {
    switch (status) {
      case "COMPLETED":
        return "bg-green-100 text-green-700"
      case "PENDING":
        return "bg-yellow-100 text-yellow-700"
      case "CANCELLED":
        return "bg-red-100 text-red-700"
    }
  }

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-semibold">Patients</h1>
        <p className="text-sm text-muted-foreground">
          Patient history overview (staff view)
        </p>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Total Patients</p>
            <p className="text-2xl font-semibold">{patients.length}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Active This Week</p>
            <p className="text-2xl font-semibold">
              {
                patients.filter(p =>
                  new Date(p.lastVisit).getTime() >
                  Date.now() - 7 * 24 * 60 * 60 * 1000
                ).length
              }
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <p className="text-sm text-muted-foreground">Avg Visits</p>
            <p className="text-2xl font-semibold">
              {patients.length
                ? Math.round(
                    patients.reduce((acc, p) => acc + p.totalVisits, 0) /
                      patients.length
                  )
                : 0}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* PATIENT LIST */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Directory</CardTitle>
        </CardHeader>

        <CardContent>
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading patients...
            </p>
          ) : (
            <div className="space-y-3">
              {patients.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center justify-between border rounded-lg p-3"
                >
                  {/* LEFT */}
                  <div>
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-muted-foreground">
                      Last visit:{" "}
                      {new Date(p.lastVisit).toLocaleDateString()}
                    </p>
                  </div>

                  {/* CENTER */}
                  <p className="text-sm text-muted-foreground">
                    {p.totalVisits} visits
                  </p>

                  {/* STATUS */}
                  <Badge className={getStatusColor(p.lastStatus)}>
                    {p.lastStatus}
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