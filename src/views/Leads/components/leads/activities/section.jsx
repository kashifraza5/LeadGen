import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import  Checkbox  from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert" 
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar, Clock, MoreVertical, Plus, Search, Phone, Video, CheckSquare, AlertCircle, X, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useParams } from "react-router-dom"
import api from "../../../../../services/api"
import { getLeadActivities } from "@/services/LeadService"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { ActivityDetailsModal } from "./details-modal"

// Activity Card Component
function ActivityCard({
  activity,
  onClick,
}) {
  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = (e) => {
    e.dataTransfer.setData("text/plain", activity.id)
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getStatusColor = () => {
    switch (activity.status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "to-do":
        return "bg-gray-100 text-gray-800 border-gray-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getTypeColor = () => {
    switch (activity.type) {
      case "meeting":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "call":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "task":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getPriorityColor = () => {
    switch (activity.priority) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200"
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "low":
        return "bg-green-100 text-green-800 border-green-200"
      default:
        return "text-gray-500"
    }
  }

  const isOverdue = new Date(activity.endDateTime) < new Date() && activity.status !== "completed"

  return (
    <Card
      onClick={onClick}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`mb-3 cursor-pointer transition-all hover:shadow-md ${
        isDragging ? "opacity-50 rotate-2" : ""
      } ${isOverdue ? "border-red-300 bg-red-50" : ""}`}
    >
    <CardContent className="p-4 flex flex-col justify-between h-full">
  {/* Header with Status, Type, and Priority */}
  <div className="flex items-center justify-between mb-3">
    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-medium text-gray-600">Status</h3>
        <Badge variant="outline" className={`text-xs ${getStatusColor()}`}>
          {activity.status.charAt(0).toUpperCase() + activity.status.slice(1)}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-medium text-gray-600">Type</h3>
        <Badge variant="outline" className={`text-xs ${getTypeColor()}`}>
          {activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
        </Badge>
      </div>
      <div className="flex items-center gap-2">
        <h3 className="text-xs font-medium text-gray-600">Priority</h3>
        <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
          {activity.priority}
        </Badge>
      </div>
    </div>

  </div>

  {/* Title */}
  <h4 className="font-medium text-sm mb-3 text-gray-800">{activity.title}</h4>

  {/* Date and Time Information */}
  <div className=" flex justify-between">
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <Calendar className="h-3 w-3" />
      <span>Start: {new Date(activity.startDateTime).toLocaleDateString()}</span>
    </div>
    <div className="flex items-center gap-2 text-xs text-gray-600">
      <Clock className="h-3 w-3" />
      <span>End: {new Date(activity.endDateTime).toLocaleDateString()}</span>
    </div>
  </div>

  {/* Overdue Warning */}
 <div className="flex justify-between gap-2 mt-2">
 {isOverdue && (
    <div className="flex items-center gap-1 mt-2 text-red-600">
      <AlertCircle className="h-3 w-3" />
      <span className="text-xs">Overdue</span>
    </div>
  )}

{activity.assignedAdvisors?.length > 0 && (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="cursor-pointer mt-2">
              <User className="h-5 w-5 text-gray-600" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>{activity.assignedAdvisors[0].name}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )}
 </div>
</CardContent>

    </Card>
  )
}

// Kanban Column Component
function KanbanColumn({
  column,
  onAddActivity,
  onCardClick,
}) {
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const activityId = e.dataTransfer.getData("text/plain")
    // Handle status update logic here if needed
  }

  return (
    <div className="flex-1 min-w-[280px]">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-gray-900">{column.title}</h3>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="text-xs">
              {column.activities.length}
            </Badge>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => onAddActivity(column.status)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`min-h-[400px] p-3 rounded-lg border-2 border-dashed transition-colors ${
          isDragOver ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-gray-50"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {column.activities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onClick={() => onCardClick(activity)}
          />
        ))}

        {column.activities.length === 0 && (
          <div className="text-center text-gray-400 mt-8">
            <div className="text-sm">No activities</div>
            <Button variant="ghost" size="sm" className="mt-2" onClick={() => onAddActivity(column.status)}>
              <Plus className="h-4 w-4 mr-1" />
              Add Activity
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

// Add Activity Modal
function AddActivityModal({
  open,
  onOpenChange,
  defaultStatus,
  onCreateActivity,
}) {
  const [formData, setFormData] = useState({
    type: "Task",
    priority: "medium",
    assignedAdvisorIds: [],
    sharedWithIds: [],
  })
  const [isCreating, setIsCreating] = useState(false)
  const [advisors, setAdvisors] = useState([])

  const fetchAdvisors = async () => {
    try {
      // You can add an API call here to fetch advisors if needed
      setAdvisors([])
    } catch (error) {
      console.error("Failed to fetch advisors:", error)
    }
  }

  useEffect(() => {
    if (open) {
      fetchAdvisors()
    }
  }, [open])
 
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.title || !formData.startDateTime || !formData.endDateTime) {
      return
    }

    setIsCreating(true)
    try {
      await onCreateActivity({
        ...formData,
        status: defaultStatus
      })
      
      onOpenChange(false)
      setFormData({
        type: "Task",
        priority: "medium",
        assignedAdvisorIds: [],
        sharedWithIds: [],
      })
    } catch (error) {
      console.error("Failed to create activity:", error)
    } finally {
      setIsCreating(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Activity</DialogTitle>
          <DialogDescription>Create a new activity for this lead.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="type">Type</Label>
              <Select
                value={formData.type}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Meeting">Meeting</SelectItem>
                  <SelectItem value="Call">Call</SelectItem>
                  <SelectItem value="Task">Task</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="priority">Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={formData.title || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
              placeholder="Activity title"
              required
            />
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <Input
              id="category"
              value={formData.category || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
              placeholder="e.g. Initial Consultation, Follow-up"
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description || ""}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              placeholder="Activity description"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDateTime">Start Date & Time</Label>
              <Input
                id="startDateTime"
                type="datetime-local"
                value={formData.startDateTime || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, startDateTime: e.target.value }))}
                required
              />
            </div>

            <div>
              <Label htmlFor="endDateTime">End Date & Time</Label>
              <Input
                id="endDateTime"
                type="datetime-local"
                value={formData.endDateTime || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, endDateTime: e.target.value }))}
                required
              />
            </div>
          </div>

          {formData.type === "Meeting" && (
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={formData.location || ""}
                onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="Meeting location"
              />
            </div>
          )}

          <div>
            <Label>Assigned Advisors</Label>
            <div className="border rounded-md p-3 mt-1 space-y-2 max-h-32 overflow-y-auto">
              {advisors.length > 0 ? (
                advisors.map((advisor) => (
                  <div key={advisor.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`advisor-${advisor.id}`}
                      checked={formData.assignedAdvisorIds?.includes(advisor.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setFormData((prev) => ({
                            ...prev,
                            assignedAdvisorIds: [...(prev.assignedAdvisorIds || []), advisor.id],
                          }))
                        } else {
                          setFormData((prev) => ({
                            ...prev,
                            assignedAdvisorIds: prev.assignedAdvisorIds?.filter((id) => id !== advisor.id),
                          }))
                        }
                      }}
                    />
                    <Label htmlFor={`advisor-${advisor.id}`} className="flex items-center">
                      <Avatar className="h-6 w-6 mr-2">
                        <AvatarFallback className="text-xs bg-blue-100 text-blue-600">{advisor.initials}</AvatarFallback>
                      </Avatar>
                      <span>{advisor.name}</span>
                    </Label>
                  </div>
                ))
              ) : (
                <div className="text-gray-500 text-sm">No advisors available</div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating ? "Creating..." : "Create Activity"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

// Main Activities Section component
export function Section() {
  const params = useParams()
  const leadId = params?.id

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [defaultStatus, setDefaultStatus] = useState()
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [columns, setColumns] = useState([
    {
      id: "todo",
      title: "To Do",
      status: "to-do",
      activities: []
    },
    {
      id: "in-progress",
      title: "In Progress", 
      status: "in-progress",
      activities: []
    },
    {
      id: "completed",
      title: "Completed",
      status: "completed", 
      activities: []
    }
  ])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedActivity, setSelectedActivity] = useState(null)



  const fetchActivities = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await getLeadActivities(leadId)
      
      // Handle the API response array
      const activitiesData = response.data
      console.log(activitiesData)
      
      if (!activitiesData || !Array.isArray(activitiesData)) {
        console.log("No activities data received or invalid format")
        setError("No activities found")
        return
      }

      // Map the API response data to the expected format
      const mappedActivities = activitiesData.map((activity) => {
        return {
          id: activity.id,
          type: activity.activity_type || "Task",
          category: activity.category || "",
          title: activity.subject || "Untitled Activity",
          description: activity.description || "",
          assignedAdvisors: activity.advisor ? [{
            id: activity.advisor.id,
            name: activity.advisor.name || "Unknown",
            email: activity.advisor.email || "",
            initials: activity.advisor.name ? activity.advisor.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U"
          }] : [],
          status: activity.status || "to-do",
          priority: activity.priority || "medium",
          startDateTime: activity.start_date_time || new Date().toISOString(),
          endDateTime: activity.end_date_time || new Date().toISOString(),
          createdAt: activity.created_at || new Date().toISOString(),
          updatedAt: activity.updated_at || new Date().toISOString(),
          leadId: activity.lead?.id || leadId,
          location: activity.location || "",
          tags: activity.tags || [],
          source: activity.source || "",
          lastContactDate: activity.last_contact_date || null,
          completion: activity.completion || 0
        }
      })

      // Organize activities into columns based on status
      const updatedColumns = columns.map(column => ({
        ...column,
        activities: mappedActivities.filter(activity => activity.status === column.status)
      }))

      setColumns(updatedColumns)
      setActivities(mappedActivities)
      
      if (mappedActivities.length === 0) {
        setError("No activities found")
      } else {
        setError(null)
      }
    } catch (error) {
      console.error("Failed to fetch activities:", error)
      setError("Failed to load activities")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (leadId) {
      fetchActivities()
    }

  }, [leadId])

  const handleAddActivity = (status) => {
    setDefaultStatus(status)
    setIsAddModalOpen(true)
  }

  const createActivity = async (activityData) => {
    try {
      // Format the data for the API
      const apiData = {
        activity_type: activityData.type,
        category: activityData.category,
        subject: activityData.title,
        description: activityData.description,
        status: activityData.status || defaultStatus || "to-do",
        priority: activityData.priority,
        start_date_time: activityData.startDateTime,
        end_date_time: activityData.endDateTime,
        location: activityData.location,
        assigned_advisor_ids: activityData.assignedAdvisorIds,
        shared_with_ids: activityData.sharedWithIds,
        lead_id: leadId
      }

      const response = await api.post(`/lead/${leadId}/activities/`, apiData)
      
      // Map the response to the expected format
      const newActivity = {
        id: response.data.id,
        type: response.data.activity_type || "Task",
        category: response.data.category || "",
        title: response.data.subject || "Untitled Activity",
        description: response.data.description || "",
        assignedAdvisors: response.data.advisor ? [{
          id: response.data.advisor.id,
          name: response.data.advisor.name || "Unknown",
          email: response.data.advisor.email || "",
          initials: response.data.advisor.name ? response.data.advisor.name.split(' ').map(n => n[0]).join('').toUpperCase() : "U"
        }] : [],
        status: response.data.status || "to-do",
        priority: response.data.priority || "medium",
        startDateTime: response.data.start_date_time || new Date().toISOString(),
        endDateTime: response.data.end_date_time || new Date().toISOString(),
        createdAt: response.data.created_at || new Date().toISOString(),
        updatedAt: response.data.updated_at || new Date().toISOString(),
        leadId: response.data.lead?.id || leadId,
        location: response.data.location || "",
        tags: response.data.tags || [],
        source: response.data.source || "",
        lastContactDate: response.data.last_contact_date || null,
        completion: response.data.completion || 0
      }

      // Update columns to include the new activity
      setColumns(prevColumns => 
        prevColumns.map(column => ({
          ...column,
          activities: column.status === newActivity.status 
            ? [...column.activities, newActivity]
            : column.activities
        }))
      )

      return newActivity
    } catch (error) {
      console.error("Failed to create activity:", error)
      throw error
    }
  }

  const clearError = () => {
    setError(null)
  }

  const filteredColumns = columns.map((column) => ({
    ...column,
    activities: column.activities.filter(
      (activity) =>
        activity.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description?.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  const handleCardClick = (activity) => {
    setSelectedActivity(activity)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedActivity(null)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-500">Loading activities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative w-full sm:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search activities..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={() => setIsAddModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Activity
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={clearError}>
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Kanban Board */}
      <div className="flex gap-6 overflow-x-auto pb-4">
        {filteredColumns.map((column) => (
          <KanbanColumn 
            key={column.id} 
            column={column} 
            onAddActivity={handleAddActivity}
            onCardClick={handleCardClick}
          />
        ))}
      </div>

      {/* Add Activity Modal */}
      <AddActivityModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} defaultStatus={defaultStatus} onCreateActivity={createActivity} />

      <ActivityDetailsModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        activity={selectedActivity}
      />
    </div>
  )
}
