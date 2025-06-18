
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { PlusCircle, Loader2, X } from "lucide-react"
import { AddFamilyMemberModal } from "./add-family-member-modal"
import { familyApi, type FamilyMember, type HouseholdInfo, type CreateFamilyMemberRequest } from "@/services/family-api"

export function Section() {
  const params = useParams()
  const leadId = (params?.id as string) || "LD-10042" // Fallback for demo

  const [familyMembers, setFamilyMembers] = useState<FamilyMember[]>([])
  const [householdInfo, setHouseholdInfo] = useState<HouseholdInfo | null>(null)
  const [existingLeads, setExistingLeads] = useState<Array<{ id: string; name: string; email: string }>>([])
  const [isAddFamilyMemberModalOpen, setIsAddFamilyMemberModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchFamilyData()
  }, [leadId])

  const fetchFamilyData = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const [membersData, householdData, leadsData] = await Promise.all([
        familyApi.getFamilyMembers(leadId),
        familyApi.getHouseholdInfo(leadId),
        familyApi.getExistingLeads(),
      ])

      setFamilyMembers(membersData)
      setHouseholdInfo(householdData)
      setExistingLeads(leadsData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch family data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddFamilyMember = async (familyMemberData: {
    name: string
    relation: string
    dateOfBirth: string
    notes: string
    isExistingLead: boolean
    leadId?: string
  }) => {
    try {
      const createData: CreateFamilyMemberRequest = {
        name: familyMemberData.name,
        relationship: familyMemberData.relation,
        dateOfBirth: familyMemberData.dateOfBirth || undefined,
        notes: familyMemberData.notes || undefined,
        isExistingLead: familyMemberData.isExistingLead,
        linkedLeadId: familyMemberData.leadId,
      }

      const newMember = await familyApi.createFamilyMember(leadId, createData)
      setFamilyMembers((prev) => [...prev, newMember])
      setIsAddFamilyMemberModalOpen(false)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add family member")
    }
  }

  const handleDeleteFamilyMember = async (memberId: string) => {
    if (!window.confirm("Are you sure you want to remove this family member?")) {
      return
    }

    try {
      await familyApi.deleteFamilyMember(memberId)
      setFamilyMembers((prev) => prev.filter((member) => member.id !== memberId))
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete family member")
    }
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={() => setError(null)}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
        <Button onClick={fetchFamilyData}>Retry</Button>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Family Members</h2>
        <Button onClick={() => setIsAddFamilyMemberModalOpen(true)} disabled={isLoading}>
          <PlusCircle className="h-4 w-4 mr-2" />
          Add Family Member
        </Button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin mr-2" />
          <span>Loading family information...</span>
        </div>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Family Information</CardTitle>
              <CardDescription>View and manage family members associated with this lead.</CardDescription>
            </CardHeader>
            <CardContent>
              {familyMembers.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No family members added yet.</p>
                  <Button className="mt-4" onClick={() => setIsAddFamilyMemberModalOpen(true)}>
                    <PlusCircle className="h-4 w-4 mr-2" />
                    Add First Family Member
                  </Button>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Relationship</TableHead>
                      <TableHead>Age</TableHead>
                      <TableHead>Occupation</TableHead>
                      <TableHead>Contact</TableHead>
                      <TableHead>Notes</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {familyMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">{member.name}</TableCell>
                        <TableCell>{member.relationship}</TableCell>
                        <TableCell>{member.age || "N/A"}</TableCell>
                        <TableCell>{member.occupation || "N/A"}</TableCell>
                        <TableCell>{member.email || member.phone || "N/A"}</TableCell>
                        <TableCell>{member.notes || "N/A"}</TableCell>
                        <TableCell>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteFamilyMember(member.id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          {householdInfo && (
            <Card>
              <CardHeader>
                <CardTitle>Household Information</CardTitle>
                <CardDescription>General information about the household.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Household Size</h3>
                    <p>{householdInfo.householdSize} members</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Household Income</h3>
                    <p>${householdInfo.householdIncome.toLocaleString()} / year</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Primary Residence</h3>
                    <p>{householdInfo.primaryResidence}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Years at Current Address</h3>
                    <p>{householdInfo.yearsAtAddress} years</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Marital Status</h3>
                    <p>{householdInfo.maritalStatus}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Dependents</h3>
                    <p>{householdInfo.dependents}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      )}

      <AddFamilyMemberModal
        isOpen={isAddFamilyMemberModalOpen}
        onClose={() => setIsAddFamilyMemberModalOpen(false)}
        onAddFamilyMember={handleAddFamilyMember}
        existingLeads={existingLeads}
      />
    </div>
  )
}
