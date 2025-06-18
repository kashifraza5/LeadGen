import { ApiService } from "./api"
  FinancialProfile,
  Income,
  Expense,
  Asset,
  Liability,
  Investment,
  Insurance,
  TaxInfo,
  FinancialGoal,
  BudgetCategory,
  CashFlow,
  NetWorth,
  FinancialSummary,
} from "../types/financial"

const api = new ApiService()

// Helper function to simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// Financial Profile API with dummy data
export const financialProfileApi = {
  getByLeadId: async (leadId: string): Promise<FinancialProfile | null> => {
    await delay(500)
    return {
      id: "fp-1",
      leadId,
      annualIncome: 85000,
      monthlyExpenses: 4200,
      totalAssets: 250000,
      totalLiabilities: 180000,
      netWorth: 70000,
      creditScore: 720,
      riskTolerance: "moderate",
      investmentExperience: "intermediate",
      financialGoals: ["retirement", "home_purchase"],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  create: async (
    leadId: string,
    data: Omit<FinancialProfile, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<FinancialProfile> => {
    await delay(300)
    return {
      id: "fp-new",
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, profileId: string, data: Partial<FinancialProfile>): Promise<FinancialProfile> => {
    await delay(300)
    return {
      id: profileId,
      leadId,
      annualIncome: 85000,
      monthlyExpenses: 4200,
      totalAssets: 250000,
      totalLiabilities: 180000,
      netWorth: 70000,
      creditScore: 720,
      riskTolerance: "moderate",
      investmentExperience: "intermediate",
      financialGoals: ["retirement", "home_purchase"],
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, profileId: string): Promise<void> => {
    await delay(200)
  },
}

// Income API with dummy data
export const incomeApi = {
  getByLeadId: async (leadId: string): Promise<Income[]> => {
    await delay(400)
    return [
      {
        id: "inc-1",
        leadId,
        source: "Primary Job",
        type: "salary",
        amount: 5500,
        frequency: "monthly",
        isActive: true,
        startDate: "2023-01-01",
        description: "Software Engineer at Tech Corp",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "inc-2",
        leadId,
        source: "Freelance Work",
        type: "freelance",
        amount: 1200,
        frequency: "monthly",
        isActive: true,
        startDate: "2023-06-01",
        description: "Web development projects",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (leadId: string, data: Omit<Income, "id" | "leadId" | "createdAt" | "updatedAt">): Promise<Income> => {
    await delay(300)
    return {
      id: `inc-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, incomeId: string, data: Partial<Income>): Promise<Income> => {
    await delay(300)
    return {
      id: incomeId,
      leadId,
      source: "Updated Source",
      type: "salary",
      amount: 6000,
      frequency: "monthly",
      isActive: true,
      startDate: "2023-01-01",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, incomeId: string): Promise<void> => {
    await delay(200)
  },
}

// Expenses API with dummy data
export const expensesApi = {
  getByLeadId: async (leadId: string): Promise<Expense[]> => {
    await delay(400)
    return [
      {
        id: "exp-1",
        leadId,
        category: "Housing",
        description: "Monthly Rent",
        amount: 1800,
        frequency: "monthly",
        isRecurring: true,
        dueDate: "2024-01-01",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "exp-2",
        leadId,
        category: "Transportation",
        description: "Car Payment",
        amount: 450,
        frequency: "monthly",
        isRecurring: true,
        dueDate: "2024-01-15",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "exp-3",
        leadId,
        category: "Food",
        description: "Groceries",
        amount: 600,
        frequency: "monthly",
        isRecurring: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<Expense, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<Expense> => {
    await delay(300)
    return {
      id: `exp-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, expenseId: string, data: Partial<Expense>): Promise<Expense> => {
    await delay(300)
    return {
      id: expenseId,
      leadId,
      category: "Updated Category",
      description: "Updated Description",
      amount: 500,
      frequency: "monthly",
      isRecurring: true,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, expenseId: string): Promise<void> => {
    await delay(200)
  },
}

// Assets API with dummy data
export const assetsApi = {
  getByLeadId: async (leadId: string): Promise<Asset[]> => {
    await delay(400)
    return [
      {
        id: "asset-1",
        leadId,
        name: "Primary Residence",
        type: "real_estate",
        value: 350000,
        description: "3BR/2BA House",
        acquisitionDate: "2020-05-15",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "asset-2",
        leadId,
        name: "2019 Honda Civic",
        type: "vehicle",
        value: 18000,
        description: "Personal vehicle",
        acquisitionDate: "2019-03-10",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "asset-3",
        leadId,
        name: "Savings Account",
        type: "cash",
        value: 25000,
        description: "Emergency fund",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (leadId: string, data: Omit<Asset, "id" | "leadId" | "createdAt" | "updatedAt">): Promise<Asset> => {
    await delay(300)
    return {
      id: `asset-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, assetId: string, data: Partial<Asset>): Promise<Asset> => {
    await delay(300)
    return {
      id: assetId,
      leadId,
      name: "Updated Asset",
      type: "other",
      value: 10000,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, assetId: string): Promise<void> => {
    await delay(200)
  },
}

// Liabilities API with dummy data
export const liabilitiesApi = {
  getByLeadId: async (leadId: string): Promise<Liability[]> => {
    await delay(400)
    return [
      {
        id: "liab-1",
        leadId,
        name: "Mortgage",
        type: "mortgage",
        balance: 280000,
        interestRate: 3.5,
        minimumPayment: 1400,
        dueDate: "2024-01-01",
        description: "Primary residence mortgage",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "liab-2",
        leadId,
        name: "Car Loan",
        type: "auto_loan",
        balance: 15000,
        interestRate: 4.2,
        minimumPayment: 450,
        dueDate: "2024-01-15",
        description: "2019 Honda Civic loan",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "liab-3",
        leadId,
        name: "Credit Card",
        type: "credit_card",
        balance: 3500,
        interestRate: 18.9,
        minimumPayment: 105,
        dueDate: "2024-01-20",
        description: "Chase Sapphire Preferred",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<Liability, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<Liability> => {
    await delay(300)
    return {
      id: `liab-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, liabilityId: string, data: Partial<Liability>): Promise<Liability> => {
    await delay(300)
    return {
      id: liabilityId,
      leadId,
      name: "Updated Liability",
      type: "other",
      balance: 5000,
      interestRate: 5.0,
      minimumPayment: 100,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, liabilityId: string): Promise<void> => {
    await delay(200)
  },
}

// Investments API with dummy data
export const investmentsApi = {
  getByLeadId: async (leadId: string): Promise<Investment[]> => {
    await delay(400)
    return [
      {
        id: "inv-1",
        leadId,
        accountName: "401(k) - Tech Corp",
        accountType: "401k",
        provider: "Fidelity",
        balance: 85000,
        contributionAmount: 1200,
        contributionFrequency: "monthly",
        riskLevel: "moderate",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "inv-2",
        leadId,
        accountName: "Roth IRA",
        accountType: "roth_ira",
        provider: "Vanguard",
        balance: 35000,
        contributionAmount: 500,
        contributionFrequency: "monthly",
        riskLevel: "aggressive",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "inv-3",
        leadId,
        accountName: "Brokerage Account",
        accountType: "brokerage",
        provider: "Charles Schwab",
        balance: 22000,
        contributionAmount: 300,
        contributionFrequency: "monthly",
        riskLevel: "moderate",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<Investment, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<Investment> => {
    await delay(300)
    return {
      id: `inv-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, investmentId: string, data: Partial<Investment>): Promise<Investment> => {
    await delay(300)
    return {
      id: investmentId,
      leadId,
      accountName: "Updated Investment",
      accountType: "brokerage",
      provider: "Updated Provider",
      balance: 10000,
      riskLevel: "moderate",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, investmentId: string): Promise<void> => {
    await delay(200)
  },
}

// Insurance API with dummy data
export const insuranceApi = {
  getByLeadId: async (leadId: string): Promise<Insurance[]> => {
    await delay(400)
    return [
      {
        id: "ins-1",
        leadId,
        type: "life",
        provider: "State Farm",
        policyNumber: "SF-123456789",
        coverage: 500000,
        premium: 85,
        frequency: "monthly",
        beneficiaries: ["Jane Doe", "John Doe Jr."],
        startDate: "2022-01-01",
        endDate: "2042-01-01",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ins-2",
        leadId,
        type: "health",
        provider: "Blue Cross Blue Shield",
        policyNumber: "BCBS-987654321",
        coverage: 1000000,
        premium: 450,
        frequency: "monthly",
        startDate: "2023-01-01",
        endDate: "2024-12-31",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "ins-3",
        leadId,
        type: "auto",
        provider: "GEICO",
        policyNumber: "GEICO-456789123",
        coverage: 100000,
        premium: 120,
        frequency: "monthly",
        startDate: "2023-06-01",
        endDate: "2024-06-01",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<Insurance, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<Insurance> => {
    await delay(300)
    return {
      id: `ins-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, insuranceId: string, data: Partial<Insurance>): Promise<Insurance> => {
    await delay(300)
    return {
      id: insuranceId,
      leadId,
      type: "life",
      provider: "Updated Provider",
      policyNumber: "UPD-123456789",
      coverage: 100000,
      premium: 100,
      frequency: "monthly",
      startDate: "2023-01-01",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, insuranceId: string): Promise<void> => {
    await delay(200)
  },
}

// Tax Info API with dummy data
export const taxInfoApi = {
  getByLeadId: async (leadId: string): Promise<TaxInfo[]> => {
    await delay(400)
    return [
      {
        id: "tax-1",
        leadId,
        year: 2023,
        filingStatus: "married_filing_jointly",
        grossIncome: 95000,
        taxableIncome: 78000,
        federalTaxOwed: 12500,
        stateTaxOwed: 3200,
        refundAmount: 2100,
        effectiveTaxRate: 16.5,
        marginalTaxRate: 22,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "tax-2",
        leadId,
        year: 2022,
        filingStatus: "married_filing_jointly",
        grossIncome: 88000,
        taxableIncome: 72000,
        federalTaxOwed: 11200,
        stateTaxOwed: 2800,
        refundAmount: 1800,
        effectiveTaxRate: 15.9,
        marginalTaxRate: 22,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<TaxInfo, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<TaxInfo> => {
    await delay(300)
    return {
      id: `tax-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, taxInfoId: string, data: Partial<TaxInfo>): Promise<TaxInfo> => {
    await delay(300)
    return {
      id: taxInfoId,
      leadId,
      year: 2023,
      filingStatus: "single",
      grossIncome: 50000,
      taxableIncome: 40000,
      federalTaxOwed: 6000,
      stateTaxOwed: 1500,
      effectiveTaxRate: 15,
      marginalTaxRate: 22,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, taxInfoId: string): Promise<void> => {
    await delay(200)
  },
}

// Financial Goals API with dummy data
export const financialGoalsApi = {
  getByLeadId: async (leadId: string): Promise<FinancialGoal[]> => {
    await delay(400)
    return [
      {
        id: "goal-1",
        leadId,
        name: "Retirement Savings",
        type: "retirement",
        targetAmount: 1000000,
        currentAmount: 120000,
        targetDate: "2045-12-31",
        priority: "high",
        status: "in_progress",
        monthlyContribution: 1700,
        description: "Build retirement nest egg for comfortable retirement",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "goal-2",
        leadId,
        name: "House Down Payment",
        type: "major_purchase",
        targetAmount: 80000,
        currentAmount: 25000,
        targetDate: "2026-06-01",
        priority: "high",
        status: "in_progress",
        monthlyContribution: 1500,
        description: "Save for down payment on larger home",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "goal-3",
        leadId,
        name: "Emergency Fund",
        type: "emergency_fund",
        targetAmount: 30000,
        currentAmount: 25000,
        targetDate: "2024-12-31",
        priority: "medium",
        status: "in_progress",
        monthlyContribution: 500,
        description: "6 months of expenses for emergencies",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<FinancialGoal, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<FinancialGoal> => {
    await delay(300)
    return {
      id: `goal-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, goalId: string, data: Partial<FinancialGoal>): Promise<FinancialGoal> => {
    await delay(300)
    return {
      id: goalId,
      leadId,
      name: "Updated Goal",
      type: "other",
      targetAmount: 10000,
      currentAmount: 2000,
      targetDate: "2025-12-31",
      priority: "medium",
      status: "in_progress",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, goalId: string): Promise<void> => {
    await delay(200)
  },
}

// Budget Categories API with dummy data
export const budgetCategoriesApi = {
  getByLeadId: async (leadId: string): Promise<BudgetCategory[]> => {
    await delay(400)
    return [
      {
        id: "budget-1",
        leadId,
        name: "Housing",
        budgetedAmount: 2000,
        actualAmount: 1950,
        type: "expense",
        color: "#ef4444",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "budget-2",
        leadId,
        name: "Transportation",
        budgetedAmount: 600,
        actualAmount: 650,
        type: "expense",
        color: "#f97316",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "budget-3",
        leadId,
        name: "Food & Dining",
        budgetedAmount: 800,
        actualAmount: 750,
        type: "expense",
        color: "#eab308",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "budget-4",
        leadId,
        name: "Entertainment",
        budgetedAmount: 300,
        actualAmount: 280,
        type: "expense",
        color: "#22c55e",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "budget-5",
        leadId,
        name: "Savings",
        budgetedAmount: 1500,
        actualAmount: 1700,
        type: "savings",
        color: "#3b82f6",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]
  },

  create: async (
    leadId: string,
    data: Omit<BudgetCategory, "id" | "leadId" | "createdAt" | "updatedAt">,
  ): Promise<BudgetCategory> => {
    await delay(300)
    return {
      id: `budget-${Date.now()}`,
      leadId,
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  update: async (leadId: string, categoryId: string, data: Partial<BudgetCategory>): Promise<BudgetCategory> => {
    await delay(300)
    return {
      id: categoryId,
      leadId,
      name: "Updated Category",
      budgetedAmount: 500,
      actualAmount: 450,
      type: "expense",
      color: "#6b7280",
      ...data,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  },

  delete: async (leadId: string, categoryId: string): Promise<void> => {
    await delay(200)
  },
}

// Analytics API with dummy data
export const financialAnalyticsApi = {
  getCashFlow: async (leadId: string, startDate?: string, endDate?: string): Promise<CashFlow[]> => {
    await delay(500)
    return [
      {
        month: "2024-01",
        income: 6700,
        expenses: 4200,
        netCashFlow: 2500,
      },
      {
        month: "2024-02",
        income: 6700,
        expenses: 4350,
        netCashFlow: 2350,
      },
      {
        month: "2024-03",
        income: 6700,
        expenses: 4100,
        netCashFlow: 2600,
      },
      {
        month: "2024-04",
        income: 6700,
        expenses: 4250,
        netCashFlow: 2450,
      },
      {
        month: "2024-05",
        income: 6700,
        expenses: 4400,
        netCashFlow: 2300,
      },
      {
        month: "2024-06",
        income: 6700,
        expenses: 4150,
        netCashFlow: 2550,
      },
    ]
  },

  getNetWorth: async (leadId: string): Promise<NetWorth> => {
    await delay(500)
    return {
      totalAssets: 393000,
      totalLiabilities: 298500,
      netWorth: 94500,
      assetBreakdown: {
        cash: 25000,
        investments: 142000,
        realEstate: 350000,
        vehicles: 18000,
        other: 8000,
      },
      liabilityBreakdown: {
        mortgage: 280000,
        autoLoans: 15000,
        creditCards: 3500,
        studentLoans: 0,
        other: 0,
      },
    }
  },

  getSummary: async (leadId: string): Promise<FinancialSummary> => {
    await delay(500)
    return {
      monthlyIncome: 6700,
      monthlyExpenses: 4200,
      monthlySavings: 2500,
      savingsRate: 37.3,
      debtToIncomeRatio: 44.6,
      emergencyFundMonths: 6.0,
      creditScore: 720,
      netWorth: 94500,
      investmentBalance: 142000,
      retirementSavings: 120000,
    }
  },

  getIncomeVsExpenses: async (leadId: string, period: "monthly" | "quarterly" | "yearly" = "monthly"): Promise<any> => {
    await delay(400)
    return {
      period,
      data: [
        { period: "Jan 2024", income: 6700, expenses: 4200 },
        { period: "Feb 2024", income: 6700, expenses: 4350 },
        { period: "Mar 2024", income: 6700, expenses: 4100 },
        { period: "Apr 2024", income: 6700, expenses: 4250 },
        { period: "May 2024", income: 6700, expenses: 4400 },
        { period: "Jun 2024", income: 6700, expenses: 4150 },
      ],
    }
  },

  getAssetAllocation: async (leadId: string): Promise<any> => {
    await delay(400)
    return {
      data: [
        { category: "Real Estate", value: 350000, percentage: 89.1 },
        { category: "Investments", value: 142000, percentage: 36.1 },
        { category: "Cash", value: 25000, percentage: 6.4 },
        { category: "Vehicles", value: 18000, percentage: 4.6 },
        { category: "Other", value: 8000, percentage: 2.0 },
      ],
    }
  },

  getDebtToIncomeRatio: async (leadId: string): Promise<any> => {
    await delay(400)
    return {
      ratio: 44.6,
      monthlyDebtPayments: 1955,
      monthlyIncome: 6700,
      breakdown: [
        { type: "Mortgage", payment: 1400, percentage: 71.6 },
        { type: "Auto Loan", payment: 450, percentage: 23.0 },
        { type: "Credit Cards", payment: 105, percentage: 5.4 },
      ],
    }
  },
}

// Export all APIs
export const financialApi = {
  profile: financialProfileApi,
  income: incomeApi,
  expenses: expensesApi,
  assets: assetsApi,
  liabilities: liabilitiesApi,
  investments: investmentsApi,
  insurance: insuranceApi,
  taxInfo: taxInfoApi,
  goals: financialGoalsApi,
  budgetCategories: budgetCategoriesApi,
  analytics: financialAnalyticsApi,
}
