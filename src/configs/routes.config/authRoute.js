import React from 'react'

const authRoute = [
    {
        key: 'signIn',
        path: '/auth/login',
        component: React.lazy(() => import('@/views/authPages/LoginPage')),
        authority: [],
    },
    {
        key: 'signUp',
        path: '/auth/signup',
        component: React.lazy(() => import('@/views/authPages/SignupPage')),
        authority: [],
    },
    {
        key: 'forgotPassword',
        path: '/auth/forgot-password',
        component: React.lazy(() => import('@/views/authPages/ForgotPasswordPage')),
        authority: [],
    },
    {
        key: 'resetPassword',
        path: '/auth/reset-password',
        component: React.lazy(() => import('@/views/authPages/ResetPasswordPage')),
        authority: [],
    },
]

export default authRoute 