"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Role } from "@prisma/client"
import { Sidebar } from "@/components/shared/sidebar"
import { Navbar } from "@/components/shared/navbar"

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, loading, role } = useAuth()

  useEffect(() => {
    if (loading) return

    if (!user) {
      router.push("/login")
      return
    }

    if (role !== Role.STAFF && role !== Role.ADMIN) {
      router.push("/")
    }
  }, [user, loading, role, router])

  if (loading || !user) {
    return <p className="p-6">Loading...</p>
  }

  return (
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <Sidebar role="staff" />

      {/* MAIN */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <main className="p-6 bg-muted/20 flex-1">
          {children}
        </main>
      </div>
    </div>
  )
}