import React from 'react'
import { MainLayout } from '@/components/layout/MainLayout'

const PageContainer = ({ children, ...props }) => {
    return (
        <MainLayout {...props}>
            {children}
        </MainLayout>
    )
}

export default PageContainer 