import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import {
  LayoutDashboard,
  Users,
  Megaphone,
  BarChart,
  Settings,
  Building,
  ChevronDown,
  ChevronRight,
  Eye,
  UserCheck,
  CreditCard,
  Palette,
  Bell,
  MapPin,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function Sidebar() {
  const location = useLocation()
  const [active, setActive] = useState(() => {
    const pathname = location.pathname
    if (pathname.includes("/company/")) {
      if (pathname.includes("/company/overview") || pathname === "/company") return "company-overview"
      if (pathname.includes("/company/employees")) return "company-employees"
      if (pathname.includes("/company/territories")) return "company-territories"
      if (pathname.includes("/company/permissions")) return "company-permissions"
      if (pathname.includes("/company/billing")) return "company-billing"
      if (pathname.includes("/company/branding")) return "company-branding"
      if (pathname.includes("/company/analytics")) return "company-analytics"
      if (pathname.includes("/company/notifications")) return "company-notifications"
      return "company-overview"
    } else if (pathname.includes("/campaigns/create")) {
      return "campaigns"
    } else if (pathname.includes("/campaigns")) {
      return "campaigns"
    } else if (pathname.includes("/leads")) {
      return "leads"
    }
    return "dashboard"
  })

  const [isCompanyInfoOpen, setIsCompanyInfoOpen] = useState(false)

  useEffect(() => {
    if (active.startsWith("company")) {
      setIsCompanyInfoOpen(true)
    }
  }, [active])

  const mainNavItems = [
    { name: "Dashboard", icon: LayoutDashboard, href: "/", id: "dashboard" },
    { name: "Campaigns", icon: Megaphone, href: "/campaigns", id: "campaigns" },
    { name: "Leads", icon: Users, href: "/leads", id: "leads" },
    { name: "Analytics", icon: BarChart, href: "/analytics", id: "analytics" },
  ]

  const settingsNavItems = [
    { name: "Account Settings", icon: Settings, href: "/settings/account", id: "account-settings" },
    { name: "Team Management", icon: Users, href: "/settings/team", id: "team-management" },
  ]

  const companyInfoItems = [
    { name: "Overview", icon: Eye, href: "/company/overview", id: "company-overview" },
    { name: "Employees", icon: Users, href: "/company/employees", id: "company-employees" },
    { name: "Territories", icon: MapPin, href: "/company/territories", id: "company-territories" },
    { name: "Permissions", icon: UserCheck, href: "/company/permissions", id: "company-permissions" },
    { name: "Billing", icon: CreditCard, href: "/company/billing", id: "company-billing" },
    { name: "Branding", icon: Palette, href: "/company/branding", id: "company-branding" },
    { name: "Analytics", icon: BarChart, href: "/company/analytics", id: "company-analytics" },
    { name: "Notifications", icon: Bell, href: "/company/notifications", id: "company-notifications" },
  ]

  return (
    <div className="w-[200px] border-r bg-blue-50 flex flex-col h-[100vh]">
      <div className="p-4 border-b">
        <h1 className="text-blue-600 font-bold text-lg">LeadGen CRM</h1>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="space-y-1 px-2">
          {mainNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                active === item.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50",
              )}
              onClick={() => setActive(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Company Info with dropdown */}
        <div>
          <button
            className={cn(
              "flex items-center justify-between w-full px-3 py-2 text-sm rounded-md",
              active.startsWith("company") ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50",
            )}
            onClick={() => setIsCompanyInfoOpen(!isCompanyInfoOpen)}
          >
            <div className="flex items-center">
              <Building className="mr-3 h-5 w-5" />
              Company Info
            </div>
            {isCompanyInfoOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>

          {isCompanyInfoOpen && (
            <div className="ml-6 mt-1 space-y-1">
              {companyInfoItems.map((item) => (
                <Link
                  key={item.id}
                  to={item.href}
                  className={cn(
                    "flex items-center px-3 py-2 text-sm rounded-md",
                    active === item.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50",
                  )}
                  onClick={() => setActive(item.id)}
                >
                  <item.icon className="mr-3 h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="px-4 py-3 mt-6">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider">SETTINGS</h3>
        </div>

        <nav className="space-y-1 px-2">
          {settingsNavItems.map((item) => (
            <Link
              key={item.id}
              to={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm rounded-md",
                active === item.id ? "bg-blue-100 text-blue-600" : "text-gray-600 hover:bg-blue-50",
              )}
              onClick={() => setActive(item.id)}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t flex items-center">
        <Avatar className="h-8 w-8">
          <AvatarImage src="/placeholder.svg" />
          <AvatarFallback className="bg-blue-600 text-white">TC</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <p className="text-sm font-medium">Tom Cook</p>
          <p className="text-xs text-gray-500">View Profile</p>
        </div>
      </div>
    </div>
  )
}
