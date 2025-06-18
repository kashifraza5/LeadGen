import { useEffect, useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CreditCard,
  Calendar,
  Download,
  AlertTriangle,
  CheckCircle,
  Plus,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react"
import { useCompanyBillingStore } from "@/store/company-billing-store"

export default function CompanyBillingPage() {
  const [currentPlan, setCurrentPlan] = useState("professional")

  const {
    subscriptionInfo,
    plans,
    billingHistory,
    paymentMethods,
    isLoadingSubscription,
    isLoadingPlans,
    isLoadingHistory,
    isLoadingPaymentMethods,
    isChangingPlan,
    subscriptionError,
    plansError,
    historyError,
    paymentMethodsError,
    changePlanError,
    fetchSubscriptionInfo,
    fetchPlans,
    fetchBillingHistory,
    fetchPaymentMethods,
    changePlan,
    downloadInvoice,
    clearErrors,
  } = useCompanyBillingStore()

  useEffect(() => {
    fetchSubscriptionInfo()
    fetchPlans()
    fetchBillingHistory()
    fetchPaymentMethods()
  }, [fetchSubscriptionInfo, fetchPlans, fetchBillingHistory, fetchPaymentMethods])

  const getStatusBadge = (status) => {
    switch (status) {
      case "Paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "Pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "Failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const usagePercentage = subscriptionInfo
    ? (subscriptionInfo.employeesUsed / subscriptionInfo.employeesLimit) * 100
    : 0

  const handleRetry = () => {
    clearErrors()
    fetchSubscriptionInfo()
    fetchPlans()
    fetchBillingHistory()
    fetchPaymentMethods()
  }

  const handlePlanChange = async (planId) => {
    await changePlan(planId)
    setCurrentPlan(planId)
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Billing & Subscription</h1>
            <p className="text-gray-600">Manage your subscription and billing information</p>
          </div>
          <Button variant="outline" disabled={isLoadingHistory}>
            <Download className="mr-2 h-4 w-4" />
            Download Latest Invoice
          </Button>
        </div>

        {/* Error Alert */}
        {(subscriptionError || plansError || historyError || paymentMethodsError || changePlanError) && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription className="flex items-center justify-between">
              <span>Failed to load billing data. Please try again.</span>
              <Button variant="outline" size="sm" onClick={handleRetry}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        )}

        {/* Current Subscription Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Current Subscription
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingSubscription ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            ) : subscriptionInfo ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div>
                  <p className="text-sm font-medium text-gray-600">Current Plan</p>
                  <p className="text-2xl font-bold">{subscriptionInfo.currentPlan}</p>
                  <Badge className="mt-1 bg-green-100 text-green-800">{subscriptionInfo.status}</Badge>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Monthly Amount</p>
                  <p className="text-2xl font-bold">${subscriptionInfo.monthlyAmount}</p>
                  <p className="text-sm text-gray-600">Billed monthly</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Next Billing Date</p>
                  <p className="text-2xl font-bold">
                    {new Date(subscriptionInfo.nextBillingDate).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-600">Auto-renewal enabled</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-600">Employee Usage</p>
                  <p className="text-2xl font-bold">
                    {subscriptionInfo.employeesUsed}/{subscriptionInfo.employeesLimit}
                  </p>
                  <div className="mt-2">
                    <Progress value={usagePercentage} className="h-2" />
                    <p className="text-sm text-gray-600 mt-1">{Math.round(usagePercentage)}% used</p>
                  </div>
                  {usagePercentage > 90 && (
                    <div className="flex items-center gap-1 mt-2 text-orange-600">
                      <AlertTriangle className="h-4 w-4" />
                      <span className="text-sm">Approaching limit</span>
                    </div>
                  )}
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>

        {/* Tabs for different sections */}
        <Tabs defaultValue="plans" className="space-y-6">
          <TabsList>
            <TabsTrigger value="plans">Subscription Plans</TabsTrigger>
            <TabsTrigger value="history">Billing History</TabsTrigger>
            <TabsTrigger value="payment">Payment Methods</TabsTrigger>
          </TabsList>

          {/* Subscription Plans Tab */}
          <TabsContent value="plans" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Choose Your Plan</CardTitle>
                <p className="text-gray-600">Select the plan that best fits your team size and needs</p>
              </CardHeader>
              <CardContent>
                {isLoadingPlans ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <Card key={i} className="border-2">
                        <CardContent className="p-6">
                          <div className="text-center mb-6 space-y-2">
                            <Skeleton className="h-6 w-24 mx-auto" />
                            <Skeleton className="h-8 w-16 mx-auto" />
                            <Skeleton className="h-4 w-32 mx-auto" />
                          </div>
                          <div className="space-y-2 mb-6">
                            {Array.from({ length: 5 }).map((_, j) => (
                              <Skeleton key={j} className="h-4 w-full" />
                            ))}
                          </div>
                          <Skeleton className="h-10 w-full" />
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {plans.map((plan) => (
                      <Card
                        key={plan.id}
                        className={`relative border-2 ${plan.popular ? "border-blue-500" : "border-gray-200"}`}
                      >
                        {plan.popular && (
                          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                            <Badge className="bg-blue-500 text-white">Most Popular</Badge>
                          </div>
                        )}
                        <CardContent className="p-6">
                          <div className="text-center mb-6">
                            <h3 className="text-xl font-bold">{plan.name}</h3>
                            <div className="mt-2">
                              <span className="text-3xl font-bold">${plan.price}</span>
                              <span className="text-gray-600">/month</span>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Up to {typeof plan.employees === "number" ? plan.employees : plan.employees} employees
                            </p>
                          </div>

                          <ul className="space-y-2 mb-6">
                            {plan.features.map((feature, index) => (
                              <li key={index} className="flex items-center gap-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          <Button
                            className="w-full"
                            variant={plan.id === currentPlan ? "secondary" : "default"}
                            disabled={plan.id === currentPlan || isChangingPlan}
                            onClick={() => handlePlanChange(plan.id)}
                          >
                            {isChangingPlan ? "Updating..." : plan.id === currentPlan ? "Current Plan" : "Upgrade"}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Billing History</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingHistory ? (
                  <div className="space-y-4">
                    {Array.from({ length: 4 }).map((_, i) => (
                      <div key={i} className="flex items-center justify-between p-4 border rounded">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-3 w-48" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-6 w-12" />
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Invoice</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {billingHistory.map((bill) => (
                        <TableRow key={bill.id}>
                          <TableCell>{new Date(bill.date).toLocaleDateString()}</TableCell>
                          <TableCell>{bill.description}</TableCell>
                          <TableCell className="font-medium">${bill.amount}</TableCell>
                          <TableCell>{getStatusBadge(bill.status)}</TableCell>
                          <TableCell className="font-mono text-sm">{bill.invoice}</TableCell>
                          <TableCell className="text-right">
                            <Button variant="ghost" size="sm" onClick={() => downloadInvoice(bill.invoice)}>
                              <Download className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payment" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Payment Methods</CardTitle>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Payment Method
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isLoadingPaymentMethods ? (
                  <div className="space-y-4">
                    {Array.from({ length: 2 }).map((_, i) => (
                      <Card key={i} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <Skeleton className="w-12 h-8 rounded" />
                              <div className="space-y-1">
                                <Skeleton className="h-4 w-32" />
                                <Skeleton className="h-3 w-24" />
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Skeleton className="h-8 w-8" />
                              <Skeleton className="h-8 w-8" />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <Card key={method.id} className="border">
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div className="w-12 h-8 bg-gray-100 rounded flex items-center justify-center">
                                <CreditCard className="h-4 w-4 text-gray-600" />
                              </div>
                              <div>
                                <p className="font-medium">
                                  {method.type} ending in {method.last4}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Expires {method.expiryMonth}/{method.expiryYear}
                                </p>
                              </div>
                              {method.isDefault && <Badge variant="secondary">Default</Badge>}
                            </div>
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Edit className="h-6 w-6" />
                <span>Update Payment Method</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Download className="h-6 w-6" />
                <span>Download Latest Invoice</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>View Billing History</span>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  )
}
