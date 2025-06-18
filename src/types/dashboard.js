export interface DashboardStats {
  totalLeads: number
  contactedLeads: number
  qualifiedLeads: number
  conversionRate: number
  todayLeads: number
  weeklyGrowth: number
}

export interface LeadTrendData {
  day: string
  total: number
  contacted: number
  qualified: number
}

export interface LeadSourceData {
  name: string
  count: number
  percentage: number
  color: string
}

export interface ActivityData {
  id: string
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  time: string
  lead?: {
    name: string
    note?: string
  }
  icon: "check" | "plus" | "message" | "phone"
  type: "status_update" | "note_added" | "call_completed" | "meeting_scheduled"
}

export interface LeadResponseData {
  id: string
  name: string
  campaign: string
  status: "Positive" | "Neutral" | "Negative"
  responseTime: string
  channel: "email" | "sms" | "call"
}

export interface UnsubscribeData {
  day: string
  count: number
}

export interface ResponseAnalytics {
  email: {
    responses: number
    rate: number
    growth: number
  }
  sms: {
    responses: number
    rate: number
    growth: number
  }
  call: {
    responses: number
    rate: number
    growth: number
  }
}

export interface DashboardData {
  stats: DashboardStats
  leadTrend: LeadTrendData[]
  leadSources: LeadSourceData[]
  activities: ActivityData[]
  leadResponses: LeadResponseData[]
  unsubscribeData: UnsubscribeData[]
  responseAnalytics: ResponseAnalytics
  recentLeads: Array<{
    id: string
    name: string
    email: string
    phone: string
    source: string
    status: string
    createdAt: string
  }>
}

export interface DashboardFilters {
  dateRange: "today" | "week" | "month" | "quarter"
  territory?: string
  source?: string
}
