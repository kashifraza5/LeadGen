// Company Employees API Service

/**
 * @typedef {Object} CreateEmployeeData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {string} role
 * @property {string} location
 */

/**
 * @typedef {Object} InviteEmployeeData
 * @property {string} firstName
 * @property {string} lastName
 * @property {string} email
 * @property {string} phone
 * @property {string} role
 * @property {string} message
 */

class CompanyEmployeesApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "/api"
  }

  async getEmployees() {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return [
      {
        id: 1,
        name: "John Smith",
        email: "john.smith@acme.com",
        phone: "+1 (555) 123-4567",
        role: "Senior Advisor",
        status: "Active",
        location: "New York, NY",
        joinDate: "2022-03-15",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 2,
        name: "Sarah Johnson",
        email: "sarah.johnson@acme.com",
        phone: "+1 (555) 234-5678",
        role: "Lead Advisor",
        status: "Active",
        location: "Los Angeles, CA",
        joinDate: "2021-08-22",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 3,
        name: "Mike Davis",
        email: "mike.davis@acme.com",
        phone: "+1 (555) 345-6789",
        role: "Junior Advisor",
        status: "On Leave",
        location: "Chicago, IL",
        joinDate: "2023-01-10",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 4,
        name: "Emily Chen",
        email: "emily.chen@acme.com",
        phone: "+1 (555) 456-7890",
        role: "Advisor",
        status: "Active",
        location: "San Francisco, CA",
        joinDate: "2022-11-05",
        avatar: "/placeholder.svg?height=40&width=40",
      },
      {
        id: 5,
        name: "David Wilson",
        email: "david.wilson@acme.com",
        phone: "+1 (555) 567-8901",
        role: "Support Advisor",
        status: "Active",
        location: "Austin, TX",
        joinDate: "2021-06-18",
        avatar: "/placeholder.svg?height=40&width=40",
      },
    ]
  }

  async getEmployeeStats() {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return {
      total: 47,
      active: 45,
      onLeave: 2,
      growth: 12,
    }
  }

  async createEmployee(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const newEmployee = {
      id: Date.now(),
      name: `${data.firstName} ${data.lastName}`,
      email: data.email,
      phone: data.phone,
      role: data.role,
      status: "Active",
      location: data.location,
      joinDate: new Date().toISOString().split("T")[0],
      avatar: "/placeholder.svg?height=40&width=40",
    }

    return newEmployee
  }

  async inviteEmployee(data) {
    await new Promise((resolve) => setTimeout(resolve, 1200))

    return {
      success: true,
      message: `Invitation sent to ${data.email} successfully!`,
    }
  }

  async updateEmployee(id, data) {
    await new Promise((resolve) => setTimeout(resolve, 800))

    const employees = await this.getEmployees()
    const employee = employees.find((emp) => emp.id === id)

    if (!employee) {
      throw new Error("Employee not found")
    }

    return { ...employee, ...data }
  }

  async deleteEmployee(id) {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return { success: true }
  }
}

export const createEmployeeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  location: "",
};

export const inviteEmployeeData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  message: "",
};

export const companyEmployeesApiService = new CompanyEmployeesApiService()

export const InviteEmployeeDataTemplate = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  role: "",
  message: "",
};
