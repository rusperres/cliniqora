import { Card } from "@/components/ui/card"

type DoctorCardProps = {
  name: string
  specialty: string
  selected?: boolean
  onClick?: () => void
}

export function DoctorCard({
  name,
  specialty,
  selected,
  onClick,
}: DoctorCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer p-4 transition hover:shadow-md ${
        selected ? "border-black" : ""
      }`}
    >
      <h3 className="font-medium">{name}</h3>
      <p className="text-sm text-gray-500">{specialty}</p>
    </Card>
  )
}