import { Card } from "@/components/ui/card"

type ServiceCardProps = {
  name: string
  description?: string
  price: number
  durationMin: number
  selected?: boolean
  onClick?: () => void
}

export function ServiceCard({
  name,
  description,
  price,
  durationMin,
  selected,
  onClick,
}: ServiceCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer p-4 transition hover:shadow-md ${
        selected ? "border-black" : ""
      }`}
    >
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-medium">{name}</h3>
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>

        <div className="text-right">
          <p className="font-semibold">₱{price}</p>
          <p className="text-xs text-gray-500">{durationMin} min</p>
        </div>
      </div>
    </Card>
  )
}