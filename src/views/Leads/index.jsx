import React, { useEffect, useState, useMemo, useRef } from "react"
import { Search, Download, Plus, ChevronLeft, ChevronRight, Loader2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { getLeads } from "@/services/LeadService"

export default function Leads() {
  const searchTimeoutRef = useRef(null)
  const navigate = useNavigate()
  
  // Local state management
  const [leadsData, setLeadsData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalLeads, setTotalLeads] = useState(0)
  const [itemsPerPage] = useState(10)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("")
  const [territoryFilter, setTerritoryFilter] = useState("")

  // Fetch leads on component mount and when filters change
  useEffect(() => {
    getLeadsData()
  }, [currentPage])

  const getLeadsData = async () => {
    setIsLoading(true)
    setError(null)
    
    try {
      const response = await getLeads({
        page: currentPage,
      })
      
      setLeadsData(response.results || [])
      setTotalLeads(response.count || 0)
    } catch (error) {
      console.log("🚀 ~ getLeads ~ error:", error)
      setError(error?.detail || error?.message || 'Failed to fetch leads')
    } finally {
      setIsLoading(false)
    }
  }

  // Helper function to format date from API response
  const formatDate = (dateString) => {
    if (!dateString) return ''
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
      case "Lead":
        return "bg-green-100 text-green-800"
      case "In Progress":
        return "bg-yellow-100 text-yellow-800"
      case "Contacted":
        return "bg-blue-100 text-blue-800"
      case "Qualified":
        return "bg-purple-100 text-purple-800"
      case "Nurturing":
        return "bg-blue-100 text-blue-800"
      case "Converted":
        return "bg-teal-100 text-teal-800"
      case "Closed Lost":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const getInitialsColor = (initials) => {
    if (!initials || initials.length === 0) {
      return "bg-gray-100"
    }
    const colors = ["bg-blue-100", "bg-purple-100", "bg-green-100", "bg-yellow-100", "bg-red-100", "bg-teal-100"]
    const hash = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)
    return colors[hash % colors.length]
  }

  const getInitials = (name) => {
    if (!name) return "??"
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  // Calculate total pages with proper error handling
  const totalPages = useMemo(() => {
    if (!totalLeads || !itemsPerPage || itemsPerPage === 0) return 1
    return Math.ceil(totalLeads / itemsPerPage)
  }, [totalLeads, itemsPerPage])

  const handleSearchChange = (e) => {
    const query = e.target.value
    setSearchQuery(query)
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current)
    }
    
    // Set new timeout for debounced search
    searchTimeoutRef.current = setTimeout(() => {
      setCurrentPage(1) // Reset to first page when searching
    }, 500)
  }

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleStatusFilterChange = (value) => {
    setStatusFilter(value === "All Statuses" ? "" : value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleTerritoryFilterChange = (value) => {
    setTerritoryFilter(value === "All Territories" ? "" : value)
    setCurrentPage(1) // Reset to first page when filtering
  }

  const handleClearError = () => {
    setError(null)
  }

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-semibold">Leads</h1>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
            <Input
              type="search"
              placeholder="Search leads..."
              className="pl-8 w-64"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>
      </header>

      <div className="p-6">
        <div className="flex justify-between mb-6">
          <div className="flex space-x-4">
            <Select value={statusFilter || "All Statuses"} onValueChange={handleStatusFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="Lead">Lead</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Nurturing">Nurturing</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={territoryFilter || "All Territories"} onValueChange={handleTerritoryFilterChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Territories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Territories">All Territories</SelectItem>
                <SelectItem value="West Greenville-Spartanburg, SC">West Greenville-Spartanburg, SC</SelectItem>
                <SelectItem value="South Houston, TX">South Houston, TX</SelectItem>
                <SelectItem value="East Houston, TX">East Houston, TX</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" /> Export
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" /> Add Lead
            </Button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-6 flex justify-between items-center">
            <span>
              Error loading leads: {error}
            </span>
            <Button variant="ghost" size="sm" onClick={handleClearError}>
              ×
            </Button>
          </div>
        )}

        <div className="bg-white rounded-md shadow">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-xs text-gray-500 border-b">
                  <th className="text-left font-medium py-3 px-4">LEAD</th>
                  <th className="text-left font-medium py-3 px-4">CONTACT</th>
                  <th className="text-left font-medium py-3 px-4">TERRITORY</th>
                  <th className="text-left font-medium py-3 px-4">STATUS</th>
                  <th className="text-left font-medium py-3 px-4">SOURCE</th>
                  <th className="text-left font-medium py-3 px-4">ASSIGNED TO</th>
                  <th className="text-left font-medium py-3 px-4">DATE ADDED</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8">
                      <div className="flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                        <span>Loading leads...</span>
                      </div>
                    </td>
                  </tr>
                ) : leadsData?.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leadsData?.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50" >
                      <td className="py-4 px-4">
                        <div  className="flex items-center cursor-pointer" onClick={() => navigate(`/leads/${lead.id}`)} >
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${getInitialsColor(lead.initials || getInitials(lead.name))}`}
                          >
                            <span className="text-sm font-medium">{lead.initials || getInitials(lead.name)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div>
                          <div className="text-sm">{lead.email}</div>
                          <div className="text-xs text-gray-500">{lead.phone}</div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-sm">{lead.territory}</td>
                      <td className="py-4 px-4">
                        <Badge variant="outline" className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      </td>
                      <td className="py-4 px-4 text-sm">{lead.source}</td>
                      <td className="py-4 px-4 text-sm">{lead.assignedTo}</td>
                      <td className="py-4 px-4 text-sm">{formatDate(lead.dateAdded)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Showing {leadsData?.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, totalLeads)} of {totalLeads} results
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1 || isLoading}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Generate page buttons */}
              {(() => {
                const pages = []
                const maxVisiblePages = 7
                
                if (totalPages <= maxVisiblePages) {
                  // Show all pages if total is small
                  for (let i = 1; i <= totalPages; i++) {
                    pages.push(
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 ${currentPage === i ? "bg-blue-100" : ""}`}
                        disabled={isLoading}
                        onClick={() => handlePageChange(i)}
                      >
                        {i}
                      </Button>
                    )
                  }
                } else {
                  // Smart pagination for large page counts
                  const startPage = Math.max(1, currentPage - 2)
                  const endPage = Math.min(totalPages, currentPage + 2)
                  
                  // Always show first page
                  if (startPage > 1) {
                    pages.push(
                      <Button
                        key={1}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8"
                        disabled={isLoading}
                        onClick={() => handlePageChange(1)}
                      >
                        1
                      </Button>
                    )
                    
                    if (startPage > 2) {
                      pages.push(
                        <span key="ellipsis1" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                    }
                  }
                  
                  // Show pages around current page
                  for (let i = startPage; i <= endPage; i++) {
                    pages.push(
                      <Button
                        key={i}
                        variant="outline"
                        size="sm"
                        className={`h-8 w-8 ${currentPage === i ? "bg-blue-100" : ""}`}
                        disabled={isLoading}
                        onClick={() => handlePageChange(i)}
                      >
                        {i}
                      </Button>
                    )
                  }
                  
                  // Always show last page
                  if (endPage < totalPages) {
                    if (endPage < totalPages - 1) {
                      pages.push(
                        <span key="ellipsis2" className="px-2 text-gray-500">
                          ...
                        </span>
                      )
                    }
                    
                    pages.push(
                      <Button
                        key={totalPages}
                        variant="outline"
                        size="sm"
                        className="h-8 w-8"
                        disabled={isLoading}
                        onClick={() => handlePageChange(totalPages)}
                      >
                        {totalPages}
                      </Button>
                    )
                  }
                }
                
                return pages
              })()}

              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === totalPages || isLoading}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
