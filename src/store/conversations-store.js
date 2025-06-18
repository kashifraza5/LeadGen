import { create } from "zustand"
import { conversationsApi } from "@/services/conversations-api"

interface ConversationsState {
  // State
  messages: Message[]
  selectedMessage: Message | null
  stats: ConversationStats | null
  isLoading: boolean
  isSending: boolean
  error: string | null

  // Actions
  fetchMessages: (leadId: string) => Promise<void>
  selectMessage: (message: Message) => void
  sendMessage: (leadId: string, messageData: SendMessageRequest) => Promise<void>
  markAsRead: (messageId: string) => Promise<void>
  deleteMessage: (messageId: string) => Promise<void>
  clearError: () => void
  clearSelectedMessage: () => void
}

export const useConversationsStore = create<ConversationsState>((set, get) => ({
  // Initial state
  messages: [],
  selectedMessage: null,
  stats: null,
  isLoading: false,
  isSending: false,
  error: null,

  // Actions
  fetchMessages: async (leadId: string) => {
    set({ isLoading: true, error: null })
    try {
      const { messages, stats } = await conversationsApi.getMessages(leadId)
      set({
        messages: messages.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()),
        stats,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch messages",
        isLoading: false,
      })
    }
  },

  selectMessage: (message: Message) => {
    set({ selectedMessage: message })

    // Mark as read if it's an unread inbound message
    if (message.direction === "inbound" && message.status !== "read") {
      get().markAsRead(message.id)
    }
  },

  sendMessage: async (leadId: string, messageData: SendMessageRequest) => {
    set({ isSending: true, error: null })
    try {
      const newMessage = await conversationsApi.sendMessage(leadId, messageData)

      // Add the new message to the list
      set((state) => ({
        messages: [newMessage, ...state.messages],
        selectedMessage: newMessage,
        isSending: false,
      }))

      // Update stats
      const currentStats = get().stats
      if (currentStats) {
        const updatedStats: ConversationStats = {
          ...currentStats,
          totalMessages: currentStats.totalMessages + 1,
          emailCount: messageData.type === "email" ? currentStats.emailCount + 1 : currentStats.emailCount,
          smsCount: messageData.type === "sms" ? currentStats.smsCount + 1 : currentStats.smsCount,
          lastActivity: newMessage.timestamp,
        }
        set({ stats: updatedStats })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to send message",
        isSending: false,
      })
    }
  },

  markAsRead: async (messageId: string) => {
    try {
      await conversationsApi.markAsRead(messageId)

      // Update the message status in the store
      set((state) => ({
        messages: state.messages.map((message) =>
          message.id === messageId
            ? {
                ...message,
                status: "read" as const,
                deliveryInfo: {
                  ...message.deliveryInfo,
                  readAt: new Date().toISOString(),
                },
              }
            : message,
        ),
        selectedMessage:
          state.selectedMessage?.id === messageId
            ? {
                ...state.selectedMessage,
                status: "read" as const,
                deliveryInfo: {
                  ...state.selectedMessage.deliveryInfo,
                  readAt: new Date().toISOString(),
                },
              }
            : state.selectedMessage,
      }))
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to mark message as read" })
    }
  },

  deleteMessage: async (messageId: string) => {
    try {
      await conversationsApi.deleteMessage(messageId)

      // Remove the message from the store
      set((state) => ({
        messages: state.messages.filter((message) => message.id !== messageId),
        selectedMessage: state.selectedMessage?.id === messageId ? null : state.selectedMessage,
      }))

      // Update stats
      const currentStats = get().stats
      if (currentStats) {
        const deletedMessage = get().messages.find((m) => m.id === messageId)
        if (deletedMessage) {
          const updatedStats: ConversationStats = {
            ...currentStats,
            totalMessages: currentStats.totalMessages - 1,
            emailCount: deletedMessage.type === "email" ? currentStats.emailCount - 1 : currentStats.emailCount,
            smsCount: deletedMessage.type === "sms" ? currentStats.smsCount - 1 : currentStats.smsCount,
          }
          set({ stats: updatedStats })
        }
      }
    } catch (error) {
      set({ error: error instanceof Error ? error.message : "Failed to delete message" })
    }
  },

  clearError: () => {
    set({ error: null })
  },

  clearSelectedMessage: () => {
    set({ selectedMessage: null })
  },
}))
