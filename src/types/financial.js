/**
 * Financial Overview Types
 */

/**
 * @typedef {Object} FinancialOverview
 * @property {Object} netWorth - Net worth information
 * @property {number} netWorth.current - Current net worth
 * @property {number} netWorth.change - Change in net worth
 * @property {number} netWorth.changePercentage - Percentage change
 * @property {string} netWorth.lastUpdated - Last updated timestamp
 * @property {Object} monthlyIncome - Monthly income information
 * @property {number} monthlyIncome.amount - Income amount
 * @property {boolean} monthlyIncome.afterTax - Whether amount is after tax
 * @property {Object} monthlyExpenses - Monthly expenses information
 * @property {number} monthlyExpenses.amount - Expenses amount
 * @property {string} monthlyExpenses.period - Expense period
 * @property {Object} retirementReadiness - Retirement readiness information
 * @property {number} retirementReadiness.percentage - Readiness percentage
 * @property {number} retirementReadiness.targetAge - Target retirement age
 * @property {Object} financialSummary - Financial summary information
 * @property {number} financialSummary.totalAssets - Total assets
 * @property {number} financialSummary.totalLiabilities - Total liabilities
 * @property {number} financialSummary.liquidAssets - Liquid assets
 * @property {number} financialSummary.investmentAssets - Investment assets
 * @property {number} financialSummary.debtToIncomeRatio - Debt to income ratio
 * @property {number} financialSummary.savingsRate - Savings rate
 * @property {Object} financialHealth - Financial health status
 * @property {'Excellent'|'Good'|'Fair'|'Poor'} financialHealth.status - Health status
 * @property {string} financialHealth.description - Health description
 * @property {FinancialActivity[]} recentActivities - Recent financial activities
 * @property {GoalProgress[]} goalProgress - Goal progress information
 */

/**
 * @typedef {Object} FinancialActivity
 * @property {string} id - Activity ID
 * @property {string} type - Activity type
 * @property {string} description - Activity description
 * @property {string} date - Activity date
 * @property {string} icon - Activity icon
 * @property {string} color - Activity color
 */

/**
 * @typedef {Object} GoalProgress
 * @property {string} name - Goal name
 * @property {number} percentage - Progress percentage
 * @property {string} color - Progress color
 */

/**
 * Income & Expenses Types
 */

/**
 * @typedef {Object} IncomeExpenses
 * @property {IncomeSource[]} incomeSources - Income sources
 * @property {ExpenseCategory[]} expenseCategories - Expense categories
 * @property {CashFlowAnalysis} cashFlowAnalysis - Cash flow analysis
 * @property {number} totalMonthlyIncome - Total monthly income
 * @property {number} totalMonthlyExpenses - Total monthly expenses
 */

/**
 * @typedef {Object} IncomeSource
 * @property {string} id - Source ID
 * @property {string} name - Source name
 * @property {string} description - Source description
 * @property {number} amount - Income amount
 * @property {'monthly'|'annual'} frequency - Income frequency
 */

/**
 * @typedef {Object} ExpenseCategory
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {string} description - Category description
 * @property {number} amount - Expense amount
 * @property {'monthly'|'annual'} frequency - Expense frequency
 */

/**
 * @typedef {Object} CashFlowAnalysis
 * @property {number} monthlyIncome - Monthly income
 * @property {number} monthlyExpenses - Monthly expenses
 * @property {number} monthlySurplus - Monthly surplus
 * @property {SurplusAllocation[]} surplusAllocation - Surplus allocation
 */

/**
 * @typedef {Object} SurplusAllocation
 * @property {string} category - Allocation category
 * @property {number} amount - Allocation amount
 * @property {number} percentage - Allocation percentage
 * @property {string} color - Allocation color
 */

/**
 * Assets & Liabilities Types
 */

/**
 * @typedef {Object} AssetsLiabilities
 * @property {AssetCategory[]} assets - Asset categories
 * @property {LiabilityCategory[]} liabilities - Liability categories
 * @property {number} totalAssets - Total assets
 * @property {number} totalLiabilities - Total liabilities
 * @property {number} netWorth - Net worth
 * @property {NetWorthTrendData[]} netWorthTrend - Net worth trend data
 */

/**
 * @typedef {Object} AssetCategory
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {number} totalValue - Total value
 * @property {AssetItem[]} items - Asset items
 */

/**
 * @typedef {Object} AssetItem
 * @property {string} id - Item ID
 * @property {string} name - Item name
 * @property {string} [description] - Item description
 * @property {number} value - Item value
 */

/**
 * @typedef {Object} LiabilityCategory
 * @property {string} id - Category ID
 * @property {string} name - Category name
 * @property {number} totalValue - Total value
 * @property {LiabilityItem[]} items - Liability items
 */

/**
 * @typedef {Object} LiabilityItem
 * @property {string} id - Item ID
 * @property {string} name - Item name
 * @property {string} [description] - Item description
 * @property {number} value - Item value
 * @property {number} [interestRate] - Interest rate
 * @property {string} [term] - Loan term
 */

/**
 * @typedef {Object} NetWorthTrendData
 * @property {string} date - Trend date
 * @property {number} value - Net worth value
 */

/**
 * Goals & Retirement Types
 */

/**
 * @typedef {Object} GoalsRetirement
 * @property {RetirementPlanning} retirementPlanning - Retirement planning
 * @property {RetirementAccount[]} retirementAccounts - Retirement accounts
 * @property {FinancialGoal[]} financialGoals - Financial goals
 * @property {RetirementIncomeStrategy} retirementIncomeStrategy - Retirement income strategy
 */

/**
 * @typedef {Object} RetirementPlanning
 * @property {number} currentAge - Current age
 * @property {number} targetRetirementAge - Target retirement age
 * @property {number} yearsToRetirement - Years to retirement
 * @property {number} currentRetirementAssets - Current retirement assets
 * @property {number} monthlyContributions - Monthly contributions
 * @property {number} projectedAtRetirement - Projected amount at retirement
 * @property {Object} retirementReadiness - Retirement readiness
 * @property {number} retirementReadiness.percentage - Readiness percentage
 * @property {number} retirementReadiness.monthlyIncomeGoal - Monthly income goal
 * @property {number} retirementReadiness.projectedMonthlyIncome - Projected monthly income
 */

/**
 * @typedef {Object} RetirementAccount
 * @property {string} id - Account ID
 * @property {string} name - Account name
 * @property {string} institution - Financial institution
 * @property {number} balance - Account balance
 * @property {'traditional'|'roth'|'401k'|'pension'} type - Account type
 */

/**
 * @typedef {Object} FinancialGoal
 * @property {string} id - Goal ID
 * @property {string} name - Goal name
 * @property {string} description - Goal description
 * @property {number} targetAmount - Target amount
 * @property {number} currentAmount - Current amount
 * @property {string} targetDate - Target date
 * @property {'in_progress'|'completed'|'paused'} status - Goal status
 * @property {number} percentage - Goal progress percentage
 */

/**
 * @typedef {Object} RetirementIncomeStrategy
 * @property {IncomeSource[]} projectedMonthlyIncome - Projected monthly income sources
 * @property {string[]} withdrawalStrategy - Withdrawal strategy
 * @property {number} totalProjectedIncome - Total projected income
 */

/**
 * Investment Portfolio Types
 */

/**
 * @typedef {Object} InvestmentPortfolio
 * @property {PortfolioSummary} portfolioSummary - Portfolio summary
 * @property {InvestmentAccount[]} investmentAccounts - Investment accounts
 * @property {Holding[]} topHoldings - Top holdings
 * @property {InvestmentRecommendation[]} recommendations - Investment recommendations
 * @property {AssetAllocation[]} assetAllocation - Asset allocation
 */

/**
 * @typedef {Object} PortfolioSummary
 * @property {number} totalValue - Total portfolio value
 * @property {number} ytdReturn - Year-to-date return
 * @property {number} oneYearReturn - One year return
 * @property {number} threeYearReturn - Three year return
 * @property {string} riskProfile - Risk profile
 */

/**
 * @typedef {Object} InvestmentAccount
 * @property {string} id - Account ID
 * @property {string} name - Account name
 * @property {string} type - Account type
 * @property {string} institution - Financial institution
 * @property {number} value - Account value
 * @property {number} allocation - Account allocation
 * @property {number} ytdReturn - Year-to-date return
 */

/**
 * @typedef {Object} Holding
 * @property {string} id - Holding ID
 * @property {string} symbol - Stock symbol
 * @property {string} name - Holding name
 * @property {number} value - Holding value
 * @property {number} return - Holding return
 */

/**
 * @typedef {Object} InvestmentRecommendation
 * @property {string} id - Recommendation ID
 * @property {string} title - Recommendation title
 * @property {string} description - Recommendation description
 * @property {'rebalance'|'tax_optimization'|'contribution'|'diversification'} type - Recommendation type
 * @property {'high'|'medium'|'low'} priority - Recommendation priority
 * @property {string} icon - Recommendation icon
 * @property {string} color - Recommendation color
 */

/**
 * @typedef {Object} AssetAllocation
 * @property {string} category - Asset category
 * @property {number} percentage - Allocation percentage
 * @property {number} value - Allocation value
 * @property {string} color - Allocation color
 */

/**
 * API Response Types
 */

/**
 * @typedef {Object} FinancialOverviewResponse
 * @property {FinancialOverview} overview - Financial overview
 */

/**
 * @typedef {Object} IncomeExpensesResponse
 * @property {IncomeExpenses} incomeExpenses - Income and expenses data
 */

/**
 * @typedef {Object} AssetsLiabilitiesResponse
 * @property {AssetsLiabilities} assetsLiabilities - Assets and liabilities data
 */

/**
 * @typedef {Object} GoalsRetirementResponse
 * @property {GoalsRetirement} goalsRetirement - Goals and retirement data
 */

/**
 * @typedef {Object} InvestmentPortfolioResponse
 * @property {InvestmentPortfolio} investmentPortfolio - Investment portfolio data
 */

// Export empty object for module compatibility
export default {}
