import { PrismaClient, Role, AppointmentStatus } from "@prisma/client"
import { faker } from "@faker-js/faker"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding Cliniqora database...")

  // -----------------------
  // 1. CLEAN DATABASE
  // -----------------------
  await prisma.appointment.deleteMany()
  await prisma.service.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany()

  // -----------------------
  // 2. CREATE USERS (PATIENTS)
  // -----------------------
  const patients = await Promise.all(
    Array.from({ length: 10 }).map(() =>
      prisma.user.create({
        data: {
          name: faker.person.fullName(),
          email: faker.internet.email(),
          role: Role.PATIENT
        }
      })
    )
  )

  // -----------------------
  // 3. CREATE DOCTORS
  // -----------------------
  const doctors = await Promise.all(
    [
      { name: "Dr. Maria Santos", specialty: "General Medicine" },
      { name: "Dr. Juan Dela Cruz", specialty: "Pediatrics" },
      { name: "Dr. Ana Reyes", specialty: "Dermatology" },
      { name: "Dr. Luis Gomez", specialty: "Cardiology" },
      { name: "Dr. Sofia Lim", specialty: "ENT Specialist" }
    ].map((doc) =>
      prisma.doctor.create({
        data: {
          name: doc.name,
          specialty: doc.specialty
        }
      })
    )
  )

  // -----------------------
  // 4. CREATE SERVICES
  // -----------------------
  const services = await Promise.all(
    [
      { name: "General Consultation", price: 500, duration: 30 },
      { name: "Follow-up Checkup", price: 300, duration: 20 },
      { name: "Laboratory Request", price: 800, duration: 15 },
      { name: "Physical Examination", price: 600, duration: 40 },
      { name: "Emergency Consultation", price: 1200, duration: 60 },
      { name: "Vaccination", price: 700, duration: 15 }
    ].map((service) =>
      prisma.service.create({
        data: {
          name: service.name,
          price: service.price,
          durationMin: service.duration,
          description: faker.lorem.sentence()
        }
      })
    )
  )

  // -----------------------
  // 5. CREATE APPOINTMENTS
  // -----------------------
  const statuses = [
    AppointmentStatus.PENDING,
    AppointmentStatus.CONFIRMED,
    AppointmentStatus.CANCELLED,
    AppointmentStatus.COMPLETED
  ]

  const appointments = []

  for (let i = 0; i < 30; i++) {
    const patient = faker.helpers.arrayElement(patients)
    const doctor = faker.helpers.arrayElement(doctors)
    const service = faker.helpers.arrayElement(services)
    const status = faker.helpers.arrayElement(statuses)

    const appointment = await prisma.appointment.create({
      data: {
        userId: patient.id,
        doctorId: doctor.id,
        serviceId: service.id,
        status,
        scheduledAt: faker.date.soon({ days: 30 }),
        notes: faker.lorem.sentence()
      }
    })

    appointments.push(appointment)
  }

  console.log("✅ Seeding complete!")
  console.log({
    patients: patients.length,
    doctors: doctors.length,
    services: services.length,
    appointments: appointments.length
  })
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })