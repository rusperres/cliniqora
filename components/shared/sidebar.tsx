"use client"

import Link from "next/link"

type SidebarItem = {
  label: string
  href: string
  icon?: React.ReactNode
}

const items: SidebarItem[] = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Appointments", href: "/appointments" },
  { label: "Book", href: "/book" },
]

export function Sidebar() {
  return (
    <aside className="h-screen w-64 border-r bg-white p-4">
      <div className="mb-6 text-lg font-semibold">Cliniqora</div>

      <nav className="flex flex-col gap-2">
        {items.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}