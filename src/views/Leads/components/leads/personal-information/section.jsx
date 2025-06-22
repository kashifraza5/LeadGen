import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Mail, PhoneIcon, MapPin, Plus, Loader2, X } from "lucide-react";
import { AddEmailModal } from "./add-email-modal";
import { AllEmailsModal } from "./all-emails-modal";
import { AddPhoneModal } from "./add-phone-modal";
import { AllPhonesModal } from "./all-phones-modal";
import { AddAddressModal } from "./add-address-modal";
import { AllAddressesModal } from "./all-addresses-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeadDetail, clearError } from "@/views/Leads/store/dataSlice";
import { getLeadDetail } from "@/services/LeadService";
import reducer from '@/views/Leads/store'
import { injectReducer } from '@/store/index'
injectReducer('leads', reducer)


const PersonalInformationTab = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const leadId = params?.id || "LD-10042";
  const leadsState = useSelector((state) => state.leads?.data) || {};
  const leadDetail = leadsState?.leadDetail || {};
  const isLoading = leadsState?.isLoading || false;

  console.log("🚀 ~ leadDetails:", leadDetail);
  
  // Transform API data to match component structure
  const personalInfo = useMemo(() => {
    if (!leadDetail) {
      return {
        id: leadId,
        user_emails: [],
        user_phone_numbers: [],
        user_addresses: [],
        last_contact_date: null,
        next_followup_date: null,
        source: null,
        tags: [],
        territory: null,
        assigned_to: null,
        lead_score: 0,
      };
    }

    return {
      user_emails:
        leadDetail.user_emails?.map((email) => ({
          id: email.id,
          address: email.email_address,
          type: email.email_type,
          isPrimary: email.is_primary,
        })) || [],
      user_phone_numbers:
        leadDetail.user_phone_numbers?.map((phone) => ({
          id: phone.id,
          number: phone.phone_number,
          type: phone.phone_type,
          isPrimary: phone.is_primary,
        })) || [],
      user_addresses:
        leadDetail.user_addresses?.map((address) => ({
          id: address.id,
          street: address.street_address,
          city: address.city,
          state: address.state,
          zip: address.postal_code,
          country: address.country,
          type: address.address_type,
          isPrimary: address.is_primary,
        })) || [],
      last_contact_date: leadDetail.last_contact_date,
      next_followup_date: leadDetail.next_followup_date,
      source: leadDetail.source,
      tags: leadDetail.tags || [],
      territory: leadDetail.territory,
      assigned_to: leadDetail.assigned_to,
      lead_score: leadDetail.lead_score || 0,
    };
  }, [leadDetail, leadId]);

  console.log("🚀 ~ personalInfo:", personalInfo);

  // Modal states
  const [isAddEmailModalOpen, setIsAddEmailModalOpen] = useState(false);
  const [isAllEmailsModalOpen, setIsAllEmailsModalOpen] = useState(false);
  const [isAddPhoneModalOpen, setIsAddPhoneModalOpen] = useState(false);
  const [isAllPhonesModalOpen, setIsAllPhonesModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [isAllAddressesModalOpen, setIsAllAddressesModalOpen] = useState(false);

  // Mock functions for now (these would be replaced with actual API calls)
  const createEmail = useCallback(async (emailData) => {
    // TODO: Implement actual API call
    console.log("Creating email:", emailData);
  }, []);

  const createPhone = useCallback(async (phoneData) => {
    // TODO: Implement actual API call
    console.log("Creating phone:", phoneData);
  }, []);

  const createAddress = useCallback(async (addressData) => {
    // TODO: Implement actual API call
    console.log("Creating address:", addressData);
  }, []);

  const setPrimaryEmail = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Setting primary email:", id);
  }, []);

  const setPrimaryPhone = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Setting primary phone:", id);
  }, []);

  const setPrimaryAddress = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Setting primary address:", id);
  }, []);

  const deleteEmail = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Deleting email:", id);
  }, []);

  const deletePhone = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Deleting phone:", id);
  }, []);

  const deleteAddress = useCallback(async (id) => {
    // TODO: Implement actual API call
    console.log("Deleting address:", id);
  }, []);

  useEffect(() => {

    if (leadId) {
      dispatch(fetchLeadDetail(leadId));
    }
  }, [leadId, dispatch]);
 

  // Handle adding a new email
  const handleAddEmail = useCallback(
    async (email) => {
      await createEmail({
        leadId,
        address: email.address,
        type: email.type,
        isPrimary: email.isPrimary,
      });
    },
    [createEmail, leadId]
  );

  // Handle adding a new phone
  const handleAddPhone = useCallback(
    async (phone) => {
      await createPhone({
        leadId,
        number: phone.number,
        type: phone.type,
        isPrimary: phone.isPrimary,
      });
    },
    [createPhone, leadId]
  );

  // Handle adding a new address
  const handleAddAddress = useCallback(
    async (address) => {
      await createAddress({
        leadId,
        street: address.street,
        city: address.city,
        state: address.state,
        zip: address.zip,
        country: address.country,
        type: address.type,
        isPrimary: address.isPrimary,
      });
    },
    [createAddress, leadId]
  );

  // Handle setting primary items
  const handleSetPrimaryEmail = useCallback(
    async (id) => {
      await setPrimaryEmail(id);
    },
    [setPrimaryEmail]
  );

  const handleSetPrimaryPhone = useCallback(
    async (id) => {
      await setPrimaryPhone(id);
    },
    [setPrimaryPhone]
  );

  const handleSetPrimaryAddress = useCallback(
    async (id) => {
      await setPrimaryAddress(id);
    },
    [setPrimaryAddress]
  );

  // Handle deleting items
  const handleDeleteEmail = useCallback(
    async (id) => {
      await deleteEmail(id);
    },
    [deleteEmail]
  );

  const handleDeletePhone = useCallback(
    async (id) => {
      await deletePhone(id);
    },
    [deletePhone]
  );

  const handleDeleteAddress = useCallback(
    async (id) => {
      await deleteAddress(id);
    },
    [deleteAddress]
  );

  // Modal handlers
  const handleOpenAddEmailModal = useCallback(() => {
    setIsAddEmailModalOpen(true);
  }, []);

  const handleCloseAddEmailModal = useCallback(() => {
    setIsAddEmailModalOpen(false);
  }, []);

  const handleOpenAllEmailsModal = useCallback(() => {
    setIsAllEmailsModalOpen(true);
  }, []);

  const handleCloseAllEmailsModal = useCallback(() => {
    setIsAllEmailsModalOpen(false);
  }, []);

  const handleOpenAddPhoneModal = useCallback(() => {
    setIsAddPhoneModalOpen(true);
  }, []);

  const handleCloseAddPhoneModal = useCallback(() => {
    setIsAddPhoneModalOpen(false);
  }, []);

  const handleOpenAllPhonesModal = useCallback(() => {
    setIsAllPhonesModalOpen(true);
  }, []);

  const handleCloseAllPhonesModal = useCallback(() => {
    setIsAllPhonesModalOpen(false);
  }, []);

  const handleOpenAddAddressModal = useCallback(() => {
    setIsAddAddressModalOpen(true);
  }, []);

  const handleCloseAddAddressModal = useCallback(() => {
    setIsAddAddressModalOpen(false);
  }, []);

  const handleOpenAllAddressesModal = useCallback(() => {
    setIsAllAddressesModalOpen(true);
  }, []);

  const handleCloseAllAddressesModal = useCallback(() => {
    setIsAllAddressesModalOpen(false);
  }, []);

  const handleRetry = useCallback(() => {
    if (leadId) {
      dispatch(fetchLeadDetail(leadId));
    }
  }, [dispatch, leadId]);

  // Memoized values
  const primaryEmail = useMemo(
    () => personalInfo?.user_emails?.find((e) => e.isPrimary),
    [personalInfo?.user_emails]
  );

  const primaryPhone = useMemo(
    () => personalInfo?.user_phone_numbers?.find((p) => p.isPrimary),
    [personalInfo?.user_phone_numbers]
  );

  const primaryAddress = useMemo(
    () => personalInfo?.user_addresses?.find((a) => a.isPrimary),
    [personalInfo?.user_addresses]
  );

  // Show loading state
  if (leadsState.isLoading && !leadDetail) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading personal information...</span>
      </div>
    );
  }

  // Show error state
  if (leadsState.error) {
    return (
      <Alert variant="destructive" className="mb-6">
        <AlertDescription className="flex items-center justify-between">
          {leadsState.error}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(clearError())}
          >
            <X className="h-4 w-4" />
          </Button>
        </AlertDescription>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRetry}
          className="mt-2"
        >
          Retry
        </Button>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  View All ({personalInfo.user_emails.length})
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
                  View All ({personalInfo.user_phone_numbers.length})
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
                  View All ({personalInfo.user_addresses.length})
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

      <Card>
        <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between">
            Lead Details
            {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="source" className="text-sm font-medium">
                Source
              </Label>
              <div className="mt-1 text-sm">{personalInfo.source || 'Not specified'}</div>
            </div>
            <div>
              <Label htmlFor="territory" className="text-sm font-medium">
                Territory
              </Label>
              <div className="mt-1 text-sm">{personalInfo.territory || 'Not specified'}</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="assigned-to" className="text-sm font-medium">
                Assigned To
              </Label>
              <div className="mt-1 text-sm">{personalInfo.assigned_to?.first_name + " " + personalInfo.assigned_to?.last_name || 'Not assigned'}</div>
            </div>
            <div>
              <Label htmlFor="lead-score" className="text-sm font-medium">
                Lead Score
              </Label>
              <div className="mt-1 flex items-center">
                <div className="bg-green-100 text-green-800 text-xs font-medium px-2 py-0.5 rounded">
                  {personalInfo.lead_score >= 80 ? "High" : personalInfo.lead_score >= 60 ? "Medium" : "Low"}
                </div>
                <div className="ml-2 text-sm">{personalInfo.lead_score || 0}/100</div>
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="tags" className="text-sm font-medium">
              Tags
            </Label>
            <div className="mt-1 flex flex-wrap gap-1">
              {personalInfo.tags && personalInfo.tags.length > 0 ? (
                personalInfo.tags.map((tag, index) => (
                  <Badge key={index} variant="outline" className="bg-blue-50 text-blue-700">
                    {tag}
                  </Badge>
                ))
              ) : (
                <span className="text-sm text-gray-500">No tags</span>
              )}
            </div>
          </div>

          {personalInfo.last_contact_date && (
            <div>
              <Label htmlFor="last-contact" className="text-sm font-medium">
                Last Contact
              </Label>
              <div className="mt-1 text-sm">
                {new Date(personalInfo.last_contact_date).toLocaleDateString()} at{" "}
                {new Date(personalInfo.last_contact_date).toLocaleTimeString()}
              </div>
            </div>
          )}

          {personalInfo.next_followup_date && (
            <div>
              <Label htmlFor="next-follow-up" className="text-sm font-medium">
                Next Follow-up
              </Label>
              <div className="mt-1 text-sm">
                {new Date(personalInfo.next_followup_date).toLocaleDateString()} at{" "}
                {new Date(personalInfo.next_followup_date).toLocaleTimeString()}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
   </div>

      <div className="grid grid-cols-1">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center justify-between">
              Additional Information
              {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
            </CardTitle>
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
      </div>

      {/* Modals */}
      <AddEmailModal
        isOpen={isAddEmailModalOpen}
        onClose={handleCloseAddEmailModal}
        onAdd={handleAddEmail}
      />
      <AllEmailsModal
        isOpen={isAllEmailsModalOpen}
        onClose={handleCloseAllEmailsModal}
        emails={personalInfo.user_emails}
        onSetPrimary={handleSetPrimaryEmail}
        onDelete={handleDeleteEmail}
      />
      <AddPhoneModal
        isOpen={isAddPhoneModalOpen}
        onClose={handleCloseAddPhoneModal}
        onAdd={handleAddPhone}
      />
      <AllPhonesModal
        isOpen={isAllPhonesModalOpen}
        onClose={handleCloseAllPhonesModal}
        phones={personalInfo.user_phone_numbers}
        onSetPrimary={handleSetPrimaryPhone}
        onDelete={handleDeletePhone}
      />
      <AddAddressModal
        isOpen={isAddAddressModalOpen}
        onClose={handleCloseAddAddressModal}
        onAdd={handleAddAddress}
      />
      <AllAddressesModal
        isOpen={isAllAddressesModalOpen}
        onClose={handleCloseAllAddressesModal}
        addresses={personalInfo.user_addresses}
        onSetPrimary={handleSetPrimaryAddress}
        onDelete={handleDeleteAddress}
      />
    </div>
  );
};

export { PersonalInformationTab };
