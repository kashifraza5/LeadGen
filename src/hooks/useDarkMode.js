import { useEffect } from 'react'
import { useSelector } from 'react-redux'

function useDarkMode() {
    const { mode } = useSelector((state) => state.theme)

    useEffect(() => {
        if (typeof window === 'undefined') {
            return
        }
        
        const root = window.document.documentElement
        
        // Remove existing theme classes
        root.classList.remove('light', 'dark')
        
        // Add the current theme class
        root.classList.add(mode)
        
        // Also set data attribute for additional styling if needed
        root.setAttribute('data-theme', mode)
        
    }, [mode])

    return mode === 'dark'
}

export default useDarkMode 