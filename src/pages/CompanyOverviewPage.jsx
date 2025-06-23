import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Building,
  Users,
  Megaphone,
  DollarSign,
  Activity,
  MapPin,
  Phone,
  Mail,
  Globe,
  TrendingUp,
  TrendingDown,
  Edit,
  UserPlus,
  CreditCard,
  Shield,
  ChevronDown,
  ChevronUp,
  AlertCircle,
} from "lucide-react"

export default function CompanyOverviewPage() {
  const [expandedStatus, setExpandedStatus] = useState(null)

  // Company Info Data
  const companyInfo = {
    id: "1",
    name: "Acme Financial Advisory",
    logo: "/placeholder.svg?height=80&width=80",
    status: "Active",
    address: "123 Financial District, Suite 100, New York, NY 10001",
    phone: "+1 (555) 123-4567",
    email: "contact@acmefinancial.com",
    website: "www.acmefinancial.com",
    description:
      "Leading financial advisory firm specializing in comprehensive wealth management and investment solutions.",
    founded: "2015",
    industry: "Financial Services",
  }

  // Metrics Data
  const metrics = {
    totalAdvisors: 12,
    advisorGrowth: 15,
    activeCampaigns: 8,
    campaignGrowth: -5,
    monthlyRevenue: 125000,
    revenueGrowth: 18,
    totalLeads: 1247,
    leadsGrowth: 23,
    systemUptime: 99.9,
  }

  // Advisor Stats Data
  const advisorStats = [
    {
      status: "Active",
      count: 10,
      color: "bg-green-500",
      advisors: [
        { name: "Sarah Johnson", email: "sarah.j@acmefinancial.com", leads: 45 },
        { name: "Michael Chen", email: "michael.c@acmefinancial.com", leads: 38 },
        { name: "Emily Rodriguez", email: "emily.r@acmefinancial.com", leads: 42 },
        { name: "David Thompson", email: "david.t@acmefinancial.com", leads: 35 },
        { name: "Lisa Wang", email: "lisa.w@acmefinancial.com", leads: 29 },
        { name: "Robert Miller", email: "robert.m@acmefinancial.com", leads: 27 },
        { name: "Jennifer Lee", email: "jennifer.l@acmefinancial.com", leads: 31 },
        { name: "James Wilson", email: "james.w@acmefinancial.com", leads: 24 },
        { name: "Patricia Garcia", email: "patricia.g@acmefinancial.com", leads: 22 },
        { name: "Thomas Brown", email: "thomas.b@acmefinancial.com", leads: 19 },
      ],
    },
    {
      status: "On Leave",
      count: 2,
      color: "bg-yellow-500",
      advisors: [
        { name: "Amanda Martinez", email: "amanda.m@acmefinancial.com", leads: 0, returnDate: "2023-06-15" },
        { name: "Kevin Taylor", email: "kevin.t@acmefinancial.com", leads: 0, returnDate: "2023-06-22" },
      ],
    },
  ]

  // Top Performers Data
  const topPerformers = [
    { name: "Sarah Johnson", leads: 45, conversion: 32, revenue: 125000 },
    { name: "Michael Chen", leads: 38, conversion: 28, revenue: 98000 },
    { name: "Emily Rodriguez", leads: 42, conversion: 25, revenue: 87000 },
    { name: "David Thompson", leads: 35, conversion: 22, revenue: 76000 },
    { name: "Lisa Wang", leads: 29, conversion: 20, revenue: 65000 },
  ]

  const toggleStatus = (status) => {
    if (expandedStatus === status) {
      setExpandedStatus(null)
    } else {
      setExpandedStatus(status)
    }
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Overview</h1>
            <p className="text-gray-600">Manage your company information and view key metrics</p>
          </div>
          <Button>
            <Edit className="mr-2 h-4 w-4" />
            Edit Company Info
          </Button>
        </div>

        {/* Company Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Logo and Basic Info */}
              <div className="flex items-start gap-4">
                <div className="w-20 h-20 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Building className="h-10 w-10 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{companyInfo.name}</h3>
                  <Badge variant={companyInfo.status === "Active" ? "default" : "secondary"}>
                    {companyInfo.status}
                  </Badge>
                  <p className="text-sm text-gray-600 mt-2">{companyInfo.description}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-3">
                <h4 className="font-medium">Contact Details</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{companyInfo.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span>{companyInfo.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span>{companyInfo.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    <span>{companyInfo.website}</span>
                  </div>
                </div>
              </div>

              {/* Company Details */}
              <div className="space-y-3">
                <h4 className="font-medium">Company Details</h4>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="text-gray-600">Founded:</span>
                    <span className="ml-2">{companyInfo.founded}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Industry:</span>
                    <span className="ml-2">{companyInfo.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">Employees:</span>
                    <span className="ml-2">{metrics.totalAdvisors}</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Advisors</p>
                  <p className="text-2xl font-bold">{metrics.totalAdvisors}</p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{metrics.advisorGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
                  <p className="text-2xl font-bold">{metrics.activeCampaigns}</p>
                </div>
                <Megaphone className="h-8 w-8 text-purple-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                <span className="text-sm text-red-600">{metrics.campaignGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold">{metrics.totalLeads}</p>
                </div>
                <Activity className="h-8 w-8 text-indigo-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{metrics.leadsGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Revenue</p>
                  <p className="text-2xl font-bold">${metrics.monthlyRevenue.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                <span className="text-sm text-green-600">+{metrics.revenueGrowth}% from last month</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advisor Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Advisor Status - Expandable */}
          <Card>
            <CardHeader>
              <CardTitle>Advisor Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {advisorStats.map((stat) => (
                  <div key={stat.status} className="border rounded-lg overflow-hidden">
                    <div
                      className="flex items-center justify-between p-3 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleStatus(stat.status)}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stat.color}`} />
                        <span className="font-medium">{stat.status}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{stat.count}</span>
                        {expandedStatus === stat.status ? (
                          <ChevronUp className="h-4 w-4 text-gray-500" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-gray-500" />
                        )}
                      </div>
                    </div>

                    {expandedStatus === stat.status && (
                      <div className="border-t bg-gray-50">
                        <div className="max-h-64 overflow-y-auto">
                          <table className="w-full">
                            <thead className="bg-gray-100 text-xs font-medium text-gray-500">
                              <tr>
                                <th className="px-4 py-2 text-left">Name</th>
                                <th className="px-4 py-2 text-left">Email</th>
                                <th className="px-4 py-2 text-right">
                                  {stat.status === "Active" ? "Leads" : "Return Date"}
                                </th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {stat.advisors.map((advisor) => (
                                <tr key={advisor.email} className="hover:bg-gray-100">
                                  <td className="px-4 py-2 text-sm">{advisor.name}</td>
                                  <td className="px-4 py-2 text-sm text-gray-600">{advisor.email}</td>
                                  <td className="px-4 py-2 text-sm text-right">
                                    {stat.status === "Active" ? advisor.leads : advisor.returnDate}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performing Advisors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Advisors</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {topPerformers.slice(0, 5).map((advisor, index) => (
                  <div key={advisor.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{advisor.name}</p>
                        <p className="text-sm text-gray-600">
                          {advisor.leads} leads • {advisor.conversion}% conversion
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${advisor.revenue?.toLocaleString()}</p>
                      <p className="text-sm text-gray-600">revenue</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <UserPlus className="h-6 w-6" />
                <span>Manage Advisors</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Shield className="h-6 w-6" />
                <span>Set Permissions</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <CreditCard className="h-6 w-6" />
                <span>Billing Settings</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
  )
}
