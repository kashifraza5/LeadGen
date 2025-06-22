
import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { day: "Mon", email: 25, sms: 15, call: 10 },
  { day: "Tue", email: 40, sms: 20, call: 15 },
  { day: "Wed", email: 35, sms: 25, call: 20 },
  { day: "Thu", email: 50, sms: 30, call: 25 },
  { day: "Fri", email: 65, sms: 35, call: 30 },
  { day: "Sat", email: 60, sms: 30, call: 25 },
  { day: "Sun", email: 50, sms: 25, call: 20 },
]

export function LeadResponsesGraph() {
  const [viewMode, setViewMode] = useState("weekly")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Lead Responses - Weekly Analytics</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "weekly" && "bg-blue-100")}
            onClick={() => setViewMode("weekly")}
          >
            Weekly
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "monthly" && "bg-blue-100")}
            onClick={() => setViewMode("monthly")}
          >
            Monthly
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="email"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Email Responses"
              />
              <Line
                type="monotone"
                dataKey="sms"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="SMS Responses"
              />
              <Line
                type="monotone"
                dataKey="call"
                stroke="#22c55e"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Call-back Requests"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="text-sm text-blue-800 font-medium">Email Response Rate</div>
            <div className="text-2xl font-bold text-blue-600">68%</div>
            <div className="text-xs text-blue-600">+2% from last week</div>
          </div>
          <div className="bg-purple-50 p-3 rounded-lg">
            <div className="text-sm text-purple-800 font-medium">SMS Response Rate</div>
            <div className="text-2xl font-bold text-purple-600">42%</div>
            <div className="text-xs text-purple-600">+5% from last week</div>
          </div>
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="text-sm text-green-800 font-medium">Call-back Rate</div>
            <div className="text-2xl font-bold text-green-600">31%</div>
            <div className="text-xs text-green-600">+3% from last week</div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <Button variant="link" size="sm" className="text-blue-600">
            View detailed response analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
