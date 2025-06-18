import { useState } from "react"
import { X, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function AddFamilyMemberModal({
  isOpen,
  onClose,
  onAddFamilyMember = () => {},
  existingLeads = [],
}) {
  const [activeTab, setActiveTab] = useState("new")
  const [name, setName] = useState("")
  const [relation, setRelation] = useState("")
  const [dateOfBirth, setDateOfBirth] = useState("")
  const [notes, setNotes] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedLeadId, setSelectedLeadId] = useState(null)

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()

    if (activeTab === "new" && (name.trim() === "" || relation.trim() === "")) {
      return // Basic validation
    }

    if (activeTab === "existing" && !selectedLeadId) {
      return // Ensure a lead is selected
    }

    const selectedLead = existingLeads.find((lead) => lead.id === selectedLeadId)

    onAddFamilyMember({
      name: activeTab === "new" ? name.trim() : selectedLead?.name || "",
      relation: relation.trim(),
      dateOfBirth: dateOfBirth,
      notes: notes.trim(),
      isExistingLead: activeTab === "existing",
      leadId: activeTab === "existing" ? selectedLeadId || undefined : undefined,
    })

    // Reset form
    setName("")
    setRelation("")
    setDateOfBirth("")
    setNotes("")
    setSearchTerm("")
    setSelectedLeadId(null)
    setActiveTab("new")
    onClose()
  }

  const filteredLeads = searchTerm
    ? existingLeads.filter(
        (lead) =>
          lead.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : existingLeads

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Family Member</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value)} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="new">New Family Member</TabsTrigger>
            <TabsTrigger value="existing">Existing Lead</TabsTrigger>
          </TabsList>

          <TabsContent value="new">
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter family member's name"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="relation">Relation</Label>
                  <RadioGroup value={relation} onValueChange={setRelation} className="flex flex-wrap gap-4 mt-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Spouse" id="spouse" />
                      <Label htmlFor="spouse">Spouse</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Child" id="child" />
                      <Label htmlFor="child">Child</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Parent" id="parent" />
                      <Label htmlFor="parent">Parent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sibling" id="sibling" />
                      <Label htmlFor="sibling">Sibling</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Other" id="other-relation" />
                      <Label htmlFor="other-relation">Other</Label>
                    </div>
                  </RadioGroup>
                  {relation === "Other" && (
                    <Input
                      className="mt-2"
                      placeholder="Specify relation"
                      onChange={(e) => setRelation(e.target.value)}
                    />
                  )}
                </div>

                <div>
                  <Label htmlFor="dob">Date of Birth</Label>
                  <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                </div>

                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any additional information"
                    className="min-h-[100px]"
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="button" variant="outline" onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Add Family Member
                  </Button>
                </div>
              </div>
            </form>
          </TabsContent>

          <TabsContent value="existing">
            <div className="space-y-4">
              <div>
                <Label>Search Existing Leads</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Search by name or email..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <div className="border rounded-md overflow-hidden">
                <div className="max-h-[300px] overflow-y-auto">
                  {filteredLeads.length > 0 ? (
                    <div className="divide-y">
                      {filteredLeads.map((lead) => (
                        <div
                          key={lead.id}
                          className={`p-3 flex items-center cursor-pointer hover:bg-gray-50 ${
                            selectedLeadId === lead.id ? "bg-blue-50" : ""
                          }`}
                          onClick={() => setSelectedLeadId(lead.id)}
                        >
                          <div className="h-8 w-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-medium mr-3">
                            {lead.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{lead.name}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                          <div className="flex items-center justify-center w-5 h-5 rounded-full border border-gray-300 bg-white">
                            {selectedLeadId === lead.id && <div className="w-3 h-3 rounded-full bg-blue-600"></div>}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-gray-500">
                      {searchTerm ? "No leads found matching your search" : "No leads available"}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label htmlFor="relation-existing">Relation</Label>
                <RadioGroup value={relation} onValueChange={setRelation} className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Spouse" id="spouse-existing" />
                    <Label htmlFor="spouse-existing">Spouse</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Child" id="child-existing" />
                    <Label htmlFor="child-existing">Child</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Parent" id="parent-existing" />
                    <Label htmlFor="parent-existing">Parent</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Sibling" id="sibling-existing" />
                    <Label htmlFor="sibling-existing">Sibling</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="Other" id="other-relation-existing" />
                    <Label htmlFor="other-relation-existing">Other</Label>
                  </div>
                </RadioGroup>
                {relation === "Other" && (
                  <Input
                    className="mt-2"
                    placeholder="Specify relation"
                    onChange={(e) => setRelation(e.target.value)}
                  />
                )}
              </div>

              <div>
                <Label htmlFor="notes-existing">Notes</Label>
                <Textarea
                  id="notes-existing"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add any additional information"
                  className="min-h-[100px]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button
                  onClick={handleSubmit}
                  className="bg-blue-600 hover:bg-blue-700"
                  disabled={!selectedLeadId || !relation}
                >
                  Link Family Member
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
