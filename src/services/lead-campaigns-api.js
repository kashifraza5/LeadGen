import { ApiService } from "./api"

export class LeadCampaignsApiService extends ApiService {
  constructor() {
    super()
  }

  async getLeadCampaigns(leadId, filters) {
    // TODO: Replace with actual API call
    // const queryParams = new URLSearchParams()
    // if (filters?.status) queryParams.append('status', filters.status)
    // if (filters?.advisor) queryParams.append('advisor', filters.advisor)
    // if (filters?.search) queryParams.append('search', filters.search)
    // const queryString = queryParams.toString()
    // const endpoint = `/leads/${leadId}/campaigns${queryString ? `?${queryString}` : ""}`
    // return await this.get<{ campaigns: LeadCampaign[]; stats: LeadCampaignStats }>(endpoint)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const campaigns = [
      {
        id: 1,
        name: "Welcome Series",
        description: "New client onboarding campaign",
        leadId,
        advisorId: 1,
        advisor: {
          id: 1,
          name: "Sarah Johnson",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Senior Advisor",
        },
        status: "active",
        startDate: "2024-01-15T10:00:00Z",
        steps: [
          {
            id: 1,
            stepNumber: 1,
            type: "email",
            title: "Welcome Email",
            content: "Welcome to our service! We're excited to have you on board.",
            subject: "Welcome to ICF Financial Services",
            status: "completed",
            scheduledAt: "2024-01-15T10:00:00Z",
            executedAt: "2024-01-15T10:05:00Z",
            delayDays: 0,
            analytics: {
              sent: true,
              delivered: true,
              opened: true,
              clicked: true,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
          {
            id: 2,
            stepNumber: 2,
            type: "sms",
            title: "Follow-up SMS",
            content: "Hi! Just checking if you received our welcome email. Reply STOP to opt out.",
            status: "completed",
            scheduledAt: "2024-01-17T14:00:00Z",
            executedAt: "2024-01-17T14:02:00Z",
            delayDays: 2,
            analytics: {
              sent: true,
              delivered: true,
              replied: true,
              bounced: false,
              unsubscribed: false,
            },
          },
          {
            id: 3,
            stepNumber: 3,
            type: "email",
            title: "Service Overview",
            content: "Here's an overview of our services and how we can help you.",
            subject: "Your Financial Journey Starts Here",
            status: "in_progress",
            scheduledAt: "2024-01-22T09:00:00Z",
            delayDays: 7,
            analytics: {
              sent: false,
              delivered: false,
              opened: false,
              clicked: false,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
          {
            id: 4,
            stepNumber: 4,
            type: "sms",
            title: "Appointment Reminder",
            content: "Don't forget about your consultation appointment next week!",
            status: "pending",
            scheduledAt: "2024-01-29T11:00:00Z",
            delayDays: 14,
            analytics: {
              sent: false,
              delivered: false,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
        ],
        analytics: {
          totalSteps: 4,
          completedSteps: 2,
          pendingSteps: 1,
          inProgressSteps: 1,
          failedSteps: 0,
          skippedSteps: 0,
          emailSteps: 2,
          smsSteps: 2,
          openRate: 100,
          clickRate: 50,
          responseRate: 25,
          unsubscribeRate: 0,
        },
        createdAt: "2024-01-15T09:00:00Z",
        updatedAt: "2024-01-17T14:02:00Z",
      },
      {
        id: 2,
        name: "Investment Education",
        description: "Educational campaign about investment options",
        leadId,
        advisorId: 2,
        advisor: {
          id: 2,
          name: "Michael Chen",
          avatar: "/placeholder.svg?height=32&width=32",
          role: "Investment Advisor",
        },
        status: "paused",
        startDate: "2024-01-10T08:00:00Z",
        pausedAt: "2024-01-20T16:00:00Z",
        steps: [
          {
            id: 5,
            stepNumber: 1,
            type: "email",
            title: "Investment Basics",
            content: "Let's start with the basics of investing.",
            subject: "Investment 101: Getting Started",
            status: "completed",
            scheduledAt: "2024-01-10T08:00:00Z",
            executedAt: "2024-01-10T08:05:00Z",
            delayDays: 0,
            analytics: {
              sent: true,
              delivered: true,
              opened: true,
              clicked: false,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
          {
            id: 6,
            stepNumber: 2,
            type: "sms",
            title: "Quick Tip",
            content: "Investment tip: Diversification is key to managing risk!",
            status: "completed",
            scheduledAt: "2024-01-13T12:00:00Z",
            executedAt: "2024-01-13T12:01:00Z",
            delayDays: 3,
            analytics: {
              sent: true,
              delivered: true,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
          {
            id: 7,
            stepNumber: 3,
            type: "email",
            title: "Portfolio Review",
            content: "Let's review different portfolio strategies.",
            subject: "Building Your Investment Portfolio",
            status: "pending",
            scheduledAt: "2024-01-20T10:00:00Z",
            delayDays: 10,
            analytics: {
              sent: false,
              delivered: false,
              opened: false,
              clicked: false,
              replied: false,
              bounced: false,
              unsubscribed: false,
            },
          },
        ],
        analytics: {
          totalSteps: 3,
          completedSteps: 2,
          pendingSteps: 1,
          inProgressSteps: 0,
          failedSteps: 0,
          skippedSteps: 0,
          emailSteps: 2,
          smsSteps: 1,
          openRate: 50,
          clickRate: 0,
          responseRate: 0,
          unsubscribeRate: 0,
        },
        createdAt: "2024-01-10T07:00:00Z",
        updatedAt: "2024-01-20T16:00:00Z",
      },
    ]

    // Apply filters
    let filteredCampaigns = campaigns
    if (filters?.status && filters.status !== "all") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.status === filters.status)
    }
    if (filters?.search) {
      const searchLower = filters.search.toLowerCase()
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchLower) || campaign.description.toLowerCase().includes(searchLower),
      )
    }

    // Calculate stats
    const stats = {
      totalCampaigns: campaigns.length,
      activeCampaigns: campaigns.filter((c) => c.status === "active").length,
      completedCampaigns: campaigns.filter((c) => c.status === "completed").length,
      totalSteps: campaigns.reduce((sum, c) => sum + c.analytics.totalSteps, 0),
      completedSteps: campaigns.reduce((sum, c) => sum + c.analytics.completedSteps, 0),
      averageCompletionRate:
        campaigns.length > 0
          ? campaigns.reduce((sum, c) => sum + (c.analytics.completedSteps / c.analytics.totalSteps) * 100, 0) /
            campaigns.length
          : 0,
    }

    return { campaigns: filteredCampaigns, stats }
  }

  async pauseCampaign(campaignId) {
    // TODO: Replace with actual API call
    // return await this.put<LeadCampaign>(`/campaigns/${campaignId}/pause`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    console.log(`Campaign ${campaignId} paused`)
    return {}
  }

  async resumeCampaign(campaignId) {
    // TODO: Replace with actual API call
    // return await this.put<LeadCampaign>(`/campaigns/${campaignId}/resume`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    console.log(`Campaign ${campaignId} resumed`)
    return {}
  }

  async stopCampaign(campaignId) {
    // TODO: Replace with actual API call
    // return await this.put<LeadCampaign>(`/campaigns/${campaignId}/stop`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    console.log(`Campaign ${campaignId} stopped`)
    return {}
  }
}

export const leadCampaignsApi = new LeadCampaignsApiService()
