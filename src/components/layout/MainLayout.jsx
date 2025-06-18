import { Outlet } from 'react-router-dom'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { GlobalSearch } from './global-search'
export function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-50 w-[100vw]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main content */}
        <div className="flex-1 flex flex-col h-screen">
          {/* Header */}
          <Header />
          {/* <GlobalSearch /> */}
          
          {/* Page content */}
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
} 