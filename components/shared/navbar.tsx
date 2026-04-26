"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"

export function Navbar() {
  const pathname = usePathname()

  return (
    <header className="w-full border-b bg-white">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        
        {/* Brand */}
        <Link href="/" className="font-semibold text-lg">
          Cliniqora
        </Link>

        {/* Navigation */}
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/book"
            className={pathname === "/book" ? "font-medium" : "text-gray-500"}
          >
            Book
          </Link>

          <Link
            href="/dashboard"
            className={pathname === "/dashboard" ? "font-medium" : "text-gray-500"}
          >
            Dashboard
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost">Login</Button>
          <Button>Get Started</Button>
        </div>
      </div>
    </header>
  )
}