"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity } from "lucide-react"

export type SidebarItem = {
  label: string
  href: string
  icon?: React.ElementType
}

export function Sidebar({ items, badge }: { items: SidebarItem[]; badge: string }) {
  const pathname = usePathname()

  return (
    <aside className="fixed inset-y-0 left-0 z-50 w-64 border-r border-slate-200 bg-white">
      <div className="flex h-16 items-center gap-2 px-6 border-b border-slate-100">
        <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
          <Activity className="size-5" />
        </div>
        <span className="text-xl font-bold tracking-tight text-slate-900">
          Cliniqora
        </span>
      </div>

      <div className="px-6 py-4">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{badge} Panel</span>
      </div>

      <nav className="flex flex-col gap-1 px-4">
        {items.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-blue-50 text-blue-700 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {Icon && <Icon className={`size-5 ${isActive ? "text-blue-600" : "text-slate-400"}`} />}
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}