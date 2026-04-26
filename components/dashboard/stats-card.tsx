import { Card } from "@/components/ui/card"

type StatsCardProps = {
  label: string
  value: string | number
  subtext?: string
  trend?: number // optional % change
}

export function StatsCard({
  label,
  value,
  subtext,
  trend,
}: StatsCardProps) {
  const isPositive = trend && trend > 0

  return (
    <Card className="p-4">
      <p className="text-sm text-gray-500">{label}</p>

      <div className="mt-2 flex items-end justify-between">
        <h2 className="text-2xl font-semibold">{value}</h2>

        {trend !== undefined && (
          <span
            className={`text-xs font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {isPositive ? "+" : ""}
            {trend}%
          </span>
        )}
      </div>

      {subtext && (
        <p className="mt-1 text-xs text-gray-400">{subtext}</p>
      )}
    </Card>
  )
}