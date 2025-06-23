import React, { Suspense } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { protectedRoutes, publicRoutes } from '@/configs/routes.config'
import appConfig from '@/configs/app.config'
import ProtectedRoute from './ProtectedRoute'
import PublicRoute from './PublicRoute'
import PageContainer from './PageContainer'
import { Loader2 } from 'lucide-react'

const { authenticatedEntryPath } = appConfig

const AllRoutes = () => {
    return (
        <Routes>
            <Route
                path="/"
                element={<Navigate replace to="/auth/login" />}
            />
            {protectedRoutes.map((route, index) => (
                <Route
                    key={route.key + index}
                    path={route.path}
                    element={
                        <ProtectedRoute>
                            <PageContainer {...route.meta}>
                                <Suspense
                                    fallback={
                                        <div className="flex justify-center items-center min-h-screen">
                                            <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
                                        </div>
                                    }
                                >
                                    <route.component {...route.meta} />
                                </Suspense>
                            </PageContainer>
                        </ProtectedRoute>
                    }
                />
            ))}

            {/* Public Routes */}
            {publicRoutes.map((route) => (
                <Route
                    key={route.path}
                    path={route.path}
                    element={
                        <PublicRoute>
                            <Suspense
                                fallback={
                                    <div className="flex justify-center items-center min-h-screen">
                                        <Loader2 className="h-14 w-14 animate-spin text-blue-600" />
                                    </div>
                                }
                            >
                                <route.component {...route.meta} />
                            </Suspense>
                        </PublicRoute>
                    }
                />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}

export default AllRoutes 