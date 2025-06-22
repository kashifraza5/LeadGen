import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

export function TodaysLeads() {
  const sources = [
    { name: "Website", count: 12, color: "bg-blue-500" },
    { name: "Referral", count: 6, color: "bg-orange-500" },
    { name: "Email", count: 4, color: "bg-green-500" },
    { name: "Social", count: 2, color: "bg-purple-500" },
  ]

  const totalLeads = sources.reduce((acc, source) => acc + source.count, 0)

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Today's Leads</CardTitle>
        <div className="text-sm text-green-600 font-medium">+12 today</div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500">Total</div>
            <div className="text-2xl font-bold text-blue-600">24</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <div className="text-sm text-gray-500">Contacted</div>
            <div className="text-2xl font-bold text-purple-600">8</div>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium mb-2">Source Breakdown</h4>
          <div className="space-y-2">
            {sources.map((source) => (
              <div key={source.name} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className={`w-3 h-3 rounded-full ${source.color} mr-2`}></div>
                    <span>
                      {source.name} ({source.count})
                    </span>
                  </div>
                  <span>{Math.round((source.count / totalLeads) * 100)}%</span>
                </div>
                <Progress value={(source.count / totalLeads) * 100} className={`h-1.5 ${source.color}`} />
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-center mt-4">
          <button className="text-sm text-blue-600 hover:underline">View all leads →</button>
        </div>
      </CardContent>
    </Card>
  )
}
