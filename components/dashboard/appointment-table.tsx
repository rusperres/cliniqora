import { StatusPill } from "@/components/shared/status-pill"
import { AppointmentStatus } from "@prisma/client"

type Appointment = {
  id: string
  patientName: string
  doctorName: string
  serviceName: string
  status: AppointmentStatus
  scheduledAt: string
}

type Props = {
  data: Appointment[]
}

export function AppointmentTable({ data }: Props) {
  return (
    <div className="overflow-hidden rounded-lg border bg-white">
      <table className="w-full text-left text-sm">
        <thead className="border-b bg-gray-50 text-gray-500">
          <tr>
            <th className="p-3">Patient</th>
            <th className="p-3">Doctor</th>
            <th className="p-3">Service</th>
            <th className="p-3">Status</th>
            <th className="p-3">Schedule</th>
          </tr>
        </thead>

        <tbody>
          {data.map((a) => (
            <tr key={a.id} className="border-b">
              <td className="p-3">{a.patientName}</td>
              <td className="p-3">{a.doctorName}</td>
              <td className="p-3">{a.serviceName}</td>
              <td className="p-3">
                <StatusPill status={a.status} />
              </td>
              <td className="p-3 text-gray-500">
                {new Date(a.scheduledAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}