
import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  MapPin,
  Plus,
  Users,
  DollarSign,
  Target,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Trash2,
  UserPlus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

// Mock data for territories
const territories = [
  {
    id: 1,
    name: "California - Bay Area",
    state: "California",
    region: "West Coast",
    cities: ["San Francisco", "San Jose", "Oakland", "Fremont"],
    advisors: [
      { id: 1, name: "John Smith", email: "john@company.com" },
      { id: 2, name: "Sarah Johnson", email: "sarah@company.com" },
    ],
    totalLeads: 245,
    activeLeads: 89,
    convertedLeads: 34,
    revenue: 450000,
    conversionRate: 13.9,
    status: "Active",
  },
  {
    id: 2,
    name: "New York - Manhattan",
    state: "New York",
    region: "Northeast",
    cities: ["Manhattan", "Brooklyn", "Queens"],
    advisors: [{ id: 3, name: "Michael Brown", email: "michael@company.com" }],
    totalLeads: 189,
    activeLeads: 67,
    convertedLeads: 28,
    revenue: 380000,
    conversionRate: 14.8,
    status: "Active",
  },
  {
    id: 3,
    name: "Texas - Dallas-Fort Worth",
    state: "Texas",
    region: "South",
    cities: ["Dallas", "Fort Worth", "Arlington", "Plano"],
    advisors: [
      { id: 4, name: "Emily Davis", email: "emily@company.com" },
      { id: 5, name: "David Wilson", email: "david@company.com" },
      { id: 6, name: "Lisa Anderson", email: "lisa@company.com" },
    ],
    totalLeads: 312,
    activeLeads: 124,
    convertedLeads: 45,
    revenue: 620000,
    conversionRate: 14.4,
    status: "Active",
  },
  {
    id: 4,
    name: "Florida - Miami-Dade",
    state: "Florida",
    region: "Southeast",
    cities: ["Miami", "Coral Gables", "Homestead"],
    advisors: [],
    totalLeads: 156,
    activeLeads: 45,
    convertedLeads: 18,
    revenue: 240000,
    conversionRate: 11.5,
    status: "Unassigned",
  },
]

const availableAdvisors = [
  { id: 7, name: "Robert Taylor", email: "robert@company.com" },
  { id: 8, name: "Jennifer Martinez", email: "jennifer@company.com" },
  { id: 9, name: "Christopher Lee", email: "christopher@company.com" },
]

const usStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Florida",
  "Georgia",
  "Hawaii",
  "Idaho",
  "Illinois",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Michigan",
  "Minnesota",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Oregon",
  "Pennsylvania",
  "Rhode Island",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "Vermont",
  "Virginia",
  "Washington",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
]

export default function TerritoriesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false)
  const [selectedTerritory, setSelectedTerritory] = useState(null)
  const [newTerritory, setNewTerritory] = useState({
    name: "",
    state: "",
    region: "",
    cities: "",
    description: "",
  })

  const filteredTerritories = territories.filter((territory) => {
    const matchesSearch =
      territory.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      territory.state.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRegion = selectedRegion === "all" || territory.region === selectedRegion
    return matchesSearch && matchesRegion
  })

  const totalStats = {
    totalTerritories: territories.length,
    totalLeads: territories.reduce((sum, t) => sum + t.totalLeads, 0),
    totalRevenue: territories.reduce((sum, t) => sum + t.revenue, 0),
    avgConversionRate: territories.reduce((sum, t) => sum + t.conversionRate, 0) / territories.length,
  }

  const handleAddTerritory = () => {
    // Here you would typically make an API call
    console.log("Adding territory:", newTerritory)
    setIsAddDialogOpen(false)
    setNewTerritory({ name: "", state: "", region: "", cities: "", description: "" })
  }

  const handleAssignAdvisor = (territoryId, advisorId) => {
    // Here you would typically make an API call
    console.log("Assigning advisor", advisorId, "to territory", territoryId)
    setIsAssignDialogOpen(false)
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Territory Management</h1>
            <p className="text-muted-foreground">
              Manage territories, assign advisors, and track performance across regions
            </p>
          </div>
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Add Territory
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add New Territory</DialogTitle>
                <DialogDescription>Create a new territory and define its coverage area.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="territory-name">Territory Name</Label>
                  <Input
                    id="territory-name"
                    placeholder="e.g., California - Bay Area"
                    value={newTerritory.name}
                    onChange={(e) => setNewTerritory({ ...newTerritory, name: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={newTerritory.state}
                    onValueChange={(value) => setNewTerritory({ ...newTerritory, state: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      {usStates.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="region">Region</Label>
                  <Select
                    value={newTerritory.region}
                    onValueChange={(value) => setNewTerritory({ ...newTerritory, region: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Northeast">Northeast</SelectItem>
                      <SelectItem value="Southeast">Southeast</SelectItem>
                      <SelectItem value="Midwest">Midwest</SelectItem>
                      <SelectItem value="South">South</SelectItem>
                      <SelectItem value="West Coast">West Coast</SelectItem>
                      <SelectItem value="Mountain">Mountain</SelectItem>
                      <SelectItem value="Pacific">Pacific</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="cities">Cities (comma-separated)</Label>
                  <Input
                    id="cities"
                    placeholder="e.g., San Francisco, San Jose, Oakland"
                    value={newTerritory.cities}
                    onChange={(e) => setNewTerritory({ ...newTerritory, cities: e.target.value })}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description">Description (optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about this territory..."
                    value={newTerritory.description}
                    onChange={(e) => setNewTerritory({ ...newTerritory, description: e.target.value })}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={handleAddTerritory}>
                  Add Territory
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Statistics Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Territories</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalTerritories}</div>
              <p className="text-xs text-muted-foreground">
                Across {new Set(territories.map((t) => t.region)).size} regions
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.totalLeads.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${(totalStats.totalRevenue / 1000000).toFixed(1)}M</div>
              <p className="text-xs text-muted-foreground">+8% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Conversion Rate</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStats.avgConversionRate.toFixed(1)}%</div>
              <p className="text-xs text-muted-foreground">+2.1% from last month</p>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Territory Overview</CardTitle>
            <CardDescription>
              View and manage all territories with their assigned advisors and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-6">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search territories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                  />
                </div>
              </div>
              <Select value={selectedRegion} onValueChange={setSelectedRegion}>
                <SelectTrigger className="w-[180px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Regions</SelectItem>
                  <SelectItem value="Northeast">Northeast</SelectItem>
                  <SelectItem value="Southeast">Southeast</SelectItem>
                  <SelectItem value="Midwest">Midwest</SelectItem>
                  <SelectItem value="South">South</SelectItem>
                  <SelectItem value="West Coast">West Coast</SelectItem>
                  <SelectItem value="Mountain">Mountain</SelectItem>
                  <SelectItem value="Pacific">Pacific</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="table" className="w-full">
              <TabsList>
                <TabsTrigger value="table">Table View</TabsTrigger>
                <TabsTrigger value="cards">Card View</TabsTrigger>
              </TabsList>

              <TabsContent value="table" className="space-y-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory</TableHead>
                      <TableHead>Region</TableHead>
                      <TableHead>Advisors</TableHead>
                      <TableHead>Total Leads</TableHead>
                      <TableHead>Active Leads</TableHead>
                      <TableHead>Conversion Rate</TableHead>
                      <TableHead>Revenue</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTerritories.map((territory) => (
                      <TableRow key={territory.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{territory.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {territory.cities.slice(0, 2).join(", ")}
                              {territory.cities.length > 2 && ` +${territory.cities.length - 2} more`}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{territory.region}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span>{territory.advisors.length}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedTerritory(territory)
                                setIsAssignDialogOpen(true)
                              }}
                            >
                              <UserPlus className="h-3 w-3" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>{territory.totalLeads}</TableCell>
                        <TableCell>{territory.activeLeads}</TableCell>
                        <TableCell>{territory.conversionRate}%</TableCell>
                        <TableCell>${(territory.revenue / 1000).toFixed(0)}K</TableCell>
                        <TableCell>
                          <Badge variant={territory.status === "Active" ? "default" : "secondary"}>
                            {territory.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Territory
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <Users className="mr-2 h-4 w-4" />
                                Manage Advisors
                              </DropdownMenuItem>
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Territory
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="cards" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredTerritories.map((territory) => (
                    <Card key={territory.id}>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-lg">{territory.name}</CardTitle>
                          <Badge variant={territory.status === "Active" ? "default" : "secondary"}>
                            {territory.status}
                          </Badge>
                        </div>
                        <CardDescription>{territory.region} Region</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="font-medium">Total Leads</div>
                            <div className="text-2xl font-bold">{territory.totalLeads}</div>
                          </div>
                          <div>
                            <div className="font-medium">Conversion Rate</div>
                            <div className="text-2xl font-bold">{territory.conversionRate}%</div>
                          </div>
                        </div>

                        <div>
                          <div className="font-medium mb-2">Assigned Advisors ({territory.advisors.length})</div>
                          {territory.advisors.length > 0 ? (
                            <div className="space-y-1">
                              {territory.advisors.slice(0, 2).map((advisor) => (
                                <div key={advisor.id} className="text-sm text-muted-foreground">
                                  {advisor.name}
                                </div>
                              ))}
                              {territory.advisors.length > 2 && (
                                <div className="text-sm text-muted-foreground">
                                  +{territory.advisors.length - 2} more
                                </div>
                              )}
                            </div>
                          ) : (
                            <div className="text-sm text-muted-foreground">No advisors assigned</div>
                          )}
                        </div>

                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedTerritory(territory)
                              setIsAssignDialogOpen(true)
                            }}
                          >
                            <UserPlus className="mr-2 h-3 w-3" />
                            Assign
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1">
                            <Edit className="mr-2 h-3 w-3" />
                            Edit
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* Assign Advisor Dialog */}
        <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Assign Advisor to Territory</DialogTitle>
              <DialogDescription>Assign an advisor to {selectedTerritory?.name}</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Current Advisors</Label>
                {selectedTerritory?.advisors.length > 0 ? (
                  <div className="space-y-2">
                    {selectedTerritory.advisors.map((advisor) => (
                      <div key={advisor.id} className="flex items-center justify-between p-2 border rounded">
                        <span className="text-sm">{advisor.name}</span>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No advisors currently assigned</p>
                )}
              </div>

              <div className="grid gap-2">
                <Label>Available Advisors</Label>
                <div className="space-y-2">
                  {availableAdvisors.map((advisor) => (
                    <div key={advisor.id} className="flex items-center justify-between p-2 border rounded">
                      <div>
                        <div className="text-sm font-medium">{advisor.name}</div>
                        <div className="text-xs text-muted-foreground">{advisor.email}</div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleAssignAdvisor(selectedTerritory?.id, advisor.id)}
                      >
                        Assign
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}
