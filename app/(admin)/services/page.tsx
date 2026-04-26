"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Service = {
  id: string
  name: string
  description: string
  duration: number
  price: number
}

export default function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      setLoading(true)

      const res = await fetch("/api/services")
      const data = await res.json()

      setServices(data.data)
      setLoading(false)
    }

    load()
  }, [])

  return (
    <div className="space-y-6">

      <div>
        <h1 className="text-2xl font-semibold">Services</h1>
        <p className="text-sm text-muted-foreground">
          Manage clinic offerings
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Service List</CardTitle>
        </CardHeader>

        <CardContent className="space-y-3">
          {loading ? (
            <p className="text-sm text-muted-foreground">
              Loading services...
            </p>
          ) : (
            services.map((s) => (
              <div
                key={s.id}
                className="border rounded-lg p-3 flex justify-between"
              >
                <div>
                  <p className="font-medium">{s.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {s.description}
                  </p>
                </div>

                <div className="text-sm text-right">
                  <p>{s.duration} min</p>
                  <p className="font-medium">₱{s.price}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  )
}