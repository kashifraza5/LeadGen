import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '@/components/auth/auth-provider'
import { MainLayout } from '@/components/layout/MainLayout'
import './styles/globals.css'
import {  Loader2,  } from "lucide-react"

// Import pages (we'll create these next)
import LoginPage from '@/pages/LoginPage'
import SignupPage from '@/pages/SignupPage'
import DashboardPage from '@/pages/DashboardPage'
import LeadsPage from '@/pages/LeadsPage'
import CampaignsPage from '@/pages/CampaignsPage'
import AnalyticsPage from '@/pages/AnalyticsPage'
import CompanyPage from '@/pages/CompanyPage'
import ProfilePage from '@/pages/ProfilePage'
import { DashboardContent } from '@/components/dashboard/Content'
import { Section } from '@/components/leads/campaigns/section'
import { ListContent } from '@/components/campaigns/list-content'
import { LeadsList } from '@/components/leads/leads-list'
import CompanyOverviewPage from '@/pages/CompanyOverviewPage'
import CompanyEmployeesPage from '@/pages/CompanyEmployeesPage'
import CompanyTerritoriesPage from '@/pages/CompanyTerritoriesPage'
import CompanyPermissionsPage from '@/pages/CompanyPermissionsPage'
import CompanyBillingPage from '@/pages/CompanyBillingPage'
import CompanyBrandingPage from '@/pages/CompanyBrandingPage'
import CompanyAnalyticsPage from '@/pages/CompanyAnalyticsPage'
import CompanyNotificationsPage from '@/pages/CompanyNotificationsPage'

// Protected Route Component
function ProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return   <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
  </div>
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />
  }

  return children
}

// Public Route Component (redirects to dashboard if authenticated)
function PublicRoute({ children }) {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return   <div className="flex justify-center items-center min-h-screen">
    <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
  </div>
  }

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return children
}

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/auth/login" element={
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      } />
      <Route path="/auth/signup" element={
        <PublicRoute>
          <SignupPage />
        </PublicRoute>
      } />
      <Route path="/auth/forgot-password" element={
        <PublicRoute>
          <div>Forgot Password Page</div>
        </PublicRoute>
      } />

      {/* Protected Routes with Layout */}
      <Route path="/" element={
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
        // <MainLayout/>
      }>
        <Route index element={<DashboardContent />} />
        <Route path="leads" element={<LeadsList />} />
        <Route path="campaigns" element={<ListContent />} />
        <Route path="company">
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<CompanyOverviewPage />} />
          <Route path="employees" element={<CompanyEmployeesPage />} />
          <Route path="territories" element={<CompanyTerritoriesPage />} />
          <Route path="permissions" element={<CompanyPermissionsPage />} />
          <Route path="billing" element={<CompanyBillingPage />} />
          <Route path="branding" element={<CompanyBrandingPage />} />
          <Route path="analytics" element={<CompanyAnalyticsPage />} />
          <Route path="notifications" element={<CompanyNotificationsPage />} />
        </Route>
        <Route path="profile" element={<ProfilePage />} />
      </Route>

      {/* Catch all route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  )
}

export default App 