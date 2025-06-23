
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2 } from "lucide-react"

interface CampaignStepsFormProps {
  campaignData: any
  onInputChange: (field: string, value: any) => void
  onNext: () => void
  onBack: () => void
}

export function StepsForm({ campaignData, onInputChange, onNext, onBack }: CampaignStepsFormProps) {
  const [steps, setSteps] = useState([{ id: 1, type: "email", name: "Initial Email", delay: "0", content: "" }])

  const addStep = () => {
    const newStep = {
      id: steps.length + 1,
      type: "email",
      name: `Step ${steps.length + 1}`,
      delay: "1",
      content: "",
    }
    setSteps([...steps, newStep])
  }

  const removeStep = (id: number) => {
    if (steps.length > 1) {
      setSteps(steps.filter((step) => step.id !== id))
    }
  }

  const updateStep = (id: number, field: string, value: string) => {
    const updatedSteps = steps.map((step) => {
      if (step.id === id) {
        return { ...step, [field]: value }
      }
      return step
    })
    setSteps(updatedSteps)
    onInputChange("steps", updatedSteps)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Campaign Steps</h2>
        <p className="text-gray-500 mt-1">Define the sequence of actions in your campaign.</p>
      </div>

      <div className="space-y-6">
        {steps.map((step) => (
          <div key={step.id} className="border rounded-md p-4 bg-white">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-medium">Step {step.id}</h3>
              <Button variant="ghost" size="sm" onClick={() => removeStep(step.id)} disabled={steps.length === 1}>
                <Trash2 className="h-4 w-4 text-gray-500" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Type</label>
                <Select value={step.type} onValueChange={(value) => updateStep(step.id, "type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select step type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="sms">SMS</SelectItem>
                    <SelectItem value="call">Phone Call</SelectItem>
                    <SelectItem value="task">Task</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Step Name</label>
                <Input
                  value={step.name}
                  onChange={(e) => updateStep(step.id, "name", e.target.value)}
                  placeholder="Enter step name"
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Delay (days after previous step)</label>
              <Input
                type="number"
                min="0"
                value={step.delay}
                onChange={(e) => updateStep(step.id, "delay", e.target.value)}
                className="w-full md:w-1/4"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <Textarea
                value={step.content}
                onChange={(e) => updateStep(step.id, "content", e.target.value)}
                placeholder={`Enter ${step.type} content`}
                className="min-h-[100px]"
              />
            </div>
          </div>
        ))}

        <Button variant="outline" onClick={addStep} className="w-full border-dashed">
          <Plus className="h-4 w-4 mr-2" /> Add Another Step
        </Button>
      </div>

      <div className="flex justify-between pt-4">
        <Button variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button onClick={onNext} className="bg-blue-600 hover:bg-blue-700">
          Next
        </Button>
      </div>
    </div>
  )
}
