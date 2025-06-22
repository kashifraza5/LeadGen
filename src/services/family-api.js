// Mock family data
const mockFamilyMembers = {
  "LD-10042": [
    {
      id: "FM-001",
      leadId: "LD-10042",
      name: "Sarah Rodriguez",
      relationship: "Spouse",
      age: 42,
      occupation: "Teacher",
      email: "sarah.r@example.com",
      notes: "Primary decision maker for investments",
      isExistingLead: false,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "FM-002",
      leadId: "LD-10042",
      name: "Emily Rodriguez",
      relationship: "Daughter",
      age: 16,
      occupation: "Student",
      notes: "College planning in 2 years",
      isExistingLead: false,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "FM-003",
      leadId: "LD-10042",
      name: "James Rodriguez",
      relationship: "Son",
      age: 14,
      occupation: "Student",
      notes: "Interested in sports scholarships",
      isExistingLead: false,
      createdAt: "2024-01-10T10:00:00Z",
      updatedAt: "2024-01-10T10:00:00Z",
    },
  ],
}

const mockHouseholdInfo = {
  "LD-10042": {
    leadId: "LD-10042",
    householdSize: 4,
    householdIncome: 175000,
    primaryResidence: "Owned - Single Family Home",
    yearsAtAddress: 8,
    dependents: 2,
    maritalStatus: "Married",
    updatedAt: "2024-01-10T10:00:00Z",
  },
}

// Mock existing leads for linking
const mockExistingLeads = [
  { id: "LD-10001", name: "John Smith", email: "john.smith@example.com" },
  { id: "LD-10002", name: "Jane Doe", email: "jane.doe@example.com" },
  { id: "LD-10003", name: "Mike Johnson", email: "mike.johnson@example.com" },
  { id: "LD-10004", name: "Sarah Wilson", email: "sarah.wilson@example.com" },
  { id: "LD-10005", name: "David Brown", email: "david.brown@example.com" },
]

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export const familyApi = {
  // Get family members for a lead
  getFamilyMembers: async (leadId) => {
    await delay(400)
    return mockFamilyMembers[leadId] || []
  },

  // Get household information
  getHouseholdInfo: async (leadId) => {
    await delay(300)
    return mockHouseholdInfo[leadId] || null
  },

  // Create family member
  createFamilyMember: async (leadId, data) => {
    await delay(500)

    const newFamilyMember = {
      id: `FM-${Date.now()}`,
      leadId,
      ...data,
      age: data.dateOfBirth ? new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear() : undefined,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    if (!mockFamilyMembers[leadId]) {
      mockFamilyMembers[leadId] = []
    }

    mockFamilyMembers[leadId].push(newFamilyMember)
    return newFamilyMember
  },

  // Update family member
  updateFamilyMember: async (id, data) => {
    await delay(400)

    for (const leadId in mockFamilyMembers) {
      const memberIndex = mockFamilyMembers[leadId].findIndex((member) => member.id === id)
      if (memberIndex !== -1) {
        const updatedMember = {
          ...mockFamilyMembers[leadId][memberIndex],
          ...data,
          age: data.dateOfBirth
            ? new Date().getFullYear() - new Date(data.dateOfBirth).getFullYear()
            : mockFamilyMembers[leadId][memberIndex].age,
          updatedAt: new Date().toISOString(),
        }

        mockFamilyMembers[leadId][memberIndex] = updatedMember
        return updatedMember
      }
    }

    throw new Error(`Family member with ID ${id} not found`)
  },

  // Delete family member
  deleteFamilyMember: async (id) => {
    await delay(300)

    for (const leadId in mockFamilyMembers) {
      const memberIndex = mockFamilyMembers[leadId].findIndex((member) => member.id === id)
      if (memberIndex !== -1) {
        mockFamilyMembers[leadId].splice(memberIndex, 1)
        return
      }
    }

    throw new Error(`Family member with ID ${id} not found`)
  },

  // Update household information
  updateHouseholdInfo: async (leadId, data) => {
    await delay(400)

    const existingInfo = mockHouseholdInfo[leadId]
    const updatedInfo = {
      leadId,
      ...existingInfo,
      ...data,
      updatedAt: new Date().toISOString(),
    }

    mockHouseholdInfo[leadId] = updatedInfo
    return updatedInfo
  },

  // Get existing leads for linking
  getExistingLeads: async () => {
    await delay(200)
    return mockExistingLeads
  },

  // Get family statistics
  getFamilyStats: async (leadId) => {
    await delay(300)

    const members = mockFamilyMembers[leadId] || []
    const relationships = {}
    let totalAge = 0
    let ageCount = 0
    let linkedLeads = 0

    members.forEach((member) => {
      relationships[member.relationship] = (relationships[member.relationship] || 0) + 1

      if (member.age) {
        totalAge += member.age
        ageCount++
      }

      if (member.isExistingLead) {
        linkedLeads++
      }
    })

    return {
      totalMembers: members.length,
      averageAge: ageCount > 0 ? Math.round(totalAge / ageCount) : 0,
      relationships,
      linkedLeads,
    }
  },
}
