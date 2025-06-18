import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
export function UnsubscribedLeads() {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-medium">Unsubscribed Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {unsubscribedLeads.map((lead) => (
            <div key={lead.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                  {lead.name.charAt(0)}
                </div>
                <div>
                  <div className="font-medium">{lead.name}</div>
                  <div className="text-sm text-gray-500">{lead.email}</div>
                </div>
              </div>
              <Badge variant="outline" className="text-red-500 border-red-200 bg-red-50">
                {lead.reason}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

const unsubscribedLeads = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    reason: "Opted Out",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "mchen@example.com",
    reason: "Bounced",
  },
  {
    id: "3",
    name: "Emma Wilson",
    email: "emma.w@example.com",
    reason: "Complained",
  },
  {
    id: "4",
    name: "James Rodriguez",
    email: "jrod@example.com",
    reason: "Opted Out",
  },
]
