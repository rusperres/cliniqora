import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function HomePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">

      {/* ================= HERO ================= */}
      <section className="flex flex-col items-center justify-center text-center px-6 py-24">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
          Cliniqora
        </h1>

        <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
          A modern clinic booking and management system for patients, doctors,
          and administrators — built for speed, clarity, and real-world workflows.
        </p>

        <div className="mt-8 flex gap-4">
          <Link href="/book">
            <Button size="lg">Book an Appointment</Button>
          </Link>

          <Link href="/login">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          <Card className="p-6">
            <h3 className="text-lg font-semibold">Smart Booking</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Patients can book appointments instantly with real-time availability.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold">Doctor Dashboard</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Doctors manage schedules, patients, and consultations in one place.
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold">Admin Control</h3>
            <p className="text-sm text-muted-foreground mt-2">
              Full clinic oversight: services, users, analytics, and operations.
            </p>
          </Card>

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="px-6 pb-24 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold">
            Built for real clinics, not mock dashboards.
          </h2>

          <p className="mt-3 text-muted-foreground">
            This is a full-stack simulation of how modern healthcare systems manage appointments,
            roles, and patient flow.
          </p>

          <div className="mt-6">
            <Link href="/book">
              <Button size="lg">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

    </main>
  )
}