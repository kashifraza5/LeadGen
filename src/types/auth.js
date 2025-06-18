export interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: "admin" | "manager" | "advisor"
  company: {
    id: string
    name: string
    industry: string
  }
  avatar?: string
}

export interface LoginCredentials {
  email: string
  password: string
  rememberMe?: boolean
}

export interface SignupData {
  companyName: string
  industry: string
  companySize: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  password: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  token?: string
  message?: string
}

export interface AuthState {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
}
