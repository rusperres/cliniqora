import Link from "next/link"
import { Activity, Mail, MapPin, Phone } from "lucide-react"
import ContactForm from "@/components/contact/contact-form"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <header className="absolute top-0 w-full z-40 p-6">
        <div className="container mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition">
              <Activity className="size-5" />
            </div>
            <span className="text-xl font-bold text-slate-900 tracking-tight">
              Cliniqora
            </span>
          </Link>

          <Link href="/book" className="text-sm font-semibold text-blue-600 hover:opacity-80">
            Visit Portal →
          </Link>
        </div>
      </header>

      <section className="pt-32 pb-24 px-6 flex items-center justify-center min-h-[80vh]">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 p-2">

            {/* LEFT */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-4">
                  Get in touch.
                </h1>
                <p className="text-lg text-slate-600">
                  Have questions about our availability, specialties, or facilities?
                </p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-start gap-4">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm text-blue-600">
                    <MapPin className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Headquarters</h3>
                    <p className="text-slate-500 mt-1">
                      100 Medical Center Drive<br />Health District, Suite 1000
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm text-blue-600">
                    <Mail className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Email Address</h3>
                    <p className="text-slate-500 mt-1">
                      hello@cliniqora.health<br />support@cliniqora.health
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-sm text-blue-600">
                    <Phone className="size-6" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">Phone Support</h3>
                    <p className="text-slate-500 mt-1">
                      +1 (800) CLINIC-00<br />Mon-Fri from 8am to 5pm
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT */}
            <div className="bg-white p-8 rounded-3xl shadow-card border border-slate-200/60">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">
                Send a Message
              </h3>

              <ContactForm />
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}