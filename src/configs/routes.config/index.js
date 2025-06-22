import React from 'react'
import authRoute from './authRoute'

export const publicRoutes = [...authRoute]

export const protectedRoutes = [
    {
        key: 'dashboard',
        path: '/dashboard',
        component: React.lazy(() => import('@/views/Dashboard')),
    },
    {
        key: 'leads',
        path: '/leads',
        component: React.lazy(() => import('@/views/Leads/index.jsx')),
    },
    {
        key: 'leads.detail',
        path: '/leads/:id',
        component: React.lazy(() => import('@/views/Leads/components/leads/detail-management/lead-detail.jsx')),
    },
    {
        key: 'campaigns',
        path: '/campaigns',
        component: React.lazy(() => import('@/pages/CampaignsPage')),
    },
    {
        key: 'analytics',
        path: '/analytics',
        component: React.lazy(() => import('@/pages/AnalyticsPage')),
    },
    {
        key: 'company.overview',
        path: '/company/overview',
        component: React.lazy(() => import('@/pages/CompanyOverviewPage')),
        meta: {
            header: 'Company Overview',
        },
    },
    {
        key: 'company.employees',
        path: '/company/employees',
        component: React.lazy(() => import('@/pages/CompanyEmployeesPage')),
        meta: {
            header: 'Company Employees',
        },
    },
    {
        key: 'company.territories',
        path: '/company/territories',
        component: React.lazy(() => import('@/pages/CompanyTerritoriesPage')),
        meta: {
            header: 'Company Territories',
        },
    },
    {
        key: 'company.permissions',
        path: '/company/permissions',
        component: React.lazy(() => import('@/pages/CompanyPermissionsPage')),
        meta: {
            header: 'Company Permissions',
        },
    },
    {
        key: 'company.billing',
        path: '/company/billing',
        component: React.lazy(() => import('@/pages/CompanyBillingPage')),
        meta: {
            header: 'Company Billing',
        },
    },
    {
        key: 'company.branding',
        path: '/company/branding',
        component: React.lazy(() => import('@/pages/CompanyBrandingPage')),
        meta: {
            header: 'Company Branding',
        },
    },
    {
        key: 'company.analytics',
        path: '/company/analytics',
        component: React.lazy(() => import('@/pages/CompanyAnalyticsPage')),
        meta: {
            header: 'Company Analytics',
        },
    },
    {
        key: 'company.notifications',
        path: '/company/notifications',
        component: React.lazy(() => import('@/pages/CompanyNotificationsPage')),
        meta: {
            header: 'Company Notifications',
        },
    },
    {
        key: 'profile',
        path: '/profile',
        component: React.lazy(() => import('@/pages/ProfilePage')),
        meta: {
            header: 'Profile',
        },
    },
] 