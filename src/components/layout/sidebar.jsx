import React, { useState, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import navigationConfig from "@/configs/navigation.config"
import navigationIcon from "@/configs/navigation-icon.config.jsx"
// import { useAuth } from "@/store/auth/authHooks"

export function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const user = {
    firstName: "John",
    lastName: "Doe"
  }
  
  const [expandedItems, setExpandedItems] = useState(new Set())

  const getActiveItem = () => {
    const pathname = location.pathname
    
    for (const item of navigationConfig) {
      if (item.path === pathname) {
        return item.key
      }
      if (item.subMenu) {
        for (const subItem of item.subMenu) {
          if (subItem.path === pathname) {
            return subItem.key
          }
        }
      }
    }
    
    return 'dashboard'
  }

  const activeItem = getActiveItem()

  // Auto-expand parent items when child is active
  useEffect(() => {
    const newExpandedItems = new Set()
    
    for (const item of navigationConfig) {
      if (item.subMenu && item.subMenu.some(subItem => subItem.key === activeItem)) {
        newExpandedItems.add(item.key)
      }
    }
    
    setExpandedItems(newExpandedItems)
  }, [activeItem])

  const toggleExpanded = (itemKey) => {
    setExpandedItems(prev => {
      const newSet = new Set(prev)
      if (newSet.has(itemKey)) {
        newSet.delete(itemKey)
      } else {
        newSet.add(itemKey)
      }
      return newSet
    })
  }

  const handleNavigation = (path) => {
    console.log('Navigating to:', path)
    navigate(path)
  }

  const renderNavItem = (item) => {
    const isActive = activeItem === item.key
    const isExpanded = expandedItems.has(item.key)
    const hasSubMenu = item.subMenu && item.subMenu.length > 0

    if (hasSubMenu) {
      return (
        <div key={item.key}>
          <button
            className={`${
              isActive 
                ? "bg-primary/10 text-primary border-r-2 border-primary" 
                : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            } flex items-center px-3 py-2 text-sm rounded-md cursor-pointer w-full transition-colors`}
            onClick={() => toggleExpanded(item.key)}
          >
            <div className="flex items-center">
              {navigationIcon[item.icon] && (
                <span className="mr-3">{navigationIcon[item.icon]}</span>
              )}
              {item.title}
            </div>
            {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isExpanded && (
            <div className="ml-6 mt-1 space-y-1">
              {item.subMenu.map((subItem) => {
                const isSubActive = activeItem === subItem.key
                return (
                  <div
                    key={subItem.key}
                    className={`${
                      isSubActive 
                        ? "bg-primary/10 text-primary" 
                        : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                    } flex items-center px-3 py-2 text-sm rounded-md cursor-pointer transition-colors`}
                    onClick={() => handleNavigation(subItem.path)}
                  >
                    {navigationIcon[subItem.icon] && (
                      <span className="mr-3">{navigationIcon[subItem.icon]}</span>
                    )}
                    {subItem.title}
                  </div>
                )
              })}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        key={item.key}
        className={`${isActive ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50"} flex items-center px-3 py-2 text-sm rounded-md cursor-pointer`}
        onClick={() => handleNavigation(item.path)}
      >
        {navigationIcon[item.icon] && (
          <span className="mr-3">{navigationIcon[item.icon]}</span>
        )}
        {item.title}
      </div>
    )
  }

  return (
    <div className="w-[250px] border-r bg-blue-50 flex flex-col h-[100vh]">
      <div className="p-4 border-b">
        <h1 className="text-blue-600 font-bold text-lg">LeadGen CRM</h1>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {navigationConfig.map(renderNavItem)}
        </nav>
      </div>

      <div className="p-4 border-t flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-blue-600 text-white">
            {user?.firstName ? user.firstName.substring(0, 2).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">{user?.firstName || 'User'}</p>
          <p className="text-xs text-gray-500">View Profile</p>
        </div>
      </div>
    </div>
  )
}
