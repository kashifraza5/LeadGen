import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, PhoneIcon, MapPin, Plus, Loader2, X } from "lucide-react"
import { AddEmailModal } from "@/components/leads/personal-information/add-email-modal"
import { AllEmailsModal } from "@/components/leads/personal-information/all-emails-modal"
import { AddPhoneModal } from "@/components/leads/personal-information/add-phone-modal"
import { AllPhonesModal } from "@/components/leads/personal-information/all-phones-modal"
import { AddAddressModal } from "@/components/leads/personal-information/add-address-modal"
import { AllAddressesModal } from "@/components/leads/personal-information/all-addresses-modal"
import { usePersonalInformationStore } from "@/store/personal-information-store"

export function Section() {
  const params = useParams()
  const leadId = params?.id || "LD-10042" // Fallback for demo

  // Store state
  const {
    personalInfo,
    isLoading,
    error,
    fetchPersonalInformation,
    createEmail,
    createPhone,
    createAddress,
    setPrimaryEmail,
    setPrimaryPhone,
    setPrimaryAddress,
    deleteEmail,
    deletePhone,
    deleteAddress,
    clearError,
  } = usePersonalInformationStore()

  // Modal states
  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false)
  const [isAllEmailsModalOpen, setIsAllEmailsModalOpen] = useState(false)
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false)
  const [isAllPhonesModalOpen, setIsAllPhonesModalOpen] = useState(false)
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false)
  const [isAllAddressesModalOpen, setIsAllAddressesModalOpen] = useState(false)

  // Fetch personal information on component mount
  useEffect(() => {
    if (leadId) {
      fetchPersonalInformation(leadId)
    }
  }, [leadId, fetchPersonalInformation])

  // Handle adding a new email
  const handleAddEmail = async (email) => {
    await createEmail({
      leadId,
      address: email.address,
      type: email.type,
      isPrimary: email.isPrimary,
    })
  }

  // Handle adding a new phone
  const handleAddPhone = async (phone) => {
    await createPhone({
      leadId,
      number: phone.number,
      type: phone.type,
      isPrimary: phone.isPrimary,
    })
  }

  // Handle adding a new address
  const handleAddAddress = async (address) => {
    await createAddress({
      leadId,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
      country: address.country,
      type: address.type,
      isPrimary: address.isPrimary,
    })
  }

  // Handle setting primary items
  const handleSetPrimaryEmail = async (id) => {
    await setPrimaryEmail(id)
  }

  const handleSetPrimaryPhone = async (id) => {
    await setPrimaryPhone(id)
  }

  const handleSetPrimaryAddress = async (id) => {
    await setPrimaryAddress(id)
  }

  // Handle deleting items
  const handleDeleteEmail = async (id) => {
    await deleteEmail(id)
  }

  const handleDeletePhone = async (id) => {
    await deletePhone(id)
  }

  const handleDeleteAddress = async (id) => {
    await deleteAddress(id)
  }

  // Show loading state
  if (isLoading && !personalInfo) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading personal information...</span>
      </div>
    )
  }

  // Show error state
  if (error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription className="flex items-center justify-between">
          {error}
          <Button variant="ghost" size="sm" onClick={clearError}>
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
      </Alert>
    )
  }

  // Show empty state if no data
  if (!personalInfo) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No personal information found.</p>
        <Button onClick={() => fetchPersonalInformation(leadId)} className="mt-4">
          Retry
        </Button>
      </div>
    )
  }

  const primaryEmail = personalInfo.emails.find((e) => e.isPrimary)
  const primaryPhone = personalInfo.phones.find((p) => p.isPrimary)
  const primaryAddress = personalInfo.addresses.find((a) => a.isPrimary)

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={clearError}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Contact Information */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              Contact Information
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Email */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Email</Label>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsAllEmailsModalOpen(true)}>
                    View All ({personalInfo.emails.length})
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsAddEmailModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
              {primaryEmail ? (
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{primaryEmail.address}</div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-1 text-xs bg-blue-50 text-blue-700">
                        {primaryEmail.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        Primary
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">No email address added</div>
              )}
            </div>

            {/* Phone */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Phone</Label>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsAllPhonesModalOpen(true)}>
                    View All ({personalInfo.phones.length})
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsAddPhoneModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
              {primaryPhone ? (
                <div className="flex items-center p-3 bg-gray-50 rounded-md">
                  <PhoneIcon className="h-5 w-5 text-gray-500 mr-3" />
                  <div className="flex-1">
                    <div className="font-medium">{primaryPhone.number}</div>
                    <div className="flex items-center">
                      <Badge variant="outline" className="mr-1 text-xs bg-green-50 text-green-700">
                        {primaryPhone.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        Primary
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">No phone number added</div>
              )}
            </div>

            {/* Address */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <Label className="text-sm font-medium">Address</Label>
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => setIsAllAddressesModalOpen(true)}>
                    View All ({personalInfo.addresses.length})
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => setIsAddAddressModalOpen(true)}>
                    <Plus className="h-4 w-4 mr-1" /> Add
                  </Button>
                </div>
              </div>
              {primaryAddress ? (
                <div className="flex items-start p-3 bg-gray-50 rounded-md">
                  <MapPin className="h-5 w-5 text-gray-500 mr-3 mt-0.5" />
                  <div className="flex-1">
                    <div className="font-medium">{primaryAddress.street}</div>
                    <div>
                      {primaryAddress.city}, {primaryAddress.state} {primaryAddress.zip}
                    </div>
                    <div>{primaryAddress.country}</div>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-1 text-xs bg-blue-50 text-blue-700">
                        {primaryAddress.type}
                      </Badge>
                      <Badge variant="outline" className="text-xs bg-purple-50 text-purple-700">
                        Primary
                      </Badge>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-sm text-gray-500 p-3 bg-gray-50 rounded-md">No address added</div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Lead Details */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Lead Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="source" className="text-sm font-medium">
                  Source
                </Label>
                <div className="mt-1 text-sm">{personalInfo.source}</div>
              </div>
              <div>
                <Label htmlFor="territory" className="text-sm font-medium">
                  Territory
                </Label>
                <div className="mt-1 text-sm">{personalInfo.territory}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="assigned-to" className="text-sm font-medium">
                  Assigned To
                </Label>
                <div className="mt-1 text-sm">{personalInfo.assignedTo}</div>
              </div>
              <div>
                <Label htmlFor="lead-score" className="text-sm font-medium">
                  Lead Score
                </Label>
                <div className="mt-1 flex items-center">
                  <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                    {personalInfo.leadScore >= 80 ? "High" : personalInfo.leadScore >= 60 ? "Medium" : "Low"}
                  </div>
                  <div className="ml-2 text-sm">{personalInfo.leadScore}/100</div>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="tags" className="text-sm font-medium">
                Tags
              </Label>
              <div className="mt-1 flex flex-wrap gap-1">
                {personalInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {personalInfo.lastContactDate && (
              <div>
                <Label htmlFor="last-contact" className="text-sm font-medium">
                  Last Contact
                </Label>
                <div className="mt-1 text-sm">
                  {new Date(personalInfo.lastContactDate).toLocaleDateString()} at{" "}
                  {new Date(personalInfo.lastContactDate).toLocaleTimeString()}
                </div>
              </div>
            )}

            {personalInfo.nextFollowUpDate && (
              <div>
                <Label htmlFor="next-follow-up" className="text-sm font-medium">
                  Next Follow-up
                </Label>
                <div className="mt-1 text-sm">
                  {new Date(personalInfo.nextFollowUpDate).toLocaleDateString()} at{" "}
                  {new Date(personalInfo.nextFollowUpDate).toLocaleTimeString()}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Additional Information */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Additional Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="date-of-birth" className="text-sm font-medium">
                Date of Birth
              </Label>
              <div className="mt-1 text-sm text-gray-500">Not provided</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modals */}
      <AddEmailModal
        isOpen={isAddEmailModalOpen}
        onClose={() => setIsAddEmailModalOpen(false)}
        onAddEmail={handleAddEmail}
      />
      <AllEmailsModal
        isOpen={isAllEmailsModalOpen}
        onClose={() => setIsAllEmailsModalOpen(false)}
        emails={personalInfo.emails}
        onSetPrimary={handleSetPrimaryEmail}
        onDeleteEmail={handleDeleteEmail}
      />

      <AddPhoneModal
        isOpen={isAddPhoneModalOpen}
        onClose={() => setIsAddPhoneModalOpen(false)}
        onAddPhone={handleAddPhone}
      />
      <AllPhonesModal
        isOpen={isAllPhonesModalOpen}
        onClose={() => setIsAllPhonesModalOpen(false)}
        phones={personalInfo.phones}
        onSetPrimary={handleSetPrimaryPhone}
        onDeletePhone={handleDeletePhone}
      />

      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={() => setIsAddAddressModalOpen(false)}
        onAddAddress={handleAddAddress}
      />
      <AllAddressesModal
        isOpen={isAllAddressesModalOpen}
        onClose={() => setIsAllAddressesModalOpen(false)}
        addresses={personalInfo.addresses}
        onSetPrimary={handleSetPrimaryAddress}
        onDeleteAddress={handleDeleteAddress}
      />
    </div>
  )
}
