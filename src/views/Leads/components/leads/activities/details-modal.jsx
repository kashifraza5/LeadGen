import * as React from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useIsMobile } from "@/components/ui/use-mobile"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Calendar,
  Flag,
  ListChecks,
  Mail,
  Tag,
  User,
} from "lucide-react"

export function ActivityDetailsModal({ activity, isOpen, onClose }) {
  const isMobile = useIsMobile()
  const [comment, setComment] = React.useState("")

  if (!activity) {
    return null
  }

  const title = activity.title
  const status = activity.status || "Unknown"
  const assignees = activity.assignedAdvisors || []
  const startDate = activity.startDateTime
    ? new Date(activity.startDateTime).toLocaleDateString()
    : "Not set"
  const dueDate = activity.dueDateTime
    ? new Date(activity.dueDateTime).toLocaleDateString()
    : "Not set"
  const priority = activity.priority || "Empty"
  const description = activity.description || "No description provided."
  const type = activity.type || "Task"
  const email =
    assignees.length > 0
      ? assignees[0].email || "no-email@example.com"
      : "N/A"

  const content = (
    <div className="h-full">
      <div className="flex flex-col h-full">
        {/* Header */}
        <DialogHeader className="p-2 bg-gray-200 h-14">
          <DialogTitle className="text-xl font-semibold items-center ml-2">
            {title}
          </DialogTitle>
        </DialogHeader>

        {/* Body */}
        <div className="grid flex-1 grid-cols-1 md:grid-cols-3 gap-6 p-4">
          {/* Left panel */}
          <div className="md:col-span-2 h-full">
            <div className=" grid grid-cols-2 h-[280px]">
              <div className="flex items-center">
                <User className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-base text-muted-foreground font-semibold">
                  Advisor
                </span>
                <span>{assignees.map((a) => a.name).join(", ")}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-sm text-muted-foreground">
                  Email
                </span>
                <span>{email}</span>
              </div>
              <div className="flex items-center">
                <ListChecks className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-sm text-muted-foreground">
                  Status
                </span>
                <Badge variant="outline" className="capitalize">
                  {status}
                </Badge>
              </div>
              <div className="flex items-center">
                <Flag className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-sm text-muted-foreground">
                  Priority
                </span>
                <Badge variant="secondary">{priority}</Badge>
              </div>
              <div className="flex items-center">
                <Tag className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-muted-foreground text-sm">
                  Type
                </span>
                <span>{type}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-sm text-muted-foreground">
                  Start Date
                </span>
                <span>{startDate}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-3 text-gray-500" />
                <span className="w-24 text-sm text-muted-foreground">
                  End Date
                </span>
                <span>{dueDate}</span>
              </div>
            </div>

            {/* Description */}
            <div className="!mt-4 h-full">
              <h3 className="text-lg font-semibold mb-2">Lead</h3>
              <div className="p-4 border rounded-md bg-gray-50 min-h-[150px]">
                {description}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="md:col-span-1 flex flex-col h-full justify-between border-l w-full bg-gray-50 ">
            <div className="">
             <div className="bg-gray-200 p-2">
             <h3 className="text-lg font-semibold mb-2">Activity</h3>
             </div>
              <div className="text-sm text-gray-600 space-y-3">
                {/* <div>
                  <div>You changed status from</div>
                  <div className="flex items-center gap-1">
                    <span className="text-teal-500 font-medium">In Progress</span>
                    <span className="text-gray-500">→</span>
                    <span className="text-pink-500 font-medium">Dev Testing</span>
                  </div>
                  <div className="text-xs text-muted-foreground">May 9 at 6:32 pm</div>
                </div> */}
              </div>
            </div>

            {/* Comment input */}
            <div className="mt-4 flex items-center rounded-md border !w-full">
              <Input
                placeholder="Write a comment..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="flex-1 resize-none border-none shadow-none focus-visible:ring-0"
              />
              <Button className="ml-2">Send</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
          </DrawerHeader>
          {content}
        </DrawerContent>
      </Drawer>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[1300px] p-0 h-[60vh]">{content}</DialogContent>
    </Dialog>
  )
}
