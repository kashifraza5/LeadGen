import { create } from "zustand"
import { campaignsApi } from "@/services/campaigns-api"

export const useCampaignsStore = create((set, get) => ({
  // Initial state
  campaigns: [],
  currentCampaign: null,
  stats: null,
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  filters: {},

  // Actions
  fetchCampaigns: async (params) => {
    set({ isLoading: true, error: null })
    try {
      const { filters, currentPage } = get()
      const requestParams = {
        ...filters,
        ...params,
        page: params?.page || currentPage,
        limit: 10,
      }

      const response = await campaignsApi.getCampaigns(requestParams)

      set({
        campaigns: response.campaigns,
        stats: response.stats,
        totalPages: response.pages,
        totalItems: response.total,
        currentPage: response.page,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch campaigns",
        isLoading: false,
      })
    }
  },

  fetchCampaign: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const campaign = await campaignsApi.getCampaign(id)
      set({
        currentCampaign: campaign,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch campaign",
        isLoading: false,
      })
    }
  },

  createCampaign: async (data) => {
    set({ isLoading: true, error: null })
    try {
      const newCampaign = await campaignsApi.createCampaign(data)

      // Add to campaigns list
      set((state) => ({
        campaigns: [newCampaign, ...state.campaigns],
        isLoading: false,
      }))

      return newCampaign
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create campaign",
        isLoading: false,
      })
      throw error
    }
  },

  updateCampaign: async (id, data) => {
    set({ isLoading: true, error: null })
    try {
      const updatedCampaign = await campaignsApi.updateCampaign(id, data)

      // Update in campaigns list
      set((state) => ({
        campaigns: state.campaigns.map((campaign) => (campaign.id === id ? updatedCampaign : campaign)),
        currentCampaign: state.currentCampaign?.id === id ? updatedCampaign : state.currentCampaign,
        isLoading: false,
      }))

      return updatedCampaign
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update campaign",
        isLoading: false,
      })
      throw error
    }
  },

  deleteCampaign: async (id) => {
    set({ isLoading: true, error: null })
    try {
      await campaignsApi.deleteCampaign(id)

      // Remove from campaigns list
      set((state) => ({
        campaigns: state.campaigns.filter((campaign) => campaign.id !== id),
        currentCampaign: state.currentCampaign?.id === id ? null : state.currentCampaign,
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete campaign",
        isLoading: false,
      })
      throw error
    }
  },

  duplicateCampaign: async (id) => {
    set({ isLoading: true, error: null })
    try {
      const duplicatedCampaign = await campaignsApi.duplicateCampaign(id)

      // Add to campaigns list
      set((state) => ({
        campaigns: [duplicatedCampaign, ...state.campaigns],
        isLoading: false,
      }))

      return duplicatedCampaign
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to duplicate campaign",
        isLoading: false,
      })
      throw error
    }
  },

  setFilters: (newFilters) => {
    set((state) => ({
      filters: { ...state.filters, ...newFilters },
      currentPage: 1, // Reset to first page when filters change
    }))

    // Automatically fetch campaigns with new filters
    get().fetchCampaigns()
  },

  setCurrentPage: (page) => {
    set({ currentPage: page })
    get().fetchCampaigns({ page })
  },

  clearError: () => {
    set({ error: null })
  },

  clearCurrentCampaign: () => {
    set({ currentCampaign: null })
  },
}))
