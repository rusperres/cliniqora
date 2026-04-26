"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/use-auth"
import { Navbar } from "@/components/shared/navbar"
import { Sidebar } from "@/components/shared/sidebar"

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
    <div className="min-h-screen flex bg-gray-50">
      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN AREA */}
      <div className="flex-1 flex flex-col">
        {/* TOP NAVBAR */}
        <Navbar />

        {/* PAGE CONTENT */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}