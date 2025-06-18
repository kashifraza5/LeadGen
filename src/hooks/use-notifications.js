import { useState, useEffect, useCallback } from "react"
import { notificationsAPI } from "@/services/notifications-api"

export function useNotifications() {
  const [notifications, setNotifications] = useState([])
  const [unreadCount, setUnreadCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchNotifications = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await notificationsAPI.getNotifications()
      setNotifications(response.notifications)
      setUnreadCount(response.unreadCount)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch notifications")
    } finally {
      setLoading(false)
    }
  }, [])

  const markAsRead = useCallback(async (notificationId) => {
    try {
      await notificationsAPI.markAsRead([notificationId])
      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      )
      setUnreadCount((prev) => Math.max(0, prev - 1))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark notification as read")
    }
  }, [])

  const markAllAsRead = useCallback(async () => {
    try {
      await notificationsAPI.markAllAsRead()
      setNotifications((prev) => prev.map((notification) => ({ ...notification, read: true })))
      setUnreadCount(0)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to mark all notifications as read")
    }
  }, [])

  const removeNotification = useCallback(
    async (notificationId) => {
      try {
        const notification = notifications.find((n) => n.id === notificationId)
        await notificationsAPI.deleteNotification(notificationId)
        setNotifications((prev) => prev.filter((n) => n.id !== notificationId))
        if (notification && !notification.read) {
          setUnreadCount((prev) => Math.max(0, prev - 1))
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to remove notification")
      }
    },
    [notifications],
  )

  const refreshNotifications = useCallback(() => {
    fetchNotifications()
  }, [fetchNotifications])

  useEffect(() => {
    fetchNotifications()
  }, [fetchNotifications])

  // Poll for new notifications every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNotifications()
    }, 30000)

    return () => clearInterval(interval)
  }, [fetchNotifications])

  return {
    notifications,
    unreadCount,
    loading,
    error,
    markAsRead,
    markAllAsRead,
    removeNotification,
    refreshNotifications,
  }
}
