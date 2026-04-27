import type { Doctor as PrismaDoctor, Service as PrismaService, Role as PrismaRole, AppointmentStatus as PrismaAppointmentStatus } from "@prisma/client"

export type Doctor = PrismaDoctor
export type Service = PrismaService
export type Role = PrismaRole
export type AppointmentStatus = PrismaAppointmentStatus

/**
 * Used for booking UI flow
 */
export type BookingStep = "service" | "doctor" | "time" | "confirm"

export type TimeSlot = {
  start: string
  end: string
  available: boolean
}