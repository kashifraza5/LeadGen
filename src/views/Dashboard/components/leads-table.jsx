import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

/**
 * @typedef {Object} Lead
 * @property {string} id
 * @property {string} name
 * @property {string} email
 * @property {string} phone
 * @property {string} source
 * @property {"New" | "Contacted" | "Qualified" | "Follow-up" | "Disqualified"} status
 * @property {string} addedTime
 */

// Static recent leads data
const recentLeads = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    source: "Website",
    status: "New",
    addedTime: "Added 2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    source: "Referral",
    status: "Contacted",
    addedTime: "Added 3 hours ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "(555) 456-7890",
    source: "LinkedIn",
    status: "Qualified",
    addedTime: "Added 4 hours ago",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "(555) 789-0123",
    source: "Event",
    status: "Disqualified",
    addedTime: "Added 5 hours ago",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "(555) 321-6547",
    source: "Website",
    status: "New",
    addedTime: "Added 6 hours ago",
  },
  {
    id: "6",
    name: "Diana Prince",
    email: "diana.prince@example.com",
    phone: "(555) 654-3210",
    source: "Social Media",
    status: "Follow-up",
    addedTime: "Added 7 hours ago",
  },
  {
    id: "7",
    name: "Ethan Hunt",
    email: "ethan.hunt@example.com",
    phone: "(555) 987-1234",
    source: "Email Campaign",
    status: "New",
    addedTime: "Added 8 hours ago",
  },
  {
    id: "8",
    name: "Fiona Gallagher",
    email: "fiona.gallagher@example.com",
    phone: "(555) 456-1237",
    source: "Website",
    status: "Contacted",
    addedTime: "Added 9 hours ago",
  },
  {
    id: "9",
    name: "George Lucas",
    email: "george.lucas@example.com",
    phone: "(555) 789-4561",
    source: "Referral",
    status: "Qualified",
    addedTime: "Added 10 hours ago",
  },
  {
    id: "10",
    name: "Helen Keller",
    email: "helen.keller@example.com",
    phone: "(555) 321-9876",
    source: "Event",
    status: "New",
    addedTime: "Added 11 hours ago",
  },
]

export function LeadsTable() {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages] = useState(3) // Mock pagination

  useEffect(() => {
    fetchRecentLeads()
  }, [])

  const fetchRecentLeads = async () => {
    setIsLoading(true)
    setError(null)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))
      setLeads(recentLeads)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch leads")
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
        return "bg-green-100 text-green-800"
      case "Contacted":
        return "bg-blue-100 text-blue-800"
      case "Qualified":
        return "bg-purple-100 text-purple-800"
      case "Follow-up":
        return "bg-amber-100 text-amber-800"
      case "Disqualified":
        return "bg-red-100 text-red-800"
    }
  }

  const getInitialsColor = (name) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-amber-500", "bg-red-500"]
    const hash = name.charCodeAt(0) + (name.charCodeAt(1) || 0)
    return colors[hash % colors.length]
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const filteredLeads = filter === "new" ? leads.filter((lead) => lead.status === "New") : leads
  const newLeadsCount = leads.filter((lead) => lead.status === "New").length

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Today's Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="ghost" size="sm" onClick={fetchRecentLeads}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Today's Leads</CardTitle>
        <div className="flex items-center space-x-2">
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <div className="text-sm text-green-600 font-medium">{newLeadsCount} New Today</div>
          )}
          <select
            className="text-sm border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Leads</option>
            <option value="new">New Only</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-gray-500">Loading leads...</span>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="text-left font-medium py-2 px-4">LEAD NAME</th>
                    <th className="text-left font-medium py-2 px-4">PHONE NUMBER</th>
                    <th className="text-left font-medium py-2 px-4">EMAIL</th>
                    <th className="text-left font-medium py-2 px-4">SOURCE</th>
                    <th className="text-left font-medium py-2 px-4">STATUS</th>
                    <th className="text-right font-medium py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLeads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0">
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <Avatar className="h-8 w-8 mr-2">
                            <AvatarFallback className={getInitialsColor(lead.name)}>
                              {getInitials(lead.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.addedTime}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm">{lead.phone}</td>
                      <td className="py-3 px-4 text-sm">{lead.email}</td>
                      <td className="py-3 px-4 text-sm">{lead.source}</td>
                      <td className="py-3 px-4">
                        <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(lead.status))}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button variant="ghost" size="sm" onClick={() => (window.location.href = `/leads/${lead.id}`)}>
                          View
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredLeads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No leads found</p>
              </div>
            )}

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing 1 to {filteredLeads.length} of {leads.length} leads
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" className={cn("h-8 w-8", currentPage === 1 && "bg-blue-100")}>
                  1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8">
                  3
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
