import  React from "react"

import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Users,
  Search,
  Mail,
  Phone,
  MapPin,
  Calendar,
  TrendingUp,
  Download,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send, Plus } from "lucide-react"
import { useCompanyEmployeesStore } from "@/store/company-employees-store"
import { createEmployeeData, inviteEmployeeData } from "@/services/company-employees-api"

export default function CompanyEmployeesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false)
  const [isInviteEmployeeOpen, setIsInviteEmployeeOpen] = useState(false)
  const [addEmployeeForm, setAddEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    location: "",
  })
  const [inviteEmployeeForm, setInviteEmployeeForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    role: "",
    message: "",
  })

  const {
    employees,
    stats,
    isLoadingEmployees,
    isLoadingStats,
    isCreatingEmployee,
    isInvitingEmployee,
    employeesError,
    statsError,
    createError,
    inviteError,
    fetchEmployees,
    fetchStats,
    createEmployee,
    inviteEmployee,
    clearErrors,
  } = useCompanyEmployeesStore()

  useEffect(() => {
    fetchEmployees()
    fetchStats()
  }, [fetchEmployees, fetchStats])

  const filteredEmployees = employees.filter((employee) => {
    const matchesSearch =
      employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === "all" || employee.role === roleFilter
    const matchesStatus = statusFilter === "all" || employee.status === statusFilter

    return matchesSearch && matchesRole && matchesStatus
  })

  const getStatusBadge = (status) => {
    switch (status) {
      case "Active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "On Leave":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            On Leave
          </Badge>
        )
      case "Inactive":
        return <Badge variant="destructive">Inactive</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const handleAddEmployee = async (e) => {
    e.preventDefault()
    await createEmployee(addEmployeeForm)
    if (!createError) {
      setIsAddEmployeeOpen(false)
      setAddEmployeeForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        location: "",
      })
    }
  }

  const handleInviteEmployee = async (e) => {
    e.preventDefault()
    await inviteEmployee(inviteEmployeeForm)
    if (!inviteError) {
      setIsInviteEmployeeOpen(false)
      setInviteEmployeeForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        role: "",
        message: "",
      })
    }
  }

  const handleRetry = () => {
    clearErrors()
    fetchEmployees()
    fetchStats()
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Employees</h1>
            <p className="text-gray-600">Manage your team members and their information</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" disabled={isLoadingEmployees}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>

            <Dialog open={isAddEmployeeOpen} onOpenChange={setIsAddEmployeeOpen}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Add New Employee</DialogTitle>
                </DialogHeader>
                {createError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{createError}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleAddEmployee} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={addEmployeeForm.firstName}
                        onChange={(e) => setAddEmployeeForm((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={addEmployeeForm.lastName}
                        onChange={(e) => setAddEmployeeForm((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={addEmployeeForm.email}
                      onChange={(e) => setAddEmployeeForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={addEmployeeForm.phone}
                      onChange={(e) => setAddEmployeeForm((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Select
                      value={addEmployeeForm.role}
                      onValueChange={(value) => setAddEmployeeForm((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Senior Advisor">Senior Advisor</SelectItem>
                        <SelectItem value="Lead Advisor">Lead Advisor</SelectItem>
                        <SelectItem value="Advisor">Advisor</SelectItem>
                        <SelectItem value="Junior Advisor">Junior Advisor</SelectItem>
                        <SelectItem value="Support Advisor">Support Advisor</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={addEmployeeForm.location}
                      onChange={(e) => setAddEmployeeForm((prev) => ({ ...prev, location: e.target.value }))}
                      placeholder="e.g., New York, NY"
                    />
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsAddEmployeeOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isCreatingEmployee}>
                      {isCreatingEmployee ? "Adding..." : "Add Employee"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>

            <Dialog open={isInviteEmployeeOpen} onOpenChange={setIsInviteEmployeeOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Send className="mr-2 h-4 w-4" />
                  Invite Employee
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Invite New Employee</DialogTitle>
                </DialogHeader>
                {inviteError && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{inviteError}</AlertDescription>
                  </Alert>
                )}
                <form onSubmit={handleInviteEmployee} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="inviteFirstName">First Name</Label>
                      <Input
                        id="inviteFirstName"
                        value={inviteEmployeeForm.firstName}
                        onChange={(e) => setInviteEmployeeForm((prev) => ({ ...prev, firstName: e.target.value }))}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="inviteLastName">Last Name</Label>
                      <Input
                        id="inviteLastName"
                        value={inviteEmployeeForm.lastName}
                        onChange={(e) => setInviteEmployeeForm((prev) => ({ ...prev, lastName: e.target.value }))}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inviteEmail">Email</Label>
                    <Input
                      id="inviteEmail"
                      type="email"
                      value={inviteEmployeeForm.email}
                      onChange={(e) => setInviteEmployeeForm((prev) => ({ ...prev, email: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="invitePhone">Phone Number</Label>
                    <Input
                      id="invitePhone"
                      type="tel"
                      value={inviteEmployeeForm.phone}
                      onChange={(e) => setInviteEmployeeForm((prev) => ({ ...prev, phone: e.target.value }))}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inviteRole">Role</Label>
                    <Select
                      value={inviteEmployeeForm.role}
                      onValueChange={(value) => setInviteEmployeeForm((prev) => ({ ...prev, role: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Senior Advisor">Senior Advisor</SelectItem>
                        <SelectItem value="Lead Advisor">Lead Advisor</SelectItem>
                        <SelectItem value="Advisor">Advisor</SelectItem>
                        <SelectItem value="Junior Advisor">Junior Advisor</SelectItem>
                        <SelectItem value="Support Advisor">Support Advisor</SelectItem>
                        <SelectItem value="Admin">Admin</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="inviteMessage">Invitation Message (Optional)</Label>
                    <Textarea
                      id="inviteMessage"
                      value={inviteEmployeeForm.message}
                      onChange={(e) => setInviteEmployeeForm((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Welcome to our team! Please check your email for login instructions..."
                      rows={3}
                    />
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <p className="text-sm text-blue-800">
                      <strong>Note:</strong> An invitation email will be sent to the employee with a link to set up
                      their password and access their account.
                    </p>
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <Button type="button" variant="outline" onClick={() => setIsInviteEmployeeOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isInvitingEmployee}>
                      {isInvitingEmployee ? "Sending..." : "Send Invitation"}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Error Alert */}
        {(employeesError || statsError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load employee data. Please try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Employee Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {isLoadingStats ? (
            Array.from({ length: 4 }).map((_, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-16" />
                    </div>
                    <Skeleton className="h-8 w-8 rounded" />
                  </div>
                  <Skeleton className="h-4 w-32 mt-2" />
                </CardContent>
              </Card>
            ))
          ) : stats ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Total Employees</p>
                      <p className="text-2xl font-bold">{stats.total}</p>
                    </div>
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex items-center mt-2">
                    <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-sm text-green-600">+{stats.growth}% growth</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Active</p>
                      <p className="text-2xl font-bold">{stats.active}</p>
                    </div>
                    <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-green-600 rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round((stats.active / stats.total) * 100)}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">On Leave</p>
                      <p className="text-2xl font-bold">{stats.onLeave}</p>
                    </div>
                    <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="h-4 w-4 bg-yellow-600 rounded-full" />
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    {Math.round((stats.onLeave / stats.total) * 100)}% of total
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Avg. Tenure</p>
                      <p className="text-2xl font-bold">2.3y</p>
                    </div>
                    <Calendar className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-sm text-gray-600 mt-2">Company average</p>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>

        {/* Search and Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search employees by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="On Leave">On Leave</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Employee Table */}
        <Card>
          <CardHeader>
            <CardTitle>Employee Directory ({filteredEmployees.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingEmployees ? (
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex items-center space-x-4 p-4 border rounded">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="space-y-2 flex-1">
                      <Skeleton className="h-4 w-48" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Employee</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Join Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredEmployees.map((employee) => (
                    <TableRow key={employee.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{getInitials(employee.name)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-600">{employee.email}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3 text-gray-400" />
                            <span>{employee.email}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Phone className="h-3 w-3 text-gray-400" />
                            <span>{employee.phone}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{employee.role}</TableCell>
                      <TableCell>{getStatusBadge(employee.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-3 w-3 text-gray-400" />
                          <span>{employee.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>{new Date(employee.joinDate).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button variant="ghost" size="sm">
                            <Mail className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
  )
}
