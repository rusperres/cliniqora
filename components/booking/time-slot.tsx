type TimeSlotProps = {
  time: string
  selected?: boolean
  disabled?: boolean
  onClick?: () => void
}

export function TimeSlot({
  time,
  selected,
  disabled,
  onClick,
}: TimeSlotProps) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`
        rounded-md border px-3 py-2 text-sm transition
        ${
          disabled
            ? "cursor-not-allowed opacity-40"
            : "hover:bg-gray-100"
        }
        ${selected ? "border-black bg-black text-white" : ""}
      `}
    >
      {time}
    </button>
  )
}