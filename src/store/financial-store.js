import { create } from "zustand"
import { devtools } from "zustand/middleware"
import { financialApi } from "@/services/financial-api"

export const useFinancialStore = create(
  devtools(
    (set, get) => ({
      overview: null,
      incomeExpenses: [],
      assetsLiabilities: [],
      goals: [],
      retirementPlan: null,
      investmentAccounts: [],

      isLoading: false,
      isLoadingOverview: false,
      isLoadingIncomeExpenses: false,
      isLoadingAssetsLiabilities: false,
      isLoadingGoals: false,
      isLoadingRetirement: false,
      isLoadingInvestments: false,

      error: null,

      fetchOverview: async (leadId) => {
        set({ isLoadingOverview: true, error: null })
        try {
          const overview = await financialApi.analytics.getSummary(leadId)
          set({ overview, isLoadingOverview: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch overview",
            isLoadingOverview: false,
          })
        }
      },

      fetchIncomeExpenses: async (leadId) => {
        set({ isLoadingIncomeExpenses: true, error: null })
        try {
          const income = await financialApi.income.getByLeadId(leadId)
          const expenses = await financialApi.expenses.getByLeadId(leadId)
          const incomeExpenses = [
            ...income.map((i) => ({ ...i, type: "income" })),
            ...expenses.map((e) => ({ ...e, type: "expense" })),
          ]
          set({ incomeExpenses, isLoadingIncomeExpenses: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch income/expenses",
            isLoadingIncomeExpenses: false,
          })
        }
      },

      fetchAssetsLiabilities: async (leadId) => {
        set({ isLoadingAssetsLiabilities: true, error: null })
        try {
          const assets = await financialApi.assets.getByLeadId(leadId)
          const liabilities = await financialApi.liabilities.getByLeadId(leadId)
          const assetsLiabilities = [
            ...assets.map((a) => ({ ...a, type: "asset" })),
            ...liabilities.map((l) => ({ ...l, type: "liability" })),
          ]
          set({ assetsLiabilities, isLoadingAssetsLiabilities: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch assets/liabilities",
            isLoadingAssetsLiabilities: false,
          })
        }
      },

      fetchGoals: async (leadId) => {
        set({ isLoadingGoals: true, error: null })
        try {
          const goals = await financialApi.goals.getByLeadId(leadId)
          set({ goals, isLoadingGoals: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch goals",
            isLoadingGoals: false,
          })
        }
      },

      fetchRetirementPlan: async (leadId) => {
        set({ isLoadingRetirement: true, error: null })
        try {
          const retirementPlan = await financialApi.profile.getByLeadId(leadId)
          set({ retirementPlan, isLoadingRetirement: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch retirement plan",
            isLoadingRetirement: false,
          })
        }
      },

      fetchInvestmentAccounts: async (leadId) => {
        set({ isLoadingInvestments: true, error: null })
        try {
          const investmentAccounts = await financialApi.investments.getByLeadId(leadId)
          set({ investmentAccounts, isLoadingInvestments: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch investment accounts",
            isLoadingInvestments: false,
          })
        }
      },

      fetchAllFinancialData: async (leadId) => {
        set({ isLoading: true, error: null })
        try {
          await Promise.all([
            get().fetchOverview(leadId),
            get().fetchIncomeExpenses(leadId),
            get().fetchAssetsLiabilities(leadId),
            get().fetchGoals(leadId),
            get().fetchRetirementPlan(leadId),
            get().fetchInvestmentAccounts(leadId),
          ])
          set({ isLoading: false })
        } catch (error) {
          set({
            error: error?.message || "Failed to fetch financial data",
            isLoading: false,
          })
        }
      },

      createIncomeExpense: async (leadId, data) => {
        try {
          const newItem = await financialApi.income.create(leadId, data)
          set((state) => ({
            incomeExpenses: [...state.incomeExpenses, newItem],
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to create income/expense" })
        }
      },

      updateIncomeExpense: async (id, data) => {
        try {
          const updatedItem = await financialApi.income.update(data.leadId, id, data)
          set((state) => ({
            incomeExpenses: state.incomeExpenses.map((item) =>
              item.id === id ? updatedItem : item,
            ),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to update income/expense" })
        }
      },

      deleteIncomeExpense: async (id) => {
        try {
          await financialApi.income.delete("", id)
          set((state) => ({
            incomeExpenses: state.incomeExpenses.filter((item) => item.id !== id),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to delete income/expense" })
        }
      },

      createAssetLiability: async (leadId, data) => {
        try {
          const newItem = await financialApi.assets.create(leadId, data)
          set((state) => ({
            assetsLiabilities: [...state.assetsLiabilities, newItem],
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to create asset/liability" })
        }
      },

      updateAssetLiability: async (id, data) => {
        try {
          const updatedItem = await financialApi.assets.update(data.leadId, id, data)
          set((state) => ({
            assetsLiabilities: state.assetsLiabilities.map((item) =>
              item.id === id ? updatedItem : item,
            ),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to update asset/liability" })
        }
      },

      deleteAssetLiability: async (id) => {
        try {
          await financialApi.assets.delete("", id)
          set((state) => ({
            assetsLiabilities: state.assetsLiabilities.filter((item) => item.id !== id),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to delete asset/liability" })
        }
      },

      createGoal: async (leadId, data) => {
        try {
          const newGoal = await financialApi.goals.create(leadId, data)
          set((state) => ({
            goals: [...state.goals, newGoal],
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to create goal" })
        }
      },

      updateGoal: async (id, data) => {
        try {
          const updatedGoal = await financialApi.goals.update(data.leadId, id, data)
          set((state) => ({
            goals: state.goals.map((goal) =>
              goal.id === id ? updatedGoal : goal,
            ),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to update goal" })
        }
      },

      deleteGoal: async (id) => {
        try {
          await financialApi.goals.delete("", id)
          set((state) => ({
            goals: state.goals.filter((goal) => goal.id !== id),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to delete goal" })
        }
      },

      updateRetirementPlan: async (leadId, data) => {
        try {
          const updatedPlan = await financialApi.profile.update(leadId, data)
          set({ retirementPlan: updatedPlan })
        } catch (error) {
          set({ error: error?.message || "Failed to update retirement plan" })
        }
      },

      createInvestmentAccount: async (leadId, data) => {
        try {
          const newAccount = await financialApi.investments.create(leadId, data)
          set((state) => ({
            investmentAccounts: [...state.investmentAccounts, newAccount],
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to create investment account" })
        }
      },

      updateInvestmentAccount: async (id, data) => {
        try {
          const updatedAccount = await financialApi.investments.update(data.leadId, id, data)
          set((state) => ({
            investmentAccounts: state.investmentAccounts.map((account) =>
              account.id === id ? updatedAccount : account,
            ),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to update investment account" })
        }
      },

      deleteInvestmentAccount: async (id) => {
        try {
          await financialApi.investments.delete("", id)
          set((state) => ({
            investmentAccounts: state.investmentAccounts.filter((account) => account.id !== id),
          }))
        } catch (error) {
          set({ error: error?.message || "Failed to delete investment account" })
        }
      },

      clearError: () => set({ error: null }),

      reset: () =>
        set({
          overview: null,
          incomeExpenses: [],
          assetsLiabilities: [],
          goals: [],
          retirementPlan: null,
          investmentAccounts: [],
          isLoading: false,
          isLoadingOverview: false,
          isLoadingIncomeExpenses: false,
          isLoadingAssetsLiabilities: false,
          isLoadingGoals: false,
          isLoadingRetirement: false,
          isLoadingInvestments: false,
          error: null,
        }),
    }),
    { name: "financial-store" }
  )
)
