
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

interface CampaignDetailsFormProps {
  campaignData: {
    name: string
    description: string
    startDate: string
    endDate: string
    targetAudience: string
  }
  onInputChange: (field: string, value: string) => void
  onNext: () => void
}

export function DetailsForm({ campaignData, onInputChange, onNext }: CampaignDetailsFormProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Campaign Details</h2>
        <p className="text-gray-500 mt-1">Provide basic information about your campaign.</p>
      </div>

      <div className="space-y-4">
        <div>
          <label htmlFor="campaign-name" className="block text-sm font-medium text-gray-700 mb-1">
            Campaign Name
          </label>
          <Input
            id="campaign-name"
            value={campaignData.name}
            onChange={(e) => onInputChange("name", e.target.value)}
            placeholder="Summer Promotion 2023"
            className="w-full"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={campaignData.description}
            onChange={(e) => onInputChange("description", e.target.value)}
            placeholder="Describe the purpose and goals of this campaign"
            className="w-full min-h-[120px]"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="start-date" className="block text-sm font-medium text-gray-700 mb-1">
              Start Date
            </label>
            <div className="relative">
              <Input
                id="start-date"
                type="date"
                value={campaignData.startDate}
                onChange={(e) => onInputChange("startDate", e.target.value)}
                className="w-full"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="end-date" className="block text-sm font-medium text-gray-700 mb-1">
              End Date
            </label>
            <div className="relative">
              <Input
                id="end-date"
                type="date"
                value={campaignData.endDate}
                onChange={(e) => onInputChange("endDate", e.target.value)}
                className="w-full"
              />
              <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div>
          <label htmlFor="target-audience" className="block text-sm font-medium text-gray-700 mb-1">
            Target Audience
          </label>
          <Select value={campaignData.targetAudience} onValueChange={(value) => onInputChange("targetAudience", value)}>
            <SelectTrigger id="target-audience" className="w-full">
              <SelectValue placeholder="Select a target audience" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all-leads">All Leads</SelectItem>
              <SelectItem value="new-leads">New Leads</SelectItem>
              <SelectItem value="qualified-leads">Qualified Leads</SelectItem>
              <SelectItem value="customers">Existing Customers</SelectItem>
              <SelectItem value="inactive">Inactive Leads</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Next
        </Button>
      </div>
    </div>
  )
}
