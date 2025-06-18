export interface Lead {
  id: string
  name: string
  initials: string
  email: string
  phone: string
  territory: "North Region" | "South Region" | "East Region" | "West Region"
  status: "New" | "In Progress" | "Contacted" | "Qualified" | "Nurturing" | "Converted" | "Closed Lost"
  source: string
  assignedTo: string
  dateAdded: string
  createdAt?: string
  updatedAt?: string
}

export interface LeadDetail extends Lead {
  address?: string
  notes?: string
  lastContactDate?: string
  nextFollowUpDate?: string
  leadScore?: number
  tags?: string[]
}

export interface LeadsResponse {
  leads: Lead[]
  total: number
  page: number
  pages: number
}

export interface CreateLeadRequest {
  name: string
  email: string
  phone: string
  territory: Lead["territory"]
  source: string
  assignedTo: string
}

export interface UpdateLeadRequest extends Partial<CreateLeadRequest> {
  status?: Lead["status"]
}

export interface LeadsFilters {
  status?: string
  territory?: string
  assignedTo?: string
  source?: string
  search?: string
  page?: number
  limit?: number
}
