// import { ApiService } from "./api"

// class LeadsApiService extends ApiService {
//   async getLeads(params) {
//     // TODO: Replace this dummy data with actual API call
//     // const queryParams = new URLSearchParams()
//     // if (params?.status && params.status !== 'All Statuses') queryParams.append('status', params.status)
//     // if (params?.territory && params.territory !== 'All Territories') queryParams.append('territory', params.territory)
//     // if (params?.assignedTo) queryParams.append('assigned_to', params.assignedTo)
//     // if (params?.source) queryParams.append('source', params.source)
//     // if (params?.search) queryParams.append('search', params.search)
//     // if (params?.page) queryParams.append('page', params.page.toString())
//     // if (params?.limit) queryParams.append('limit', params.limit.toString())

//     // const queryString = queryParams.toString()
//     // const endpoint = `/leads${queryString ? `?${queryString}` : ""}`
//     // return await this.get<LeadsResponse>(endpoint)

//     // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
//     await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

//     const dummyLeads = [
//       {
//         id: "LD-10042",
//         name: "Michael Rodriguez",
//         initials: "MR",
//         email: "michael.rodriguez@example.com",
//         phone: "+1 (555) 123-4567",
//         territory: "North Region",
//         status: "In Progress",
//         source: "Website Form",
//         assignedTo: "Jennifer Wilson",
//         dateAdded: "7/15/2023",
//       },
//       {
//         id: "LD-10043",
//         name: "Sarah Johnson",
//         initials: "SJ",
//         email: "sarah.johnson@example.com",
//         phone: "+1 (555) 234-5678",
//         territory: "South Region",
//         status: "New",
//         source: "Referral",
//         assignedTo: "David Chen",
//         dateAdded: "7/16/2023",
//       },
//       {
//         id: "LD-10044",
//         name: "James Williams",
//         initials: "JW",
//         email: "james.williams@example.com",
//         phone: "+1 (555) 345-6789",
//         territory: "East Region",
//         status: "Contacted",
//         source: "LinkedIn",
//         assignedTo: "Maria Garcia",
//         dateAdded: "7/14/2023",
//       },
//       {
//         id: "LD-10045",
//         name: "Emily Brown",
//         initials: "EB",
//         email: "emily.brown@example.com",
//         phone: "+1 (555) 456-7890",
//         territory: "West Region",
//         status: "Qualified",
//         source: "Trade Show",
//         assignedTo: "Jennifer Wilson",
//         dateAdded: "7/12/2023",
//       },
//       {
//         id: "LD-10046",
//         name: "Robert Jones",
//         initials: "RJ",
//         email: "robert.jones@example.com",
//         phone: "+1 (555) 567-8901",
//         territory: "North Region",
//         status: "Nurturing",
//         source: "Webinar",
//         assignedTo: "David Chen",
//         dateAdded: "7/10/2023",
//       },
//       {
//         id: "LD-10047",
//         name: "Jennifer Garcia",
//         initials: "JG",
//         email: "jennifer.garcia@example.com",
//         phone: "+1 (555) 678-9012",
//         territory: "South Region",
//         status: "Converted",
//         source: "Email Campaign",
//         assignedTo: "Maria Garcia",
//         dateAdded: "7/8/2023",
//       },
//       {
//         id: "LD-10048",
//         name: "David Miller",
//         initials: "DM",
//         email: "david.miller@example.com",
//         phone: "+1 (555) 789-0123",
//         territory: "East Region",
//         status: "Closed Lost",
//         source: "Cold Call",
//         assignedTo: "Jennifer Wilson",
//         dateAdded: "7/5/2023",
//       },
//       {
//         id: "LD-10049",
//         name: "Lisa Davis",
//         initials: "LD",
//         email: "lisa.davis@example.com",
//         phone: "+1 (555) 890-1234",
//         territory: "West Region",
//         status: "New",
//         source: "Website Form",
//         assignedTo: "David Chen",
//         dateAdded: "7/17/2023",
//       },
//       {
//         id: "LD-10050",
//         name: "Thomas Wilson",
//         initials: "TW",
//         email: "thomas.wilson@example.com",
//         phone: "+1 (555) 901-2345",
//         territory: "North Region",
//         status: "In Progress",
//         source: "Partner Referral",
//         assignedTo: "Maria Garcia",
//         dateAdded: "7/16/2023",
//       },
//       {
//         id: "LD-10051",
//         name: "Michelle Taylor",
//         initials: "MT",
//         email: "michelle.taylor@example.com",
//         phone: "+1 (555) 012-3456",
//         territory: "South Region",
//         status: "Contacted",
//         source: "Social Media",
//         assignedTo: "Jennifer Wilson",
//         dateAdded: "7/15/2023",
//       },
//     ]

//     // Apply filters to dummy data
//     let filteredLeads = dummyLeads
//     if (params?.status && params.status !== "All Statuses") {
//       filteredLeads = filteredLeads.filter((lead) => lead.status === params.status)
//     }
//     if (params?.territory && params.territory !== "All Territories") {
//       filteredLeads = filteredLeads.filter((lead) => lead.territory === params.territory)
//     }
//     if (params?.search) {
//       const searchTerm = params.search.toLowerCase()
//       filteredLeads = filteredLeads.filter(
//         (lead) =>
//           lead.name.toLowerCase().includes(searchTerm) ||
//           lead.email.toLowerCase().includes(searchTerm) ||
//           lead.phone.includes(searchTerm),
//       )
//     }

//     // Apply pagination
//     const page = params?.page || 1
//     const limit = params?.limit || 10
//     const startIndex = (page - 1) * limit
//     const endIndex = startIndex + limit
//     const paginatedLeads = filteredLeads.slice(startIndex, endIndex)

//     return {
//       leads: paginatedLeads,
//       total: filteredLeads.length,
//       page: page,
//       pages: Math.ceil(filteredLeads.length / limit),
//     }
//   }

//   async getLeadById(id) {
//     // TODO: Replace this dummy data with actual API call
//     // return await this.get<LeadDetail>(`/leads/${id}`)

//     // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
//     await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay

//     return {
//       id: id,
//       name: "Michael Rodriguez",
//       initials: "MR",
//       email: "michael.rodriguez@example.com",
//       phone: "+1 (555) 123-4567",
//       territory: "North Region",
//       status: "In Progress",
//       source: "Website Form",
//       assignedTo: "Jennifer Wilson",
//       dateAdded: "7/15/2023",
//       address: "123 Main St, City, State 12345",
//       notes: "Interested in premium package",
//       lastContactDate: "7/20/2023",
//       nextFollowUpDate: "7/25/2023",
//       leadScore: 85,
//       tags: ["hot-lead", "premium-interest"],
//     }
//   }

//   async createLead(data) {
//     // TODO: Replace this dummy data with actual API call
//     // return await this.post<Lead>('/leads', data)

//     // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
//     await new Promise((resolve) => setTimeout(resolve, 800)) // Simulate API delay

//     const newLead = {
//       id: `LD-${Math.floor(Math.random() * 90000) + 10000}`,
//       name: data.name,
//       initials: data.name
//         .split(" ")
//         .map((n) => n[0])
//         .join("")
//         .toUpperCase(),
//       email: data.email,
//       phone: data.phone,
//       territory: data.territory,
//       status: "New",
//       source: data.source,
//       assignedTo: data.assignedTo,
//       dateAdded: new Date().toLocaleDateString(),
//       createdAt: new Date().toISOString(),
//       updatedAt: new Date().toISOString(),
//     }

//     return newLead
//   }

//   async updateLead(id, data) {
//     // TODO: Replace this dummy data with actual API call
//     // return await this.put<Lead>(`/leads/${id}`, data)

//     // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
//     await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

//     const updatedLead = {
//       id: id,
//       name: data.name || "Michael Rodriguez",
//       initials: data.name
//         ? data.name
//             .split(" ")
//             .map((n) => n[0])
//             .join("")
//             .toUpperCase()
//         : "MR",
//       email: data.email || "michael.rodriguez@example.com",
//       phone: data.phone || "+1 (555) 123-4567",
//       territory: data.territory || "North Region",
//       status: data.status || "In Progress",
//       source: data.source || "Website Form",
//       assignedTo: data.assignedTo || "Jennifer Wilson",
//       dateAdded: "7/15/2023",
//       updatedAt: new Date().toISOString(),
//     }

//     return updatedLead
//   }

//   async deleteLead(id) {
//     // TODO: Replace this dummy response with actual API call
//     // await this.delete(`/leads/${id}`)

//     // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
//     await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay
//     console.log(`Lead ${id} deleted successfully`)
//   }
// }

// export const leadsApiService = new LeadsApiService()
