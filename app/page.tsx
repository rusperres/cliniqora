import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, ShieldCheck, Clock, ArrowRight, Activity } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-blue-100">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 text-white p-1.5 rounded-lg shadow-sm">
              <Activity className="size-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">
              Cliniqora
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/login" className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors">
              Staff Login
            </Link>
            <Link href="/register">
              <Button className="rounded-full px-6">
                Patient Portal
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main>
        {/* HERO SECTION */}
        <section className="relative overflow-hidden pt-24 pb-32">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/50 via-white to-white"></div>
          
          <div className="container mx-auto px-6 text-center max-w-4xl">
            <Badge variant="scheduled" className="mb-6 px-3 py-1 text-sm rounded-full shadow-sm">
              <span className="size-2 rounded-full bg-blue-500 mr-2 animate-pulse"></span>
              Live Scheduling System
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-slate-900 mb-8 leading-tight">
              Outpatient care, <br />
              <span className="text-blue-600">elegantly managed.</span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Experience a modern clinical interface designed for speed and clarity. 
              Book appointments, manage schedules, and review patient analytics with absolute precision.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/book">
                <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-lg shadow-blue-600/20 transition-all hover:shadow-xl hover:-translate-y-0.5 w-full sm:w-auto gap-2">
                  Book Appointment <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link href="/login">
                <Button size="lg" variant="outline" className="rounded-full h-14 px-8 text-base border-slate-300 w-full sm:w-auto hover:bg-slate-50 transition-all text-slate-700">
                  Existing Patient
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* FEATURES GRID */}
        <section className="py-24 bg-white border-y border-slate-100">
          <div className="container mx-auto px-6">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-bold text-slate-900">Engineered for Clinical Precision</h2>
              <p className="mt-4 text-slate-600">Eliminate waiting room bottlenecks with a scheduling system that prioritizes clarity and immediate feedback.</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="border-slate-200/60 shadow-card transition-all hover:shadow-hover hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="size-12 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center mb-6">
                    <CalendarDays className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Live Availability</h3>
                  <p className="text-slate-600 leading-relaxed">Instantly view doctor schedules and secure time slots without double-booking conflicts.</p>
                </CardContent>
              </Card>
              
              <Card className="border-slate-200/60 shadow-card transition-all hover:shadow-hover hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="size-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Role-Based Access</h3>
                  <p className="text-slate-600 leading-relaxed">Distinct securely partitioned dashboards for Patients, Doctors, and Clinic Administrators.</p>
                </CardContent>
              </Card>

              <Card className="border-slate-200/60 shadow-card transition-all hover:shadow-hover hover:-translate-y-1">
                <CardContent className="p-8">
                  <div className="size-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center mb-6">
                    <Clock className="size-6" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">60-Second Booking</h3>
                  <p className="text-slate-600 leading-relaxed">A streamlined architectural flow meaning patients secure their appointments effortlessly.</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* DOCTOR SHOWCASE */}
        <section className="py-24 bg-[#F8FAFC]">
          <div className="container mx-auto px-6 max-w-5xl text-center">
            <h2 className="text-3xl font-bold text-slate-900 mb-12">Seamless Staff Overview</h2>
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-card overflow-hidden">
               <div className="border-b border-slate-100 bg-slate-50/50 p-4 flex gap-2">
                 <div className="size-3 rounded-full bg-slate-300"></div>
                 <div className="size-3 rounded-full bg-slate-300"></div>
                 <div className="size-3 rounded-full bg-slate-300"></div>
               </div>
               <div className="p-8 md:p-12 text-left grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <Badge variant="confirmed" className="mb-4">Internal Medicine</Badge>
                    <h3 className="text-2xl font-bold mb-2">Dr. Maria Santos</h3>
                    <p className="text-slate-500 mb-6">Available Today • Next slot at 10:00 AM</p>
                    <Button variant="outline" className="gap-2">View Schedule</Button>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-600">09:00 AM</span>
                       <Badge variant="noshow">No-show</Badge>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between ring-1 ring-blue-500 bg-blue-50/30">
                       <span className="text-sm font-medium text-blue-900">09:30 AM</span>
                       <Badge variant="scheduled">In Progress</Badge>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center justify-between">
                       <span className="text-sm font-medium text-slate-600">10:00 AM</span>
                       <Badge variant="outline" className="bg-white">Available</Badge>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="container mx-auto px-6 text-center text-slate-500 text-sm">
          <p>© {new Date().getFullYear()} Cliniqora System. A premium healthcare portfolio showcase.</p>
        </div>
      </footer>
    </div>
  )
}