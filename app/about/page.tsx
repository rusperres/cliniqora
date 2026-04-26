import Link from "next/link"
import { Activity, ArrowRight, Building2, ShieldCheck, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="absolute top-0 w-full z-40 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition">
              <Activity className="size-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Cliniqora</span>
          </Link>
          <Link href="/login" className="text-sm font-semibold text-blue-600 hover:opacity-80">
            Sign In &rarr;
          </Link>
        </div>
      </header>

      <section className="pt-32 pb-24 px-6 overflow-hidden relative">
        <div className="absolute top-0 right-0 -mr-32 -mt-32 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-50 mix-blend-multiply"></div>
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 leading-[1.1]">
                Redefining modern healthcare access.
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                Cliniqora was founded with a single mission: to eliminate the friction between patients and life-saving care. We believe medical scheduling should be as pristine and professional as the care you receive.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-6 pt-6 border-t border-slate-200">
                <div>
                  <div className="bg-blue-50 text-blue-600 p-3 rounded-xl w-max mb-3">
                    <ShieldCheck className="size-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Clinical Trust</h3>
                  <p className="text-sm text-slate-500 mt-1">Our platform is built on enterprise-grade security and transparency.</p>
                </div>
                <div>
                  <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl w-max mb-3">
                    <Users className="size-6" />
                  </div>
                  <h3 className="font-semibold text-slate-900">Patient First</h3>
                  <p className="text-sm text-slate-500 mt-1">Every interface is designed to reduce cognitive load and stress.</p>
                </div>
              </div>
            </div>

            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 h-[500px]">
              <img 
                src="/images/doctor-consultation.png" 
                alt="Doctors consulting" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}
