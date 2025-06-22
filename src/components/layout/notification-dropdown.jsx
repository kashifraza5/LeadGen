import { useState, useEffect } from "react"
import {
  Bell,
  X,
  UserPlus,
  MessageSquare,
  Mail,
  Calendar,
  Activity,
  Megaphone,
  CheckCircle,
  AlertTriangle,
  ChevronRight,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  notificationsApi,
  NotificationType,
  Notification,
  NotificationStats,
} from "@/services/notifications-api"

export function NotificationDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("lead")
  const [notifications, setNotifications] = useState({
    lead: [],
    message: [],
    task: [],
    system: [],
  })
  const [stats, setStats] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch notifications when dropdown opens
  useEffect(() => {
    if (isOpen) {
      fetchNotifications()
    }
  }, [isOpen])

  const fetchNotifications = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [notificationsData, statsData] = await Promise.all([
        notificationsApi.getNotifications(),
        notificationsApi.getNotificationStats(),
      ])

      setNotifications(notificationsData)
      setStats(statsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBellClick = () => {
    setIsOpen(!isOpen)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const markAsRead = async (id, type) => {
    try {
      await notificationsApi.markAsRead(id)

      // Update local state
      setNotifications((prev) => ({
        ...prev,
        [type]: prev[type].map((notification) =>
          notification.id === id ? { ...notification, read: true } : notification,
        ),
      }))

      // Update stats
      if (stats) {
        setStats({
          ...stats,
          unread: stats.unread - 1,
          byType: {
            ...stats.byType,
            [type]: stats.byType[type] - 1,
          },
        })
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark as read")
    }
  }

  const markAllAsRead = async (type) => {
    try {
      await notificationsApi.markAllAsRead(type)

      if (type) {
        setNotifications((prev) => ({
          ...prev,
          [type]: prev[type].map((notification) => ({ ...notification, read: true })),
        }))

        if (stats) {
          setStats({
            ...stats,
            unread: stats.unread - stats.byType[type],
            byType: {
              ...stats.byType,
              [type]: 0,
            },
          })
        }
      } else {
        // Mark all notifications as read
        const updatedNotifications = { ...notifications }
        Object.keys(updatedNotifications).forEach((key) => {
          updatedNotifications[key] = updatedNotifications[key].map(
            (notification) => ({ ...notification, read: true }),
          )
        })
        setNotifications(updatedNotifications)

        if (stats) {
          setStats({
            ...stats,
            unread: 0,
            byType: {
              lead: 0,
              message: 0,
              task: 0,
              system: 0,
            },
          })
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark as read")
    }
  }

  const getNotificationIcon = (type, subtype) => {
    const iconClass = "h-4 w-4"

    switch (subtype) {
      case "new_lead":
        return <UserPlus className={`${iconClass} text-blue-600 dark:text-blue-400`} />
      case "sms":
        return <MessageSquare className={`${iconClass} text-green-600 dark:text-green-400`} />
      case "email":
        return <Mail className={`${iconClass} text-purple-600 dark:text-purple-400`} />
      case "meeting":
        return <Calendar className={`${iconClass} text-orange-600 dark:text-orange-400`} />
      case "activity":
        return <Activity className={`${iconClass} text-indigo-600 dark:text-indigo-400`} />
      case "campaign":
        return <Megaphone className={`${iconClass} text-pink-600 dark:text-pink-400`} />
      case "success":
        return <CheckCircle className={`${iconClass} text-green-600 dark:text-green-400`} />
      case "warning":
        return <AlertTriangle className={`${iconClass} text-yellow-600 dark:text-yellow-400`} />
      case "phone":
        return <Bell className={`${iconClass} text-cyan-600 dark:text-cyan-400`} />
      default:
        return <Bell className={`${iconClass} text-blue-600 dark:text-blue-400`} />
    }
  }

  return (
    <div className="relative">
      {/* Bell Button */}
      <Button variant="ghost" size="icon" className="relative" onClick={handleBellClick} type="button">
        <Bell className="h-5 w-5" />
        {stats && stats.unread > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-[11px] font-medium text-white flex items-center justify-center">
            {stats.unread > 99 ? "99+" : stats.unread}
          </span>
        )}
      </Button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute right-0 top-12 w-96 bg-card border border-border rounded-lg shadow-lg z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-foreground">Notifications</h3>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => markAllAsRead()}
                  className="text-xs"
                  disabled={!stats || stats.unread === 0 || isLoading}
                >
                  Mark all read
                </Button>
                <Button variant="ghost" size="sm" onClick={handleClose} className="h-6 w-6 p-0">
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Error Alert */}
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertDescription className="flex items-center justify-between">
                  {error}
                  <Button variant="ghost" size="sm" onClick={() => setError(null)} className="h-auto p-1">
                    <X className="h-4 w-4" />
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Loading State */}
            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                <span className="text-sm text-gray-500">Loading notifications...</span>
              </div>
            ) : (
              <Tabs
                defaultValue="lead"
                value={activeTab}
                onValueChange={(value) => setActiveTab(value)}
              >
                <TabsList className="grid grid-cols-4 mb-4">
                  <TabsTrigger value="lead" className="relative">
                    Leads
                    {stats && stats.byType.lead > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {stats.byType.lead}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="message" className="relative">
                    Messages
                    {stats && stats.byType.message > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {stats.byType.message}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="task" className="relative">
                    Tasks
                    {stats && stats.byType.task > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {stats.byType.task}
                      </Badge>
                    )}
                  </TabsTrigger>
                  <TabsTrigger value="system" className="relative">
                    System
                    {stats && stats.byType.system > 0 && (
                      <Badge
                        variant="destructive"
                        className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center"
                      >
                        {stats.byType.system}
                      </Badge>
                    )}
                  </TabsTrigger>
                </TabsList>

                <ScrollArea className="h-[320px]">
                  {Object.keys(notifications).map((type) => (
                    <TabsContent key={type} value={type} className="m-0">
                      {notifications[type].length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                          <Bell className="h-12 w-12 mb-2 opacity-30" />
                          <p>No notifications</p>
                        </div>
                      ) : (
                        <div className="space-y-1">
                          {notifications[type].map((notification) => (
                            <div
                              key={notification.id}
                              className={`group p-3 ${!notification.read ? "bg-blue-50 border-l-4 border-blue-500" : "hover:bg-gray-50"} rounded-md cursor-pointer transition-colors`}
                              onClick={() => {
                                if (!notification.read) {
                                  markAsRead(notification.id, notification.type)
                                }
                                if (notification.actionUrl) {
                                  window.location.href = notification.actionUrl
                                }
                              }}
                            >
                              <div className="flex items-start space-x-3">
                                <div className="flex-shrink-0 mt-0.5">
                                  {getNotificationIcon(notification.type, notification.subtype)}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{notification.title}</p>
                                    {!notification.read && <div className="h-2 w-2 rounded-full bg-blue-500"></div>}
                                  </div>
                                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{notification.message}</p>
                                  <div className="flex items-center justify-between mt-1">
                                    <p className="text-xs text-gray-500">{notification.time}</p>
                                    {notification.actionUrl && (
                                      <ChevronRight className="h-3 w-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </TabsContent>
                  ))}
                </ScrollArea>
              </Tabs>
            )}

            <div className="mt-4 pt-3 border-t">
              <Button
                variant="ghost"
                className="w-full text-sm"
                onClick={() => (window.location.href = "/company/notifications")}
              >
                View all notifications
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown when clicking outside */}
      {isOpen && <div className="fixed inset-0 z-40" onClick={handleClose} />}
    </div>
  )
}
