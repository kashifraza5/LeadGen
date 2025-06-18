// Mock data for dashboard
const mockDashboardData = {
  metrics: {
    totalLeads: 1247,
    newLeadsToday: 23,
    qualifiedLeads: 89,
    conversionRate: 7.2,
    totalRevenue: 2450000,
    monthlyRevenue: 245000,
    averageDealSize: 15000,
    activeCampaigns: 12,
  },
  leadsByStatus: [
    { status: "New", count: 156, percentage: 12.5 },
    { status: "Contacted", count: 234, percentage: 18.8 },
    { status: "Qualified", count: 89, percentage: 7.1 },
    { status: "Proposal", count: 45, percentage: 3.6 },
    { status: "Closed Won", count: 67, percentage: 5.4 },
    { status: "Closed Lost", count: 123, percentage: 9.9 },
  ],
  leadsBySource: [
    { source: "Website", count: 445, percentage: 35.7 },
    { source: "Referral", count: 298, percentage: 23.9 },
    { source: "Social Media", count: 187, percentage: 15.0 },
    { source: "Email Campaign", count: 156, percentage: 12.5 },
    { source: "Cold Outreach", count: 89, percentage: 7.1 },
    { source: "Events", count: 72, percentage: 5.8 },
  ],
  recentActivities: [
    {
      id: "1",
      type: "lead_created",
      message: "New lead John Smith added from website",
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      user: "Sarah Johnson",
    },
    {
      id: "2",
      type: "deal_closed",
      message: "Deal with ABC Corp closed for $25,000",
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      user: "Mike Wilson",
    },
    {
      id: "3",
      type: "campaign_sent",
      message: "Email campaign 'Q4 Newsletter' sent to 500 contacts",
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      user: "System",
    },
  ],
  upcomingTasks: [
    {
      id: "1",
      title: "Follow up with John Smith",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 2).toISOString(),
      priority: "high",
      assignee: "Sarah Johnson",
    },
    {
      id: "2",
      title: "Prepare proposal for ABC Corp",
      dueDate: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
      priority: "medium",
      assignee: "Mike Wilson",
    },
  ],
}

// Mock recent leads data
const mockRecentLeads = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "(555) 123-4567",
    source: "Website",
    status: "New",
    addedTime: "Added 2 hours ago",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "(555) 987-6543",
    source: "Referral",
    status: "Contacted",
    addedTime: "Added 3 hours ago",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    phone: "(555) 456-7890",
    source: "LinkedIn",
    status: "Qualified",
    addedTime: "Added 4 hours ago",
  },
  {
    id: "4",
    name: "Alice Williams",
    email: "alice.williams@example.com",
    phone: "(555) 789-0123",
    source: "Event",
    status: "Disqualified",
    addedTime: "Added 5 hours ago",
  },
  {
    id: "5",
    name: "Charlie Brown",
    email: "charlie.brown@example.com",
    phone: "(555) 321-6547",
    source: "Website",
    status: "New",
    addedTime: "Added 6 hours ago",
  },
]

// Mock today's activities
const mockTodaysActivities = [
  {
    id: "1",
    user: {
      name: "Sarah Johnson",
      initials: "SJ",
    },
    action: "Updated lead status to Qualified",
    time: "10:45 AM",
    lead: {
      name: "Michael Thompson",
    },
    icon: "check",
  },
  {
    id: "2",
    user: {
      name: "David Wilson",
      initials: "DW",
    },
    action: "Added notes to lead",
    time: "9:30 AM",
    lead: {
      name: "Jennifer Adams",
      note: "Client interested in premium package. Schedule follow-up next week.",
    },
    icon: "plus",
  },
  {
    id: "3",
    user: {
      name: "Alex Rodriguez",
      initials: "AR",
    },
    action: "Completed call with lead",
    time: "8:15 AM",
    lead: {
      name: "Robert Chen",
      note: "Duration: 15 minutes",
    },
    icon: "phone",
  },
  {
    id: "4",
    user: {
      name: "Emily Parker",
      initials: "EP",
    },
    action: "Scheduled a meeting with",
    time: "7:45 AM",
    lead: {
      name: "Samantha Lee",
      note: "Scheduled for Tomorrow, 2:00 PM",
    },
    icon: "message",
  },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const dashboardApi = {
  // Get main dashboard data
  getDashboardData: async (filters) => {
    await delay(800)
    return mockDashboardData
  },

  // Get recent leads for dashboard
  getRecentLeads: async (limit = 5) => {
    await delay(500)
    return mockRecentLeads.slice(0, limit)
  },

  // Get today's activities
  getTodaysActivities: async (limit = 10) => {
    await delay(400)
    return mockTodaysActivities.slice(0, limit)
  },

  // Get lead trend data for charts
  getLeadTrend: async (filters) => {
    await delay(600)
    return [
      { date: "2024-01-01", leads: 45, qualified: 12 },
      { date: "2024-01-02", leads: 52, qualified: 15 },
      { date: "2024-01-03", leads: 38, qualified: 8 },
      { date: "2024-01-04", leads: 61, qualified: 18 },
      { date: "2024-01-05", leads: 49, qualified: 14 },
      { date: "2024-01-06", leads: 55, qualified: 16 },
      { date: "2024-01-07", leads: 43, qualified: 11 },
    ]
  },

  // Get response analytics data
  getResponseAnalytics: async (filters) => {
    await delay(500)
    return [
      { campaign: "Q4 Newsletter", sent: 1000, opened: 450, clicked: 89, responded: 23 },
      { campaign: "Product Launch", sent: 750, opened: 380, clicked: 76, responded: 19 },
      { campaign: "Holiday Special", sent: 500, opened: 275, clicked: 55, responded: 12 },
      { campaign: "Webinar Invite", sent: 300, opened: 180, clicked: 45, responded: 15 },
    ]
  },
}
