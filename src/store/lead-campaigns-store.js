import { create } from "zustand"
import { leadCampaignsApi } from "@/services/lead-campaigns-api"

export const useLeadCampaignsStore = create((set, get) => ({
  // Initial state
  campaigns: [],
  selectedCampaign: null,
  stats: null,
  isLoading: false,
  error: null,
  filters: {},

  // Actions
  fetchCampaigns: async (leadId, filters) => {
    set({ isLoading: true, error: null })
    try {
      const { filters: currentFilters } = get()
      const requestFilters = { ...currentFilters, ...filters }

      const response = await leadCampaignsApi.getLeadCampaigns(leadId, requestFilters)

      set({
        campaigns: response.campaigns,
        stats: response.stats,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch campaigns",
        isLoading: false,
      })
    }
  },

  selectCampaign: (campaign) => {
    set({ selectedCampaign: campaign })
  },

  pauseCampaign: async (campaignId) => {
    set({ isLoading: true, error: null })
    try {
      await leadCampaignsApi.pauseCampaign(campaignId)

      // Update campaign status in state
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === campaignId
            ? { ...campaign, status: "paused", pausedAt: new Date().toISOString() }
            : campaign,
        ),
        selectedCampaign:
          state.selectedCampaign?.id === campaignId
            ? { ...state.selectedCampaign, status: "paused", pausedAt: new Date().toISOString() }
            : state.selectedCampaign,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to pause campaign",
        isLoading: false,
      })
    }
  },

  resumeCampaign: async (campaignId) => {
    set({ isLoading: true, error: null })
    try {
      await leadCampaignsApi.resumeCampaign(campaignId)

      // Update campaign status in state
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === campaignId ? { ...campaign, status: "active", pausedAt: undefined } : campaign,
        ),
        selectedCampaign:
          state.selectedCampaign?.id === campaignId
            ? { ...state.selectedCampaign, status: "active", pausedAt: undefined }
            : state.selectedCampaign,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to resume campaign",
        isLoading: false,
      })
    }
  },

  stopCampaign: async (campaignId) => {
    set({ isLoading: true, error: null })
    try {
      await leadCampaignsApi.stopCampaign(campaignId)

      // Update campaign status in state
      set((state) => ({
        campaigns: state.campaigns.map((campaign) =>
          campaign.id === campaignId
            ? { ...campaign, status: "stopped", stoppedAt: new Date().toISOString() }
            : campaign,
        ),
        selectedCampaign:
          state.selectedCampaign?.id === campaignId
            ? { ...state.selectedCampaign, status: "stopped", stoppedAt: new Date().toISOString() }
            : state.selectedCampaign,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to stop campaign",
        isLoading: false,
      })
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
    }))
  },

  clearError: () => {
    set({ error: null })
  },
}))
