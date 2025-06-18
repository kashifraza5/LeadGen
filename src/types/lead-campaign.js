export interface LeadCampaignStep {
  id: number
  stepNumber: number
  type: "email" | "sms"
  title: string
  content: string
  subject?: string // For email steps
  status: "pending" | "in_progress" | "completed" | "failed" | "skipped"
  scheduledAt: string
  executedAt?: string
  delayDays: number
  analytics: {
    sent: boolean
    delivered?: boolean
    opened?: boolean // For email
    clicked?: boolean // For email
    replied?: boolean
    bounced?: boolean
    unsubscribed?: boolean
  }
}

export interface LeadCampaign {
  id: number
  name: string
  description: string
  leadId: number
  advisorId: number
  advisor: {
    id: number
    name: string
    avatar?: string
    role: string
  }
  status: "active" | "paused" | "completed" | "stopped" | "unsubscribed"
  startDate: string
  endDate?: string
  pausedAt?: string
  completedAt?: string
  stoppedAt?: string
  unsubscribedAt?: string
  steps: LeadCampaignStep[]
  analytics: {
    totalSteps: number
    completedSteps: number
    pendingSteps: number
    inProgressSteps: number
    failedSteps: number
    skippedSteps: number
    emailSteps: number
    smsSteps: number
    openRate: number
    clickRate: number
    responseRate: number
    unsubscribeRate: number
  }
  createdAt: string
  updatedAt: string
}

export interface LeadCampaignFilters {
  status?: string
  advisor?: string
  search?: string
}

export interface LeadCampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  completedCampaigns: number
  totalSteps: number
  completedSteps: number
  averageCompletionRate: number
}
