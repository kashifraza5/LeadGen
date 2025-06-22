import React from 'react'
import appConfig from '@/configs/app.config'
import { REDIRECT_URL_KEY } from '@/constants/app.constant'
import { Navigate, useLocation } from 'react-router-dom'
// import { useAuth } from '@/components/auth/auth-provider'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'


const { unAuthenticatedEntryPath } = appConfig

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = useSelector((state) => {
        const { token, signedIn } = state.auth.session
        const userData = state.auth.user
        
        // Check if user data exists
        const hasUser = userData && Object.keys(userData).length > 0
        
        console.log('🔒 ProtectedRoute check:', { token, signedIn, userData, hasUser })
        
        return !!(token && signedIn && hasUser)
      })
    // const { isAuthenticated, isLoading } = useAuth()
    const isLoading = false
    const location = useLocation()

    console.log('🔒 ProtectedRoute render:', { isAuthenticated, isLoading, pathname: location.pathname })

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen w-[100vw]">
                <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
            </div>
        )
    }

    if (!isAuthenticated) {
        return (
            <Navigate
                to={unAuthenticatedEntryPath}
                replace
            />
        )
    }

    return children
}

export default ProtectedRoute 