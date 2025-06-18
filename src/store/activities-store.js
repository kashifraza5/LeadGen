import { create } from "zustand"
import { activitiesApi } from "@/services/activities-api"

interface ActivitiesState {
  activities: Activity[]
  columns: KanbanColumn[]
  advisors: Array<{ id: string; name: string; email: string; initials: string }>
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  error: string | null

  // Actions
  fetchActivities: (leadId: string) => Promise<void>
  createActivity: (leadId: string, data: CreateActivityData) => Promise<void>
  updateActivity: (activityId: string, data: UpdateActivityData) => Promise<void>
  updateActivityStatus: (activityId: string, status: Activity["status"]) => Promise<void>
  deleteActivity: (activityId: string) => Promise<void>
  fetchAdvisors: () => Promise<void>
  clearError: () => void
  moveActivity: (activityId: string, newStatus: Activity["status"]) => void
}

const initialColumns: KanbanColumn[] = [
  {
    id: "todo",
    title: "To Do",
    status: "todo",
    color: "bg-gray-100",
    activities: [],
  },
  {
    id: "in_progress",
    title: "In Progress",
    status: "in_progress",
    color: "bg-blue-100",
    activities: [],
  },
  {
    id: "review",
    title: "Review",
    status: "review",
    color: "bg-yellow-100",
    activities: [],
  },
  {
    id: "completed",
    title: "Completed",
    status: "completed",
    color: "bg-green-100",
    activities: [],
  },
  {
    id: "cancelled",
    title: "Cancelled",
    status: "cancelled",
    color: "bg-red-100",
    activities: [],
  },
]

export const useActivitiesStore = create<ActivitiesState>((set, get) => ({
  activities: [],
  columns: initialColumns,
  advisors: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  error: null,

  fetchActivities: async (leadId: string) => {
    set({ isLoading: true, error: null })
    try {
      const activities = await activitiesApi.getActivities(leadId)

      // Organize activities into columns
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        activities: activities.filter((activity) => activity.status === column.status),
      }))

      set({
        activities,
        columns: updatedColumns,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch activities",
        isLoading: false,
      })
    }
  },

  createActivity: async (leadId: string, data: CreateActivityData) => {
    set({ isCreating: true, error: null })
    try {
      const newActivity = await activitiesApi.createActivity(leadId, data)

      const { activities, columns } = get()
      const updatedActivities = [...activities, newActivity]

      // Add to appropriate column
      const updatedColumns = columns.map((column) =>
        column.status === newActivity.status ? { ...column, activities: [...column.activities, newActivity] } : column,
      )

      set({
        activities: updatedActivities,
        columns: updatedColumns,
        isCreating: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create activity",
        isCreating: false,
      })
    }
  },

  updateActivity: async (activityId: string, data: UpdateActivityData) => {
    set({ isUpdating: true, error: null })
    try {
      const updatedActivity = await activitiesApi.updateActivity(activityId, data)

      const { activities, columns } = get()
      const updatedActivities = activities.map((activity) => (activity.id === activityId ? updatedActivity : activity))

      // Reorganize columns if status changed
      const updatedColumns = initialColumns.map((column) => ({
        ...column,
        activities: updatedActivities.filter((activity) => activity.status === column.status),
      }))

      set({
        activities: updatedActivities,
        columns: updatedColumns,
        isUpdating: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update activity",
        isUpdating: false,
      })
    }
  },

  updateActivityStatus: async (activityId: string, status: Activity["status"]) => {
    // Optimistic update
    get().moveActivity(activityId, status)

    try {
      await activitiesApi.updateActivityStatus(activityId, status)
    } catch (error) {
      // Revert on error
      set({
        error: error instanceof Error ? error.message : "Failed to update activity status",
      })
      // You might want to revert the optimistic update here
    }
  },

  deleteActivity: async (activityId: string) => {
    set({ error: null })
    try {
      await activitiesApi.deleteActivity(activityId)

      const { activities, columns } = get()
      const updatedActivities = activities.filter((activity) => activity.id !== activityId)

      const updatedColumns = columns.map((column) => ({
        ...column,
        activities: column.activities.filter((activity) => activity.id !== activityId),
      }))

      set({
        activities: updatedActivities,
        columns: updatedColumns,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete activity",
      })
    }
  },

  fetchAdvisors: async () => {
    try {
      const advisors = await activitiesApi.getAdvisors()
      set({ advisors })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch advisors",
      })
    }
  },

  clearError: () => set({ error: null }),

  moveActivity: (activityId: string, newStatus: Activity["status"]) => {
    const { activities, columns } = get()

    const updatedActivities = activities.map((activity) =>
      activity.id === activityId ? { ...activity, status: newStatus, updatedAt: new Date().toISOString() } : activity,
    )

    const updatedColumns = initialColumns.map((column) => ({
      ...column,
      activities: updatedActivities.filter((activity) => activity.status === column.status),
    }))

    set({
      activities: updatedActivities,
      columns: updatedColumns,
    })
  },
}))
