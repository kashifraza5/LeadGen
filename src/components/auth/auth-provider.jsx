import React, { createContext, useContext, useState, useEffect } from "react"
import { authUtils } from "@/lib/auth"
import { authApi } from "@/services/auth-api"

const AuthContext = createContext({
  user: null,
  token: null,
  isLoading: true,
  isAuthenticated: false,
  login: async () => ({ success: false }),
  logout: () => {},
  signup: async () => ({ success: false }),
})

export function AuthProvider({ children }) {
  const [state, setState] = useState({
    user: null,
    token: null,
    isLoading: true,
    isAuthenticated: false,
  })

  useEffect(() => {
    const initializeAuth = async () => {
      const token = authUtils.getToken()
      const user = authUtils.getUser()

      if (token && user) {
        // Verify token with backend
        try {
          const response = await authApi.verifyToken(token)
          if (response.success && response.user) {
            setState({
              user: response.user,
              token,
              isLoading: false,
              isAuthenticated: true,
            })
          } else {
            // Token invalid, clear auth data
            authUtils.clearAuth()
            setState({
              user: null,
              token: null,
              isLoading: false,
              isAuthenticated: false,
            })
          }
        } catch {
          // Error verifying token, clear auth data
          authUtils.clearAuth()
          setState({
            user: null,
            token: null,
            isLoading: false,
            isAuthenticated: false,
          })
        }
      } else {
        setState({
          user: null,
          token: null,
          isLoading: false,
          isAuthenticated: false,
        })
      }
    }

    initializeAuth()
  }, [])

  const login = async (email, password, rememberMe = false) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await authApi.login({ email, password, rememberMe })

      if (response.success && response.user && response.token) {
        authUtils.setToken(response.token)
        authUtils.setUser(response.user)

        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
          isAuthenticated: true,
        })

        return { success: true }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }))
        return { success: false, message: response.message }
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, message: "Login failed. Please try again." }
    }
  }

  const logout = () => {
    authUtils.clearAuth()
    setState({
      user: null,
      token: null,
      isLoading: false,
      isAuthenticated: false,
    })
  }

  const signup = async (data) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const response = await authApi.signup(data)

      if (response.success && response.user && response.token) {
        authUtils.setToken(response.token)
        authUtils.setUser(response.user)

        setState({
          user: response.user,
          token: response.token,
          isLoading: false,
          isAuthenticated: true,
        })

        return { success: true }
      } else {
        setState((prev) => ({ ...prev, isLoading: false }))
        return { success: false, message: response.message }
      }
    } catch {
      setState((prev) => ({ ...prev, isLoading: false }))
      return { success: false, message: "Signup failed. Please try again." }
    }
  }

  const value = {
    ...state,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
} 