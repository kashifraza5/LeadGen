
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Edit, MoreHorizontal } from "lucide-react"

// Import tab components
import { PersonalInformationTab } from "@/components/leads/personal-information-tab"
import { FamilyTab } from "@/components/leads/family-tab"
import { DocumentsTab } from "@/components/leads/documents-tab"
import { ActivitiesTab } from "@/components/leads/activities-tab"
import { ConversationsTab } from "@/components/leads/conversations-tab"
import { CampaignsTab } from "@/components/leads/campaigns-tab"
import { NotesTab } from "@/components/leads/notes-tab"
import { FinancialTab } from "@/components/leads/financials-tab"

export function LeadDetail({ leadId }: { leadId: string }) {
  const [activeTab, setActiveTab] = useState<
    "personal" | "family" | "documents" | "activities" | "conversations" | "campaigns" | "notes" | "financial"
  >("personal")

  return (
    <div className="flex-1 overflow-auto">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center">
          <Avatar className="h-10 w-10 mr-4">
            <AvatarFallback className="bg-blue-100 text-blue-600">MR</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-xl font-semibold">Michael Rodriguez</h1>
            <div className="flex items-center text-sm text-gray-500">
              <Badge variant="outline" className="mr-2 bg-blue-50 text-blue-700 hover:bg-blue-50">
                In Progress
              </Badge>
              <span className="mr-2">ID: {leadId}</span>
              <span>Added on Jul 15, 2023</span>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="h-4 w-4 mr-2" />
            Edit
          </Button>
          <Select>
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
          <Button variant="outline" size="icon">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </header>

      <Tabs defaultValue="personal" className="p-6">
        <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 mb-6">
          <TabsTrigger
            value="personal"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "personal" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("personal")}
          >
            Personal Information
          </TabsTrigger>
          <TabsTrigger
            value="family"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "family" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("family")}
          >
            Family
          </TabsTrigger>
          <TabsTrigger
            value="documents"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "documents" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("documents")}
          >
            Document Manager
          </TabsTrigger>
          <TabsTrigger
            value="activities"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "activities" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activities")}
          >
            Activities
          </TabsTrigger>
          <TabsTrigger
            value="conversations"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "conversations" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("conversations")}
          >
            Conversations
          </TabsTrigger>
          <TabsTrigger
            value="campaigns"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "campaigns" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("campaigns")}
          >
            Campaigns
          </TabsTrigger>
          <TabsTrigger
            value="notes"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "notes" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("notes")}
          >
            Notes
          </TabsTrigger>
          <TabsTrigger
            value="financial"
            className={`rounded-none border-b-2 border-transparent px-4 py-2 ${
              activeTab === "financial" ? "border-blue-600 text-blue-600" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("financial")}
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

        <TabsContent value="financial">
          <FinancialTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
