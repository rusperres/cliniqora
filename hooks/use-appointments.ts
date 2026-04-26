"use client"

import { useEffect, useState } from "react"

export type Appointment = {
  id: string
  status: string
  scheduledAt: string
  doctor: { name: string }
  service: { name: string }
}

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  async function fetchAppointments() {
    try {
      setLoading(true)

      const res = await fetch("/api/appointments")
      const data = await res.json()

      setAppointments(data.data || [])
    } finally {
      setLoading(false)
    }
  }

  async function createAppointment(input: {
    doctorId: string
    serviceId: string
    scheduledAt: string
    notes?: string
  }) {
    const res = await fetch("/api/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(input)
    })

    if (!res.ok) throw new Error("Failed to create appointment")

    await fetchAppointments()
  }

  useEffect(() => {
    fetchAppointments()
  }, [])

  return {
    appointments,
    loading,
    refetch: fetchAppointments,
    createAppointment
  }
}