import { prisma } from "@/lib/prisma/client"
import { AppointmentStatus } from "@prisma/client"

/**
 * APPOINTMENT SERVICE
 * - Booking logic lives here
 * - NOT in API routes
 */

export async function createAppointment(data: {
  userId: string
  doctorId: string
  serviceId: string
  scheduledAt: Date
  notes?: string
}) {
  // basic rule: prevent double booking (simple version)
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

export async function getAllAppointments() {
  return prisma.appointment.findMany({
    include: {
      user: true,
      doctor: true,
      service: true
    }
  })
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus
) {
  return prisma.appointment.update({
    where: { id },
    data: { status }
  })
}