import React from 'react'
import { Sidebar } from './sidebar'
import { Header } from './header'
import { GlobalSearch } from './global-search'
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import { ProfileDropdown } from "@/components/layout/profile-dropdown"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "@/store/theme/themeSlice"

export function MainLayout({ children, ...props }) {
  const dispatch = useDispatch()
  const { theme, mode } = useSelector((state) => state.theme)

  const toggleTheme = () => {
    // Simple toggle between light and dark
    const newTheme = mode === 'dark' ? 'light' : 'dark'
    dispatch(setTheme(newTheme))
  }

  return (
    <div className="min-h-screen bg-background text-foreground w-[100vw]">
      <div className="flex h-screen">
        {/* Sidebar */}
        <Sidebar />
        
        <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 border-b border-border flex items-center px-6 bg-background">
          <div className="flex-1">
            <GlobalSearch />
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <NotificationDropdown />

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </header>
        <main className="flex-1 overflow-auto bg-background">{children}</main>
      </div>
      </div>
    </div>
  )
} 