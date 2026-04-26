"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/hooks/use-auth"

type Doctor = {
  id: string
  name: string
  specialty: string
}

type Service = {
  id: string
  name: string
  price: number
  durationMin: number
}

export default function BookPage() {
  const router = useRouter()
  const supabase = createClient()
  const { user, loading, isPatient } = useAuth()

  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [doctorId, setDoctorId] = useState("")
  const [serviceId, setServiceId] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [notes, setNotes] = useState("")
  const [submitting, setSubmitting] = useState(false)

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
  // LOAD DOCTORS + SERVICES
  // -----------------------
  useEffect(() => {
    async function loadData() {
      const [docRes, serviceRes] = await Promise.all([
        fetch("/api/doctors"),
        fetch("/api/services")
      ])

      const docs = await docRes.json()
      const services = await serviceRes.json()

      setDoctors(docs.data || [])
      setServices(services.data || [])
    }

    loadData()
  }, [])

  // -----------------------
  // BOOK APPOINTMENT
  // -----------------------
  async function handleBook() {
    if (!doctorId || !serviceId || !scheduledAt) return

    setSubmitting(true)

    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          doctorId,
          serviceId,
          scheduledAt,
          notes
        })
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Booking failed")
      }

      router.push("/patient/appointments")
    } catch (err) {
      console.error(err)
      alert("Failed to book appointment")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold">Book Appointment</h1>
        <p className="text-muted-foreground">
          Choose a doctor, service, and schedule your visit
        </p>
      </div>

      {/* DOCTOR SELECT */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Select Doctor</h2>

        <select
          className="w-full border rounded p-2"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
        >
          <option value="">Choose doctor</option>
          {doctors.map((d) => (
            <option key={d.id} value={d.id}>
              {d.name} — {d.specialty}
            </option>
          ))}
        </select>
      </Card>

      {/* SERVICE SELECT */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Select Service</h2>

        <select
          className="w-full border rounded p-2"
          value={serviceId}
          onChange={(e) => setServiceId(e.target.value)}
        >
          <option value="">Choose service</option>
          {services.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name} — ₱{s.price}
            </option>
          ))}
        </select>
      </Card>

      {/* DATE/TIME */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Schedule</h2>

        <Input
          type="datetime-local"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
        />
      </Card>

      {/* NOTES */}
      <Card className="p-4 space-y-2">
        <h2 className="font-semibold">Notes (optional)</h2>

        <Input
          placeholder="Any symptoms or requests..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </Card>

      {/* ACTION */}
      <Button
        className="w-full"
        onClick={handleBook}
        disabled={submitting}
      >
        {submitting ? "Booking..." : "Confirm Appointment"}
      </Button>
    </div>
  )
}