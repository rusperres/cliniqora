import { Role, AppointmentStatus } from "@prisma/client"

/**
 * =========================
 * USER ROLES
 * =========================
 * Mirrors Prisma Role enum
 */
export const USER_ROLES = {
  PATIENT: Role.PATIENT,
  STAFF: Role.STAFF,
  ADMIN: Role.ADMIN,
} as const

export type UserRole = keyof typeof USER_ROLES

/**
 * Human-readable labels (for UI)
 */
export const USER_ROLE_LABELS: Record<Role, string> = {
  PATIENT: "Patient",
  STAFF: "Medical Staff",
  ADMIN: "Administrator",
}

/**
 * =========================
 * APPOINTMENT STATUSES
 * =========================
 * Mirrors Prisma AppointmentStatus enum
 */
export const APPOINTMENT_STATUS = {
  PENDING: AppointmentStatus.PENDING,
  CONFIRMED: AppointmentStatus.CONFIRMED,
  CANCELLED: AppointmentStatus.CANCELLED,
  COMPLETED: AppointmentStatus.COMPLETED,
} as const

export type AppointmentStatusKey = keyof typeof APPOINTMENT_STATUS

/**
 * Human-readable labels (for UI)
 */
export const APPOINTMENT_STATUS_LABELS: Record<AppointmentStatus, string> = {
  PENDING: "Pending",
  CONFIRMED: "Confirmed",
  CANCELLED: "Cancelled",
  COMPLETED: "Completed",
}

/**
 * =========================
 * BUSINESS CONSTANTS
 * =========================
 */

export const DEFAULT_PAGE_SIZE = 10

export const MAX_BOOKING_DAYS_AHEAD = 30

export const DEFAULT_APPOINTMENT_DURATION_MIN = 30

/**
 * Appointment status colors (for badges / UI pills)
 */
export const APPOINTMENT_STATUS_COLORS: Record<
  AppointmentStatus,
  "yellow" | "green" | "red" | "blue"
> = {
  PENDING: "yellow",
  CONFIRMED: "blue",
  CANCELLED: "red",
  COMPLETED: "green",
}

/**
 * Role-based dashboard routes
 */
export const ROLE_DASHBOARD_ROUTE: Record<Role, string> = {
  PATIENT: "/patient/dashboard",
  STAFF: "/staff/dashboard",
  ADMIN: "/admin/dashboard",
}