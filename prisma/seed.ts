import { PrismaClient, Role, AppointmentStatus } from "@prisma/client"
import { faker } from "@faker-js/faker"


const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DIRECT_URL
    }
  }
})
async function main() {
  console.log("🌱 Seeding Cliniqora database...")

  // -----------------------
  // CLEAN DATABASE (order matters)
  // -----------------------
  await prisma.appointment.deleteMany()
  await prisma.service.deleteMany()
  await prisma.doctor.deleteMany()
  await prisma.user.deleteMany()

  // -----------------------
  // CREATE PATIENTS
  // -----------------------
  const patients = []

  for (let i = 0; i < 10; i++) {
    const user = await prisma.user.create({
      data: {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        role: Role.PATIENT
      }
    })

    patients.push(user)
  }

  console.log(`✔ Created ${patients.length} patients`)

  // -----------------------
  // CREATE DOCTORS
  // -----------------------
  const doctors = []

  const doctorData = [
    { name: "Dr. Maria Santos", specialty: "General Medicine" },
    { name: "Dr. Juan Dela Cruz", specialty: "Pediatrics" },
    { name: "Dr. Ana Reyes", specialty: "Dermatology" },
    { name: "Dr. Luis Gomez", specialty: "Cardiology" },
    { name: "Dr. Sofia Lim", specialty: "ENT Specialist" }
  ]

  for (const doc of doctorData) {
    const doctor = await prisma.doctor.create({
      data: {
        name: doc.name,
        specialty: doc.specialty
      }
    })

    doctors.push(doctor)
  }

  console.log(`✔ Created ${doctors.length} doctors`)

  // -----------------------
  // CREATE SERVICES
  // -----------------------
  const services = []

  const serviceData = [
    { name: "General Consultation", price: 500, duration: 30 },
    { name: "Follow-up Checkup", price: 300, duration: 20 },
    { name: "Laboratory Request", price: 800, duration: 15 },
    { name: "Physical Examination", price: 600, duration: 40 },
    { name: "Emergency Consultation", price: 1200, duration: 60 },
    { name: "Vaccination", price: 700, duration: 15 }
  ]

  for (const service of serviceData) {
    const created = await prisma.service.create({
      data: {
        name: service.name,
        price: service.price,
        durationMin: service.duration,
        description: faker.lorem.sentence()
      }
    })

    services.push(created)
  }

  console.log(`✔ Created ${services.length} services`)

  // -----------------------
  // CREATE APPOINTMENTS
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

  console.log(`✔ Created ${appointments.length} appointments`)

  console.log("✅ Seeding complete!")
}

main()
  .catch((e) => {
    console.error("❌ Seed failed:")
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })