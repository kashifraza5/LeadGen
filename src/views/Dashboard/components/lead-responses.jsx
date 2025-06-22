import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useState } from "react"

export function LeadResponses() {
  const [viewMode, setViewMode] = useState("weekly")

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Lead Responses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {leadResponses.map((response) => (
            <div key={response.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {response.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{response.name}</div>
                  <div className="text-sm text-gray-500">{response.campaign}</div>
                </div>
              </div>
              <Badge
                variant="outline"
                className={
                  response.status === "Positive"
                    ? "text-green-500 border-green-200 bg-green-50"
                    : response.status === "Neutral"
                      ? "text-yellow-500 border-yellow-200 bg-yellow-50"
                      : "text-red-500 border-red-200 bg-red-50"
                }
              >
                {response.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const leadResponses = [
  {
    id: "1",
    name: "Robert Smith",
    campaign: "Retirement Planning",
    status: "Positive",
  },
  {
    id: "2",
    name: "Jennifer Lee",
    campaign: "Investment Opportunities",
    status: "Neutral",
  },
  {
    id: "3",
    name: "David Brown",
    campaign: "Tax Planning",
    status: "Negative",
  },
  {
    id: "4",
    name: "Lisa Garcia",
    campaign: "Estate Planning",
    status: "Positive",
  },
]
