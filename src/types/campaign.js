export interface Campaign {
  id: number
  name: string
  status: "Active" | "Scheduled" | "Draft"
  type: "Email" | "Multi-channel" | "Webinar" | "Referral"
  startDate: string
  endDate: string
  leads: number
  conversion: number
  owner: {
    id: number
    name: string
    initials: string
    avatar?: string
  }
  description?: string
  budget?: number
  targetAudience?: string
  createdAt: string
  updatedAt: string
}

export interface CampaignFilters {
  status?: string
  type?: string
  owner?: string
  search?: string
  startDate?: string
  endDate?: string
}

export interface CampaignStats {
  totalCampaigns: number
  activeCampaigns: number
  scheduledCampaigns: number
  draftCampaigns: number
  totalLeads: number
  averageConversion: number
}

export interface CreateCampaignData {
  name: string
  type: Campaign["type"]
  description?: string
  startDate: string
  endDate: string
  budget?: number
  targetAudience?: string
  ownerId: number
}

export interface UpdateCampaignData extends Partial<CreateCampaignData> {
  status?: Campaign["status"]
}
