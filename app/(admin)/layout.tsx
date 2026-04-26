"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Role } from "@prisma/client"
import { DashboardLayout } from "@/components/shared/dashboard-layout"
import { BarChart, Users, HeartPulse } from "lucide-react"

const ADMIN_ITEMS = [
  { label: "Analytics", href: "/admin-dashboard", icon: BarChart },
  { label: "Manage Doctors", href: "/doctors", icon: Users },
  { label: "Manage Services", href: "/manage-services", icon: HeartPulse },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, isAdmin } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (!isAdmin) {
      router.push("/")
    }
  }, [user, loading, isAdmin, router])

  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  if (!isAdmin) {
    return null
  }

  return (
    <DashboardLayout items={ADMIN_ITEMS} badge="Admin">
      {children}
    </DashboardLayout>
  )
}