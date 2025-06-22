import { createSlice } from '@reduxjs/toolkit'

console.log('🎨 Theme slice loading...')

// Helper function to get system theme preference
const getSystemTheme = () => {
  if (typeof window !== 'undefined' && window.matchMedia) {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }
  return 'light'
}

// Helper function to get initial theme from localStorage or system preference
const getInitialTheme = (defaultTheme = 'system') => {
  if (typeof window === 'undefined') return 'light'
  
  const savedTheme = localStorage.getItem('theme')
  if (savedTheme) return savedTheme
  
  if (defaultTheme === 'system') {
    return getSystemTheme()
  }
  
  return defaultTheme
}

// Helper function to get initial mode
const getInitialMode = () => {
  const initialTheme = getInitialTheme()
  if (initialTheme === 'system') {
    return getSystemTheme()
  }
  return initialTheme
}

export const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        theme: getInitialTheme(),
        mode: getInitialMode(),
        primaryColor: '#3b82f6',
        secondaryColor: '#64748b',
        borderRadius: 6,
        fontFamily: 'Inter',
        fontSize: 'medium',
        sidebarWidth: 280,
        headerHeight: 64,
        compact: false,
        rtl: false,
        customColors: {},
        primaryColorLevel: 600,
        panelExpand: false,
        dateFormat: 'MM/DD/YYYY',
        enablePageTabs: true,
    },
    reducers: {
        setTheme: (state, action) => {
            const newTheme = action.payload
            state.theme = newTheme
            // Update mode based on theme
            if (newTheme === 'system') {
                state.mode = getSystemTheme()
            } else {
                state.mode = newTheme
            }
            // Persist to localStorage
            if (typeof window !== 'undefined') {
                localStorage.setItem('theme', newTheme)
            }
        },
        setMode: (state, action) => {
            state.mode = action.payload
        },
        toggleMode: (state) => {
            state.mode = state.mode === 'light' ? 'dark' : 'light'
        },
        setPrimaryColor: (state, action) => {
            state.primaryColor = action.payload
        },
        setSecondaryColor: (state, action) => {
            state.secondaryColor = action.payload
        },
        setBorderRadius: (state, action) => {
            state.borderRadius = action.payload
        },
        setFontFamily: (state, action) => {
            state.fontFamily = action.payload
        },
        setFontSize: (state, action) => {
            state.fontSize = action.payload
        },
        setSidebarWidth: (state, action) => {
            state.sidebarWidth = action.payload
        },
        setHeaderHeight: (state, action) => {
            state.headerHeight = action.payload
        },
        setCompact: (state, action) => {
            state.compact = action.payload
        },
        toggleCompact: (state) => {
            state.compact = !state.compact
        },
        setRtl: (state, action) => {
            state.rtl = action.payload
        },
        toggleRtl: (state) => {
            state.rtl = !state.rtl
        },
        setCustomColor: (state, action) => {
            const { key, value } = action.payload
            state.customColors[key] = value
        },
        removeCustomColor: (state, action) => {
            delete state.customColors[action.payload]
        },
        resetTheme: (state) => {
            state.theme = 'light'
            state.mode = 'light'
            state.primaryColor = '#3b82f6'
            state.secondaryColor = '#64748b'
            state.borderRadius = 6
            state.fontFamily = 'Inter'
            state.fontSize = 'medium'
            state.sidebarWidth = 280
            state.headerHeight = 64
            state.compact = false
            state.rtl = false
            state.customColors = {}
            // Clear localStorage
            if (typeof window !== 'undefined') {
                localStorage.removeItem('theme')
            }
        },
        // Initialize theme from localStorage or system preference
        initializeTheme: (state, action) => {
            const defaultTheme = action.payload || 'system'
            const initialTheme = getInitialTheme(defaultTheme)
            state.theme = initialTheme
            if (initialTheme === 'system') {
                state.mode = getSystemTheme()
            } else {
                state.mode = initialTheme
            }
        },
        setPrimaryColorLevel: (state, action) => {
            state.primaryColorLevel = action.payload
        },
        setPanelExpand: (state, action) => {
            state.panelExpand = action.payload
        },
        setDateFormat: (state, action) => {
            state.dateFormat = action.payload
        },
        setEnablePageTabs: (state, action) => {
            state.enablePageTabs = action.payload
        },
    },
})

console.log('✅ Theme slice loaded')

export const {
    setTheme,
    setMode,
    toggleMode,
    setPrimaryColor,
    setSecondaryColor,
    setBorderRadius,
    setFontFamily,
    setFontSize,
    setSidebarWidth,
    setHeaderHeight,
    setCompact,
    toggleCompact,
    setRtl,
    toggleRtl,
    setCustomColor,
    removeCustomColor,
    resetTheme,
    initializeTheme,
    setPrimaryColorLevel,
    setPanelExpand,
    setDateFormat,
    setEnablePageTabs,
} = themeSlice.actions

export default themeSlice.reducer 