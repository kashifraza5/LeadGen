import { useEffect } from "react"
import { Search, Bell, AlertCircle, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { CalendarView } from "@/components/dashboard/calendar-view"
import { LeadsTrend } from "@/components/dashboard/leads-trend"
import { TodaysLeads } from "@/components/dashboard/todays-leads"
import { TodaysActivities } from "@/components/dashboard/todays-activities"
import { UnsubscribedLeads } from "@/components/dashboard/unsubscribed-leads"
import { LeadsTable } from "@/components/dashboard/leads-table"
import { LeadResponses } from "@/components/dashboard/lead-responses"
import { LeadResponsesGraph } from "@/components/dashboard/lead-responses-graph"
import { UnsubscribedLeadsGraph } from "@/components/dashboard/unsubscribed-leads-graph"
import { useDashboardStore } from "@/store/dashboard-store"

export function DashboardContent() {
  const { dashboardData, isLoading, error, fetchDashboardData, clearError, refreshData, filters, setFilters } =
    useDashboardStore()

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  const handleRefresh = () => {
    refreshData()
  }

  const handleDateRangeChange = (dateRange) => {
    setFilters({ dateRange })
  }

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
          <TodaysLeads />
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
