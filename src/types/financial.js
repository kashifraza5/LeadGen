// Financial Overview Types
export interface FinancialOverview {
  netWorth: {
    current: number
    change: number
    changePercentage: number
    lastUpdated: string
  }
  monthlyIncome: {
    amount: number
    afterTax: boolean
  }
  monthlyExpenses: {
    amount: number
    period: string
  }
  retirementReadiness: {
    percentage: number
    targetAge: number
  }
  financialSummary: {
    totalAssets: number
    totalLiabilities: number
    liquidAssets: number
    investmentAssets: number
    debtToIncomeRatio: number
    savingsRate: number
  }
  financialHealth: {
    status: "Excellent" | "Good" | "Fair" | "Poor"
    description: string
  }
  recentActivities: FinancialActivity[]
  goalProgress: GoalProgress[]
}

export interface FinancialActivity {
  id: string
  type: string
  description: string
  date: string
  icon: string
  color: string
}

export interface GoalProgress {
  name: string
  percentage: number
  color: string
}

// Income & Expenses Types
export interface IncomeExpenses {
  incomeSources: IncomeSource[]
  expenseCategories: ExpenseCategory[]
  cashFlowAnalysis: CashFlowAnalysis
  totalMonthlyIncome: number
  totalMonthlyExpenses: number
}

export interface IncomeSource {
  id: string
  name: string
  description: string
  amount: number
  frequency: "monthly" | "annual"
}

export interface ExpenseCategory {
  id: string
  name: string
  description: string
  amount: number
  frequency: "monthly" | "annual"
}

export interface CashFlowAnalysis {
  monthlyIncome: number
  monthlyExpenses: number
  monthlySurplus: number
  surplusAllocation: SurplusAllocation[]
}

export interface SurplusAllocation {
  category: string
  amount: number
  percentage: number
  color: string
}

// Assets & Liabilities Types
export interface AssetsLiabilities {
  assets: AssetCategory[]
  liabilities: LiabilityCategory[]
  totalAssets: number
  totalLiabilities: number
  netWorth: number
  netWorthTrend: NetWorthTrendData[]
}

export interface AssetCategory {
  id: string
  name: string
  totalValue: number
  items: AssetItem[]
}

export interface AssetItem {
  id: string
  name: string
  description?: string
  value: number
}

export interface LiabilityCategory {
  id: string
  name: string
  totalValue: number
  items: LiabilityItem[]
}

export interface LiabilityItem {
  id: string
  name: string
  description?: string
  value: number
  interestRate?: number
  term?: string
}

export interface NetWorthTrendData {
  date: string
  value: number
}

// Goals & Retirement Types
export interface GoalsRetirement {
  retirementPlanning: RetirementPlanning
  retirementAccounts: RetirementAccount[]
  financialGoals: FinancialGoal[]
  retirementIncomeStrategy: RetirementIncomeStrategy
}

export interface RetirementPlanning {
  currentAge: number
  targetRetirementAge: number
  yearsToRetirement: number
  currentRetirementAssets: number
  monthlyContributions: number
  projectedAtRetirement: number
  retirementReadiness: {
    percentage: number
    monthlyIncomeGoal: number
    projectedMonthlyIncome: number
  }
}

export interface RetirementAccount {
  id: string
  name: string
  institution: string
  balance: number
  type: "traditional" | "roth" | "401k" | "pension"
}

export interface FinancialGoal {
  id: string
  name: string
  description: string
  targetAmount: number
  currentAmount: number
  targetDate: string
  status: "in_progress" | "completed" | "paused"
  percentage: number
}

export interface RetirementIncomeStrategy {
  projectedMonthlyIncome: IncomeSource[]
  withdrawalStrategy: string[]
  totalProjectedIncome: number
}

// Investment Portfolio Types
export interface InvestmentPortfolio {
  portfolioSummary: PortfolioSummary
  investmentAccounts: InvestmentAccount[]
  topHoldings: Holding[]
  recommendations: InvestmentRecommendation[]
  assetAllocation: AssetAllocation[]
}

export interface PortfolioSummary {
  totalValue: number
  ytdReturn: number
  oneYearReturn: number
  threeYearReturn: number
  riskProfile: string
}

export interface InvestmentAccount {
  id: string
  name: string
  type: string
  institution: string
  value: number
  allocation: number
  ytdReturn: number
}

export interface Holding {
  id: string
  symbol: string
  name: string
  value: number
  return: number
}

export interface InvestmentRecommendation {
  id: string
  title: string
  description: string
  type: "rebalance" | "tax_optimization" | "contribution" | "diversification"
  priority: "high" | "medium" | "low"
  icon: string
  color: string
}

export interface AssetAllocation {
  category: string
  percentage: number
  value: number
  color: string
}

// API Response Types
export interface FinancialOverviewResponse {
  overview: FinancialOverview
}

export interface IncomeExpensesResponse {
  incomeExpenses: IncomeExpenses
}

export interface AssetsLiabilitiesResponse {
  assetsLiabilities: AssetsLiabilities
}

export interface GoalsRetirementResponse {
  goalsRetirement: GoalsRetirement
}

export interface InvestmentPortfolioResponse {
  investmentPortfolio: InvestmentPortfolio
}
