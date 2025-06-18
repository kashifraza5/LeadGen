// Company Billing API Service

class CompanyBillingApiService {
  constructor() {
    this.baseUrl = import.meta.env.VITE_API_BASE_URL || "/api"
  }

  async getSubscriptionInfo() {
    await new Promise((resolve) => setTimeout(resolve, 600))

    return {
      currentPlan: "Professional",
      monthlyAmount: 79,
      nextBillingDate: "2024-02-15",
      employeesUsed: 47,
      employeesLimit: 50,
      status: "Active",
      billingCycle: "Monthly",
    }
  }

  async getPlans() {
    await new Promise((resolve) => setTimeout(resolve, 500))

    return [
      {
        id: "starter",
        name: "Starter",
        price: 29,
        employees: 10,
        features: [
          "Basic CRM features",
          "Email support",
          "5 campaigns per month",
          "Basic analytics",
          "Standard integrations",
        ],
        popular: false,
      },
      {
        id: "professional",
        name: "Professional",
        price: 79,
        employees: 50,
        features: [
          "Advanced CRM features",
          "Priority support",
          "Unlimited campaigns",
          "Advanced analytics",
          "All integrations",
          "Custom reports",
        ],
        popular: true,
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 199,
        employees: 200,
        features: [
          "Enterprise CRM features",
          "24/7 phone support",
          "Unlimited campaigns",
          "Enterprise analytics",
          "Custom integrations",
          "Advanced security",
          "Dedicated account manager",
        ],
        popular: false,
      },
      {
        id: "enterprise-plus",
        name: "Enterprise Plus",
        price: 399,
        employees: "Unlimited",
        features: [
          "All Enterprise features",
          "White-label options",
          "Custom development",
          "SLA guarantees",
          "Advanced compliance",
          "Multi-region deployment",
        ],
        popular: false,
      },
    ]
  }

  async getBillingHistory() {
    await new Promise((resolve) => setTimeout(resolve, 700))

    return [
      {
        id: 1,
        date: "2024-01-15",
        amount: 79,
        status: "Paid",
        invoice: "INV-2024-001",
        description: "Professional Plan - January 2024",
      },
      {
        id: 2,
        date: "2023-12-15",
        amount: 79,
        status: "Paid",
        invoice: "INV-2023-012",
        description: "Professional Plan - December 2023",
      },
      {
        id: 3,
        date: "2023-11-15",
        amount: 79,
        status: "Paid",
        invoice: "INV-2023-011",
        description: "Professional Plan - November 2023",
      },
      {
        id: 4,
        date: "2023-10-15",
        amount: 29,
        status: "Paid",
        invoice: "INV-2023-010",
        description: "Starter Plan - October 2023",
      },
    ]
  }

  async getPaymentMethods() {
    await new Promise((resolve) => setTimeout(resolve, 400))

    return [
      {
        id: 1,
        type: "Visa",
        last4: "4242",
        expiryMonth: "12",
        expiryYear: "2025",
        isDefault: true,
      },
      {
        id: 2,
        type: "Mastercard",
        last4: "5555",
        expiryMonth: "08",
        expiryYear: "2026",
        isDefault: false,
      },
    ]
  }

  async changePlan(planId) {
    await new Promise((resolve) => setTimeout(resolve, 1500))

    return {
      success: true,
      message: `Successfully upgraded to ${planId} plan`,
    }
  }

  async addPaymentMethod(data) {
    await new Promise((resolve) => setTimeout(resolve, 1000))

    return {
      id: Date.now(),
      type: data.type,
      last4: data.last4,
      expiryMonth: data.expiryMonth,
      expiryYear: data.expiryYear,
      isDefault: false,
    }
  }

  async downloadInvoice(invoiceId) {
    await new Promise((resolve) => setTimeout(resolve, 800))

    return {
      success: true,
      url: `/invoices/${invoiceId}.pdf`,
    }
  }
}

export const companyBillingApiService = new CompanyBillingApiService()
