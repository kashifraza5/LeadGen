import { create } from "zustand"
import { companyOverviewApiService } from "@/services/company-overview-api"

export const useCompanyOverviewStore = create((set, get) => ({
  // Initial state
  companyInfo: null,
  metrics: null,
  advisorStats: [],
  topPerformers: [],

  isLoadingCompanyInfo: false,
  isLoadingMetrics: false,
  isLoadingAdvisorStats: false,
  isLoadingTopPerformers: false,
  isUpdatingCompanyInfo: false,

  companyInfoError: null,
  metricsError: null,
  advisorStatsError: null,
  topPerformersError: null,

  // Actions
  fetchCompanyInfo: async () => {
    set({ isLoadingCompanyInfo: true, companyInfoError: null })
    try {
      const companyInfo = await companyOverviewApiService.getCompanyInfo()
      set({ companyInfo, isLoadingCompanyInfo: false })
    } catch (error) {
      set({
        companyInfoError: error instanceof Error ? error.message : "Failed to fetch company info",
        isLoadingCompanyInfo: false,
      })
    }
  },

  fetchMetrics: async () => {
    set({ isLoadingMetrics: true, metricsError: null })
    try {
      const metrics = await companyOverviewApiService.getCompanyMetrics()
      set({ metrics, isLoadingMetrics: false })
    } catch (error) {
      set({
        metricsError: error instanceof Error ? error.message : "Failed to fetch metrics",
        isLoadingMetrics: false,
      })
    }
  },

  fetchAdvisorStats: async () => {
    set({ isLoadingAdvisorStats: true, advisorStatsError: null })
    try {
      const advisorStats = await companyOverviewApiService.getAdvisorStats()
      set({ advisorStats, isLoadingAdvisorStats: false })
    } catch (error) {
      set({
        advisorStatsError: error instanceof Error ? error.message : "Failed to fetch advisor stats",
        isLoadingAdvisorStats: false,
      })
    }
  },

  fetchTopPerformers: async () => {
    set({ isLoadingTopPerformers: true, topPerformersError: null })
    try {
      const topPerformers = await companyOverviewApiService.getTopPerformers()
      set({ topPerformers, isLoadingTopPerformers: false })
    } catch (error) {
      set({
        topPerformersError: error instanceof Error ? error.message : "Failed to fetch top performers",
        isLoadingTopPerformers: false,
      })
    }
  },

  updateCompanyInfo: async (data) => {
    set({ isUpdatingCompanyInfo: true, companyInfoError: null })
    try {
      const updatedInfo = await companyOverviewApiService.updateCompanyInfo(data)
      set({ companyInfo: updatedInfo, isUpdatingCompanyInfo: false })
    } catch (error) {
      set({
        companyInfoError: error instanceof Error ? error.message : "Failed to update company info",
        isUpdatingCompanyInfo: false,
      })
    }
  },

  clearErrors: () => {
    set({
      companyInfoError: null,
      metricsError: null,
      advisorStatsError: null,
      topPerformersError: null,
    })
  },
}))
