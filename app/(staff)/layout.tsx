"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { LayoutDashboard, CalendarDays, Users } from "lucide-react"

const STAFF_ITEMS = [
  { label: "Schedule", href: "/staff-dashboard", icon: LayoutDashboard },
  { label: "My Appointments", href: "/schedule", icon: CalendarDays },
  { label: "Patient List", href: "/patients", icon: Users },
]

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, isStaff, isAdmin } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (!isStaff && !isAdmin) {
      router.push("/")
    }
  }, [user, loading, isStaff, isAdmin, router])

  // Prevent flashing protected UI while redirecting
  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  if (!isStaff && !isAdmin) {
    return null
  }

  return (
    <DashboardLayout items={STAFF_ITEMS} badge="Staff">
      {children}
    </DashboardLayout>
  )
}