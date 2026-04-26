import Link from "next/link"
import { Activity, Stethoscope, HeartPulse, Brain, ArrowRight } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="absolute top-0 w-full z-40 p-6 border-b border-transparent bg-white/50 backdrop-blur-md">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition">
              <Activity className="size-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">Cliniqora</span>
          </Link>
          <Link href="/book" className="text-sm font-semibold text-blue-600 hover:opacity-80">
            Book Appointment &rarr;
          </Link>
        </div>
      </header>

      <section className="pt-32 pb-24 px-6 text-center">
        <div className="container mx-auto max-w-4xl">
          <Badge className="mb-4 bg-blue-100 text-blue-700 hover:bg-blue-100">Specialized Care</Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
            Comprehensive Medical Services
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-16">
            From routine checkups to advanced diagnostics, our network of elite specialists provides end-to-end healthcare solutions designed for your wellbeing.
          </p>

          <div className="grid md:grid-cols-3 gap-6 text-left">
            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-card transition-shadow">
              <div className="bg-slate-50 text-slate-700 p-4 rounded-2xl w-max mb-6">
                <Stethoscope className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">General Medicine</h3>
              <p className="text-slate-500 mb-6">Comprehensive evaluations and primary care for ongoing health maintenance and prevention.</p>
              <Link href="/book" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Schedule <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-card transition-shadow">
              <div className="bg-red-50 text-red-600 p-4 rounded-2xl w-max mb-6">
                <HeartPulse className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Cardiology</h3>
              <p className="text-slate-500 mb-6">Advanced cardiovascular screening and specialized treatment methodologies by leading experts.</p>
              <Link href="/book" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Schedule <ArrowRight className="size-4" />
              </Link>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm hover:shadow-card transition-shadow">
              <div className="bg-indigo-50 text-indigo-600 p-4 rounded-2xl w-max mb-6">
                <Brain className="size-8" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Neurology</h3>
              <p className="text-slate-500 mb-6">Expert diagnostic services analyzing neurological status and providing effective treatment protocols.</p>
              <Link href="/book" className="text-blue-600 font-semibold flex items-center gap-1 hover:gap-2 transition-all">
                Schedule <ArrowRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function Badge({ children, className }: any) {
  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${className}`}>{children}</span>
}
