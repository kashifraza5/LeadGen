import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { GlobalSearch } from "@/components/layout/global-search"
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import { ProfileDropdown } from "@/components/layout/profile-dropdown"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/components/theme-provider"
export function AppLayout({ children }) {
  const { theme, setTheme } = useTheme()

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-hidden">
        <header className="h-16 border-b flex items-center px-6 bg-background">
          <div className="flex-1">
            <GlobalSearch />
          </div>
          <div className="flex items-center space-x-4">
            {/* Notifications Dropdown */}
            <NotificationDropdown />

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </header>
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
