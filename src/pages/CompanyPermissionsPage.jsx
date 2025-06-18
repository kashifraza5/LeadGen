import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Shield, Users, Search, Settings, Eye, Edit, Trash2, Plus, TrendingUp, Lock, Unlock } from "lucide-react"

export default function CompanyPermissionsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  // Mock data - replace with actual API calls
  const permissionStats = {
    totalRoles: 8,
    activeUsers: 45,
    permissionGroups: 5,
    securityScore: 92,
  }

  const roles = [
    {
      id: 1,
      name: "Super Admin",
      description: "Full system access with all permissions",
      userCount: 2,
      permissions: 25,
      status: "Active",
      color: "bg-red-100 text-red-800",
    },
    {
      id: 2,
      name: "Admin",
      description: "Administrative access with most permissions",
      userCount: 3,
      permissions: 20,
      status: "Active",
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 3,
      name: "Manager",
      description: "Team management and reporting access",
      userCount: 8,
      permissions: 15,
      status: "Active",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 4,
      name: "Team Lead",
      description: "Limited management permissions",
      userCount: 12,
      permissions: 10,
      status: "Active",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 5,
      name: "Employee",
      description: "Standard employee access",
      userCount: 20,
      permissions: 8,
      status: "Active",
      color: "bg-gray-100 text-gray-800",
    },
  ]

  const permissions = [
    {
      category: "User Management",
      items: [
        { name: "View Users", description: "View user profiles and information", enabled: true },
        { name: "Create Users", description: "Add new users to the system", enabled: true },
        { name: "Edit Users", description: "Modify user information and settings", enabled: false },
        { name: "Delete Users", description: "Remove users from the system", enabled: false },
      ],
    },
    {
      category: "Campaign Management",
      items: [
        { name: "View Campaigns", description: "View campaign details and analytics", enabled: true },
        { name: "Create Campaigns", description: "Create new marketing campaigns", enabled: true },
        { name: "Edit Campaigns", description: "Modify existing campaigns", enabled: true },
        { name: "Delete Campaigns", description: "Remove campaigns from the system", enabled: false },
      ],
    },
    {
      category: "Lead Management",
      items: [
        { name: "View Leads", description: "Access lead information and history", enabled: true },
        { name: "Create Leads", description: "Add new leads to the system", enabled: true },
        { name: "Edit Leads", description: "Modify lead information", enabled: true },
        { name: "Export Leads", description: "Export lead data", enabled: false },
      ],
    },
    {
      category: "Analytics & Reporting",
      items: [
        { name: "View Analytics", description: "Access analytics dashboards", enabled: true },
        { name: "Export Reports", description: "Download and export reports", enabled: false },
        { name: "Custom Reports", description: "Create custom report templates", enabled: false },
      ],
    },
    {
      category: "System Administration",
      items: [
        { name: "System Settings", description: "Modify system-wide settings", enabled: false },
        { name: "Security Settings", description: "Manage security configurations", enabled: false },
        { name: "Backup & Restore", description: "Perform system backups", enabled: false },
      ],
    },
  ]

  const userAssignments = [
    {
      id: 1,
      name: "John Smith",
      email: "john.smith@acme.com",
      role: "Super Admin",
      status: "Active",
      lastLogin: "2024-01-15",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 2,
      name: "Sarah Johnson",
      email: "sarah.johnson@acme.com",
      role: "Manager",
      status: "Active",
      lastLogin: "2024-01-14",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 3,
      name: "Mike Davis",
      email: "mike.davis@acme.com",
      role: "Team Lead",
      status: "Active",
      lastLogin: "2024-01-13",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      id: 4,
      name: "Emily Chen",
      email: "emily.chen@acme.com",
      role: "Employee",
      status: "Active",
      lastLogin: "2024-01-12",
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const getRoleBadge = (role) => {
    const roleConfig = roles.find((r) => r.name === role)
    return <Badge className={roleConfig?.color || "bg-gray-100 text-gray-800"}>{role}</Badge>
  }

  return (

      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Permissions & Roles</h1>
            <p className="text-gray-600">Manage user roles and system permissions</p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Role
          </Button>
        </div>

        {/* Permission Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Roles</p>
                  <p className="text-2xl font-bold">{permissionStats.totalRoles}</p>
                </div>
                <Shield className="h-8 w-8 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Active roles</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Users</p>
                  <p className="text-2xl font-bold">{permissionStats.activeUsers}</p>
                </div>
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+5% this month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Permission Groups</p>
                  <p className="text-2xl font-bold">{permissionStats.permissionGroups}</p>
                </div>
                <Settings className="h-8 w-8 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 mt-2">Organized categories</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Security Score</p>
                  <p className="text-2xl font-bold">{permissionStats.securityScore}%</p>
                </div>
                <Lock className="h-8 w-8 text-orange-600" />
              </div>
              <p className="text-sm text-green-600 mt-2">Excellent security</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="roles" className="space-y-6">
          <TabsList>
            <TabsTrigger value="roles">Roles</TabsTrigger>
            <TabsTrigger value="permissions">Permissions</TabsTrigger>
            <TabsTrigger value="assignments">User Assignments</TabsTrigger>
          </TabsList>

          {/* Roles Tab */}
          <TabsContent value="roles" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Role Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {roles.map((role) => (
                    <Card key={role.id} className="border-2">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-semibold text-lg">{role.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">{role.description}</p>
                          </div>
                          <Badge className={role.color}>{role.status}</Badge>
                        </div>

                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Users:</span>
                            <span className="font-medium">{role.userCount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Permissions:</span>
                            <span className="font-medium">{role.permissions}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions" className="space-y-6">
            <div className="space-y-6">
              {permissions.map((category) => (
                <Card key={category.category}>
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {category.items.map((permission) => (
                        <div key={permission.name} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              {permission.enabled ? (
                                <Unlock className="h-4 w-4 text-green-600" />
                              ) : (
                                <Lock className="h-4 w-4 text-gray-400" />
                              )}
                              <div>
                                <h4 className="font-medium">{permission.name}</h4>
                                <p className="text-sm text-gray-600">{permission.description}</p>
                              </div>
                            </div>
                          </div>
                          <Switch checked={permission.enabled} />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* User Assignments Tab */}
          <TabsContent value="assignments" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>User Role Assignments</CardTitle>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 w-64"
                      />
                    </div>
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                      <SelectTrigger className="w-40">
                        <SelectValue placeholder="Filter by role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Roles</SelectItem>
                        {roles.map((role) => (
                          <SelectItem key={role.id} value={role.name}>
                            {role.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userAssignments.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={user.avatar || "/placeholder.svg"} />
                              <AvatarFallback>{getInitials(user.name)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-sm text-gray-600">{user.email}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <Badge variant="default" className="bg-green-100 text-green-800">
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(user.lastLogin).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
