import { useDispatch, useSelector } from 'react-redux'
import { setTheme, initializeTheme } from '../store/theme/themeSlice'
import { useEffect } from 'react'

export function useTheme(defaultTheme = 'system') {
  const dispatch = useDispatch()
  const { theme, mode } = useSelector((state) => state.theme)
  
  const setThemeValue = (newTheme) => {
    dispatch(setTheme(newTheme))
  }
  
  // Initialize theme on mount
  useEffect(() => {
    dispatch(initializeTheme(defaultTheme))
  }, [dispatch, defaultTheme])

  // Listen for system theme changes when theme is set to 'system'
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const handleChange = (e) => {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme === 'system') {
        dispatch(setTheme('system'))
      }
    }
    
    mediaQuery.addEventListener('change', handleChange)
    
    return () => {
      mediaQuery.removeEventListener('change', handleChange)
    }
  }, [dispatch])
  
  return {
    theme,
    mode,
    setTheme: setThemeValue
  }
} 