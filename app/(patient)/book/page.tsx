"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { CheckCircle2, ChevronRight, ArrowLeft, Stethoscope, CalendarDays, ClipboardList } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/hooks/use-auth"

type Doctor = { id: string; name: string; specialty: string }
type Service = { id: string; name: string; price: number; durationMin: number }

export default function BookPage() {
  const router = useRouter()
  const { user, loading, isPatient } = useAuth()

  const [step, setStep] = useState(1) // 1: Service, 2: Doctor, 3: Schedule, 4: Notes & Confirm
  
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [services, setServices] = useState<Service[]>([])

  const [serviceId, setServiceId] = useState("")
  const [doctorId, setDoctorId] = useState("")
  const [scheduledAt, setScheduledAt] = useState("")
  const [notes, setNotes] = useState("")
  
  const [submitting, setSubmitting] = useState(false)

  // Auth Guard
  useEffect(() => {
    if (!loading && !user) router.push("/login")
    if (!loading && user && !isPatient) router.push("/")
  }, [user, loading, isPatient, router])

  // Load Data
  useEffect(() => {
    async function loadData() {
      const [docRes, serviceRes] = await Promise.all([
        fetch("/api/doctors"),
        fetch("/api/services")
      ])
      const docs = await docRes.json()
      const servs = await serviceRes.json()
      setDoctors(docs.data || [])
      setServices(servs.data || [])
    }
    loadData()
  }, [])

  async function handleBook() {
    if (!doctorId || !serviceId || !scheduledAt) return
    setSubmitting(true)
    try {
      const res = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ doctorId, serviceId, scheduledAt, notes })
      })
      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Booking failed")
      }
      router.push("/patient-dashboard")
    } catch (err: any) {
      alert(err.message || "Failed to book appointment")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]">
        <div className="animate-pulse bg-slate-200 h-10 w-32 rounded-lg"></div>
      </div>
    )
  }

  const selectedService = services.find((s) => s.id === serviceId)
  const selectedDoctor = doctors.find((d) => d.id === doctorId)

  return (
    <div className="min-h-screen bg-[#F8FAFC] pb-24">
      {/* Header Bar */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="container mx-auto px-6 h-16 flex items-center gap-4">
          <Button variant="ghost" className="size-9 p-0" onClick={() => step > 1 ? setStep(step - 1) : router.back()}>
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">Schedule Consultation</h1>
            <p className="text-xs text-slate-500 font-medium">Step {step} of 4</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-10 max-w-2xl">
        {/* Step 1: Select Service */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">What do you need help with?</h2>
              <p className="text-slate-500 mt-1">Select the type of consultation or service.</p>
            </div>
            <div className="grid gap-4">
              {services.map((svc) => (
                <button
                  key={svc.id}
                  onClick={() => { setServiceId(svc.id); setStep(2) }}
                  className={`text-left w-full transition-all ${
                    serviceId === svc.id ? "ring-2 ring-blue-600 shadow-md transform scale-[1.01]" : "hover:shadow-card hover:-translate-y-0.5"
                  }`}
                >
                  <Card className={`p-6 border-slate-200/80 bg-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${serviceId === svc.id ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <ClipboardList className="size-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900">{svc.name}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm text-slate-500">
                            <Badge variant="secondary" className="font-normal">{svc.durationMin} mins</Badge>
                            <span>•</span>
                            <span>₱{svc.price}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-300 size-6" />
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Select Doctor */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Choose your specialist</h2>
              <p className="text-slate-500 mt-1">Select the doctor you want to consult with.</p>
            </div>
            <div className="grid gap-4">
              {doctors.map((doc) => (
                <button
                  key={doc.id}
                  onClick={() => { setDoctorId(doc.id); setStep(3) }}
                  className={`text-left w-full transition-all ${
                    doctorId === doc.id ? "ring-2 ring-blue-600 shadow-md transform scale-[1.01]" : "hover:shadow-card hover:-translate-y-0.5"
                  }`}
                >
                  <Card className={`p-6 border-slate-200/80 bg-white`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-xl ${doctorId === doc.id ? 'bg-teal-600 text-white' : 'bg-teal-50 text-teal-600'}`}>
                          <Stethoscope className="size-6" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-lg text-slate-900">{doc.name}</h3>
                          <p className="text-sm text-slate-500 mt-1 font-medium">{doc.specialty}</p>
                        </div>
                      </div>
                      <ChevronRight className="text-slate-300 size-6" />
                    </div>
                  </Card>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Date & Time */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Select Date & Time</h2>
              <p className="text-slate-500 mt-1">Choose an available slot for your consultation.</p>
            </div>
            <Card className="p-8 border-slate-200/80 shadow-sm bg-white space-y-6">
              <div className="flex items-center gap-4 border-b border-slate-100 pb-6 mb-2">
                <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                  <CalendarDays className="size-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900">Appointment Schedule</h3>
                  <p className="text-sm text-slate-500">Please provide a precise date and time.</p>
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Select Date and Time</label>
                <Input
                  type="datetime-local"
                  value={scheduledAt}
                  onChange={(e) => setScheduledAt(e.target.value)}
                  className="h-12 bg-slate-50 text-base font-medium"
                />
              </div>
              
              <Button
                size="lg"
                className="w-full h-12 text-base mt-4 gap-2 shadow-sm shadow-blue-600/20"
                disabled={!scheduledAt}
                onClick={() => setStep(4)}
              >
                Proceed to Review <ChevronRight className="size-4" />
              </Button>
            </Card>
          </div>
        )}

        {/* Step 4: Notes and Confirm */}
        {step === 4 && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-slate-900">Review & Confirm</h2>
              <p className="text-slate-500 mt-1">Make sure your details are correct before finalizing.</p>
            </div>
            
            <Card className="p-8 border-slate-200/80 shadow-sm bg-white space-y-8">
              {/* Summary Block */}
              <div className="grid sm:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Service</p>
                  <p className="font-semibold text-slate-900">{selectedService?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Total Fee</p>
                  <p className="font-semibold text-blue-700">₱{selectedService?.price}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Specialist</p>
                  <p className="font-semibold text-slate-900">{selectedDoctor?.name}</p>
                </div>
                <div>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold mb-1">Schedule</p>
                  <p className="font-semibold text-slate-900">
                    {new Date(scheduledAt).toLocaleString(undefined, {
                      weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>

              {/* Notes Input */}
              <div className="space-y-3">
                <label className="text-sm font-semibold text-slate-700">Additional Notes (Optional)</label>
                <Input
                  placeholder="Enter any symptoms or special requests..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="h-12 bg-slate-50 text-base"
                />
              </div>
              
              <Button
                size="lg"
                className="w-full h-14 text-base font-semibold shadow-lg shadow-blue-600/20"
                disabled={submitting}
                onClick={handleBook}
              >
                {submitting ? (
                  "Confirming Appointment..."
                ) : (
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="size-5" /> Secure My Appointment
                  </span>
                )}
              </Button>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}