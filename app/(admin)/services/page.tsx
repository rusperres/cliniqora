import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getAllServices } from "@/services/service.service"

export default async function AdminServicesPage() {
  const services = await getAllServices()

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
          {services.map((s) => (
            <div
              key={s.id}
              className="border rounded-lg p-3 flex justify-between"
            >
              <div>
                <p className="font-medium">{s.name}</p>
              </div>

              <div className="text-sm text-right">
                <p>{s.durationMin} min</p>
                <p className="font-medium">₱{s.price}</p>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}