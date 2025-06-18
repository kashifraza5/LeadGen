export interface Email {
  id: string
  address: string
  type: "personal" | "work" | "other"
  isPrimary: boolean
  createdAt?: string
  updatedAt?: string
}

export interface ContactPhone {
  id: string
  number: string
  type: "mobile" | "work" | "home"
  isPrimary: boolean
  createdAt?: string
  updatedAt?: string
}

export interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  type: "home" | "work" | "mailing"
  isPrimary: boolean
  createdAt?: string
  updatedAt?: string
}

export interface PersonalInformation {
  leadId: string
  emails: Email[]
  phones: ContactPhone[]
  addresses: Address[]
  source: string
  territory: string
  assignedTo: string
  leadScore: number
  tags: string[]
  lastContactDate?: string
  nextFollowUpDate?: string
}

export interface CreateEmailRequest {
  leadId: string
  address: string
  type: Email["type"]
  isPrimary: boolean
}

export interface CreatePhoneRequest {
  leadId: string
  number: string
  type: ContactPhone["type"]
  isPrimary: boolean
}

export interface CreateAddressRequest {
  leadId: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  type: Address["type"]
  isPrimary: boolean
}

export interface UpdateEmailRequest extends Partial<CreateEmailRequest> {}
export interface UpdatePhoneRequest extends Partial<CreatePhoneRequest> {}
export interface UpdateAddressRequest extends Partial<CreateAddressRequest> {}
