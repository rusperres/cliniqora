"use client"

import { usePathname, useRouter } from "next/navigation"
import { Bell, Search, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/use-auth"
import { createClient } from "@/lib/supabase/client"

export function Navbar() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClient()
  
  // Format current date for the header
  const today = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric"
  }).format(new Date())

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push("/login")
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-40 w-full h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md px-8 flex items-center justify-between">
      <div className="flex items-center text-sm font-medium text-slate-500">
        <span>{today}</span>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative hidden md:flex items-center">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-slate-400" />
          <Input placeholder="Quick search..." className="h-9 w-64 pl-9 bg-slate-50 border-slate-200 rounded-full text-sm" />
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" className="rounded-full text-slate-500" onClick={handleLogout} title="Log Out">
            <LogOut className="size-5" />
          </Button>
          
          <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm border border-blue-200">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
      </div>
    </header>
  )
}