import React, { useState,useEffect, useCallback } from "react"
import { useParams } from "react-router-dom"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, MoreHorizontal } from "lucide-react"
import { fetchLeadDetail } from "@/views/Leads/store/dataSlice"
import { useDispatch } from "react-redux"
// Import tab components
import { PersonalInformationTab } from "../tab-components/personal-information-tab"
import { FamilyTab } from "../tab-components/family-tab"
import { DocumentsTab } from "../tab-components/documents-tab"
import { ActivitiesTab } from "../tab-components/activities-tab"
import { ConversationsTab } from "../tab-components/conversations-tab"
import { CampaignsTab } from "../tab-components/campaigns-tab"
import { NotesTab } from "../tab-components/notes-tab"
import { injectReducer } from "@/store"
// import { FinancialTab } from "../tab-components/financials-tab"

import {getLeads} from "@/services/LeadService"
import { useSelector } from "react-redux"
import reducer from "@/views/Leads/store"
injectReducer('leads', reducer)

const LeadDetail = () => {
  const dispatch = useDispatch()
  const params = useParams()
  const leadId = params?.id

  const getLeadsData = async () => {
    const response = await getLeads(leadId)
    console.log("🚀 ~ getLeadsData ~ response:", response)
  }
  
  const { leads } = useSelector((state) => state.leads?.data || {
    leads: [],
  })

  // Find the specific lead by ID
  const lead = leads.find(lead => lead.id === leadId || lead.id === parseInt(leadId))
  


  const [activeTab, setActiveTab] = useState("personal")

  const handleTabChange = useCallback((tab) => {
    setActiveTab(tab)
  }, [])

  const handleStatusChange = useCallback((value) => {
    // Handle status change logic here
    console.log("Status changed to:", value)
  }, [])

  const handleEdit = useCallback(() => {
    // Handle edit logic here
    console.log("Edit clicked")
  }, [])

  const handleMoreActions = useCallback(() => {
    // Handle more actions logic here
    console.log("More actions clicked")
  }, [])

  // useEffect(() => {
  //   dispatch(fetchLeadDetail(leadId))
  // }, [leadId])

  // Tab configuration
  // const tabs = [
  //   { id: "personal", label: "Personal Information", component: PersonalInformationTab },
  //   { id: "family", label: "Family", component: FamilySection },
  //   // { id: "documents", label: "Document Manager", component: DocumentsTab },
  //   // { id: "activities", label: "Activities", component: ActivitiesTab },
  //   // { id: "conversations", label: "Conversations", component: ConversationsTab },
  //   // { id: "campaigns", label: "Campaigns", component: CampaignsTab },
  //   // { id: "notes", label: "Notes", component: NotesTab },
  //   // { id: "financial", label: "Financial", component: FinancialTab }
  // ]

  // Render tab trigger
  // const renderTabTrigger = useCallback((tab) => (
  //   <TabsTrigger
  //     key={tab.id}
  //     value={tab.id}
  //     // className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
  //     //   activeTab === tab.id ? "border-blue-600 text-blue-600" : "text-gray-500"
  //     // }`}
  //     className={`rounded-none border-b-2 border-transparent px-4 py-2 gap-8${
  //       activeTab === tab.id ?  "border-blue-600 text-blue-600" : "text-gray-500"
  //     }`}
  //     onClick={() => handleTabChange(tab.id)}
  //   >
  //     {tab.label}
  //   </TabsTrigger>
  // ), [activeTab, handleTabChange])

  // Render tab content
  const renderTabContent = useCallback((tab) => (
    <TabsContent key={tab.id} value={tab.id} className={tab.id === "activities" || tab.id === "conversations" ? "pt-0" : ""}>
      <tab.component />
    </TabsContent>
  ), [])

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarFallback className="bg-blue-100 text-blue-600">
              {`${lead?.initials}` }
            </AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">
              {`${lead?.name || "No Name"} ` }
            </h1>
            <div className="flex items-center text-sm text-gray-500">
              <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 hover:bg-blue-50">
                {lead?.status || "No Status"}
              </Badge>
              <span className="mr-2">ID: {leadId}</span>
              <span>Added on { new Date(lead?.dateAdded || "No Date").toLocaleDateString() }</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleEdit}>
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Select onValueChange={handleStatusChange} value={lead?.status || ''}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Set Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="new">New</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="qualified">Qualified</SelectItem>
              <SelectItem value="nurturing">Nurturing</SelectItem>
              <SelectItem value="converted">Converted</SelectItem>
              <SelectItem value="closed-lost">Closed Lost</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon" onClick={handleMoreActions}>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-6">
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
          <TabsTrigger
            value="personal"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="family"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Family
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Document Manager
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="conversations"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Conversations
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className="rounded-none border-b-2 border-transparent px-4 py-2 data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-gray-500 hover:text-gray-700 hover:border-gray-300 transition-colors duration-200"
          >
            Financial
          </TabsTrigger>
        </TabsList>

        {/* Tab Contents */}
        <TabsContent value="personal">
          <PersonalInformationTab />
        </TabsContent>

        <TabsContent value="family">
          <FamilyTab />
        </TabsContent>

        <TabsContent value="documents">
          <DocumentsTab />
        </TabsContent>

        <TabsContent value="activities" className="pt-0">
          <ActivitiesTab />
        </TabsContent>

        <TabsContent value="conversations" className="pt-0">
          <ConversationsTab />
        </TabsContent>

        <TabsContent value="campaigns">
          <CampaignsTab />
        </TabsContent>

        <TabsContent value="notes">
          <NotesTab />
        </TabsContent>

        {/* <TabsContent value="financial">
          <FinancialTab />
        </TabsContent> */}
      </Tabs>
    </div>
  )
}

export default LeadDetail
