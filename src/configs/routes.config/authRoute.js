import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: '/auth/login',
        component: React.lazy(() => import('@/pages/LoginPage')),
        authority: [],
    },
    {
        key: 'signUp',
        path: '/auth/signup',
        component: React.lazy(() => import('@/pages/SignupPage')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: '/auth/forgot-password',
        component: React.lazy(() => import('@/pages/ForgotPasswordPage')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: '/auth/reset-password',
        component: React.lazy(() => import('@/pages/ResetPasswordPage')),
        authority: [],
    },
]

export default authRoute 