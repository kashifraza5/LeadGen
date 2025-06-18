const TOKEN_KEY = "icf_auth_token"
const USER_KEY = "icf_user_data"

export const authUtils = {
  // Token management
  getToken: () => {
    if (typeof window === "undefined") return null
    return localStorage.getItem(TOKEN_KEY)
  },

  setToken: (token) => {
    if (typeof window === "undefined") return
    localStorage.setItem(TOKEN_KEY, token)
  },

  removeToken: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKEN_KEY)
  },

  // User data management
  getUser: () => {
    if (typeof window === "undefined") return null
    const userData = localStorage.getItem(USER_KEY)
    return userData ? JSON.parse(userData) : null
  },

  setUser: (user) => {
    if (typeof window === "undefined") return
    localStorage.setItem(USER_KEY, JSON.stringify(user))
  },

  removeUser: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(USER_KEY)
  },

  // Clear all auth data
  clearAuth: () => {
    if (typeof window === "undefined") return
    localStorage.removeItem(TOKEN_KEY)
    localStorage.removeItem(USER_KEY)
    sessionStorage.clear()
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = authUtils.getToken()
    const user = authUtils.getUser()
    return !!(token && user)
  },

  // Validate token (mock validation)
  validateToken: (token) => {
    if (!token) return false

    try {
      // Mock JWT validation - in real app, verify with backend
      const payload = JSON.parse(atob(token.split(".")[1]))
      const now = Date.now() / 1000
      return payload.exp > now
    } catch {
      return false
    }
  },
} 