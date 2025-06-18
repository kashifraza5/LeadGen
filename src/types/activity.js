export interface Advisor {
  id: string
  name: string
  email: string
  initials: string
}

export interface Activity {
  id: string
  type: "Meeting" | "Call" | "Task"
  category: string
  title: string
  description: string
  assignedAdvisors: Advisor[]
  sharedWith: Advisor[]
  status: "todo" | "in_progress" | "review" | "completed" | "cancelled"
  priority: "high" | "medium" | "low"
  startDateTime: string
  endDateTime: string
  createdAt: string
  updatedAt: string
  completedAt?: string
  notes?: string
  location?: string
  outcome?: string
  leadId: string
}

export interface KanbanColumn {
  id: string
  title: string
  status: Activity["status"]
  color: string
  activities: Activity[]
}

export interface CreateActivityData {
  type: Activity["type"]
  category: string
  title: string
  description: string
  assignedAdvisorIds: string[]
  sharedWithIds: string[]
  priority: Activity["priority"]
  startDateTime: string
  endDateTime: string
  location?: string
  notes?: string
}

export interface UpdateActivityData extends Partial<CreateActivityData> {
  status?: Activity["status"]
  outcome?: string
  completedAt?: string
}
