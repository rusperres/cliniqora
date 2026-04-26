import { prisma } from "@/lib/prisma/client"

/**
 * DASHBOARD STATS
 */
export async function getDashboardStats() {
  const [users, doctors, appointments, services] = await Promise.all([
    prisma.user.count(),
    prisma.doctor.count(),
    prisma.appointment.count(),
    prisma.service.count()
  ])

  const completed = await prisma.appointment.count({
    where: { status: "COMPLETED" }
  })

  const pending = await prisma.appointment.count({
    where: { status: "PENDING" }
  })

  return {
    users,
    doctors,
    services,
    appointments,
    completed,
    pending
  }
}

/**
 * APPOINTMENTS BY MONTH (chart data)
 */
export async function getAppointmentsByMonth() {
  const appointments = await prisma.appointment.findMany({
    select: { scheduledAt: true }
  })

  const grouped: Record<string, number> = {}

  for (const a of appointments) {
    const month = new Date(a.scheduledAt).toISOString().slice(0, 7)
    grouped[month] = (grouped[month] || 0) + 1
  }

  return grouped
}