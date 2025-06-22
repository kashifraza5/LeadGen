import api from './api'

export const getLeads = async (params) => {
    const response = await api.get('/lead/list/', { params })
    return response.data
}

export const getLeadDetail = async (leadId) => {
    try {
        const response = await api.get(`/lead/detail/${leadId}/`)
        return response.data
    } catch (error) {
        throw error
    }
}
export const getFamilyMembers = async (leadId) => {
    const response = await api.get(`/lead/${leadId}/family/detail/`)
    return response.data
}

export const getLeadDocuments = async (leadId) => {
    const response = await api.get(`/lead/${leadId}/documents/`)
    return response.data
}
export const getMessages = async (leadId) => {      
    console.log("🚀 ~ leadId:", leadId)
    const response = await api.get(`/lead/${leadId}/messages/`)
    return response.data
}
export const getNotes = async (leadId) => {
    const response = await api.get(`/lead/${leadId}/notes/`)
    return response.data
}

export const getLeadCampaigns = async (leadId) => {
    const response = await api.get(`/lead/${leadId}/campaigns/`)
    return response.data
}