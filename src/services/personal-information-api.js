import { ApiService } from "./api"
  PersonalInformation,
  Email,
  ContactPhone,
  Address,
  CreateEmailRequest,
  CreatePhoneRequest,
  CreateAddressRequest,
  UpdateEmailRequest,
  UpdatePhoneRequest,
  UpdateAddressRequest,
} from "@/types/personal-information"

class PersonalInformationApiService extends ApiService {
  async getPersonalInformation(leadId: string): Promise<PersonalInformation> {
    // TODO: Replace this dummy data with actual API call
    // return await this.get<PersonalInformation>(`/leads/${leadId}/personal-information`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay

    return {
      leadId: leadId,
      emails: [
        {
          id: "email-1",
          address: "michael.rodriguez@example.com",
          type: "personal",
          isPrimary: true,
          createdAt: "2023-07-15T10:00:00Z",
          updatedAt: "2023-07-15T10:00:00Z",
        },
        {
          id: "email-2",
          address: "m.rodriguez@company.com",
          type: "work",
          isPrimary: false,
          createdAt: "2023-07-16T14:30:00Z",
          updatedAt: "2023-07-16T14:30:00Z",
        },
      ],
      phones: [
        {
          id: "phone-1",
          number: "+1 (555) 123-4567",
          type: "mobile",
          isPrimary: true,
          createdAt: "2023-07-15T10:00:00Z",
          updatedAt: "2023-07-15T10:00:00Z",
        },
        {
          id: "phone-2",
          number: "+1 (555) 987-6543",
          type: "work",
          isPrimary: false,
          createdAt: "2023-07-16T14:30:00Z",
          updatedAt: "2023-07-16T14:30:00Z",
        },
      ],
      addresses: [
        {
          id: "address-1",
          street: "123 Main St",
          city: "San Francisco",
          state: "CA",
          zip: "94105",
          country: "USA",
          type: "home",
          isPrimary: true,
          createdAt: "2023-07-15T10:00:00Z",
          updatedAt: "2023-07-15T10:00:00Z",
        },
        {
          id: "address-2",
          street: "456 Market St",
          city: "San Francisco",
          state: "CA",
          zip: "94103",
          country: "USA",
          type: "work",
          isPrimary: false,
          createdAt: "2023-07-16T14:30:00Z",
          updatedAt: "2023-07-16T14:30:00Z",
        },
      ],
      source: "Website Form",
      territory: "North Region",
      assignedTo: "Jennifer Wilson",
      leadScore: 85,
      tags: ["retirement", "high-value", "follow-up"],
      lastContactDate: "2023-07-16T14:30:00Z",
      nextFollowUpDate: "2023-07-23T10:00:00Z",
    }
  }

  // Email operations
  async createEmail(data: CreateEmailRequest): Promise<Email> {
    // TODO: Replace this dummy data with actual API call
    // return await this.post<Email>(`/leads/${data.leadId}/emails`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

    return {
      id: `email-${Date.now()}`,
      address: data.address,
      type: data.type,
      isPrimary: data.isPrimary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async updateEmail(emailId: string, data: UpdateEmailRequest): Promise<Email> {
    // TODO: Replace this dummy data with actual API call
    // return await this.put<Email>(`/emails/${emailId}`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    return {
      id: emailId,
      address: data.address || "updated@example.com",
      type: data.type || "personal",
      isPrimary: data.isPrimary || false,
      updatedAt: new Date().toISOString(),
    }
  }

  async deleteEmail(emailId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.delete(`/emails/${emailId}`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
    console.log(`Email ${emailId} deleted successfully`)
  }

  async setPrimaryEmail(emailId: string, leadId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.put(`/leads/${leadId}/emails/${emailId}/set-primary`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay
    console.log(`Email ${emailId} set as primary for lead ${leadId}`)
  }

  // Phone operations
  async createPhone(data: CreatePhoneRequest): Promise<ContactPhone> {
    // TODO: Replace this dummy data with actual API call
    // return await this.post<ContactPhone>(`/leads/${data.leadId}/phones`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

    return {
      id: `phone-${Date.now()}`,
      number: data.number,
      type: data.type,
      isPrimary: data.isPrimary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async updatePhone(phoneId: string, data: UpdatePhoneRequest): Promise<ContactPhone> {
    // TODO: Replace this dummy data with actual API call
    // return await this.put<ContactPhone>(`/phones/${phoneId}`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    return {
      id: phoneId,
      number: data.number || "+1 (555) 000-0000",
      type: data.type || "mobile",
      isPrimary: data.isPrimary || false,
      updatedAt: new Date().toISOString(),
    }
  }

  async deletePhone(phoneId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.delete(`/phones/${phoneId}`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
    console.log(`Phone ${phoneId} deleted successfully`)
  }

  async setPrimaryPhone(phoneId: string, leadId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.put(`/leads/${leadId}/phones/${phoneId}/set-primary`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay
    console.log(`Phone ${phoneId} set as primary for lead ${leadId}`)
  }

  // Address operations
  async createAddress(data: CreateAddressRequest): Promise<Address> {
    // TODO: Replace this dummy data with actual API call
    // return await this.post<Address>(`/leads/${data.leadId}/addresses`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 600)) // Simulate API delay

    return {
      id: `address-${Date.now()}`,
      street: data.street,
      city: data.city,
      state: data.state,
      zip: data.zip,
      country: data.country,
      type: data.type,
      isPrimary: data.isPrimary,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
  }

  async updateAddress(addressId: string, data: UpdateAddressRequest): Promise<Address> {
    // TODO: Replace this dummy data with actual API call
    // return await this.put<Address>(`/addresses/${addressId}`, data)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 500)) // Simulate API delay

    return {
      id: addressId,
      street: data.street || "Updated Street",
      city: data.city || "Updated City",
      state: data.state || "CA",
      zip: data.zip || "00000",
      country: data.country || "USA",
      type: data.type || "home",
      isPrimary: data.isPrimary || false,
      updatedAt: new Date().toISOString(),
    }
  }

  async deleteAddress(addressId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.delete(`/addresses/${addressId}`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 300)) // Simulate API delay
    console.log(`Address ${addressId} deleted successfully`)
  }

  async setPrimaryAddress(addressId: string, leadId: string): Promise<void> {
    // TODO: Replace this dummy response with actual API call
    // await this.put(`/leads/${leadId}/addresses/${addressId}/set-primary`)

    // DUMMY DATA - Replace this entire block with the above commented code when connecting to real API
    await new Promise((resolve) => setTimeout(resolve, 400)) // Simulate API delay
    console.log(`Address ${addressId} set as primary for lead ${leadId}`)
  }
}

export const personalInformationApiService = new PersonalInformationApiService()
