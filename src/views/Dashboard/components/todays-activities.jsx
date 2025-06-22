import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Check, MessageSquare, Plus, Phone, Loader2 } from "lucide-react"
import { dashboardApi } from "@/services/dashboard-api"

/**
 * @typedef {Object} Activity
 * @property {string} id
 * @property {Object} user
 * @property {string} user.name
 * @property {string} [user.avatar]
 * @property {string} user.initials
 * @property {string} action
 * @property {string} time
 * @property {Object} [lead]
 * @property {string} lead.name
 * @property {string} [lead.note]
 * @property {"check" | "plus" | "message" | "phone"} icon
 */

export function TodaysActivities() {
  const [activities, setActivities] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    fetchTodaysActivities()
  }, [])

  const fetchTodaysActivities = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const data = await dashboardApi.getTodaysActivities(10)
      setActivities(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch activities")
    } finally {
      setIsLoading(false)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case "check":
        return <Check className="h-4 w-4 text-white" />
      case "plus":
        return <Plus className="h-4 w-4 text-white" />
      case "message":
        return <MessageSquare className="h-4 w-4 text-white" />
      case "phone":
        return <Phone className="h-4 w-4 text-white" />
    }
  }

  const getIconColor = (type) => {
    switch (type) {
      case "check":
        return "bg-blue-500"
      case "plus":
        return "bg-purple-500"
      case "message":
        return "bg-amber-500"
      case "phone":
        return "bg-green-500"
    }
  }

  const filteredActivities =
    filter === "my"
      ? activities.filter((activity) => activity.user.name === "Current User") // In real app, filter by current user
      : activities

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium">Today's Activities</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive">
            <AlertDescription className="flex items-center justify-between">
              {error}
              <Button variant="ghost" size="sm" onClick={fetchTodaysActivities}>
                Retry
              </Button>
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-base font-medium">Today's Activities</CardTitle>
        <div className="text-sm">
          <select
            className="text-sm border rounded px-2 py-1"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Users</option>
            <option value="my">My Activities</option>
          </select>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="h-6 w-6 animate-spin mr-2" />
            <span className="text-sm text-gray-500">Loading activities...</span>
          </div>
        ) : (
          <>
            <div className="space-y-4">
              {filteredActivities.map((activity) => (
                <div key={activity.id} className="flex">
                  <div className="mr-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={activity.user.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gray-200">{activity.user.initials}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{activity.user.name}</div>
                    <div className="text-sm text-gray-500">
                      {activity.action} <span className="font-medium text-gray-700">{activity.lead?.name}</span>
                    </div>
                    {activity.lead?.note && (
                      <div className="text-xs text-gray-500 mt-1 italic">"{activity.lead.note}"</div>
                    )}
                    <div className="text-xs text-gray-400 mt-1">{activity.time}</div>
                  </div>
                  <div
                    className={`h-6 w-6 rounded-full flex items-center justify-center ${getIconColor(activity.icon)}`}
                  >
                    {getIcon(activity.icon)}
                  </div>
                </div>
              ))}
            </div>

            {filteredActivities.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <p>No activities found</p>
              </div>
            )}

            <div className="flex items-center justify-center mt-4">
              <button
                className="text-sm text-blue-600 hover:underline"
                onClick={() => (window.location.href = "/activities")}
              >
                View all activity →
              </button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
