import { injectReducer } from '../index'

// Map of available reducers that can be injected
const availableReducers = {
  leads: () => import('../slices/leadsSlice').then(module => module.default),
  campaigns: () => import('../slices/campaignsSlice').then(module => module.default),
  activities: () => import('../slices/activitiesSlice').then(module => module.default),
  notes: () => import('../slices/notesSlice').then(module => module.default),
  documents: () => import('../slices/documentsSlice').then(module => module.default),
  financial: () => import('../slices/financialSlice').then(module => module.default),
  conversations: () => import('../slices/conversationsSlice').then(module => module.default),
  'personal-information': () => import('../slices/personalInformationSlice').then(module => module.default),
  'company-overview': () => import('../slices/companyOverviewSlice').then(module => module.default),
  'company-employees': () => import('../slices/companyEmployeesSlice').then(module => module.default),
  'company-billing': () => import('../slices/companyBillingSlice').then(module => module.default),
  'lead-campaigns': () => import('../slices/leadCampaignsSlice').then(module => module.default),
  dashboard: () => import('../slices/dashboardSlice').then(module => module.default),
}

/**
 * Dynamically inject a reducer into the store
 * @param {string} key - The reducer key
 * @returns {Promise<boolean>} - Whether the injection was successful
 */
export const injectReducerAsync = async (key) => {
  try {
    if (!availableReducers[key]) {
      console.warn(`Reducer '${key}' is not available for injection`)
      return false
    }

    const reducer = await availableReducers[key]()
    return injectReducer(key, reducer)
  } catch (error) {
    console.error(`Failed to inject reducer '${key}':`, error)
    return false
  }
}

/**
 * Check if a reducer is already injected
 * @param {string} key - The reducer key
 * @returns {boolean} - Whether the reducer is injected
 */
export const isReducerInjected = (key) => {
  // This would need to be implemented based on how you track injected reducers
  // For now, we'll assume it's not injected if we're trying to inject it
  return false
}

/**
 * Get all available reducer keys
 * @returns {string[]} - Array of available reducer keys
 */
export const getAvailableReducerKeys = () => {
  return Object.keys(availableReducers)
}

export default injectReducerAsync 