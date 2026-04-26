import { ReactNode } from "react"
import Link from "next/link"
import { Activity } from "lucide-react"

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Pane (Branding) */}
      <div className="hidden lg:flex flex-col justify-between p-12 text-white relative overflow-hidden bg-slate-900">
        <img 
          src="/images/clinic-interior.png" 
          alt="Modern Clinic Facility" 
          className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-blue-900/30"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        <Link href="/" className="relative z-10 inline-flex items-center gap-2 hover:opacity-90 transition-opacity w-max">
          <div className="bg-blue-600 text-white p-2 rounded-xl border border-blue-500/30 shadow-sm">
            <Activity className="size-6" />
          </div>
          <span className="text-2xl font-bold tracking-tight">
            Cliniqora
          </span>
        </Link>
        
        <div className="relative z-10 max-w-lg mb-8">
          <h2 className="text-4xl font-bold leading-[1.15] mb-6 tracking-tight">
            Intelligent workflow for modern outpatient care.
          </h2>
          <p className="text-slate-400 text-lg leading-relaxed">
            Join thousands of administrators, doctors, and patients experiencing friction-free medical scheduling.
          </p>
        </div>
      </div>

      {/* Right Pane (Form) */}
      <div className="flex flex-col items-center justify-center p-8 bg-[#F8FAFC] relative">
        <Link href="/" className="lg:hidden absolute top-8 left-8 flex items-center gap-2">
          <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
             <Activity className="size-5" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
             Cliniqora
          </span>
        </Link>
        <div className="w-full max-w-md">
          {children}
        </div>
      </div>
    </div>
  )
}