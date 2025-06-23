import { useEffect, useState } from "react"
import { Search, Bell, AlertCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarView } from "./calendar-view"
import { LeadsTrend } from "./leads-trend"
// import { TodaysLeads } from "./todays-leads"
import { TodaysActivities } from "./todays-activities"
import { UnsubscribedLeads } from "./unsubscribed-leads"
import { LeadsTable } from "./leads-table"
import { LeadResponses } from "./lead-responses"
import { LeadResponsesGraph } from "./lead-responses-graph"
import { UnsubscribedLeadsGraph } from "./unsubscribed-leads-graph"

// Dummy data
const dummyDashboardData = {
  stats: {
    totalLeads: 1247,
    contactedLeads: 234,
    qualifiedLeads: 89,
    conversionRate: 7.2,
    weeklyGrowth: 12.5,
  },
  metrics: {
    totalLeads: 1247,
    newLeadsToday: 23,
    qualifiedLeads: 89,
    conversionRate: 7.2,
    totalRevenue: 2450000,
    monthlyRevenue: 245000,
    averageDealSize: 15000,
    activeCampaigns: 12,
  },
  leadsByStatus: [
    { status: "New", count: 156, percentage: 12.5 },
    { status: "Contacted", count: 234, percentage: 18.8 },
    { status: "Qualified", count: 89, percentage: 7.1 },
    { status: "Proposal", count: 45, percentage: 3.6 },
    { status: "Closed Won", count: 67, percentage: 5.4 },
    { status: "Closed Lost", count: 123, percentage: 9.9 },
  ],
  leadsBySource: [
    { source: "Website", count: 445, percentage: 35.7 },
    { source: "Referral", count: 298, percentage: 23.9 },
    { source: "Social Media", count: 187, percentage: 15.0 },
    { source: "Email Campaign", count: 156, percentage: 12.5 },
    { source: "Cold Outreach", count: 89, percentage: 7.1 },
    { source: "Events", count: 72, percentage: 5.8 },
  ],
  recentActivities: [
    {
      id: "1",
      type: "lead_created",
      message: "New lead John Smith added from website",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      user: "Sarah Johnson",
    },
    {
      id: "2",
      type: "deal_closed",
      message: "Deal with ABC Corp closed for $25,000",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      user: "Mike Wilson",
    },
    {
      id: "3",
      type: "campaign_sent",
      message: "Email campaign 'Q4 Newsletter' sent to 500 contacts",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: "System",
    },
  ],
  upcomingTasks: [
    {
      id: "1",
      title: "Follow up with John Smith",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      priority: "high",
      assignee: "Sarah Johnson",
    },
    {
      id: "2",
      title: "Prepare proposal for ABC Corp",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      priority: "medium",
      assignee: "Mike Wilson",
    },
  ],
}

const dummyRecentLeads = [
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
]

const dummyTodaysActivities = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    action: "Updated lead status to Qualified",
    time: "10:45 AM",
    lead: {
      name: "Michael Thompson",
    },
    icon: "check",
  },
  {
    id: "2",
    user: {
      name: "David Wilson",
      initials: "DW",
    },
    action: "Added notes to lead",
    time: "9:30 AM",
    lead: {
      name: "Jennifer Adams",
      note: "Client interested in premium package. Schedule follow-up next week.",
    },
    icon: "plus",
  },
  {
    id: "3",
    user: {
      name: "Alex Rodriguez",
      initials: "AR",
    },
    action: "Completed call with lead",
    time: "8:15 AM",
    lead: {
      name: "Robert Chen",
      note: "Duration: 15 minutes",
    },
    icon: "phone",
  },
  {
    id: "4",
    user: {
      name: "Emily Parker",
      initials: "EP",
    },
    action: "Scheduled a meeting with",
    time: "7:45 AM",
    lead: {
      name: "Samantha Lee",
      note: "Scheduled for Tomorrow, 2:00 PM",
    },
    icon: "message",
  },
]

const dummyLeadTrend = [
  { date: "2024-01-01", leads: 45, qualified: 12 },
  { date: "2024-01-02", leads: 52, qualified: 15 },
  { date: "2024-01-03", leads: 38, qualified: 8 },
  { date: "2024-01-04", leads: 61, qualified: 18 },
  { date: "2024-01-05", leads: 49, qualified: 14 },
  { date: "2024-01-06", leads: 55, qualified: 16 },
  { date: "2024-01-07", leads: 43, qualified: 11 },
]

const dummyResponseAnalytics = [
  { campaign: "Q4 Newsletter", sent: 1000, opened: 450, clicked: 89, responded: 23 },
  { campaign: "Product Launch", sent: 750, opened: 380, clicked: 76, responded: 19 },
  { campaign: "Holiday Special", sent: 500, opened: 275, clicked: 55, responded: 12 },
  { campaign: "Webinar Invite", sent: 300, opened: 180, clicked: 45, responded: 15 },
]

export default function DashboardContent() {
  const [dashboardData, setDashboardData] = useState(null)
  const [leadTrendData, setLeadTrendData] = useState([])
  const [responseAnalyticsData, setResponseAnalyticsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingTrend, setIsLoadingTrend] = useState(false)
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(false)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState({
    dateRange: "week",
  })

  // Simulate API calls with delays
  const fetchDashboardData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 800))
      setDashboardData(dummyDashboardData)
    } catch (error) {
      setError("Failed to fetch dashboard data")
    } finally {
      setIsLoading(false)
    }
  }

  const fetchLeadTrend = async () => {
    setIsLoadingTrend(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 600))
      setLeadTrendData(dummyLeadTrend)
    } catch (error) {
      setError("Failed to fetch lead trend data")
    } finally {
      setIsLoadingTrend(false)
    }
  }

  const fetchResponseAnalytics = async () => {
    setIsLoadingAnalytics(true)
    setError(null)
    try {
      await new Promise((resolve) => setTimeout(resolve, 500))
      setResponseAnalyticsData(dummyResponseAnalytics)
    } catch (error) {
      setError("Failed to fetch response analytics")
    } finally {
      setIsLoadingAnalytics(false)
    }
  }

  const clearError = () => setError(null)

  const refreshData = async () => {
    await Promise.all([fetchDashboardData(), fetchLeadTrend(), fetchResponseAnalytics()])
  }

  const handleRefresh = () => {
    refreshData()
  }

  const handleDateRangeChange = (dateRange) => {
    setFilters({ dateRange })
    // Simulate refetching data with new filters
    setTimeout(() => {
      refreshData()
    }, 300)
  }

  useEffect(() => {
    fetchDashboardData()
    fetchLeadTrend()
    fetchResponseAnalytics()
  }, [])

  if (isLoading && !dashboardData) {
    return (
      <div className="flex-1 overflow-auto">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateRangeChange("today")}
              className={filters.dateRange === "today" ? "bg-blue-100" : ""}
            >
              Today
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateRangeChange("week")}
              className={filters.dateRange === "week" ? "bg-blue-100" : ""}
            >
              Week
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleDateRangeChange("month")}
              className={filters.dateRange === "month" ? "bg-blue-100" : ""}
            >
              Month
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input type="search" placeholder="Search leads..." className="pl-8 w-64" />
          </div>
          <Button variant="ghost" size="icon" onClick={handleRefresh}>
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon">
            <span className="sr-only">User menu</span>
            <div className="h-8 w-8 rounded-full bg-gray-200" />
          </Button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="ghost" size="sm" onClick={clearError} className="h-auto p-0 ml-2">
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Overview */}
        {dashboardData?.stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-sm text-gray-500">Total Leads</div>
              <div className="text-2xl font-bold text-blue-600">{dashboardData.stats.totalLeads}</div>
              <div className="text-xs text-green-600">+{dashboardData.stats.weeklyGrowth}% this week</div>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-sm text-gray-500">Contacted</div>
              <div className="text-2xl font-bold text-purple-600">{dashboardData.stats.contactedLeads}</div>
              <div className="text-xs text-gray-500">
                {Math.round((dashboardData.stats.contactedLeads / dashboardData.stats.totalLeads) * 100)}% of total
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-sm text-gray-500">Qualified</div>
              <div className="text-2xl font-bold text-green-600">{dashboardData.stats.qualifiedLeads}</div>
              <div className="text-xs text-gray-500">
                {Math.round((dashboardData.stats.qualifiedLeads / dashboardData.stats.totalLeads) * 100)}% of total
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg border">
              <div className="text-sm text-gray-500">Conversion Rate</div>
              <div className="text-2xl font-bold text-orange-600">{dashboardData.stats.conversionRate}%</div>
              <div className="text-xs text-green-600">+2.1% from last month</div>
            </div>
          </div>
        )}

        <CalendarView />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeadsTrend />
          {/* <TodaysLeads /> */}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <TodaysActivities />
          <UnsubscribedLeads />
        </div>

        <LeadsTable />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LeadResponses />
          <UnsubscribedLeadsGraph />
        </div>

        <LeadResponsesGraph />
      </div>
    </div>
  )
}
