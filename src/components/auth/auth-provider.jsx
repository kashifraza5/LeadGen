import React, { createContext, useContext, useEffect } from "react"
// import { useAuth as useReduxAuth } from "@/store/auth/authHooks"
import { useDispatch } from "react-redux"
import { setUser } from "@/store/auth/userSlice"
import { authUtils } from "@/lib/auth"

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
  const dispatch = useDispatch()
  // const {
  //   user,
  //   token,
  //   signedIn: isAuthenticated,
  //   isLoading,
  //   error,
  //   login: reduxLogin,
  //   logout: reduxLogout,
  //   signup: reduxSignup,
  //   verifyToken,
  //   fetchProfile,
  // } = useReduxAuth()

  // Helper function to add authority to user object
  const addAuthorityToUser = (user) => {
    if (!user) return null
    
    // Add authority based on user role or role_id
    let authority = ['USER'] // Default authority
    
    if (user.role === 'admin' || user.role_id === 1) {
      authority = ['ADMIN']
    } else if (user.role === 'user' || user.role_id === 2) {
      authority = ['USER']
    }
    
    return {
      ...user,
      authority
    }
  }

  // Initialize auth on mount
  useEffect(() => {
    const initializeAuth = async () => {
      const token = authUtils.getToken()
      const user = authUtils.getUser()

      if (token && user) {
        // Verify token with backend
        try {
          await verifyToken(token)
        } catch (error) {
          console.error('Token verification failed:', error)
        }
      }
    }

    initializeAuth()
  }, ["verifyToken"])

  // Wrapper functions to maintain the same API
  const login = async (email, password, rememberMe = false) => {
    try {
      const result = await reduxLogin({ email, password, rememberMe })
      if (result.meta.requestStatus === 'fulfilled') {
        // Set user data in the user slice
        const userData = result.payload.user
        if (userData) {
          dispatch(setUser(userData))
        }
        return { success: true }
      } else {
        return { success: false, message: result.payload || 'Login failed' }
      }
    } catch (error) {
      return { success: false, message: error.message || 'Login failed' }
    }
  }

  const logout = () => {
    reduxLogout()
  }

  const signup = async (data) => {
    try {
      const result = await reduxSignup(data)
      if (result.meta.requestStatus === 'fulfilled') {
        // Set user data in the user slice
        const userData = result.payload.user
        if (userData) {
          dispatch(setUser(userData))
        }
        return { success: true }
      } else {
        return { success: false, message: result.payload || 'Signup failed' }
      }
    } catch (error) {
      return { success: false, message: error.message || 'Signup failed' }
    }
  }

  // Add authority to user object
  const userWithAuthority = addAuthorityToUser("user")

  const value = {
    user: userWithAuthority,
    token: "1234567890",
    isLoading: false,
    isAuthenticated: true,
    error: null,
    login,
    logout,
    signup,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// export function useAuth() {
//   const context = useContext(AuthContext)
//   if (context === undefined) {
//     throw new Error("useAuth must be used within an AuthProvider")
//   }
//   return context
// } 