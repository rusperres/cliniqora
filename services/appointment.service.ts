import { prisma } from "@/lib/prisma/client"
import { AppointmentStatus } from "@prisma/client"

/**
 * APPOINTMENT SERVICE
 * - All business logic lives here
 */

export async function createAppointment(data: {
  userId: string
  doctorId: string
  serviceId: string
  scheduledAt: Date
  notes?: string
}) {
  const existing = await prisma.appointment.findFirst({
    where: {
      doctorId: data.doctorId,
      scheduledAt: data.scheduledAt
    }
  })

  if (existing) {
    throw new Error("Doctor already booked at this time")
  }

  return prisma.appointment.create({
    data: {
      ...data,
      status: AppointmentStatus.PENDING
    }
  })
}

/**
 * PATIENT VIEW
 */
export async function getAppointmentsByUser(userId: string) {
  return prisma.appointment.findMany({
    where: { userId },
    include: {
      doctor: true,
      service: true
    },
    orderBy: { scheduledAt: "asc" }
  })
}

/**
 * STAFF / ADMIN VIEW (ALL)
 */
export async function getAllAppointments() {
  return prisma.appointment.findMany({
    include: {
      user: true,
      doctor: true,
      service: true
    },
    orderBy: { scheduledAt: "asc" }
  })
}

/**
 * UPDATE STATUS
 */
export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  })
}