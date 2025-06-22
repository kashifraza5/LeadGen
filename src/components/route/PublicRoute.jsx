import React from 'react'
import { Navigate } from 'react-router-dom'
import appConfig from '@/configs/app.config'
// import { useAuth } from '@/components/auth/auth-provider'
import { Loader2 } from 'lucide-react'
import { useSelector } from 'react-redux'

const { authenticatedEntryPath } = appConfig

const PublicRoute = ({ children }) => {
    // const { isAuthenticated, isLoading } = useAuth()
    const isAuthenticated = useSelector((state) => {
        const { token, signedIn } = state.auth.session
        const user = state.auth.user
        
        return !!(token && signedIn && user)
      })
    const isLoading = false

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen w-[100vw]">
                <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
            </div>
        )
    }

    return isAuthenticated ? <Navigate to={authenticatedEntryPath} /> : children
}

export default PublicRoute 