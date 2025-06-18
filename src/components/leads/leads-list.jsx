import React, { useEffect } from "react"
import { Search, Download, Plus, ChevronLeft, ChevronRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { useLeadsStore } from "@/store/leads-store"

export function LeadsList() {
  const {
    leads,
    totalLeads,
    currentPage,
    itemsPerPage,
    statusFilter,
    territoryFilter,
    searchQuery,
    isLoading,
    error,
    fetchLeads,
    setStatusFilter,
    setTerritoryFilter,
    setSearchQuery,
    setCurrentPage,
    clearError,
  } = useLeadsStore()

  // Fetch leads on component mount
  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  const getStatusColor = (status) => {
    switch (status) {
      case "New":
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

  const totalPages = Math.ceil(totalLeads / itemsPerPage)

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value)
  }

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
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Statuses">All Statuses</SelectItem>
                <SelectItem value="New">New</SelectItem>
                <SelectItem value="In Progress">In Progress</SelectItem>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Qualified">Qualified</SelectItem>
                <SelectItem value="Nurturing">Nurturing</SelectItem>
                <SelectItem value="Converted">Converted</SelectItem>
                <SelectItem value="Closed Lost">Closed Lost</SelectItem>
              </SelectContent>
            </Select>

            <Select value={territoryFilter} onValueChange={setTerritoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Territories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All Territories">All Territories</SelectItem>
                <SelectItem value="North Region">North Region</SelectItem>
                <SelectItem value="South Region">South Region</SelectItem>
                <SelectItem value="East Region">East Region</SelectItem>
                <SelectItem value="West Region">West Region</SelectItem>
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
            <span>Error loading leads: {error}</span>
            <Button variant="ghost" size="sm" onClick={clearError}>
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
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-2">Loading leads...</span>
                      </div>
                    </td>
                  </tr>
                ) : leads.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500">
                      No leads found
                    </td>
                  </tr>
                ) : (
                  leads.map((lead) => (
                    <tr key={lead.id} className="border-b last:border-0 hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <Link to={`/leads/${lead.id}`} className="flex items-center">
                          <div
                            className={`h-8 w-8 rounded-full flex items-center justify-center mr-3 ${getInitialsColor(lead.initials || getInitials(lead.name))}`}
                          >
                            <span className="text-sm font-medium">{lead.initials || getInitials(lead.name)}</span>
                          </div>
                          <div>
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-xs text-gray-500">{lead.id}</div>
                          </div>
                        </Link>
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
                      <td className="py-4 px-4 text-sm">{lead.dateAdded}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between px-4 py-3 border-t">
            <div className="text-sm text-gray-500">
              Showing {leads.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0} to{" "}
              {Math.min(currentPage * itemsPerPage, totalLeads)} of {totalLeads} results
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                disabled={currentPage === 1 || isLoading}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>

              {/* Generate page buttons */}
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                const pageNumber = i + 1
                return (
                  <Button
                    key={pageNumber}
                    variant="outline"
                    size="sm"
                    className={`h-8 w-8 ${currentPage === pageNumber ? "bg-blue-100" : ""}`}
                    disabled={isLoading}
                    onClick={() => setCurrentPage(pageNumber)}
                  >
                    {pageNumber}
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
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
