import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
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
import { useCompanyOverviewStore } from "@/store/company-overview-store"

export default function CompanyOverviewPage() {
  const [expandedStatus, setExpandedStatus] = useState(null)

  const {
    companyInfo,
    metrics,
    advisorStats,
    topPerformers,
    isLoadingCompanyInfo,
    isLoadingMetrics,
    isLoadingAdvisorStats,
    isLoadingTopPerformers,
    companyInfoError,
    metricsError,
    advisorStatsError,
    topPerformersError,
    fetchCompanyInfo,
    fetchMetrics,
    fetchAdvisorStats,
    fetchTopPerformers,
    clearErrors,
  } = useCompanyOverviewStore()

  useEffect(() => {
    fetchCompanyInfo()
    fetchMetrics()
    fetchAdvisorStats()
    fetchTopPerformers()
  }, [fetchCompanyInfo, fetchMetrics, fetchAdvisorStats, fetchTopPerformers])

  const toggleStatus = (status) => {
    if (expandedStatus === status) {
      setExpandedStatus(null)
    } else {
      setExpandedStatus(status)
    }
  }

  const handleRetry = () => {
    clearErrors()
    fetchCompanyInfo()
    fetchMetrics()
    fetchAdvisorStats()
    fetchTopPerformers()
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Company Overview</h1>
            <p className="text-gray-600">Manage your company information and view key metrics</p>
          </div>
          <Button disabled={isLoadingCompanyInfo}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Company Info
          </Button>
        </div>

        {/* Error Alert */}
        {(companyInfoError || metricsError || advisorStatsError || topPerformersError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load some data. Please try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Company Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="h-5 w-5" />
              Company Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingCompanyInfo ? (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="flex items-start gap-4">
                  <Skeleton className="w-20 h-20 rounded-lg" />
                  <div className="space-y-2">
                    <Skeleton className="h-6 w-48" />
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-64" />
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    {[1, 2, 3, 4].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Skeleton className="h-5 w-32" />
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-4 w-full" />
                    ))}
                  </div>
                </div>
              </div>
            ) : companyInfo ? (
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
                      <span className="ml-2">{metrics?.totalAdvisors || "Loading..."}</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {isLoadingMetrics ? (
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
          ) : metrics ? (
            <>
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
            </>
          ) : null}
        </div>

        {/* Advisor Performance */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Advisor Status - Expandable */}
          <Card>
            <CardHeader>
              <CardTitle>Advisor Status</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingAdvisorStats ? (
                <div className="space-y-4">
                  {[1, 2].map((i) => (
                    <div key={i} className="border rounded-lg p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Skeleton className="w-3 h-3 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                        </div>
                        <Skeleton className="h-6 w-8" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
            </CardContent>
          </Card>

          {/* Top Performing Advisors */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Advisors</CardTitle>
            </CardHeader>
            <CardContent>
              {isLoadingTopPerformers ? (
                <div className="space-y-3">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Skeleton className="w-8 h-8 rounded-full" />
                        <div className="space-y-1">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-24" />
                        </div>
                      </div>
                      <div className="text-right space-y-1">
                        <Skeleton className="h-4 w-16" />
                        <Skeleton className="h-3 w-12" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
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
              )}
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
