
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  { day: "Mon", count: 3 },
  { day: "Tue", count: 2 },
  { day: "Wed", count: 5 },
  { day: "Thu", count: 4 },
  { day: "Fri", count: 3 },
  { day: "Sat", count: 2 },
  { day: "Sun", count: 4 },
]

export function UnsubscribedLeadsGraph() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Unsubscribed Leads</CardTitle>
        <div className="text-sm text-red-500 font-medium">5 this week</div>
      </CardHeader>
      <CardContent>
        <div className="h-[150px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="day" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis
                stroke="#888888"
                fontSize={12}
                tickLine={false}
                axisLine={false}
                tickFormatter={(value) => `${value}`}
              />
              <Bar dataKey="count" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-500">Total Unsubscribed</div>
            <div className="text-xl font-bold text-red-600">23</div>
          </div>
          <div className="bg-gray-50 p-3 rounded-lg text-center">
            <div className="text-sm text-gray-500">Unsubscribe Rate</div>
            <div className="text-xl font-bold text-red-600">2.4%</div>
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button className="text-sm text-blue-600 hover:underline">View unsubscribed leads →</button>
        </div>
      </CardContent>
    </Card>
  )
}
