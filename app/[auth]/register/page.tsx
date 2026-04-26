"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
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
  const [loading, setLoading] = useState(false)

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name
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
        name
      })
    })

    router.push("/login")
  }

  return (
    <Card className="p-6 space-y-4">
      <h1 className="text-2xl font-semibold">Create account</h1>

      <form onSubmit={handleRegister} className="space-y-3">
        <Input
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <Input
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="w-full" disabled={loading}>
          {loading ? "Creating account..." : "Register"}
        </Button>
      </form>
    </Card>
  )
}