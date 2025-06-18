
import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
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
import { Calendar, Clock, MoreVertical, Plus, Search, Phone, Video, CheckSquare, AlertCircle, X } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useActivitiesStore } from "@/store/activities-store"
import type { Activity, CreateActivityData } from "@/types/activity"

// Activity Card Component
function ActivityCard({
  activity,
  onEdit,
  onDelete,
}: {
  activity: Activity
  onEdit: (activity: Activity) => void
  onDelete: (activityId: string) => void
}) {
  const [isDragging, setIsDragging] = useState(false)
  const { updateActivityStatus } = useActivitiesStore()

  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData("text/plain", activity.id)
    setIsDragging(true)
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const getTypeIcon = () => {
    switch (activity.type) {
      case "Meeting":
        return <Video className="h-4 w-4 text-purple-600" />
      case "Call":
        return <Phone className="h-4 w-4 text-blue-600" />
      case "Task":
        return <CheckSquare className="h-4 w-4 text-green-600" />
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
    }
  }

  const isOverdue = new Date(activity.endDateTime) < new Date() && activity.status !== "completed"

  return (
    <Card
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`mb-3 cursor-move transition-all hover:shadow-md ${
        isDragging ? "opacity-50 rotate-2" : ""
      } ${isOverdue ? "border-red-300 bg-red-50" : ""}`}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center gap-2">
            {getTypeIcon()}
            <h4 className="font-medium text-sm">{activity.title}</h4>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="outline" className={`text-xs ${getPriorityColor()}`}>
              {activity.priority}
            </Badge>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-6 w-6">
                  <MoreVertical className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onEdit(activity)}>Edit</DropdownMenuItem>
                <DropdownMenuItem onClick={() => onDelete(activity.id)} className="text-red-600">
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <p className="text-xs text-gray-600 mb-3">{activity.description}</p>

        <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(activity.startDateTime).toLocaleDateString()}
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {new Date(activity.startDateTime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
          </div>
        </div>

        {activity.assignedAdvisors.length > 0 && (
          <div className="flex items-center gap-1">
            {activity.assignedAdvisors.slice(0, 3).map((advisor) => (
              <Avatar key={advisor.id} className="h-6 w-6">
                <AvatarFallback className="text-xs bg-blue-100 text-blue-600">{advisor.initials}</AvatarFallback>
              </Avatar>
            ))}
            {activity.assignedAdvisors.length > 3 && (
              <span className="text-xs text-gray-500">+{activity.assignedAdvisors.length - 3}</span>
            )}
          </div>
        )}

        {isOverdue && (
          <div className="flex items-center gap-1 mt-2 text-red-600">
            <AlertCircle className="h-3 w-3" />
            <span className="text-xs">Overdue</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Kanban Column Component
function KanbanColumn({
  column,
  onAddActivity,
}: {
  column: any
  onAddActivity: (status: Activity["status"]) => void
}) {
  const { updateActivityStatus } = useActivitiesStore()
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = () => {
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const activityId = e.dataTransfer.getData("text/plain")
    if (activityId) {
      updateActivityStatus(activityId, column.status)
    }
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
        {column.activities.map((activity: Activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onEdit={() => {}} // Will implement edit functionality
            onDelete={() => {}} // Will implement delete functionality
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
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  defaultStatus?: Activity["status"]
}) {
  const { createActivity, advisors, fetchAdvisors, isCreating } = useActivitiesStore()
  const [formData, setFormData] = useState<Partial<CreateActivityData>>({
    type: "Task",
    priority: "medium",
    assignedAdvisorIds: [],
    sharedWithIds: [],
  })

  useEffect(() => {
    if (open) {
      fetchAdvisors()
    }
  }, [open, fetchAdvisors])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.title || !formData.startDateTime || !formData.endDateTime) {
      return
    }

    try {
      await createActivity("dummy-lead-id", {
        type: formData.type!,
        category: formData.category || "General",
        title: formData.title,
        description: formData.description || "",
        assignedAdvisorIds: formData.assignedAdvisorIds || [],
        sharedWithIds: formData.sharedWithIds || [],
        priority: formData.priority!,
        startDateTime: formData.startDateTime,
        endDateTime: formData.endDateTime,
        location: formData.location,
        notes: formData.notes,
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
                onValueChange={(value) => setFormData((prev) => ({ ...prev, type: value as Activity["type"] }))}
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
                onValueChange={(value) => setFormData((prev) => ({ ...prev, priority: value as Activity["priority"] }))}
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
              {advisors.map((advisor) => (
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
              ))}
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
  const { columns, isLoading, error, fetchActivities, clearError } = useActivitiesStore()

  const [searchQuery, setSearchQuery] = useState("")
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [defaultStatus, setDefaultStatus] = useState<Activity["status"] | undefined>()

  useEffect(() => {
    fetchActivities("dummy-lead-id") // Replace with actual lead ID
  }, [fetchActivities])

  const handleAddActivity = (status: Activity["status"]) => {
    setDefaultStatus(status)
    setIsAddModalOpen(true)
  }

  const filteredColumns = columns.map((column) => ({
    ...column,
    activities: column.activities.filter(
      (activity) =>
        activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        activity.description.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

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
          <KanbanColumn key={column.id} column={column} onAddActivity={handleAddActivity} />
        ))}
      </div>

      {/* Add Activity Modal */}
      <AddActivityModal open={isAddModalOpen} onOpenChange={setIsAddModalOpen} defaultStatus={defaultStatus} />
    </div>
  )
}
