import { create } from "zustand"
import { companyBillingApiService } from "@/services/company-billing-api"

export const useCompanyBillingStore = create((set, get) => ({
  // Initial state
  subscriptionInfo: null,
  plans: [],
  billingHistory: [],
  paymentMethods: [],

  isLoadingSubscription: false,
  isLoadingPlans: false,
  isLoadingHistory: false,
  isLoadingPaymentMethods: false,
  isChangingPlan: false,
  isAddingPaymentMethod: false,
  isDownloadingInvoice: false,

  subscriptionError: null,
  plansError: null,
  historyError: null,
  paymentMethodsError: null,
  changePlanError: null,
  addPaymentMethodError: null,
  downloadError: null,

  // Actions
  fetchSubscriptionInfo: async () => {
    set({ isLoadingSubscription: true, subscriptionError: null })
    try {
      const subscriptionInfo = await companyBillingApiService.getSubscriptionInfo()
      set({ subscriptionInfo, isLoadingSubscription: false })
    } catch (error) {
      set({
        subscriptionError: error instanceof Error ? error.message : "Failed to fetch subscription info",
        isLoadingSubscription: false,
      })
    }
  },

  fetchPlans: async () => {
    set({ isLoadingPlans: true, plansError: null })
    try {
      const plans = await companyBillingApiService.getPlans()
      set({ plans, isLoadingPlans: false })
    } catch (error) {
      set({
        plansError: error instanceof Error ? error.message : "Failed to fetch plans",
        isLoadingPlans: false,
      })
    }
  },

  fetchBillingHistory: async () => {
    set({ isLoadingHistory: true, historyError: null })
    try {
      const billingHistory = await companyBillingApiService.getBillingHistory()
      set({ billingHistory, isLoadingHistory: false })
    } catch (error) {
      set({
        historyError: error instanceof Error ? error.message : "Failed to fetch billing history",
        isLoadingHistory: false,
      })
    }
  },

  fetchPaymentMethods: async () => {
    set({ isLoadingPaymentMethods: true, paymentMethodsError: null })
    try {
      const paymentMethods = await companyBillingApiService.getPaymentMethods()
      set({ paymentMethods, isLoadingPaymentMethods: false })
    } catch (error) {
      set({
        paymentMethodsError: error instanceof Error ? error.message : "Failed to fetch payment methods",
        isLoadingPaymentMethods: false,
      })
    }
  },

  changePlan: async (planId) => {
    set({ isChangingPlan: true, changePlanError: null })
    try {
      await companyBillingApiService.changePlan(planId)
      // Refresh subscription info after plan change
      await get().fetchSubscriptionInfo()
      set({ isChangingPlan: false })
    } catch (error) {
      set({
        changePlanError: error instanceof Error ? error.message : "Failed to change plan",
        isChangingPlan: false,
      })
    }
  },

  addPaymentMethod: async (data) => {
    set({ isAddingPaymentMethod: true, addPaymentMethodError: null })
    try {
      const newPaymentMethod = await companyBillingApiService.addPaymentMethod(data)
      const { paymentMethods } = get()
      set({
        paymentMethods: [...paymentMethods, newPaymentMethod],
        isAddingPaymentMethod: false,
      })
    } catch (error) {
      set({
        addPaymentMethodError: error instanceof Error ? error.message : "Failed to add payment method",
        isAddingPaymentMethod: false,
      })
    }
  },

  downloadInvoice: async (invoiceId) => {
    set({ isDownloadingInvoice: true, downloadError: null })
    try {
      const result = await companyBillingApiService.downloadInvoice(invoiceId)
      if (result.success) {
        // Trigger download
        window.open(result.url, "_blank")
      }
      set({ isDownloadingInvoice: false })
    } catch (error) {
      set({
        downloadError: error instanceof Error ? error.message : "Failed to download invoice",
        isDownloadingInvoice: false,
      })
    }
  },

  clearErrors: () => {
    set({
      subscriptionError: null,
      plansError: null,
      historyError: null,
      paymentMethodsError: null,
      changePlanError: null,
      addPaymentMethodError: null,
      downloadError: null,
    })
  },
}))
