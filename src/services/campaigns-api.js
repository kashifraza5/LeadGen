import { ApiService } from "./api"

export class CampaignsApiService extends ApiService {
  constructor() {
    super()
  }

  async getCampaigns(params) {
    // TODO: Replace with actual API call
    // const queryParams = new URLSearchParams()
    // if (params?.status && params.status !== 'All') queryParams.append('status', params.status)
    // if (params?.type) queryParams.append('type', params.type)
    // if (params?.search) queryParams.append('search', params.search)
    // if (params?.page) queryParams.append('page', params.page.toString())
    // if (params?.limit) queryParams.append('limit', params.limit.toString())
    // const queryString = queryParams.toString()
    // const endpoint = `/campaigns${queryString ? `?${queryString}` : ""}`
    // return await this.get<{ campaigns: Campaign[]; total: number; page: number; pages: number; stats: CampaignStats }>(endpoint)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const allCampaigns = [
      {
        id: 1,
        name: "Summer Promotion 2023",
        status: "Active",
        type: "Email",
        startDate: "2023-06-01",
        endDate: "2023-08-31",
        leads: 245,
        conversion: 8.2,
        owner: {
          id: 1,
          name: "Sarah Johnson",
          initials: "SJ",
        },
        description: "Summer promotional campaign targeting existing customers",
        budget: 5000,
        targetAudience: "Existing customers",
        createdAt: "2023-05-15T10:00:00Z",
        updatedAt: "2023-06-01T10:00:00Z",
      },
      {
        id: 2,
        name: "Product Launch - CRM Pro",
        status: "Active",
        type: "Multi-channel",
        startDate: "2023-07-15",
        endDate: "2023-09-15",
        leads: 412,
        conversion: 12.5,
        owner: {
          id: 2,
          name: "Michael Chen",
          initials: "MC",
        },
        description: "Multi-channel campaign for new CRM Pro product launch",
        budget: 15000,
        targetAudience: "Business owners",
        createdAt: "2023-07-01T10:00:00Z",
        updatedAt: "2023-07-15T10:00:00Z",
      },
      {
        id: 3,
        name: "Webinar Series - Lead Generation",
        status: "Scheduled",
        type: "Webinar",
        startDate: "2023-08-10",
        endDate: "2023-10-10",
        leads: 0,
        conversion: 0,
        owner: {
          id: 3,
          name: "Jessica Williams",
          initials: "JW",
        },
        description: "Educational webinar series on lead generation strategies",
        budget: 3000,
        targetAudience: "Marketing professionals",
        createdAt: "2023-07-20T10:00:00Z",
        updatedAt: "2023-07-20T10:00:00Z",
      },
      {
        id: 4,
        name: "Fall Discount Program",
        status: "Draft",
        type: "Email",
        startDate: "2023-09-01",
        endDate: "2023-11-30",
        leads: 0,
        conversion: 0,
        owner: {
          id: 4,
          name: "David Miller",
          initials: "DM",
        },
        description: "Fall seasonal discount campaign",
        budget: 8000,
        targetAudience: "All customers",
        createdAt: "2023-08-01T10:00:00Z",
        updatedAt: "2023-08-01T10:00:00Z",
      },
      {
        id: 5,
        name: "Customer Referral Program",
        status: "Active",
        type: "Referral",
        startDate: "2023-05-01",
        endDate: "2023-12-31",
        leads: 187,
        conversion: 21.4,
        owner: {
          id: 5,
          name: "Amanda Lopez",
          initials: "AL",
        },
        description: "Ongoing customer referral incentive program",
        budget: 10000,
        targetAudience: "Existing customers",
        createdAt: "2023-04-15T10:00:00Z",
        updatedAt: "2023-05-01T10:00:00Z",
      },
    ]

    // Apply filters
    let filteredCampaigns = allCampaigns
    if (params?.status && params.status !== "All") {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.status === params.status)
    }
    if (params?.type) {
      filteredCampaigns = filteredCampaigns.filter((campaign) => campaign.type === params.type)
    }
    if (params?.search) {
      const searchLower = params.search.toLowerCase()
      filteredCampaigns = filteredCampaigns.filter(
        (campaign) =>
          campaign.name.toLowerCase().includes(searchLower) ||
          campaign.description?.toLowerCase().includes(searchLower),
      )
    }

    // Pagination
    const page = params?.page || 1
    const limit = params?.limit || 10
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedCampaigns = filteredCampaigns.slice(startIndex, endIndex)

    // Calculate stats
    const stats = {
      totalCampaigns: allCampaigns.length,
      activeCampaigns: allCampaigns.filter((c) => c.status === "Active").length,
      scheduledCampaigns: allCampaigns.filter((c) => c.status === "Scheduled").length,
      draftCampaigns: allCampaigns.filter((c) => c.status === "Draft").length,
      totalLeads: allCampaigns.reduce((sum, c) => sum + c.leads, 0),
      averageConversion: allCampaigns.reduce((sum, c) => sum + c.conversion, 0) / allCampaigns.length,
    }

    return {
      campaigns: paginatedCampaigns,
      total: filteredCampaigns.length,
      page,
      pages: Math.ceil(filteredCampaigns.length / limit),
      stats,
    }
  }

  async getCampaign(id) {
    // TODO: Replace with actual API call
    // return await this.get<Campaign>(`/campaigns/${id}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const campaign = {
      id,
      name: "Summer Promotion 2023",
      status: "Active",
      type: "Email",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      leads: 245,
      conversion: 8.2,
      owner: {
        id: 1,
        name: "Sarah Johnson",
        initials: "SJ",
      },
      description: "Summer promotional campaign targeting existing customers",
      budget: 5000,
      targetAudience: "Existing customers",
      createdAt: "2023-05-15T10:00:00Z",
      updatedAt: "2023-06-01T10:00:00Z",
    }

    return campaign
  }

  async createCampaign(data) {
    // TODO: Replace with actual API call
    // return await this.post<Campaign>('/campaigns', data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const newCampaign = {
      id: Date.now(), // Simple ID generation for demo
      name: data.name,
      status: "Draft",
      type: data.type,
      startDate: data.startDate,
      endDate: data.endDate,
      leads: 0,
      conversion: 0,
      owner: {
        id: data.ownerId,
        name: "Current User",
        initials: "CU",
      },
      description: data.description,
      budget: data.budget,
      targetAudience: data.targetAudience,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return newCampaign
  }

  async updateCampaign(id, data) {
    // TODO: Replace with actual API call
    // return await this.put<Campaign>(`/campaigns/${id}`, data)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const updatedCampaign = {
      id,
      name: data.name || "Updated Campaign",
      status: data.status || "Active",
      type: data.type || "Email",
      startDate: data.startDate || "2023-06-01",
      endDate: data.endDate || "2023-08-31",
      leads: 245,
      conversion: 8.2,
      owner: {
        id: data.ownerId || 1,
        name: "Sarah Johnson",
        initials: "SJ",
      },
      description: data.description,
      budget: data.budget,
      targetAudience: data.targetAudience,
      createdAt: "2023-05-15T10:00:00Z",
      updatedAt: new Date().toISOString(),
    }

    return updatedCampaign
  }

  async deleteCampaign(id) {
    // TODO: Replace with actual API call
    // await this.delete(`/campaigns/${id}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    console.log(`Campaign ${id} deleted successfully`)
  }

  async duplicateCampaign(id) {
    // TODO: Replace with actual API call
    // return await this.post<Campaign>(`/campaigns/${id}/duplicate`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 700))

    // DUMMY DATA - Replace this entire block with the uncommented API call above
    const duplicatedCampaign = {
      id: Date.now(),
      name: "Copy of Summer Promotion 2023",
      status: "Draft",
      type: "Email",
      startDate: "2023-06-01",
      endDate: "2023-08-31",
      leads: 0,
      conversion: 0,
      owner: {
        id: 1,
        name: "Sarah Johnson",
        initials: "SJ",
      },
      description: "Duplicated campaign",
      budget: 5000,
      targetAudience: "Existing customers",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return duplicatedCampaign
  }
}

export const campaignsApi = new CampaignsApiService()
