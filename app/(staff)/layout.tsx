"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Sidebar } from "@/components/shared/sidebar"
import { Navbar } from "@/components/shared/navbar"

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
    <div className="flex min-h-screen">
      {/* SIDEBAR */}
      <Sidebar />

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