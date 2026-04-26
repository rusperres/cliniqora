"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { CalendarDays, LayoutDashboard, Stethoscope } from "lucide-react"

const PATIENT_ITEMS = [
  { label: "Dashboard", href: "/patient-dashboard", icon: LayoutDashboard },
  { label: "Appointments", href: "/appointments", icon: CalendarDays },
  { label: "Book Consultation", href: "/book", icon: Stethoscope },
]

export default function PatientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, isPatient } = useAuth()

  // -----------------------
  // PROTECTION LAYER (UI GUARD)
  // -----------------------
  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (!isPatient) {
      router.push("/")
    }
  }, [user, loading, isPatient, router])

  // -----------------------
  // LOADING STATE
  // -----------------------
  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <DashboardLayout items={PATIENT_ITEMS} badge="Patient">
      {children}
    </DashboardLayout>
  )
}