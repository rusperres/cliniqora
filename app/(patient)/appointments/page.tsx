"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

type Appointment = {
  id: string
  status: "PENDING" | "CONFIRMED" | "CANCELLED" | "COMPLETED"
  scheduledAt: string
  doctor: {
    name: string
    specialty: string
  }
  service: {
    name: string
    price: number
  }
}

export default function PatientAppointmentsPage() {
  const router = useRouter()
  const { user, loading, isPatient } = useAuth()

  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loadingData, setLoadingData] = useState(true)

  // AUTH GUARD
  useEffect(() => {
    if (!loading && !user) router.push("/login")
    if (!loading && user && !isPatient) router.push("/")
  }, [user, loading, isPatient, router])

  // FETCH
  useEffect(() => {
    async function loadAppointments() {
      if (!user) return

      setLoadingData(true)

      const res = await fetch("/api/appointments")
      const data = await res.json()

      setAppointments(data.data || [])
      setLoadingData(false)
    }

    loadAppointments()
  }, [user])

  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  const getStatusVariant = (status: Appointment["status"]) => {
    switch (status) {
      case "COMPLETED":
        return "default"
      case "CANCELLED":
        return "destructive"
      case "CONFIRMED":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Appointments</h1>
        <p className="text-muted-foreground">
          View and manage your clinic visits
        </p>
      </div>

      {!loadingData && appointments.length === 0 && (
        <Card className="p-6">
          <p className="text-muted-foreground">
            No appointments found.
          </p>

          <Button className="mt-4" onClick={() => router.push("/book")}>
            Book your first appointment
          </Button>
        </Card>
      )}

      <div className="space-y-4">
        {appointments.map((appt) => (
          <Card key={appt.id} className="p-4 space-y-2">
            <div className="flex justify-between items-center">
              <div>
                <p className="font-semibold">{appt.doctor.name}</p>
                <p className="text-sm text-muted-foreground">
                  {appt.doctor.specialty}
                </p>
              </div>

              <Badge variant={getStatusVariant(appt.status)}>
                {appt.status}
              </Badge>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Service: {appt.service.name}</p>
              <p>Price: ₱{appt.service.price}</p>
              <p>{new Date(appt.scheduledAt).toLocaleString()}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}