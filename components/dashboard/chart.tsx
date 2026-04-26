type ChartProps = {
  title: string
  description?: string
  children?: React.ReactNode
}

export function Chart({ title, description, children }: ChartProps) {
  return (
    <div className="rounded-lg border bg-white p-4">
      <div className="mb-4">
        <h3 className="font-medium">{title}</h3>
        {description && (
          <p className="text-sm text-gray-500">{description}</p>
        )}
      </div>

      <div className="h-64 w-full">{children}</div>
    </div>
  )
}