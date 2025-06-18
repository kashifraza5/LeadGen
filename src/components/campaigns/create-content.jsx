import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { StepIndicator } from "@/components/campaigns/step-indicator"
import { DetailsForm } from "@/components/campaigns/details-form"
import { StepsForm } from "@/components/campaigns/steps-form"
import { ReviewForm } from "@/components/campaigns/review-form"

export function CreateContent() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [campaignData, setCampaignData] = useState({
    name: "",
    description: "",
    startDate: "",
    endDate: "",
    targetAudience: "",
    // Additional fields for other steps would go here
  })

  const handleInputChange = (field, value) => {
    setCampaignData({
      ...campaignData,
      [field]: value,
    })
  }

  const handleNext = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1)
    } else {
      // Submit the form
      console.log("Campaign data:", campaignData)
      // Redirect to campaigns page
      navigate("/campaigns")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Create New Campaign</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search..." className="pl-8 w-64" />
          </div>
        </div>
      </header>

      <div className="p-6">
        <StepIndicator currentStep={currentStep} />

        <div className="mt-8 max-w-4xl mx-auto">
          {currentStep === 1 && (
            <DetailsForm campaignData={campaignData} onInputChange={handleInputChange} onNext={handleNext} />
          )}

          {currentStep === 2 && (
            <StepsForm
              campaignData={campaignData}
              onInputChange={handleInputChange}
              onNext={handleNext}
              onBack={handleBack}
            />
          )}

          {currentStep === 3 && <ReviewForm campaignData={campaignData} onNext={handleNext} onBack={handleBack} />}
        </div>
      </div>
    </div>
  )
}
