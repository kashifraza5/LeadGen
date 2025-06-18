import { create } from "zustand"
import { dashboardApi } from "@/services/dashboard-api"

export const useDashboardStore = create((set, get) => ({
  // Initial state
  dashboardData: null,
  leadTrendData: [],
  responseAnalyticsData: [],
  isLoading: false,
  isLoadingTrend: false,
  isLoadingAnalytics: false,
  error: null,
  filters: {
    dateRange: "week",
  },

  // Actions
  fetchDashboardData: async () => {
    set({ isLoading: true, error: null })
    try {
      const data = await dashboardApi.getDashboardData(get().filters)
      set({ dashboardData: data, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch dashboard data",
        isLoading: false,
      })
    }
  },

  fetchLeadTrend: async () => {
    set({ isLoadingTrend: true, error: null })
    try {
      const data = await dashboardApi.getLeadTrend(get().filters)
      set({ leadTrendData: data, isLoadingTrend: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch lead trend data",
        isLoadingTrend: false,
      })
    }
  },

  fetchResponseAnalytics: async () => {
    set({ isLoadingAnalytics: true, error: null })
    try {
      const data = await dashboardApi.getResponseAnalytics(get().filters)
      set({ responseAnalyticsData: data, isLoadingAnalytics: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch response analytics",
        isLoadingAnalytics: false,
      })
    }
  },

  setFilters: (newFilters) => {
    const updatedFilters = { ...get().filters, ...newFilters }
    set({ filters: updatedFilters })

    // Automatically refetch data when filters change
    get().refreshData()
  },

  clearError: () => set({ error: null }),

  refreshData: async () => {
    const { fetchDashboardData, fetchLeadTrend, fetchResponseAnalytics } = get()
    await Promise.all([fetchDashboardData(), fetchLeadTrend(), fetchResponseAnalytics()])
  },
}))
