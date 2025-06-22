import React, { useState, useEffect, useCallback, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ChevronLeft, ChevronRight, Loader2, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { getLeads } from "@/services/LeadService"

const LeadsTable = () => {
  const [leads, setLeads] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")
  const [territoryFilter, setTerritoryFilter] = useState("All Territories")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalLeads, setTotalLeads] = useState(0)

  useEffect(() => {
    // fetchLeads()
    dispatch(fetchLeads())
  }, [filter, territoryFilter, currentPage])

  // const fetchLeads = async () => {
  //   setIsLoading(true)
  //   setError(null)

  //   try {
  //     const response = await leadsApiService.getLeads({
  //       status: filter === "new" ? "New" : undefined,
  //       territory: territoryFilter === "All Territories" ? undefined : territoryFilter,
  //       page: currentPage,
  //       limit: 10,
  //     })

  //     setLeads(response.leads)
  //     setTotalPages(response.totalPages)
  //     setTotalLeads(response.total)
  //   } catch (err) {
  //     setError(err instanceof Error ? err.message : "Failed to fetch leads")
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }

  const getStatusColor = useCallback((status) => {
    const statusColors = {
      "New": "bg-green-100 text-green-800",
      "Contacted": "bg-blue-100 text-blue-800",
      "Qualified": "bg-purple-100 text-purple-800",
      "Proposal": "bg-amber-100 text-amber-800",
      "Closed Won": "bg-emerald-100 text-emerald-800",
      "Closed Lost": "bg-red-100 text-red-800"
    }
    return statusColors[status] || "bg-gray-100 text-gray-800"
  }, [])

  const getInitialsColor = useCallback((initials) => {
    const colors = ["bg-blue-500", "bg-purple-500", "bg-green-500", "bg-amber-500", "bg-red-500"]
    const hash = initials.charCodeAt(0) + (initials.charCodeAt(1) || 0)
    return colors[hash % colors.length]
  }, [])

  const getInitials = useCallback((name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }, [])

  const formatDate = useCallback((dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 1) {
      return "Added just now"
    } else if (diffInHours < 24) {
      return `Added ${Math.floor(diffInHours)} hours ago`
    } else {
      return `Added ${Math.floor(diffInHours / 24)} days ago`
    }
  }, [])

  const newLeadsCount = useMemo(() => 
    leads.filter((lead) => lead.status === "New").length, 
    [leads]
  )

  const handleTerritoryFilterChange = useCallback((e) => {
    setTerritoryFilter(e.target.value)
  }, [])

  const handleClearError = useCallback(() => {
    setError(null)
  }, [])

  const handleRetry = useCallback(() => {
    // fetchLeads()
  }, [])

  const handlePageChange = useCallback((newPage) => {
    setCurrentPage(newPage)
  }, [])

  const handleViewLead = useCallback((leadId) => {
    window.location.href = `/leads/${leadId}`
  }, [])

  // Render error state
  const renderErrorState = () => (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Today's Leads</CardTitle>
      </CardHeader>
      <CardContent>
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" onClick={handleClearError}>
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  )

  // Render loading state
  const renderLoadingState = () => (
    <div className="flex items-center justify-center py-8">
      <Loader2 className="h-6 w-6 animate-spin mr-2" />
      <span className="text-sm text-gray-500">Loading leads...</span>
    </div>
  )

  // Render empty state
  const renderEmptyState = () => (
    <div className="text-center py-8 text-gray-500">
      <p>No leads found</p>
    </div>
  )

  // Render lead row
  const renderLeadRow = useCallback((lead) => (
    <tr key={lead.id} className="border-b last:border-0">
      <td className="py-3 px-4">
        <div className="flex items-center">
          <Avatar className="h-8 w-8 mr-2">
            <AvatarFallback className={getInitialsColor(getInitials(lead.name))}>
              {getInitials(lead.name)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{lead.name}</div>
            <div className="text-xs text-gray-500">{formatDate(lead.createdAt)}</div>
          </div>
        </div>
      </td>
      <td className="py-3 px-4 text-sm">{lead.phone}</td>
      <td className="py-3 px-4 text-sm">{lead.email}</td>
      <td className="py-3 px-4 text-sm">{lead.territory}</td>
      <td className="py-3 px-4">
        <span className={cn("text-xs px-2 py-1 rounded-full", getStatusColor(lead.status))}>
          {lead.status}
        </span>
      </td>
      <td className="py-3 px-4 text-right">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => handleViewLead(lead.id)}
        >
          View
        </Button>
      </td>
    </tr>
  ), [getInitialsColor, getInitials, formatDate, getStatusColor, handleViewLead])

  // Render pagination buttons
  const renderPaginationButtons = useCallback(() => {
    return Array.from({ length: Math.min(3, totalPages) }, (_, i) => (
      <Button
        key={i + 1}
        variant="outline"
        size="sm"
        className={cn("h-8 w-8", currentPage === i + 1 && "bg-blue-100")}
        onClick={() => handlePageChange(i + 1)}
        disabled={isLoading}
      >
        {i + 1}
      </Button>
    ))
  }, [totalPages, currentPage, isLoading, handlePageChange])

  if (error) {
    return renderErrorState()
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
            value={territoryFilter}
            onChange={handleTerritoryFilterChange}
            disabled={isLoading}
          >
            <option>All Territories</option>
            <option>North Region</option>
            <option>South Region</option>
            <option>East Region</option>
            <option>West Region</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? renderLoadingState() : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-xs text-gray-500 border-b">
                    <th className="text-left font-medium py-2 px-4">LEAD NAME</th>
                    <th className="text-left font-medium py-2 px-4">PHONE NUMBER</th>
                    <th className="text-left font-medium py-2 px-4">EMAIL</th>
                    <th className="text-left font-medium py-2 px-4">TERRITORY</th>
                    <th className="text-left font-medium py-2 px-4">STATUS</th>
                    <th className="text-right font-medium py-2 px-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {leads.map(renderLeadRow)}
                </tbody>
              </table>
            </div>

            {leads.length === 0 && renderEmptyState()}

            <div className="flex items-center justify-between mt-4">
              <div className="text-sm text-gray-500">
                Showing {(currentPage - 1) * 10 + 1} to {Math.min(currentPage * 10, totalLeads)} of {totalLeads} leads
              </div>
              <div className="flex items-center space-x-1">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1 || isLoading}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                {renderPaginationButtons()}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages || isLoading}
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

export { LeadsTable }
