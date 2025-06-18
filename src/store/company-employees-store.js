import { create } from "zustand"
import { companyEmployeesApiService } from "@/services/company-employees-api"

export const useCompanyEmployeesStore = create((set, get) => ({
  // Initial state
  employees: [],
  stats: null,

  isLoadingEmployees: false,
  isLoadingStats: false,
  isCreatingEmployee: false,
  isInvitingEmployee: false,
  isUpdatingEmployee: false,
  isDeletingEmployee: false,

  employeesError: null,
  statsError: null,
  createError: null,
  inviteError: null,
  updateError: null,
  deleteError: null,

  // Actions
  fetchEmployees: async () => {
    set({ isLoadingEmployees: true, employeesError: null })
    try {
      const employees = await companyEmployeesApiService.getEmployees()
      set({ employees, isLoadingEmployees: false })
    } catch (error) {
      set({
        employeesError: error instanceof Error ? error.message : "Failed to fetch employees",
        isLoadingEmployees: false,
      })
    }
  },

  fetchStats: async () => {
    set({ isLoadingStats: true, statsError: null })
    try {
      const stats = await companyEmployeesApiService.getEmployeeStats()
      set({ stats, isLoadingStats: false })
    } catch (error) {
      set({
        statsError: error instanceof Error ? error.message : "Failed to fetch stats",
        isLoadingStats: false,
      })
    }
  },

  createEmployee: async (data) => {
    set({ isCreatingEmployee: true, createError: null })
    try {
      const newEmployee = await companyEmployeesApiService.createEmployee(data)
      const { employees } = get()
      set({
        employees: [...employees, newEmployee],
        isCreatingEmployee: false,
      })
    } catch (error) {
      set({
        createError: error instanceof Error ? error.message : "Failed to create employee",
        isCreatingEmployee: false,
      })
    }
  },

  inviteEmployee: async (data) => {
    set({ isInvitingEmployee: true, inviteError: null })
    try {
      await companyEmployeesApiService.inviteEmployee(data)
      set({ isInvitingEmployee: false })
    } catch (error) {
      set({
        inviteError: error instanceof Error ? error.message : "Failed to invite employee",
        isInvitingEmployee: false,
      })
    }
  },

  updateEmployee: async (id, data) => {
    set({ isUpdatingEmployee: true, updateError: null })
    try {
      const updatedEmployee = await companyEmployeesApiService.updateEmployee(id, data)
      const { employees } = get()
      set({
        employees: employees.map((emp) => (emp.id === id ? updatedEmployee : emp)),
        isUpdatingEmployee: false,
      })
    } catch (error) {
      set({
        updateError: error instanceof Error ? error.message : "Failed to update employee",
        isUpdatingEmployee: false,
      })
    }
  },

  deleteEmployee: async (id) => {
    set({ isDeletingEmployee: true, deleteError: null })
    try {
      await companyEmployeesApiService.deleteEmployee(id)
      const { employees } = get()
      set({
        employees: employees.filter((emp) => emp.id !== id),
        isDeletingEmployee: false,
      })
    } catch (error) {
      set({
        deleteError: error instanceof Error ? error.message : "Failed to delete employee",
        isDeletingEmployee: false,
      })
    }
  },

  clearErrors: () => {
    set({
      employeesError: null,
      statsError: null,
      createError: null,
      inviteError: null,
      updateError: null,
      deleteError: null,
    })
  },
}))
