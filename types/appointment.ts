import { AppointmentStatus } from "@prisma/client"

export type Appointment = {
  id: string

  userId: string
  doctorId: string
  serviceId: string

  status: AppointmentStatus

  scheduledAt: Date
  notes?: string | null

  createdAt: Date
  updatedAt: Date
}

/**
 * Expanded version for UI (joined data)
 */
export type AppointmentFull = Appointment & {
  user: {
    id: string
    name: string | null
    email: string
  }

  doctor: {
    id: string
    name: string
    specialty: string
  }

  service: {
    id: string
    name: string
    price: number
    durationMin: number
  }
}