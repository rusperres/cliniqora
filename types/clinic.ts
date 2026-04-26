export type Doctor = {
  id: string
  name: string
  specialty: string
  image?: string | null
}

export type Service = {
  id: string
  name: string
  description?: string | null
  durationMin: number
  price: number
}

/**
 * Used for booking UI flow
 */
export type BookingStep = "service" | "doctor" | "time" | "confirm"

export type TimeSlot = {
  start: string
  end: string
  available: boolean
}