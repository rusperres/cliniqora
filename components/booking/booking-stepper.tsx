type Step = "service" | "doctor" | "schedule" | "confirm"

const steps: Step[] = ["service", "doctor", "schedule", "confirm"]

type BookingStepperProps = {
  currentStep: Step
}

export function BookingStepper({ currentStep }: BookingStepperProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      {steps.map((step, index) => {
        const active = step === currentStep
        const completed = steps.indexOf(currentStep) > index

        return (
          <div key={step} className="flex items-center gap-2">
            <div
              className={`
                h-2 w-2 rounded-full
                ${active || completed ? "bg-black" : "bg-gray-300"}
              `}
            />
            <span
              className={
                active ? "font-medium" : "text-gray-500"
              }
            >
              {step}
            </span>

            {index !== steps.length - 1 && (
              <span className="mx-2 text-gray-300">—</span>
            )}
          </div>
        )
      })}
    </div>
  )
}