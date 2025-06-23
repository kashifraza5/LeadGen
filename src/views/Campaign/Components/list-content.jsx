import { useEffect, useState, useMemo } from "react"
import { Search, Plus, Download, Mail, Zap, Video, Users, Loader2, X } from "lucide-react"
import { MdCampaign } from "react-icons/md";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useNavigate } from "react-router-dom"
import api from "@/services/api"

// Updated dummy data to match API response structure


export function ListContent() {
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [statusFilter, setStatusFilter] = useState("All")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [campaignsData, setCampaignsData] = useState([])

  const fetchCampaignsList = async (signal) => {
    try {
      setIsLoading(true)
      const response = await api.get(`campaign/advisor/list/`, { signal })
      console.log(response.data)
      if (response.data.campaigns && Array.isArray(response.data.campaigns)) {
        setCampaignsData(response.data.campaigns)
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        return // Request was aborted, don't set error
      }
      console.error("Error fetching campaigns list:", error)
      setError("Failed to fetch campaigns. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const abortController = new AbortController()
    fetchCampaignsList(abortController.signal)
    
    return () => {
      abortController.abort()
    }
  }, [])

  const itemsPerPage = 10

  // Filter campaigns based on search and status
  const filteredCampaigns = useMemo(() => {
    return campaignsData.filter((campaign) => {
      const matchesSearch = !searchTerm || 
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.advisor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.desc?.toLowerCase().includes(searchTerm.toLowerCase())
      
      const matchesStatus = statusFilter === "All" || campaign.status === statusFilter
      
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter, campaignsData])

  // Calculate pagination
  const totalItems = filteredCampaigns.length
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const campaigns = filteredCampaigns.slice(startIndex, endIndex)

  // Calculate stats
  const stats = useMemo(() => {
    const totalCampaigns = campaignsData.length
    const activeCampaigns = campaignsData.filter(c => c.status === "active").length
    const totalLeads = campaignsData.reduce((sum, c) => sum + c.total_leads, 0)
    const averageConversion = campaignsData.length > 0 
      ? campaignsData.reduce((sum, c) => sum + c.conversion_rate, 0) / campaignsData.length 
      : 0

    return {
      totalCampaigns,
      activeCampaigns,
      totalLeads,
      averageConversion,
    }
  }, [campaignsData])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [searchTerm, statusFilter])

  const handleStatusFilter = (status) => {
    setStatusFilter(status)
  }

  const clearError = () => {
    setError(null)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "scheduled":
        return "bg-blue-100 text-blue-800"
      case "draft":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getCampaignIcon = (type) => {
    switch (type) {
      case "email":
        return <Mail className="h-5 w-5 text-blue-600" />
      case "multi-channel":
        return <Zap className="h-5 w-5 text-purple-600" />
      case "webinar":
        return <Video className="h-5 w-5 text-blue-600" />
      case "referral":
        return <Users className="h-5 w-5 text-blue-600" />
      default:
        return <Mail className="h-5 w-5 text-blue-600" />
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    })
  }

  const getAdvisorInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase()
  }

  const startItem = totalItems > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0
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
            <Select value={statusFilter} onValueChange={handleStatusFilter} disabled={isLoading}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
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
                      <th className="text-left font-medium py-3 px-4">CREATED</th>
                      <th className="text-left font-medium py-3 px-4">UPDATED</th>
                      <th className="text-left font-medium py-3 px-4">LEADS</th>
                      <th className="text-left font-medium py-3 px-4">CONVERSION</th>
                      <th className="text-left font-medium py-3 px-4">ADVISOR</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaigns.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center py-8 text-gray-500">
                          No campaigns found
                        </td>
                      </tr>
                    ) : (
                      campaigns.map((campaign) => (
                        <tr key={campaign.id} className="border-b last:border-0 hover:bg-gray-50 cursor-pointer" onClick={() => navigate(`/campaigns/${campaign.id}`)}>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <div className="h-8 w-8 rounded-full bg-blue-50 flex items-center justify-center mr-3">
                              <MdCampaign className="h-6 w-6 text-blue-600" />
                              </div>
                              <div>
                                <div className="font-medium">{campaign.name}</div>
                                {/* <div className="text-xs text-gray-500">ID: {campaign.id}</div> */}
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <Badge variant="outline" className={getStatusColor(campaign.status)}>
                              {campaign.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-4 text-sm capitalize">{campaign.type}</td>
                          <td className="py-4 px-4 text-sm">{formatDate(campaign.created_at)}</td>
                          <td className="py-4 px-4 text-sm">{formatDate(campaign.updated_at)}</td>
                          <td className="py-4 px-4 text-sm">{campaign.total_leads}</td>
                          <td className="py-4 px-4 text-sm">{campaign.conversion_rate}%</td>
                          <td className="py-4 px-4">
                            <div className="flex items-center">
                              <Avatar className="h-7 w-7 mr-2">
                                <AvatarFallback className="bg-blue-100 text-blue-600 text-xs">
                                  {getAdvisorInitials(campaign.advisor.name)}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-sm">{campaign.advisor.name}</span>
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
