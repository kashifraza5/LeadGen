import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"
import { cn } from "@/lib/utils"

const data = [
  { day: "Mon", total: 15, contacted: 8 },
  { day: "Tue", total: 20, contacted: 12 },
  { day: "Wed", total: 18, contacted: 10 },
  { day: "Thu", total: 25, contacted: 15 },
  { day: "Fri", total: 22, contacted: 14 },
  { day: "Sat", total: 12, contacted: 5 },
  { day: "Sun", total: 10, contacted: 3 },
]

export function LeadsTrend() {
  const [viewMode, setViewMode] = useState("daily")

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Last 7 Days - Leads Trend</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "daily" && "bg-blue-100")}
            onClick={() => setViewMode("daily")}
          >
            Daily
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "weekly" && "bg-blue-100")}
            onClick={() => setViewMode("weekly")}
          >
            Weekly
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
                dataKey="total"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Total Leads"
              />
              <Line
                type="monotone"
                dataKey="contacted"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ r: 4 }}
                name="Contacted"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-center mt-4">
          <Button variant="link" size="sm" className="text-blue-600">
            View detailed analytics
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
