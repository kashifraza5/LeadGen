// Notification types
export const NotificationType = ["lead", "message", "task", "system"];



// JSDoc for Notification
/**
 * @typedef {Object} Notification
 * @property {string} id
 * @property {string} title
 * @property {string} message
 * @property {string} time
 * @property {boolean} read
 * @property {string} type
 * @property {string} [subtype]
 * @property {string} [actionUrl]
 */

/**
 * @typedef {Object} NotificationStats
 * @property {number} total
 * @property {number} unread
 * @property {Object} byType
 */

// Mock data
const mockNotifications = {
  lead: [
    {
      id: "1",
      title: "New Lead Assigned",
      message: "John Smith has been assigned to you from website form",
      time: "2 minutes ago",
      read: false,
      type: "lead",
      subtype: "new_lead",
      actionUrl: "/leads/1",
    },
    {
      id: "2",
      title: "Lead Status Updated",
      message: "Sarah Johnson moved from 'Prospect' to 'Qualified'",
      time: "1 hour ago",
      read: false,
      type: "lead",
      subtype: "status_change",
      actionUrl: "/leads/2",
    },
    {
      id: "3",
      title: "Lead Activity",
      message: "Emma Davis opened your email and clicked the proposal link",
      time: "2 hours ago",
      read: true,
      type: "lead",
      subtype: "activity",
      actionUrl: "/leads/4",
    },
  ],
  message: [
    {
      id: "4",
      title: "SMS Received",
      message: "Sarah Johnson replied: 'Yes, I'm interested in the meeting'",
      time: "5 minutes ago",
      read: false,
      type: "message",
      subtype: "sms",
      actionUrl: "/leads/2",
    },
    {
      id: "5",
      title: "Email Received",
      message: "Mike Wilson sent: 'Can we reschedule our appointment?'",
      time: "15 minutes ago",
      read: false,
      type: "message",
      subtype: "email",
      actionUrl: "/leads/3",
    },
    {
      id: "6",
      title: "Phone Call Missed",
      message: "Missed call from Robert Chen (+1 555-0123)",
      time: "4 hours ago",
      read: true,
      type: "message",
      subtype: "phone",
      actionUrl: "/leads/5",
    },
  ],
  task: [
    {
      id: "7",
      title: "Meeting Reminder",
      message: "Client meeting with Sarah Johnson in 30 minutes",
      time: "30 minutes ago",
      read: false,
      type: "task",
      subtype: "meeting",
      actionUrl: "/calendar",
    },
    {
      id: "8",
      title: "Task Due Today",
      message: "Follow up with Michael Brown about retirement planning",
      time: "1 hour ago",
      read: false,
      type: "task",
      subtype: "task",
      actionUrl: "/tasks",
    },
    {
      id: "9",
      title: "Campaign Created",
      message: 'New email campaign "Q4 Outreach" has been launched',
      time: "1 hour ago",
      read: false,
      type: "task",
      subtype: "campaign",
      actionUrl: "/campaigns/1",
    },
  ],
  system: [
    {
      id: "10",
      title: "Profile Updated",
      message: "Your profile information has been successfully updated",
      time: "3 hours ago",
      read: true,
      type: "system",
      subtype: "profile",
      actionUrl: "/profile",
    },
    {
      id: "11",
      title: "Campaign Completed",
      message: 'Email campaign "September Newsletter" finished with 85% open rate',
      time: "1 day ago",
      read: true,
      type: "system",
      subtype: "success",
      actionUrl: "/campaigns/2",
    },
    {
      id: "12",
      title: "System Maintenance",
      message: "Platform maintenance scheduled for tonight at 2 AM EST",
      time: "2 days ago",
      read: true,
      type: "system",
      subtype: "warning",
    },
  ],
};

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const notificationsApi = {
  // Get all notifications
  getNotifications: async () => {
    await delay(500);
    return mockNotifications;
  },

  // Get notifications by type
  getNotificationsByType: async (type) => {
    await delay(300);
    return mockNotifications[type] || [];
  },

  // Get notification stats
  getNotificationStats: async () => {
    await delay(200);
    const allNotifications = Object.values(mockNotifications).flat();
    const unreadCount = allNotifications.filter((n) => !n.read).length;

    return {
      total: allNotifications.length,
      unread: unreadCount,
      byType: {
        lead: mockNotifications.lead.filter((n) => !n.read).length,
        message: mockNotifications.message.filter((n) => !n.read).length,
        task: mockNotifications.task.filter((n) => !n.read).length,
        system: mockNotifications.system.filter((n) => !n.read).length,
      },
    };
  },

  // Mark notification as read
  markAsRead: async (id) => {
    await delay(200);
    // In real implementation, this would update the backend
    Object.keys(mockNotifications).forEach((type) => {
      const notification = mockNotifications[type].find((n) => n.id === id);
      if (notification) {
        notification.read = true;
      }
    });
  },

  // Mark all notifications as read
  markAllAsRead: async (type) => {
    await delay(300);
    if (type) {
      mockNotifications[type].forEach((n) => (n.read = true));
    } else {
      Object.keys(mockNotifications).forEach((t) => {
        mockNotifications[t].forEach((n) => (n.read = true));
      });
    }
  },

  // Delete notification
  deleteNotification: async (id) => {
    await delay(200);
    Object.keys(mockNotifications).forEach((type) => {
      const index = mockNotifications[type].findIndex((n) => n.id === id);
      if (index > -1) {
        mockNotifications[type].splice(index, 1);
      }
    });
  },
};

export function Notification(obj) {
  return (
    obj &&
    typeof obj.id === 'string' &&
    typeof obj.title === 'string' &&
    typeof obj.message === 'string' &&
    typeof obj.time === 'string' &&
    typeof obj.read === 'boolean' &&
    typeof obj.type !== 'undefined' // You may want a more specific check for NotificationType
  );
}

export function NotificationStats(obj) {
  return (
    obj &&
    typeof obj.total === 'number' &&
    typeof obj.unread === 'number' &&
    typeof obj.byType === 'object' &&
    obj.byType !== null
    // Optionally, you can add more checks for byType keys/values
  );
}
