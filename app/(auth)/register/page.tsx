"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function RegisterPage() {
  const router = useRouter()
  const supabase = createClient()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState("PATIENT")
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    })

    setLoading(false)

    if (error) {
      alert(error.message)
      return
    }

    if (!data.user) {
      alert("Check your email for confirmation link")
      return
    }

    // IMPORTANT: create Prisma user via API
    await fetch("/api/users/sync", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        supabaseId: data.user.id,
        email,
        name,
        role
      })
    })

    router.push("/login")
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2 text-center lg:text-left">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Create an account</h1>
        <p className="text-slate-500">Enter your details to get started with Cliniqora</p>
      </div>

      <Card className="p-8 shadow-card border-slate-200/60 rounded-2xl bg-white">
        <form onSubmit={handleRegister} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Account Type</label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="flex h-11 w-full items-center justify-between rounded-md border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <option value="PATIENT">Patient Request</option>
              <option value="STAFF">Medical Staff</option>
              <option value="ADMIN">Administrator</option>
            </select>
          </div>

          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Full Name</label>
            <Input
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="h-11 bg-slate-50/50"
            />
          </div>

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
            {loading ? "Creating account..." : "Register"}
          </Button>
        </form>
        
        <div className="text-center text-sm text-slate-500 mt-6 pt-6 border-t border-slate-100">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-600 font-medium hover:underline">
            Log in here
          </Link>
        </div>
      </Card>
    </div>
  )
}