
import { Button } from "@/components/ui/button"

interface CampaignReviewFormProps {
  campaignData: any
  onNext: () => void
  onBack: () => void
}

export function ReviewForm({ campaignData, onNext, onBack }: CampaignReviewFormProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return "Not set"
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Review & Launch</h2>
        <p className="text-gray-500 mt-1">Review your campaign details before launching.</p>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Campaign Details</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
          <div>
            <h4 className="text-sm font-medium text-gray-500">Campaign Name</h4>
            <p className="mt-1">{campaignData.name || "Not set"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Target Audience</h4>
            <p className="mt-1">{campaignData.targetAudience || "Not set"}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">Start Date</h4>
            <p className="mt-1">{formatDate(campaignData.startDate)}</p>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-500">End Date</h4>
            <p className="mt-1">{formatDate(campaignData.endDate)}</p>
          </div>
        </div>

        <div className="mt-4">
          <h4 className="text-sm font-medium text-gray-500">Description</h4>
          <p className="mt-1">{campaignData.description || "No description provided."}</p>
        </div>
      </div>

      <div className="bg-white border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Campaign Steps</h3>

        {campaignData.steps && campaignData.steps.length > 0 ? (
          <div className="space-y-4">
            {campaignData.steps.map((step: any, index: number) => (
              <div key={step.id} className="border-b pb-4 last:border-b-0 last:pb-0">
                <div className="flex justify-between">
                  <h4 className="font-medium">
                    Step {index + 1}: {step.name}
                  </h4>
                  <span className="text-sm text-gray-500">
                    {step.type.charAt(0).toUpperCase() + step.type.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  {index === 0 ? "Starts immediately" : `Delay: ${step.delay} days after previous step`}
                </p>
                <div className="mt-2 text-sm">{step.content || "No content provided."}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No steps defined for this campaign.</p>
        )}
      </div>

      <div className="bg-white border rounded-md p-6">
        <h3 className="text-lg font-medium mb-4">Launch Options</h3>

        <div className="space-y-4">
          <div className="flex items-center">
            <input
              type="radio"
              id="launch-now"
              name="launch-option"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
              defaultChecked
            />
            <label htmlFor="launch-now" className="ml-2 block text-sm">
              Launch campaign immediately
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="launch-scheduled"
              name="launch-option"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="launch-scheduled" className="ml-2 block text-sm">
              Schedule launch for start date ({formatDate(campaignData.startDate)})
            </label>
          </div>

          <div className="flex items-center">
            <input
              type="radio"
              id="save-draft"
              name="launch-option"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <label htmlFor="save-draft" className="ml-2 block text-sm">
              Save as draft
            </label>
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Launch Campaign
        </Button>
      </div>
    </div>
  )
}
