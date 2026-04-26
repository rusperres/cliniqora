"use client"

import { ReactNode } from "react"
import { Sidebar, SidebarItem } from "./sidebar"
import { Navbar } from "./navbar"

interface DashboardLayoutProps {
  children: ReactNode
  items: SidebarItem[]
  badge: string
}

export function DashboardLayout({ children, items, badge }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Sidebar items={items} badge={badge} />
      
      {/* Main Content Area offset by Sidebar width (16rem = 64) */}
      <div className="pl-64 flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
