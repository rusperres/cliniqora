"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function LoginPage() {
  const router = useRouter()
  const supabase = createClient()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      setLoading(false)
      alert(error.message)
      return
    }

    // After login, fetch user role from our API
    try {
      const res = await fetch("/api/users/me")
      if (!res.ok) {
        throw new Error("Failed to fetch user data")
      }

      const data = await res.json()
      const role = data.user?.role

      setLoading(false)

      if (role === "ADMIN") {
        router.push("/admin-dashboard")
      } else if (role === "STAFF") {
        router.push("/staff-dashboard")
      } else {
        router.push("/patient-dashboard")
      }

      router.refresh()
    } catch (err) {
      setLoading(false)
      console.error("Redirect error:", err)
      router.push("/")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Welcome back</h1>
        <p className="text-slate-500">Log in to your Cliniqora account</p>
      </div>

      <Card className="p-8 shadow-card border-slate-200/60 rounded-2xl bg-white">
        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Email Address</label>
            <Input
              placeholder="name@example.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-11 bg-slate-50/50"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <Input
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-11 bg-slate-50/50"
            />
          </div>

          <Button className="w-full h-11 text-base shadow-sm mt-2" disabled={loading}>
            {loading ? "Authenticating..." : "Sign In"}
          </Button>
        </form>

        <div className="text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-medium hover:underline">
            Register here
          </Link>
        </div>
      </Card>
    </div>
  )
}