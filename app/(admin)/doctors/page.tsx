"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

type Doctor = {
  id: string
  name: string
  email: string
  specialty: string
  isActive: boolean
}

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/doctors")
      const data = await res.json()

      setDoctors(data.data)
      setLoading(false)
    }

    load()
  }, [])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Doctors</h1>
        <p className="text-sm text-muted-foreground">
          Manage clinic doctors
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Doctor List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading doctors...
            </p>
          ) : (
            doctors.map((d) => (
              <div
                key={d.id}
                className="flex justify-between items-center border rounded-lg p-3"
              >
                <div>
                  <p className="font-medium">{d.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {d.email}
                  </p>
                </div>

                <div className="flex gap-2 items-center">
                  <Badge variant="secondary">
                    {d.specialty}
                  </Badge>

                  <Badge
                    variant={d.isActive ? "default" : "destructive"}
                  >
                    {d.isActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}