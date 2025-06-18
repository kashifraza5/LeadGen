import { ApiService } from "./api"

class ActivitiesApiService extends ApiService {
  // Get all activities for a lead
  async getActivities(leadId: string): Promise<Activity[]> {
    // TODO: Replace with actual API call
    // const response = await this.get<Activity[]>(`/leads/${leadId}/activities`)
    // return response

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    const dummyActivities: Activity[] = [
      {
        id: "1",
        type: "Meeting",
        category: "Initial Consultation",
        title: "First Meeting with Client",
        description: "Discuss financial goals and current situation",
        assignedAdvisors: [{ id: "1", name: "John Smith", email: "john@example.com", initials: "JS" }],
        sharedWith: [],
        status: "todo",
        priority: "high",
        startDateTime: "2024-01-15T10:00:00",
        endDateTime: "2024-01-15T11:00:00",
        createdAt: "2024-01-10T09:30:00",
        updatedAt: "2024-01-10T09:30:00",
        leadId: leadId,
        location: "Conference Room A",
      },
      {
        id: "2",
        type: "Call",
        category: "Follow-up",
        title: "Follow-up Call",
        description: "Check in on progress and answer questions",
        assignedAdvisors: [{ id: "2", name: "Sarah Johnson", email: "sarah@example.com", initials: "SJ" }],
        sharedWith: [],
        status: "in_progress",
        priority: "medium",
        startDateTime: "2024-01-20T14:00:00",
        endDateTime: "2024-01-20T14:30:00",
        createdAt: "2024-01-16T13:00:00",
        updatedAt: "2024-01-20T14:00:00",
        leadId: leadId,
      },
      {
        id: "3",
        type: "Task",
        category: "Document Review",
        title: "Review Financial Documents",
        description: "Review client's financial statements and tax returns",
        assignedAdvisors: [{ id: "3", name: "Michael Brown", email: "michael@example.com", initials: "MB" }],
        sharedWith: [],
        status: "review",
        priority: "low",
        startDateTime: "2024-01-25T09:00:00",
        endDateTime: "2024-01-25T17:00:00",
        createdAt: "2024-01-22T11:00:00",
        updatedAt: "2024-01-25T16:00:00",
        leadId: leadId,
      },
      {
        id: "4",
        type: "Meeting",
        category: "Plan Presentation",
        title: "Present Financial Plan",
        description: "Present comprehensive financial plan to client",
        assignedAdvisors: [{ id: "1", name: "John Smith", email: "john@example.com", initials: "JS" }],
        sharedWith: [],
        status: "completed",
        priority: "high",
        startDateTime: "2024-01-01T13:00:00",
        endDateTime: "2024-01-01T14:30:00",
        createdAt: "2023-12-25T10:00:00",
        updatedAt: "2024-01-01T14:30:00",
        completedAt: "2024-01-01T14:30:00",
        leadId: leadId,
        outcome: "Client approved the financial plan",
      },
    ]

    return dummyActivities
  }

  // Create new activity
  async createActivity(leadId: string, data: CreateActivityData): Promise<Activity> {
    // TODO: Replace with actual API call
    // const response = await this.post<Activity>(`/leads/${leadId}/activities`, data)
    // return response

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newActivity: Activity = {
      id: Math.random().toString(36).substr(2, 9),
      ...data,
      assignedAdvisors: data.assignedAdvisorIds.map((id) => ({
        id,
        name: `Advisor ${id}`,
        email: `advisor${id}@example.com`,
        initials: `A${id}`,
      })),
      sharedWith: data.sharedWithIds.map((id) => ({
        id,
        name: `Advisor ${id}`,
        email: `advisor${id}@example.com`,
        initials: `A${id}`,
      })),
      status: "todo",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      leadId,
    }

    return newActivity
  }

  // Update activity
  async updateActivity(activityId: string, data: UpdateActivityData): Promise<Activity> {
    // TODO: Replace with actual API call
    // const response = await this.put<Activity>(`/activities/${activityId}`, data)
    // return response

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Return updated activity (in real implementation, this would come from the API)
    const updatedActivity: Activity = {
      id: activityId,
      type: data.type || "Task",
      category: data.category || "General",
      title: data.title || "Updated Activity",
      description: data.description || "Updated description",
      assignedAdvisors:
        data.assignedAdvisorIds?.map((id) => ({
          id,
          name: `Advisor ${id}`,
          email: `advisor${id}@example.com`,
          initials: `A${id}`,
        })) || [],
      sharedWith:
        data.sharedWithIds?.map((id) => ({
          id,
          name: `Advisor ${id}`,
          email: `advisor${id}@example.com`,
          initials: `A${id}`,
        })) || [],
      status: data.status || "todo",
      priority: data.priority || "medium",
      startDateTime: data.startDateTime || new Date().toISOString(),
      endDateTime: data.endDateTime || new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completedAt: data.completedAt,
      notes: data.notes,
      location: data.location,
      outcome: data.outcome,
      leadId: "dummy-lead-id",
    }

    return updatedActivity
  }

  // Update activity status (for drag and drop)
  async updateActivityStatus(activityId: string, status: Activity["status"]): Promise<Activity> {
    // TODO: Replace with actual API call
    // const response = await this.put<Activity>(`/activities/${activityId}/status`, { status })
    // return response

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return this.updateActivity(activityId, {
      status,
      completedAt: status === "completed" ? new Date().toISOString() : undefined,
    })
  }

  // Delete activity
  async deleteActivity(activityId: string): Promise<void> {
    // TODO: Replace with actual API call
    // await this.delete(`/activities/${activityId}`)

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    console.log(`Activity ${activityId} deleted`)
  }

  // Get available advisors
  async getAdvisors(): Promise<Array<{ id: string; name: string; email: string; initials: string }>> {
    // TODO: Replace with actual API call
    // const response = await this.get<Advisor[]>('/advisors')
    // return response

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return [
      { id: "1", name: "John Smith", email: "john@example.com", initials: "JS" },
      { id: "2", name: "Sarah Johnson", email: "sarah@example.com", initials: "SJ" },
      { id: "3", name: "Michael Brown", email: "michael@example.com", initials: "MB" },
      { id: "4", name: "Emily Davis", email: "emily@example.com", initials: "ED" },
    ]
  }
}

export const activitiesApi = new ActivitiesApiService()
