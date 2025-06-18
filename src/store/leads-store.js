import { create } from "zustand"
import { leadsApiService } from "@/services/leads-api"

export const useLeadsStore = create((set, get) => ({
  leads: [],
  totalLeads: 0,
  isLoading: false,
  error: null,
  statusFilter: "",
  territoryFilter: "",
  searchQuery: "",
  currentPage: 1,
  itemsPerPage: 10,
  fetchLeads: async () => {
    set({ isLoading: true, error: null })
    try {
      const {
        statusFilter,
        territoryFilter,
        searchQuery,
        currentPage,
        itemsPerPage,
      } = get()

      const response = await leadsApiService.getLeads({
        status: statusFilter,
        territory: territoryFilter,
        search: searchQuery,
        page: currentPage,
        limit: itemsPerPage,
      })

      set({
        leads: response.leads,
        totalLeads: response.total,
        isLoading: false,
        error: null,
      })
    } catch (error) {
      set({ isLoading: false, error: error.message })
    }
  },
  setStatusFilter: (status) => {
    set({ statusFilter: status, currentPage: 1 })
  },
  setTerritoryFilter: (territory) => {
    set({ territoryFilter: territory, currentPage: 1 })
  },
  setSearchQuery: (search) => {
    set({ searchQuery: search, currentPage: 1 })
  },
  setCurrentPage: (page) => {
    set({ currentPage: page })
  },
  setItemsPerPage: (limit) => {
    set({ itemsPerPage: limit, currentPage: 1 })
  },
}))
