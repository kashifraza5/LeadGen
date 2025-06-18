export interface Notification {
  id: string
  title: string
  message: string
  time: string
  read: boolean
  type: NotificationType
  userId?: string
  actionUrl?: string
  metadata?: Record<string, any>
}

export type NotificationType =
  | "new_lead"
  | "sms_received"
  | "email_received"
  | "meeting"
  | "activity"
  | "campaign_created"
  | "profile_updated"
  | "system"
  | "warning"
  | "success"
  | "phone_call"

export interface NotificationResponse {
  notifications: Notification[]
  unreadCount: number
  total: number
}

export interface NotificationUpdateRequest {
  notificationIds: string[]
  read?: boolean
}
