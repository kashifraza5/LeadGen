import React from "react"
import { Sidebar } from "@/components/layout/sidebar"
import { GlobalSearch } from "@/components/layout/global-search"
import { NotificationDropdown } from "@/components/layout/notification-dropdown"
import { ProfileDropdown } from "@/components/layout/profile-dropdown"
import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useDispatch, useSelector } from "react-redux"
import { setTheme } from "@/store/theme/themeSlice"

export function AppLayout({ children }) {
  const dispatch = useDispatch()
  const { theme, mode } = useSelector((state) => state.theme)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    dispatch(setTheme(newTheme))
  }

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
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {mode === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
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
