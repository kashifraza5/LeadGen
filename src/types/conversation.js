export interface Message {
  id: string
  leadId: string
  type: "email" | "sms"
  direction: "inbound" | "outbound"
  subject: string
  content: string
  status: "sent" | "delivered" | "read" | "failed"
  timestamp: string
  advisor: {
    id: string
    name: string
    email: string
    avatar?: string
    role: string
  }
  campaign?: {
    id: string
    name: string
    type: string
  }
  attachments?: {
    name: string
    size: string
    url: string
  }[]
  deliveryInfo?: {
    sentAt: string
    deliveredAt?: string
    readAt?: string
    failedAt?: string
    failureReason?: string
  }
}

export interface SendMessageRequest {
  type: "email" | "sms"
  subject?: string
  content: string
  campaignId?: string
  attachments?: File[]
}

export interface ConversationFilters {
  type: "all" | "email" | "sms"
  advisor: string
  campaign: string
  status: string
  dateRange?: {
    start: string
    end: string
  }
}

export interface ConversationStats {
  totalMessages: number
  emailCount: number
  smsCount: number
  responseRate: number
  lastActivity: string
}
