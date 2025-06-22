import { createSlice } from '@reduxjs/toolkit'

console.log('⚙️ Common slice loading...')

export const commonSlice = createSlice({
    name: 'base/common',
    initialState: {
        isLoading: false,
        globalLoading: false,
        error: null,
        notifications: [],
        sidebarCollapsed: false,
        currentPage: '',
        breadcrumbs: [],
        modals: {
            activeModal: null,
            modalData: null,
        },
        filters: {},
        pagination: {
            currentPage: 1,
            itemsPerPage: 10,
            totalItems: 0,
        },
    },
    reducers: {
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setGlobalLoading: (state, action) => {
            state.globalLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        clearError: (state) => {
            state.error = null
        },
        addNotification: (state, action) => {
            state.notifications.push(action.payload)
        },
        removeNotification: (state, action) => {
            state.notifications = state.notifications.filter(
                (notification) => notification.id !== action.payload
            )
        },
        clearNotifications: (state) => {
            state.notifications = []
        },
        toggleSidebar: (state) => {
            state.sidebarCollapsed = !state.sidebarCollapsed
        },
        setSidebarCollapsed: (state, action) => {
            state.sidebarCollapsed = action.payload
        },
        setCurrentPage: (state, action) => {
            state.currentPage = action.payload
        },
        setBreadcrumbs: (state, action) => {
            state.breadcrumbs = action.payload
        },
        openModal: (state, action) => {
            state.modals.activeModal = action.payload.modalName
            state.modals.modalData = action.payload.data || null
        },
        closeModal: (state) => {
            state.modals.activeModal = null
            state.modals.modalData = null
        },
        setFilters: (state, action) => {
            state.filters = { ...state.filters, ...action.payload }
        },
        clearFilters: (state) => {
            state.filters = {}
        },
        setPagination: (state, action) => {
            state.pagination = { ...state.pagination, ...action.payload }
        },
        resetPagination: (state) => {
            state.pagination = {
                currentPage: 1,
                itemsPerPage: 10,
                totalItems: 0,
            }
        },
    },
})

console.log('✅ Common slice loaded')

export const {
    setLoading,
    setGlobalLoading,
    setError,
    clearError,
    addNotification,
    removeNotification,
    clearNotifications,
    toggleSidebar,
    setSidebarCollapsed,
    setCurrentPage,
    setBreadcrumbs,
    openModal,
    closeModal,
    setFilters,
    clearFilters,
    setPagination,
    resetPagination,
} = commonSlice.actions

export default commonSlice.reducer 