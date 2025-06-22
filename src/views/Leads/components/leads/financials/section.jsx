
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, Download, Plus, FileText, Loader2 } from "lucide-react"
import { useFinancialStore } from "@/store/financial-store"

export function Section() {
  const params = useParams()
  const leadId = params.id

  const {
    // Data
    overview,
    incomeExpenses,
    assetsLiabilities,
    goals,
    retirementPlan,
    investmentAccounts,

    // Loading states
    isLoading,
    isLoadingOverview,
    isLoadingIncomeExpenses,
    isLoadingAssetsLiabilities,
    isLoadingGoals,
    isLoadingRetirement,
    isLoadingInvestments,

    // Error state
    error,

    // Actions
    fetchAllFinancialData,
    clearError,
  } = useFinancialStore()

  const [activeTab, setActiveTab] = useState("overview")

  // Fetch all financial data on component mount
  useEffect(() => {
    if (leadId) {
      fetchAllFinancialData(leadId)
    }
  }, [leadId, fetchAllFinancialData])

  // Clear error when component unmounts
  useEffect(() => {
    return () => {
      clearError()
    }
  }, [clearError])

  const handleExportData = async () => {
    try {
      // Implementation for exporting financial data
      console.log("Exporting financial data for lead:", leadId)
    } catch (error) {
      console.error("Failed to export data:", error)
    }
  }

  const handleAddFinancialData = () => {
    // Implementation for adding new financial data
    console.log("Adding new financial data for lead:", leadId)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading financial data...</span>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <p className="text-red-600 mb-2">Error loading financial data</p>
          <p className="text-sm text-muted-foreground mb-4">{error}</p>
          <Button onClick={() => fetchAllFinancialData(leadId)}>Try Again</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Financial Overview</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button size="sm" onClick={handleAddFinancialData}>
            <Plus className="h-4 w-4 mr-2" />
            Add Financial Data
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="income">Income & Expenses</TabsTrigger>
          <TabsTrigger value="assets">Assets & Liabilities</TabsTrigger>
          <TabsTrigger value="goals">Goals & Retirement</TabsTrigger>
          <TabsTrigger value="investments">Investment Portfolio</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 pt-4">
          {isLoadingOverview ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading overview...
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Net Worth</CardDescription>
                    <CardTitle className="text-2xl flex items-center">
                      ${overview?.netWorth?.current?.toLocaleString() || "0"}
                      <span className="text-sm text-green-600 ml-2 flex items-center">
                        +{overview?.netWorth?.changePercentage || 0}% <ArrowUpRight className="h-3 w-3 ml-1" />
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      Updated {overview?.netWorth?.lastUpdated || "N/A"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Monthly Income</CardDescription>
                    <CardTitle className="text-2xl">
                      ${overview?.monthlyIncome?.amount?.toLocaleString() || "0"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      {overview?.monthlyIncome?.afterTax ? "After taxes" : "Before taxes"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Monthly Expenses</CardDescription>
                    <CardTitle className="text-2xl">
                      ${overview?.monthlyExpenses?.amount?.toLocaleString() || "0"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      {overview?.monthlyExpenses?.period || "Average last 6 months"}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardDescription>Retirement Readiness</CardDescription>
                    <CardTitle className="text-2xl">{overview?.retirementReadiness?.percentage || 0}%</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-xs text-muted-foreground">
                      On track for {overview?.retirementReadiness?.targetAge || 65}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Financial Summary</CardTitle>
                    <CardDescription>Key financial metrics and indicators</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Total Assets</h4>
                          <p className="text-xl font-bold">
                            ${overview?.financialSummary?.totalAssets?.toLocaleString() || "0"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Total Liabilities</h4>
                          <p className="text-xl font-bold">
                            ${overview?.financialSummary?.totalLiabilities?.toLocaleString() || "0"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Liquid Assets</h4>
                          <p className="text-xl font-bold">
                            ${overview?.financialSummary?.liquidAssets?.toLocaleString() || "0"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Investment Assets</h4>
                          <p className="text-xl font-bold">
                            ${overview?.financialSummary?.investmentAssets?.toLocaleString() || "0"}
                          </p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Debt-to-Income Ratio</h4>
                          <p className="text-xl font-bold">{overview?.financialSummary?.debtToIncomeRatio || 0}%</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Savings Rate</h4>
                          <p className="text-xl font-bold">{overview?.financialSummary?.savingsRate || 0}%</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Health</CardTitle>
                    <CardDescription>Overall assessment</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                      <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
                        <span className="text-green-700 text-2xl font-bold">
                          {overview?.financialHealth?.status || "Good"}
                        </span>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {overview?.financialHealth?.description || "Client is in good financial health"}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Financial Activities</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {overview?.recentActivities?.length > 0 ? (
                        overview.recentActivities.map((activity) => (
                          <div key={activity.id} className="flex items-start space-x-3">
                            <div className={`bg-${activity.color}-100 p-2 rounded-full`}>
                              <FileText className={`h-4 w-4 text-${activity.color}-700`} />
                            </div>
                            <div>
                              <p className="font-medium">{activity.description}</p>
                              <p className="text-sm text-muted-foreground">{activity.date}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No recent activities</p>
                      )}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Financial Goals Progress</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {overview?.goalProgress?.length > 0 ? (
                        overview.goalProgress.map((goal, index) => (
                          <div key={index}>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm font-medium">{goal.name}</span>
                              <span className="text-sm font-medium">{goal.percentage}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5">
                              <div
                                className={`bg-${goal.color}-600 h-2.5 rounded-full`}
                                style={{ width: `${goal.percentage}%` }}
                              ></div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-sm text-muted-foreground">No goals set</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        {/* Income & Expenses Tab */}
        <TabsContent value="income" className="space-y-6 pt-4">
          {isLoadingIncomeExpenses ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading income & expenses...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income Sources</CardTitle>
                  <CardDescription>Monthly income breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incomeExpenses?.filter((item) => item.type === "income")?.length > 0 ? (
                      incomeExpenses
                        .filter((item) => item.type === "income")
                        .map((income) => (
                          <div key={income.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{income.category}</p>
                              <p className="text-sm text-muted-foreground">{income.description}</p>
                            </div>
                            <p className="font-bold">${income.amount?.toLocaleString()}</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No income sources recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Expenses</CardTitle>
                  <CardDescription>Major expense categories</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {incomeExpenses?.filter((item) => item.type === "expense")?.length > 0 ? (
                      incomeExpenses
                        .filter((item) => item.type === "expense")
                        .map((expense) => (
                          <div key={expense.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{expense.category}</p>
                              <p className="text-sm text-muted-foreground">{expense.description}</p>
                            </div>
                            <p className="font-bold">${expense.amount?.toLocaleString()}</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No expenses recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Assets & Liabilities Tab */}
        <TabsContent value="assets" className="space-y-6 pt-4">
          {isLoadingAssetsLiabilities ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading assets & liabilities...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assets</CardTitle>
                  <CardDescription>
                    Total: $
                    {assetsLiabilities
                      ?.filter((item) => item.type === "asset")
                      ?.reduce((sum, asset) => sum + (asset.currentValue || 0), 0)
                      ?.toLocaleString() || "0"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetsLiabilities?.filter((item) => item.type === "asset")?.length > 0 ? (
                      assetsLiabilities
                        .filter((item) => item.type === "asset")
                        .map((asset) => (
                          <div key={asset.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{asset.name}</p>
                              <p className="text-sm text-muted-foreground">{asset.description}</p>
                            </div>
                            <p className="font-bold">${asset.currentValue?.toLocaleString()}</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No assets recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Liabilities</CardTitle>
                  <CardDescription>
                    Total: $
                    {assetsLiabilities
                      ?.filter((item) => item.type === "liability")
                      ?.reduce((sum, liability) => sum + (liability.currentValue || 0), 0)
                      ?.toLocaleString() || "0"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {assetsLiabilities?.filter((item) => item.type === "liability")?.length > 0 ? (
                      assetsLiabilities
                        .filter((item) => item.type === "liability")
                        .map((liability) => (
                          <div key={liability.id} className="flex justify-between items-center">
                            <div>
                              <p className="font-medium">{liability.name}</p>
                              <p className="text-sm text-muted-foreground">{liability.description}</p>
                            </div>
                            <p className="font-bold">${liability.currentValue?.toLocaleString()}</p>
                          </div>
                        ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No liabilities recorded</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Goals & Retirement Tab */}
        <TabsContent value="goals" className="space-y-6 pt-4">
          {isLoadingGoals || isLoadingRetirement ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading goals & retirement...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Financial Goals</CardTitle>
                  <div className="flex justify-end">
                    <Button variant="outline" size="sm">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Goal
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {goals?.length > 0 ? (
                      goals.map((goal) => (
                        <div key={goal.id}>
                          <div className="flex justify-between items-center mb-2">
                            <div>
                              <h3 className="font-medium">{goal.name}</h3>
                              <p className="text-sm text-muted-foreground">{goal.description}</p>
                            </div>
                            <Badge>{goal.status}</Badge>
                          </div>
                          <div className="flex justify-between mb-1">
                            <span className="text-sm">${goal.currentAmount?.toLocaleString()} saved</span>
                            <span className="text-sm">{goal.percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${goal.percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">No financial goals set</p>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Retirement Planning</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {retirementPlan ? (
                      <>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h4 className="text-sm font-medium mb-1">Current Age</h4>
                            <p className="text-xl font-bold">{retirementPlan.currentAge}</p>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium mb-1">Target Retirement Age</h4>
                            <p className="text-xl font-bold">{retirementPlan.targetAge}</p>
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Retirement Readiness</h4>
                          <div className="flex items-center space-x-4">
                            <div className="w-full bg-gray-200 rounded-full h-4">
                              <div
                                className="bg-blue-600 h-4 rounded-full"
                                style={{ width: `${retirementPlan.readinessPercentage}%` }}
                              ></div>
                            </div>
                            <span className="font-bold">{retirementPlan.readinessPercentage}%</span>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-sm text-muted-foreground">No retirement plan configured</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        {/* Investment Portfolio Tab */}
        <TabsContent value="investments" className="space-y-6 pt-4">
          {isLoadingInvestments ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin mr-2" />
              Loading investment portfolio...
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Investment Accounts</CardTitle>
                <div className="flex justify-end">
                  <Button variant="outline" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {investmentAccounts?.length > 0 ? (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left font-medium p-2">Account</th>
                          <th className="text-left font-medium p-2">Type</th>
                          <th className="text-left font-medium p-2">Institution</th>
                          <th className="text-right font-medium p-2">Value</th>
                          <th className="text-right font-medium p-2">YTD Return</th>
                        </tr>
                      </thead>
                      <tbody>
                        {investmentAccounts.map((account) => (
                          <tr key={account.id} className="border-b">
                            <td className="p-2">{account.accountName}</td>
                            <td className="p-2">{account.accountType}</td>
                            <td className="p-2">{account.institution}</td>
                            <td className="text-right p-2">${account.currentValue?.toLocaleString()}</td>
                            <td className="text-right p-2 text-green-600">+{account.ytdReturn || 0}%</td>
                          </tr>
                        ))}
                        <tr>
                          <td className="p-2 font-medium">Total</td>
                          <td className="p-2"></td>
                          <td className="p-2"></td>
                          <td className="text-right p-2 font-medium">
                            $
                            {investmentAccounts
                              .reduce((sum, account) => sum + (account.currentValue || 0), 0)
                              .toLocaleString()}
                          </td>
                          <td className="text-right p-2 font-medium text-green-600">
                            +
                            {(
                              investmentAccounts.reduce((sum, account) => sum + (account.ytdReturn || 0), 0) /
                              investmentAccounts.length
                            ).toFixed(1)}
                            %
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">No investment accounts recorded</p>
                )}
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
