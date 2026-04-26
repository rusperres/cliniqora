import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getAllDoctors } from "@/services/doctor.service"

export default async function AdminDoctorsPage() {
  const doctors = await getAllDoctors()

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
          {doctors.map((d) => (
            <div
              key={d.id}
              className="flex justify-between items-center border rounded-lg p-3"
            >
              <div>
                <p className="font-medium">{d.name}</p>
                <p className="text-sm text-muted-foreground">
                  ID: {d.id}
                </p>
              </div>

              <div className="flex gap-2 items-center">
                <Badge variant="secondary">
                  {d.specialty}
                </Badge>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}