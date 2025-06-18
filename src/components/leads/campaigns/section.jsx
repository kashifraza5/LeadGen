import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import {
  Calendar,
  Clock,
  Mail,
  MessageSquare,
  Play,
  Pause,
  Square,
  Search,
  Filter,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  XCircle,
  Loader2,
  Eye,
  MousePointer,
  Reply,
  UserX,
  BarChart3,
  Activity,
  Timer,
  Target,
  ChevronDown,
  ChevronRight,
  Send,
  ArrowRight,
  Zap,
} from "lucide-react"
import { useLeadCampaignsStore } from "@/store/lead-campaigns-store"

export function Section() {
  const params = useParams()
  const leadId = Number.parseInt(params.id)

  const {
    campaigns,
    stats,
    isLoading,
    error,
    filters,
    fetchCampaigns,
    pauseCampaign,
    resumeCampaign,
    stopCampaign,
    setFilters,
    clearError,
  } = useLeadCampaignsStore()

  const [searchTerm, setSearchTerm] = useState("")
  const [expandedCampaigns, setExpandedCampaigns] = useState(new Set())

  useEffect(() => {
    if (leadId) {
      fetchCampaigns(leadId)
    }
  }, [leadId, fetchCampaigns])

  const handleSearch = (value) => {
    setSearchTerm(value)
    setFilters({ search: value })
    fetchCampaigns(leadId, { search: value })
  }

  const handleStatusFilter = (status) => {
    setFilters({ status })
    fetchCampaigns(leadId, { status })
  }

  const toggleCampaignExpansion = (campaignId) => {
    const newExpanded = new Set(expandedCampaigns)
    if (newExpanded.has(campaignId)) {
      newExpanded.delete(campaignId)
    } else {
      newExpanded.add(campaignId)
    }
    setExpandedCampaigns(newExpanded)
  }

  const getStatusConfig = (status) => {
    switch (status) {
      case "active":
        return {
          color: "bg-green-100 text-green-800 border-green-200",
          icon: <Activity className="h-4 w-4" />,
          text: "Active",
        }
      case "paused":
        return {
          color: "bg-yellow-100 text-yellow-800 border-yellow-200",
          icon: <Pause className="h-4 w-4" />,
          text: "Paused",
        }
      case "completed":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: <CheckCircle className="h-4 w-4" />,
          text: "Completed",
        }
      case "stopped":
        return {
          color: "bg-red-100 text-red-800 border-red-200",
          icon: <Square className="h-4 w-4" />,
          text: "Stopped",
        }
      case "unsubscribed":
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <UserX className="h-4 w-4" />,
          text: "Unsubscribed",
        }
      default:
        return {
          color: "bg-gray-100 text-gray-800 border-gray-200",
          icon: <AlertCircle className="h-4 w-4" />,
          text: status,
        }
    }
  }

  const getStepStatusConfig = (status) => {
    switch (status) {
      case "completed":
        return {
          icon: <CheckCircle className="h-4 w-4 text-green-600" />,
          color: "bg-green-50 text-green-700 border-green-200",
          text: "Completed",
        }
      case "in_progress":
        return {
          icon: <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />,
          color: "bg-blue-50 text-blue-700 border-blue-200",
          text: "In Progress",
        }
      case "failed":
        return {
          icon: <XCircle className="h-4 w-4 text-red-600" />,
          color: "bg-red-50 text-red-700 border-red-200",
          text: "Failed",
        }
      case "pending":
        return {
          icon: <Clock className="h-4 w-4 text-gray-500" />,
          color: "bg-gray-50 text-gray-700 border-gray-200",
          text: "Pending",
        }
      case "skipped":
        return {
          icon: <ArrowRight className="h-4 w-4 text-orange-500" />,
          color: "bg-orange-50 text-orange-700 border-orange-200",
          text: "Skipped",
        }
      default:
        return {
          icon: <Clock className="h-4 w-4 text-gray-500" />,
          color: "bg-gray-50 text-gray-700 border-gray-200",
          text: status,
        }
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const formatDateShort = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    })
  }

  const renderStepTimeline = (steps) => {
    return (
      <div className="space-y-3">
        {steps.map((step, index) => {
          const stepConfig = getStepStatusConfig(step.status)
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="relative">
              {!isLast && <div className="absolute left-6 top-12 w-0.5 h-8 bg-gray-200" />}

              <div className="flex items-start space-x-4 p-4 bg-white border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                <div className="flex flex-col items-center space-y-1">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-50 border-2 border-gray-200">
                    {stepConfig.icon}
                  </div>
                  <Badge variant="outline" className="text-xs px-2 py-0.5">
                    #{step.stepNumber}
                  </Badge>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {step.type === "email" ? (
                        <Mail className="h-5 w-5 text-blue-600" />
                      ) : (
                        <MessageSquare className="h-5 w-5 text-green-600" />
                      )}
                      <div>
                        <h4 className="font-semibold text-gray-900">{step.title}</h4>
                        {step.type === "email" && step.subject && (
                          <p className="text-sm text-gray-600 mt-1">Subject: {step.subject}</p>
                        )}
                      </div>
                    </div>
                    <Badge className={stepConfig.color}>{stepConfig.text}</Badge>
                  </div>

                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">{step.content}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600">Scheduled: {formatDate(step.scheduledAt)}</span>
                    </div>
                    {step.executedAt && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Zap className="h-4 w-4 text-green-500" />
                        <span className="text-gray-600">Executed: {formatDate(step.executedAt)}</span>
                      </div>
                    )}
                    {step.delayDays > 0 && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Timer className="h-4 w-4 text-blue-500" />
                        <span className="text-gray-600">
                          Delay: {step.delayDays} day{step.delayDays > 1 ? "s" : ""}
                        </span>
                      </div>
                    )}
                  </div>

                  {step.status === "completed" && (
                    <div className="flex flex-wrap gap-2">
                      {step.analytics.sent && (
                        <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                          <Send className="h-3 w-3 mr-1" />
                          Sent
                        </Badge>
                      )}
                      {step.analytics.delivered && (
                        <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Delivered
                        </Badge>
                      )}
                      {step.analytics.opened && (
                        <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700 border-purple-200">
                          <Eye className="h-3 w-3 mr-1" />
                          Opened
                        </Badge>
                      )}
                      {step.analytics.clicked && (
                        <Badge variant="outline" className="text-xs bg-indigo-50 text-indigo-700 border-indigo-200">
                          <MousePointer className="h-3 w-3 mr-1" />
                          Clicked
                        </Badge>
                      )}
                      {step.analytics.replied && (
                        <Badge variant="outline" className="text-xs bg-emerald-50 text-emerald-700 border-emerald-200">
                          <Reply className="h-3 w-3 mr-1" />
                          Replied
                        </Badge>
                      )}
                      {step.analytics.bounced && (
                        <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                          <XCircle className="h-3 w-3 mr-1" />
                          Bounced
                        </Badge>
                      )}
                      {step.analytics.unsubscribed && (
                        <Badge variant="outline" className="text-xs bg-gray-50 text-gray-700 border-gray-200">
                          <UserX className="h-3 w-3 mr-1" />
                          Unsubscribed
                        </Badge>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  const renderCampaignCard = (campaign) => {
    const statusConfig = getStatusConfig(campaign.status)
    const isExpanded = expandedCampaigns.has(campaign.id)
    const completionRate = (campaign.analytics.completedSteps / campaign.analytics.totalSteps) * 100

    return (
      <Card key={campaign.id} className="border-2 border-gray-200 hover:border-gray-300 transition-colors">
        <Collapsible open={isExpanded} onOpenChange={() => toggleCampaignExpansion(campaign.id)}>
          <CollapsibleTrigger asChild>
            <CardHeader className="cursor-pointer hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {isExpanded ? (
                    <ChevronDown className="h-5 w-5 text-gray-500" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-gray-500" />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <CardTitle className="text-lg text-gray-900">{campaign.name}</CardTitle>
                      <Badge className={statusConfig.color}>
                        {statusConfig.icon}
                        <span className="ml-1">{statusConfig.text}</span>
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600">{campaign.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">
                    {campaign.analytics.completedSteps}/{campaign.analytics.totalSteps} Steps
                  </div>
                  <div className="text-xs text-gray-500">{completionRate.toFixed(0)}% Complete</div>
                </div>
              </div>
            </CardHeader>
          </CollapsibleTrigger>

          <CardContent className="pt-0">
            <div className="space-y-4 mb-6">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={campaign.advisor.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {campaign.advisor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-gray-900">{campaign.advisor.name}</p>
                  <p className="text-sm text-gray-600">{campaign.advisor.role}</p>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">Campaign Progress</span>
                  <span className="text-gray-600">{completionRate.toFixed(1)}%</span>
                </div>
                <Progress value={completionRate} className="h-3" />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium text-green-800">Completed</span>
                  </div>
                  <p className="text-lg font-bold text-green-900">{campaign.analytics.completedSteps}</p>
                </div>
                <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <div className="flex items-center space-x-2">
                    <Loader2 className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium text-blue-800">In Progress</span>
                  </div>
                  <p className="text-lg font-bold text-blue-900">{campaign.analytics.inProgressSteps}</p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-600" />
                    <span className="text-sm font-medium text-gray-800">Pending</span>
                  </div>
                  <p className="text-lg font-bold text-gray-900">{campaign.analytics.pendingSteps}</p>
                </div>
                <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                  <div className="flex items-center space-x-2">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <span className="text-sm font-medium text-red-800">Failed</span>
                  </div>
                  <p className="text-lg font-bold text-red-900">{campaign.analytics.failedSteps}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <Mail className="h-5 w-5 text-blue-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-blue-800">{campaign.analytics.emailSteps}</div>
                  <div className="text-xs text-blue-600">Email Steps</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <MessageSquare className="h-5 w-5 text-green-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-green-800">{campaign.analytics.smsSteps}</div>
                  <div className="text-xs text-green-600">SMS Steps</div>
                </div>
                <div className="text-center p-3 bg-purple-50 rounded-lg">
                  <Eye className="h-5 w-5 text-purple-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-purple-800">{campaign.analytics.openRate}%</div>
                  <div className="text-xs text-purple-600">Open Rate</div>
                </div>
                <div className="text-center p-3 bg-indigo-50 rounded-lg">
                  <Reply className="h-5 w-5 text-indigo-600 mx-auto mb-1" />
                  <div className="text-sm font-medium text-indigo-800">{campaign.analytics.responseRate}%</div>
                  <div className="text-xs text-indigo-600">Response Rate</div>
                </div>
              </div>

              {(campaign.status === "active" || campaign.status === "paused") && (
                <div className="flex space-x-3 pt-4 border-t">
                  {campaign.status === "active" && (
                    <>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          pauseCampaign(campaign.id)
                        }}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <Pause className="h-4 w-4 mr-2" />
                        Pause Campaign
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation()
                          stopCampaign(campaign.id)
                        }}
                        disabled={isLoading}
                        className="flex-1"
                      >
                        <Square className="h-4 w-4 mr-2" />
                        Stop Campaign
                      </Button>
                    </>
                  )}
                  {campaign.status === "paused" && (
                    <Button
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation()
                        resumeCampaign(campaign.id)
                      }}
                      disabled={isLoading}
                      className="flex-1"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      Resume Campaign
                    </Button>
                  )}
                </div>
              )}

              <div className="text-xs text-gray-500 space-y-1 pt-4 border-t">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-3 w-3" />
                  <span>Started: {formatDate(campaign.startDate)}</span>
                </div>
                {campaign.pausedAt && (
                  <div className="flex items-center space-x-2">
                    <Pause className="h-3 w-3" />
                    <span>Paused: {formatDate(campaign.pausedAt)}</span>
                  </div>
                )}
                {campaign.completedAt && (
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-3 w-3" />
                    <span>Completed: {formatDate(campaign.completedAt)}</span>
                  </div>
                )}
                {campaign.stoppedAt && (
                  <div className="flex items-center space-x-2">
                    <Square className="h-3 w-3" />
                    <span>Stopped: {formatDate(campaign.stoppedAt)}</span>
                  </div>
                )}
                {campaign.unsubscribedAt && (
                  <div className="flex items-center space-x-2">
                    <UserX className="h-3 w-3" />
                    <span>Unsubscribed: {formatDate(campaign.unsubscribedAt)}</span>
                  </div>
                )}
              </div>
            </div>

            <CollapsibleContent>
              <div className="border-t pt-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Timer className="h-5 w-5 mr-2" />
                  Step Execution Timeline
                </h4>
                {renderStepTimeline(campaign.steps)}
              </div>
            </CollapsibleContent>
          </CardContent>
        </Collapsible>
      </Card>
    )
  }

  if (isLoading && campaigns.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Campaigns</h2>
          <p className="text-sm text-gray-600 mt-1">View campaigns assigned to this lead</p>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Campaigns</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalCampaigns}</p>
                </div>
                <BarChart3 className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active</p>
                  <p className="text-2xl font-bold text-green-600">{stats.activeCampaigns}</p>
                </div>
                <Activity className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.completedCampaigns}</p>
                </div>
                <Target className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Steps Progress</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {stats.completedSteps}/{stats.totalSteps}
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-indigo-600">{stats.averageCompletionRate.toFixed(1)}%</p>
                </div>
                <TrendingUp className="h-8 w-8 text-indigo-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search campaigns..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={filters.status || "all"} onValueChange={handleStatusFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="paused">Paused</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="stopped">Stopped</SelectItem>
            <SelectItem value="unsubscribed">Unsubscribed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            {error}
            <Button variant="outline" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campaigns.map((campaign) => renderCampaignCard(campaign))}

        {campaigns.length === 0 && !isLoading && (
          <div className="col-span-full">
            <Card>
              <CardContent className="p-12 text-center">
                <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-900 mb-2">No campaigns assigned</h3>
                <p className="text-gray-600">This lead is not currently enrolled in any campaigns.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  )
}
