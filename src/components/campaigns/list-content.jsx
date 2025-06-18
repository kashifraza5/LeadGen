import { useEffect, useState } from "react"
import { Search, Plus, Download, Mail, Zap, Video, Users, Loader2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"
import { useCampaignsStore } from "@/store/campaigns-store"

export function ListContent() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")

  const {
    campaigns,
    stats,
    isLoading,
    error,
    currentPage,
    totalPages,
    totalItems,
    filters,
    fetchCampaigns,
    setFilters,
    setCurrentPage,
    clearError,
  } = useCampaignsStore()

  // Fetch campaigns on component mount
  useEffect(() => {
    fetchCampaigns()
  }, [fetchCampaigns])

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== (filters.search || "")) {
        setFilters({ search: searchTerm || undefined })
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, filters.search, setFilters])

  const handleStatusFilter = (status) => {
    setFilters({ status: status === "All" ? undefined : status })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "Active":
        return "bg-green-100 text-green-800"
      case "Scheduled":
        return "bg-blue-100 text-blue-800"
      case "Draft":
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCampaignIcon = (type) => {
    switch (type) {
      case "Email":
        return <Mail className="h-5 w-5 text-blue-600" />
      case "Multi-channel":
        return <Zap className="h-5 w-5 text-purple-600" />
      case "Webinar":
        return <Video className="h-5 w-5 text-blue-600" />
      case "Referral":
        return <Users className="h-5 w-5 text-blue-600" />
    }
  }

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    const end = new Date(endDate).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
    return `${start} - ${end}`
  }

  const itemsPerPage = 10
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Campaigns</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search campaigns..."
              className="pl-8 w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </header>

      <div className="p-6">
        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="ghost" size="sm" onClick={clearError} className="h-auto p-0 hover:bg-transparent">
                <X className="h-4 w-4" />
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Stats Cards */}
        {stats && (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-blue-600">{stats.totalCampaigns}</div>
              <div className="text-sm text-gray-500">Total Campaigns</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</div>
              <div className="text-sm text-gray-500">Active</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-orange-600">{stats.totalLeads}</div>
              <div className="text-sm text-gray-500">Total Leads</div>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl font-bold text-purple-600">{stats.averageConversion.toFixed(1)}%</div>
              <div className="text-sm text-gray-500">Avg. Conversion</div>
            </div>
          </div>
        )}

        <div className="flex justify-between mb-6">
          <div className="flex space-x-2">
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => navigate("/campaigns/create")}
              disabled={isLoading}
            >
              <Plus className="h-4 w-4 mr-2" /> New Campaign
            </Button>
            <Button variant="outline" disabled={isLoading}>
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Status:</span>
            <Select value={filters.status || "All"} onValueChange={handleStatusFilter} disabled={isLoading}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Scheduled">Scheduled</SelectItem>
                <SelectItem value="Draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-md shadow">
          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="ml-2 text-gray-600">Loading campaigns...</span>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="text-xs text-gray-500 border-b">
                      <th className="text-left font-medium py-3 px-4">CAMPAIGN</th>
                      <th className="text-left font-medium py-3 px-4">STATUS</th>
                      <th className="text-left font-medium py-3 px-4">TYPE</th>
                      <th className="text-left font-medium py-3 px-4">DATE RANGE</th>
                      <th className="text-left font-medium py-3 px-4">LEADS</th>
                      <th className="text-left font-medium py-3 px-4">CONVERSION</th>
                      <th className="text-left font-medium py-3 px-4">OWNER</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.length === 0 ? (
                      <tr>
                        <td colSpan={7} className="text-center py-8 text-gray-500">
                          No campaigns found
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b last:border-0 hover:bg-gray-50">
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                                {getCampaignIcon(campaign.type)}
                              </div>
                              <div>
                                <div className="font-medium">{campaign.name}</div>
                                <div className="text-xs text-gray-500">ID: {campaign.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm">{campaign.type}</td>
                          <td className="py-4 px-4 text-sm">{formatDateRange(campaign.startDate, campaign.endDate)}</td>
                          <td className="py-4 px-4 text-sm">{campaign.leads}</td>
                          <td className="py-4 px-4 text-sm">{campaign.conversion}%</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-7 w-7 mr-2">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                  {campaign.owner.initials}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{campaign.owner.name}</span>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between px-4 py-3 border-t">
                <div className="text-sm text-gray-500">
                  Showing {startItem} to {endItem} of {totalItems} results
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === 1 || isLoading}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <span className="sr-only">Previous page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </Button>

                  {/* Page numbers */}
                  {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                    const pageNum = i + 1
                    return (
                      <Button
                        key={pageNum}
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 ${currentPage === pageNum ? "bg-blue-100" : ""}`}
                        onClick={() => setCurrentPage(pageNum)}
                        disabled={isLoading}
                      >
                        {pageNum}
                      </Button>
                    )
                  })}

                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    disabled={currentPage === totalPages || isLoading}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <span className="sr-only">Next page</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
