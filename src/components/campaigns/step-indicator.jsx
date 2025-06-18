
export function StepIndicator({ currentStep }: StepIndicatorProps) {
  const steps = [
    { number: 1, title: "Campaign Details" },
    { number: 2, title: "Campaign Steps" },
    { number: 3, title: "Review & Launch" },
  ]

  return (
    <div className="flex items-center justify-center">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                currentStep >= step.number ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
              }`}
            >
              {step.number}
            </div>
            <span
              className={`mt-2 text-sm ${currentStep >= step.number ? "text-blue-600 font-medium" : "text-gray-500"}`}
            >
              {step.title}
            </span>
          </div>
          {index < steps.length - 1 && (
            <div className={`w-24 h-1 mx-2 ${currentStep > step.number ? "bg-blue-600" : "bg-gray-200"}`} />
          )}
        </div>
      ))}
    </div>
  )
}
