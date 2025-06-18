import {ApiService} from "@/services/api"

const api = new ApiService()

export const authApi = {
  // Login function
  login: async (credentials) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))
  //   const user = {
  //     "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoicmVmcmVzaCIsImV4cCI6MTc1MDMyMjkxNiwiaWF0IjoxNzUwMjM2NTE2LCJqdGkiOiI0ZmI1Y2FjOWEzZWE0YzgxOGQ3N2YwNzcwMTE5ZjEyYyIsInVzZXJfaWQiOjF9.qTr_o62DuLohvDEEKcQx2gcgTLf0L6Inp8rexGRvZJw",
  //     "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzUwMjM2ODE2LCJpYXQiOjE3NTAyMzY1MTYsImp0aSI6IjVjNGQyMjE2YWI0YzQ4ZDM5ZDJkZGUyZjMyYzJjODBjIiwidXNlcl9pZCI6MX0.eTh2NGFZqPa6qaIWpipvnynMua2cwxQPc4h2IxsXYn4",
  //     "user": {
  //         "id": 1,
  //         "email": "admin@admin.com",
  //         "first_name": "admin",
  //         "last_name": "super",
  //         "role": "admin",
  //         "company": {
  //             "id": 1,
  //             "name": "demo"
  //         }
  //     }
  // }
    
    const user = await api.post("/auth/login/", credentials)
    if (!user) {
      return {
        success: false,
        message: "Invalid email or password",
      }
    }
    return {
      success: true,
      user: user.user,
      token:user.access,
      message: "Login successful",
    }
  },

  // Signup function
  signup: async (data) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if user already exists
    const existingUser = {}
    if (existingUser) {
      return {
        success: false,
        message: "User with this email already exists",
      }
    }

    // Create new user
    const newUser = {
      id: Date.now().toString(),
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      role: "advisor", // Default role for new signups
      company: {
        id: Date.now().toString(),
        name: data.companyName,
        industry: data.industry,
      },
    }

    const token = {}

    return {
      success: true,
      user: newUser,
      token,
      message: "Account created successfully",
    }
  },

  // Logout function
  logout: async () => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))
    // In real app, invalidate token on server
  },

  // Verify token function
  verifyToken: async (token) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    try {
      const payload = JSON.parse(atob(token.split(".")[1]))
      const now = Date.now() / 1000

      if (payload.exp <= now) {
        return {
          success: false,
          message: "Token expired",
        }
      }

      const user = {}
      if (!user) {
        return {
          success: false,
          message: "User not found",
        }
      }

      const { password, ...userWithoutPassword } = user

      return {
        success: true,
        user: userWithoutPassword,
        token,
      }
    } catch {
      return {
        success: false,
        message: "Invalid token",
      }
    }
  },

  // Forgot password function
  forgotPassword: async (email) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const user = {}
    if (!user) {
      return {
        success: false,
        message: "No account found with this email address",
      }
    }

    return {
      success: true,
      message: "Password reset instructions sent to your email",
    }
  },
}
