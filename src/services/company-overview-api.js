// Company Overview API Service

class CompanyOverviewApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "/api"
  }

  async getCompanyInfo() {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
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
  }

  async getCompanyMetrics() {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
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
  }

  async getAdvisorStats() {
    await new Promise((resolve) => setTimeout(resolve, 700))

    return [
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
  }

  async getTopPerformers() {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      { name: "Sarah Johnson", leads: 45, conversion: 32, revenue: 125000 },
      { name: "Michael Chen", leads: 38, conversion: 28, revenue: 98000 },
      { name: "Emily Rodriguez", leads: 42, conversion: 25, revenue: 87000 },
      { name: "David Thompson", leads: 35, conversion: 22, revenue: 76000 },
      { name: "Lisa Wang", leads: 29, conversion: 20, revenue: 65000 },
    ]
  }

  async updateCompanyInfo(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate update
    const currentInfo = await this.getCompanyInfo()
    return { ...currentInfo, ...data }
  }
}

export const companyOverviewApiService = new CompanyOverviewApiService()
