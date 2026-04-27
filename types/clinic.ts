import type { Doctor as PrismaDoctor, Service as PrismaService } from "@prisma/client"

export type Doctor = PrismaDoctor
export type Service = PrismaService

/**
 * Used for booking UI flow
 */
export type BookingStep = "service" | "doctor" | "time" | "confirm"

export type TimeSlot = {
  start: string
  end: string
  available: boolean
}