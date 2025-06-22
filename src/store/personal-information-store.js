import { create } from "zustand"
import { personalInformationApiService } from "@/services/personal-information-api"
import {
  PersonalInformation,
  CreateEmailRequest,
  CreatePhoneRequest,
  CreateAddressRequest,
  UpdateEmailRequest,
  UpdatePhoneRequest,
  UpdateAddressRequest,
} from "@/types/personal-information"

interface PersonalInformationState {
  // State
  personalInfo: PersonalInformation | null
  isLoading: boolean
  error: string | null

  // Actions
  fetchPersonalInformation: (leadId: string) => Promise<void>

  // Email actions
  createEmail: (data: CreateEmailRequest) => Promise<void>
  updateEmail: (emailId: string, data: UpdateEmailRequest) => Promise<void>
  deleteEmail: (emailId: string) => Promise<void>
  setPrimaryEmail: (emailId: string) => Promise<void>

  // Phone actions
  createPhone: (data: CreatePhoneRequest) => Promise<void>
  updatePhone: (phoneId: string, data: UpdatePhoneRequest) => Promise<void>
  deletePhone: (phoneId: string) => Promise<void>
  setPrimaryPhone: (phoneId: string) => Promise<void>

  // Address actions
  createAddress: (data: CreateAddressRequest) => Promise<void>
  updateAddress: (addressId: string, data: UpdateAddressRequest) => Promise<void>
  deleteAddress: (addressId: string) => Promise<void>
  setPrimaryAddress: (addressId: string) => Promise<void>

  // Utility actions
  clearError: () => void
  reset: () => void
}

export const usePersonalInformationStore = create<PersonalInformationState>((set, get) => ({
  // Initial state
  personalInfo: null,
  isLoading: false,
  error: null,

  // Fetch personal information
  fetchPersonalInformation: async (leadId: string) => {
    set({ isLoading: true, error: null })
    try {
      const personalInfo = await personalInformationApiService.getPersonalInformation(leadId)
      set({ personalInfo, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch personal information",
        isLoading: false,
      })
    }
  },

  // Email actions
  createEmail: async (data: CreateEmailRequest) => {
    set({ isLoading: true, error: null })
    try {
      const newEmail = await personalInformationApiService.createEmail(data)

      set((state) => {
        if (!state.personalInfo) return state

        // If new email is primary, set all others to non-primary
        const updatedEmails = data.isPrimary
          ? state.personalInfo.emails.map((email) => ({ ...email, isPrimary: false }))
          : state.personalInfo.emails

        return {
          personalInfo: {
            ...state.personalInfo,
            emails: [...updatedEmails, newEmail],
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create email",
        isLoading: false,
      })
    }
  },

  updateEmail: async (emailId: string, data: UpdateEmailRequest) => {
    set({ isLoading: true, error: null })
    try {
      const updatedEmail = await personalInformationApiService.updateEmail(emailId, data)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            emails: state.personalInfo.emails.map((email) => (email.id === emailId ? updatedEmail : email)),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update email",
        isLoading: false,
      })
    }
  },

  deleteEmail: async (emailId: string) => {
    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.deleteEmail(emailId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            emails: state.personalInfo.emails.filter((email) => email.id !== emailId),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete email",
        isLoading: false,
      })
    }
  },

  setPrimaryEmail: async (emailId: string) => {
    const { personalInfo } = get()
    if (!personalInfo) return

    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.setPrimaryEmail(emailId, personalInfo.leadId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            emails: state.personalInfo.emails.map((email) => ({
              ...email,
              isPrimary: email.id === emailId,
            })),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to set primary email",
        isLoading: false,
      })
    }
  },

  // Phone actions
  createPhone: async (data: CreatePhoneRequest) => {
    set({ isLoading: true, error: null })
    try {
      const newPhone = await personalInformationApiService.createPhone(data)

      set((state) => {
        if (!state.personalInfo) return state

        // If new phone is primary, set all others to non-primary
        const updatedPhones = data.isPrimary
          ? state.personalInfo.phones.map((phone) => ({ ...phone, isPrimary: false }))
          : state.personalInfo.phones

        return {
          personalInfo: {
            ...state.personalInfo,
            phones: [...updatedPhones, newPhone],
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create phone",
        isLoading: false,
      })
    }
  },

  updatePhone: async (phoneId: string, data: UpdatePhoneRequest) => {
    set({ isLoading: true, error: null })
    try {
      const updatedPhone = await personalInformationApiService.updatePhone(phoneId, data)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            phones: state.personalInfo.phones.map((phone) => (phone.id === phoneId ? updatedPhone : phone)),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update phone",
        isLoading: false,
      })
    }
  },

  deletePhone: async (phoneId: string) => {
    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.deletePhone(phoneId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            phones: state.personalInfo.phones.filter((phone) => phone.id !== phoneId),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete phone",
        isLoading: false,
      })
    }
  },

  setPrimaryPhone: async (phoneId: string) => {
    const { personalInfo } = get()
    if (!personalInfo) return

    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.setPrimaryPhone(phoneId, personalInfo.leadId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            phones: state.personalInfo.phones.map((phone) => ({
              ...phone,
              isPrimary: phone.id === phoneId,
            })),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to set primary phone",
        isLoading: false,
      })
    }
  },

  // Address actions
  createAddress: async (data: CreateAddressRequest) => {
    set({ isLoading: true, error: null })
    try {
      const newAddress = await personalInformationApiService.createAddress(data)

      set((state) => {
        if (!state.personalInfo) return state

        // If new address is primary, set all others to non-primary
        const updatedAddresses = data.isPrimary
          ? state.personalInfo.addresses.map((address) => ({ ...address, isPrimary: false }))
          : state.personalInfo.addresses

        return {
          personalInfo: {
            ...state.personalInfo,
            addresses: [...updatedAddresses, newAddress],
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create address",
        isLoading: false,
      })
    }
  },

  updateAddress: async (addressId: string, data: UpdateAddressRequest) => {
    set({ isLoading: true, error: null })
    try {
      const updatedAddress = await personalInformationApiService.updateAddress(addressId, data)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            addresses: state.personalInfo.addresses.map((address) =>
              address.id === addressId ? updatedAddress : address,
            ),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update address",
        isLoading: false,
      })
    }
  },

  deleteAddress: async (addressId: string) => {
    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.deleteAddress(addressId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            addresses: state.personalInfo.addresses.filter((address) => address.id !== addressId),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete address",
        isLoading: false,
      })
    }
  },

  setPrimaryAddress: async (addressId: string) => {
    const { personalInfo } = get()
    if (!personalInfo) return

    set({ isLoading: true, error: null })
    try {
      await personalInformationApiService.setPrimaryAddress(addressId, personalInfo.leadId)

      set((state) => {
        if (!state.personalInfo) return state

        return {
          personalInfo: {
            ...state.personalInfo,
            addresses: state.personalInfo.addresses.map((address) => ({
              ...address,
              isPrimary: address.id === addressId,
            })),
          },
          isLoading: false,
        }
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to set primary address",
        isLoading: false,
      })
    }
  },

  // Utility actions
  clearError: () => set({ error: null }),

  reset: () =>
    set({
      personalInfo: null,
      isLoading: false,
      error: null,
    }),
}))
