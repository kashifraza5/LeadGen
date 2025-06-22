import api from "./api"

export class ConversationsApiService {
  // TODO: Replace with actual API call
  async getMessages(leadId: string): Promise<{ messages: Message[]; stats: ConversationStats }> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with actual API call
    const dummyMessages: Message[] = [
      {
        id: "msg1",
        leadId,
        type: "email",
        direction: "outbound",
        subject: "Welcome to Our Retirement Planning Services",
        content: `<p>Dear John,</p>
        <p>Thank you for your interest in our retirement planning services. We're excited to help you plan for your financial future.</p>
        <p>Our team of experienced advisors will work with you to create a personalized retirement strategy that aligns with your goals and timeline.</p>
        <p>Best regards,<br>Sarah Johnson</p>`,
        status: "read",
        timestamp: "2024-01-15T10:30:00Z",
        advisor: {
          id: "adv1",
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior Advisor",
        },
        campaign: {
          id: "camp1",
          name: "Retirement Planning",
          type: "Email Campaign",
        },
        deliveryInfo: {
          sentAt: "2024-01-15T10:30:00Z",
          deliveredAt: "2024-01-15T10:31:00Z",
          readAt: "2024-01-15T11:15:00Z",
        },
      },
      {
        id: "msg2",
        leadId,
        type: "sms",
        direction: "inbound",
        subject: "",
        content:
          "Hi, I received your email about retirement planning. I'm interested in learning more about 401k rollovers.",
        status: "delivered",
        timestamp: "2024-01-15T14:20:00Z",
        advisor: {
          id: "system",
          name: "Lead Response",
          email: "",
          role: "System",
        },
        deliveryInfo: {
          sentAt: "2024-01-15T14:20:00Z",
          deliveredAt: "2024-01-15T14:20:00Z",
        },
      },
      {
        id: "msg3",
        leadId,
        type: "sms",
        direction: "outbound",
        subject: "",
        content:
          "Great! I'd be happy to discuss 401k rollover options with you. Are you available for a call this week?",
        status: "read",
        timestamp: "2024-01-15T14:25:00Z",
        advisor: {
          id: "adv1",
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior Advisor",
        },
        deliveryInfo: {
          sentAt: "2024-01-15T14:25:00Z",
          deliveredAt: "2024-01-15T14:25:00Z",
          readAt: "2024-01-15T14:30:00Z",
        },
      },
      {
        id: "msg4",
        leadId,
        type: "email",
        direction: "outbound",
        subject: "401k Rollover Information Package",
        content: `<p>Hi John,</p>
        <p>As promised, I'm sending you our comprehensive 401k rollover information package.</p>
        <p>This package includes:</p>
        <ul>
          <li>Step-by-step rollover process</li>
          <li>Tax implications and benefits</li>
          <li>Investment options comparison</li>
          <li>Timeline and requirements</li>
        </ul>
        <p>Please review the materials and let me know if you have any questions.</p>
        <p>Best regards,<br>Sarah Johnson</p>`,
        status: "delivered",
        timestamp: "2024-01-16T09:15:00Z",
        advisor: {
          id: "adv1",
          name: "Sarah Johnson",
          email: "sarah.johnson@company.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Senior Advisor",
        },
        campaign: {
          id: "camp2",
          name: "401k Education",
          type: "Follow-up Campaign",
        },
        attachments: [
          {
            name: "401k-rollover-guide.pdf",
            size: "2.3 MB",
            url: "/documents/401k-rollover-guide.pdf",
          },
          {
            name: "investment-options.pdf",
            size: "1.8 MB",
            url: "/documents/investment-options.pdf",
          },
        ],
        deliveryInfo: {
          sentAt: "2024-01-16T09:15:00Z",
          deliveredAt: "2024-01-16T09:16:00Z",
        },
      },
      {
        id: "msg5",
        leadId,
        type: "email",
        direction: "outbound",
        subject: "Follow-up: Your Retirement Planning Questions",
        content: `<p>Hi John,</p>
        <p>I wanted to follow up on our previous conversation about retirement planning.</p>
        <p>Have you had a chance to review the 401k rollover materials I sent? I'm here to answer any questions you might have.</p>
        <p>Would you like to schedule a brief call to discuss your specific situation?</p>
        <p>Best regards,<br>Mike Wilson</p>`,
        status: "sent",
        timestamp: "2024-01-17T11:00:00Z",
        advisor: {
          id: "adv2",
          name: "Mike Wilson",
          email: "mike.wilson@company.com",
          avatar: "/placeholder.svg?height=40&width=40",
          role: "Financial Advisor",
        },
        campaign: {
          id: "camp3",
          name: "Follow-up Sequence",
          type: "Nurture Campaign",
        },
        deliveryInfo: {
          sentAt: "2024-01-17T11:00:00Z",
        },
      },
    ]

    const dummyStats: ConversationStats = {
      totalMessages: dummyMessages.length,
      emailCount: dummyMessages.filter((m) => m.type === "email").length,
      smsCount: dummyMessages.filter((m) => m.type === "sms").length,
      responseRate: 75,
      lastActivity: "2024-01-17T11:00:00Z",
    }

    return { messages: dummyMessages, stats: dummyStats }

    // TODO: Uncomment when connecting to real API
    // return await this.get<{ messages: Message[]; stats: ConversationStats }>(`/leads/${leadId}/messages`)
  }

  // TODO: Replace with actual API call
  async sendMessage(leadId: string, messageData: SendMessageRequest): Promise<Message> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // DUMMY DATA - Replace this entire block with actual API call
    const newMessage: Message = {
      id: `msg_${Date.now()}`,
      leadId,
      type: messageData.type,
      direction: "outbound",
      subject: messageData.subject || "",
      content: messageData.content,
      status: "sent",
      timestamp: new Date().toISOString(),
      advisor: {
        id: "current_user",
        name: "Current User",
        email: "current.user@company.com",
        avatar: "/placeholder.svg?height=40&width=40",
        role: "Advisor",
      },
      campaign: messageData.campaignId
        ? {
            id: messageData.campaignId,
            name: "Selected Campaign",
            type: "Manual",
          }
        : undefined,
      deliveryInfo: {
        sentAt: new Date().toISOString(),
      },
    }

    return newMessage

    // TODO: Uncomment when connecting to real API
    // const formData = new FormData()
    // formData.append('type', messageData.type)
    // formData.append('content', messageData.content)
    // if (messageData.subject) formData.append('subject', messageData.subject)
    // if (messageData.campaignId) formData.append('campaignId', messageData.campaignId)
    // if (messageData.attachments) {
    //   messageData.attachments.forEach(file => formData.append('attachments', file))
    // }
    // return await this.post<Message>(`/leads/${leadId}/messages`, formData)
  }

  // TODO: Replace with actual API call
  async markAsRead(messageId: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with actual API call
    console.log(`Marking message ${messageId} as read`)

    // TODO: Uncomment when connecting to real API
    // await this.put(`/messages/${messageId}/mark-read`)
  }

  // TODO: Replace with actual API call
  async deleteMessage(messageId: string): Promise<void> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with actual API call
    console.log(`Deleting message ${messageId}`)

    // TODO: Uncomment when connecting to real API
    // await this.delete(`/messages/${messageId}`)
  }

  // TODO: Replace with actual API call
  async getConversationStats(leadId: string): Promise<ConversationStats> {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with actual API call
    return {
      totalMessages: 15,
      emailCount: 8,
      smsCount: 7,
      responseRate: 68,
      lastActivity: new Date().toISOString(),
    }

    // TODO: Uncomment when connecting to real API
    // return await this.get<ConversationStats>(`/leads/${leadId}/conversation-stats`)
  }
}

export const conversationsApi = new ConversationsApiService()
