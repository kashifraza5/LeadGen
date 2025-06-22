import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PlusCircle, Loader2, X } from "lucide-react";
import { AddFamilyMemberModal } from "./add-family-member-modal";
import { familyApi } from "@/services/family-api";
import { useDispatch, useSelector } from "react-redux";
import { fetchFamilyMembers } from "@/views/Leads/store/dataSlice";
import { injectReducer } from "@/store";
import reducer from "@/store/index";
export function FamilySection() {
  const dispatch = useDispatch();
  const params = useParams();
  const leadId = params?.id || "LD-10042"; // Fallback for demo
  const leadsState = useSelector((state) => state.leads) || {};
  console.log("🚀 ~ leadsState:", leadsState);
  const familyMembers = leadsState?.data?.familyMembers || [];
  const isLoading = leadsState?.isLoading || false;
  console.log("🚀 ~ familyMembers:", familyMembers);

  const [familyMemberss, setFamilyMembers] = useState([]);
  const [householdInfo, setHouseholdInfo] = useState(null);
  const [isAddFamilyMemberModalOpen, setIsAddFamilyMemberModalOpen] =
    useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    injectReducer("leads", reducer);
    dispatch(fetchFamilyMembers(leadId));
  }, [leadId, dispatch]);



  const handleAddFamilyMember = async (familyMemberData) => {
    try {
      const createData = {
        name: familyMemberData.name,
        relationship: familyMemberData.relation,
        dateOfBirth: familyMemberData.dateOfBirth || undefined,
        notes: familyMemberData.notes || undefined,
        isExistingLead: familyMemberData.isExistingLead,
        linkedLeadId: familyMemberData.leadId,
      };

      const newMember = await familyApi.createFamilyMember(leadId, createData);
      setFamilyMembers((prev) => [...prev, newMember]);
      setIsAddFamilyMemberModalOpen(false);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to add family member"
      );
    }
  };

  const handleDeleteFamilyMember = async (memberId) => {
    if (
      !window.confirm("Are you sure you want to remove this family member?")
    ) {
      return;
    }

    try {
      await familyApi.deleteFamilyMember(memberId);
      setFamilyMembers((prev) =>
        prev.filter((member) => member.id !== memberId)
      );
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to delete family member"
      );
    }
  };

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
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Family Members</h2>
        <Button
          onClick={() => setIsAddFamilyMemberModalOpen(true)}
          disabled={isLoading}
        >
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
              <CardDescription>
                View and manage family members associated with this lead.
              </CardDescription>
            </CardHeader>
            <CardContent>
              {familyMembers?.family_members?.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <p>No family members added yet.</p>
                  <Button
                    className="mt-4"
                    onClick={() => setIsAddFamilyMemberModalOpen(true)}
                  >
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
                    {familyMembers?.family_members?.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell className="font-medium">
                          {member.name}
                        </TableCell>
                        <TableCell>{member.relationship}</TableCell>
                        <TableCell>{member.age || "N/A"}</TableCell>
                        <TableCell>{member.occupation || "N/A"}</TableCell>
                        <TableCell>
                          {member.email || member.phone || "N/A"}
                        </TableCell>
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

          {/* {householdInfo && ( */}
          <Card>
            <CardHeader>
              <CardTitle>Household Information</CardTitle>
              <CardDescription>
                General information about the household.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-2">Household Size</h3>
                  <p>4 members</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Household Income</h3>
                  <p>$ 175000/ year</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Primary Residence</h3>
                  <p>Owned - Single Family Home</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">
                    Years at Current Address
                  </h3>
                  <p>8 years</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Marital Status</h3>
                  <p>Married</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Dependents</h3>
                  <p>2</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* )} */}
        </>
      )}

      <AddFamilyMemberModal
        isOpen={isAddFamilyMemberModalOpen}
        onClose={() => setIsAddFamilyMemberModalOpen(false)}
        onAddFamilyMember={handleAddFamilyMember}
      />
    </div>
  );
}
