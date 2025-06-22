import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getLeads } from '@/services/LeadService'
import { getLeadDetail } from '@/services/LeadService'
import { getFamilyMembers } from '@/services/LeadService'
import { getLeadDocuments } from '@/services/LeadService'
import { getMessages } from '@/services/LeadService'
import { getNotes } from '@/services/LeadService'
import { getLeadCampaigns } from '@/services/LeadService'
// Simplified error message utility
const getErrorMessage = (error) => {
    return error?.response?.data?.error ||
        error?.response?.data?.debugInfo ||
        error?.response?.data?.message ||
        error?.response?.data ||
        error.toString()
}

// Helper function to create async thunks with less boilerplate
const createAsyncThunkWithNotification = (type, asyncFunction) => {
    return createAsyncThunk(type, async (arg, thunkAPI) => {
        try {
            return await asyncFunction(arg)
        } catch (error) {
            const message = getErrorMessage(error)
            return thunkAPI.rejectWithValue(message)
        }
    })
}

// Initial state matching the dashboard store
const initialState = {
    leads: [],
    isLoading: false,
    error: null,
    leadDetail: null,
    familyMembers: null,
    leadDocuments: null,
    totalLeads: 0,
    currentPage: 1,
    itemsPerPage: 10,
    statusFilter: "",
    territoryFilter: "",
    searchQuery: "",
    messages: null,
    notes: null,
}

console.log("🚀 ~ initialState:", initialState.leadDetail)

// Async thunks
export const fetchLeads = createAsyncThunkWithNotification(
    'leads/fetchLeads',
    async (params) => {
        return await getLeads(params)
    }
)

export const fetchLeadDetail = createAsyncThunkWithNotification(
    'leads/fetchLeadDetail',
    async (leadId) => {
        return await getLeadDetail(leadId)
    }
)

export const fetchFamilyMembers = createAsyncThunkWithNotification(
    'leads/fetchFamilyMembers',
    async (leadId) => {
        console.log("🚀 ~ leadId:", leadId)
        const response = await getFamilyMembers(leadId)
        console.log("🚀 ~ response:", response)
        return response
    }
)
export const fetchLeadDocuments = createAsyncThunkWithNotification(
    'leads/fetchLeadDocuments',
    async (leadId) => {
        return await getLeadDocuments(leadId)
    }
)
export const fetchMessages = createAsyncThunkWithNotification(
    'leads/fetchMessages',
    async (leadId) => {
        console.log("🚀 ~ leadId:", leadId)
        return await getMessages(leadId)
    }
)
export const fetchNotes = createAsyncThunkWithNotification(
    'leads/fetchNotes',
    async (leadId) => {
        return await getNotes(leadId)
    }
)

export const fetchLeadCampaigns = createAsyncThunkWithNotification(
    'leads/fetchLeadCampaigns',
    async (leadId) => {
        return await getLeadCampaigns(leadId)
    }
)

const dataSlice = createSlice({
    name: 'leads',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null
        },
        setFilters: (state, action) => {
            const { statusFilter, territoryFilter, searchQuery } = action.payload
            if (statusFilter !== undefined) state.statusFilter = statusFilter
            if (territoryFilter !== undefined) state.territoryFilter = territoryFilter
            if (searchQuery !== undefined) state.searchQuery = searchQuery
        },
        resetState: () => initialState,
    },
    extraReducers: (builder) => {
        // Leads Data
        builder
            .addCase(fetchLeads.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchLeads.fulfilled, (state, action) => {
                // Handle the API response format: { count, next, previous, results }
                state.leads = action.payload?.results || []
                state.totalLeads = action.payload?.count || 0
                state.isLoading = false
            })
            .addCase(fetchLeads.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchLeadDetail.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchLeadDetail.fulfilled, (state, action) => {
                console.log("🚀 ~ action.payloadLeadDetail:", action.payload)
                state.leadDetail = action.payload
                state.isLoading = false
            })
            .addCase(fetchLeadDetail.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchFamilyMembers.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchFamilyMembers.fulfilled, (state, action) => {
                state.familyMembers = action.payload
                state.isLoading = false
            })
            .addCase(fetchFamilyMembers.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchLeadDocuments.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchLeadDocuments.fulfilled, (state, action) => {
                state.leadDocuments = action.payload
                console.log("🚀 ~ action.payloadLeadDocuments:", action.payload)
                state.isLoading = false
            })
            .addCase(fetchLeadDocuments.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchMessages.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchMessages.fulfilled, (state, action) => {
                state.messages = action.payload
                state.isLoading = false
            })
            .addCase(fetchMessages.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.notes = action.payload
                state.isLoading = false
            })
            .addCase(fetchNotes.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(fetchLeadCampaigns.pending, (state) => {
                state.isLoading = true
                state.error = null
            })
            .addCase(fetchLeadCampaigns.fulfilled, (state, action) => {
                state.campaigns = action.payload
                console.log("🚀 ~ action.payloadLeadCampaigns:", action.payload)
                state.isLoading = false
            })
            .addCase(fetchLeadCampaigns.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
    },
})

export const { clearError, setFilters, resetState } = dataSlice.actions

export default dataSlice.reducer