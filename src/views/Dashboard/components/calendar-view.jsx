import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function CalendarView() {
  const [viewMode, setViewMode] = useState("day")
  const [currentDate, setCurrentDate] = useState(new Date(2023, 5, 15)) // June 15, 2023

  // Sample events data
  const events = [
    {
      id: "1",
      title: "Team Meeting",
      time: "9:00 AM - 10:00 AM",
      type: "meeting",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: "2",
      title: "Follow-up: John Smith",
      time: "11:00 AM - 12:30 PM",
      type: "call",
      color: "bg-green-100 text-green-800",
    },
    {
      id: "3",
      title: "Campaign Review",
      time: "1:00 PM - 2:00 PM",
      type: "review",
      color: "bg-purple-100 text-purple-800",
    },
  ]

  // Generate calendar days
  const generateCalendarDays = () => {
    const days = []
    const date = new Date(currentDate)
    date.setDate(1)
    const month = date.getMonth()

    // Get the first day of the month
    const firstDay = date.getDay()

    // Add previous month's days
    const prevMonthDays = firstDay
    for (let i = prevMonthDays - 1; i >= 0; i--) {
      const prevDate = new Date(date)
      prevDate.setDate(0 - i)
      days.push({
        date: prevDate.getDate(),
        isCurrentMonth: false,
        isToday: false,
      })
    }

    // Add current month's days
    const daysInMonth = new Date(date.getFullYear(), month + 1, 0).getDate()
    for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(date.getFullYear(), month, i)
      days.push({
        date: i,
        isCurrentMonth: true,
        isToday: i === 15, // Assuming today is the 15th
      })
    }

    // Add next month's days to complete the grid
    const remainingDays = 42 - days.length
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        date: i,
        isCurrentMonth: false,
        isToday: false,
      })
    }

    return days
  }

  const calendarDays = generateCalendarDays()

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle>Calendar</CardTitle>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "day" && "bg-blue-100")}
            onClick={() => setViewMode("day")}
          >
            Day
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "week" && "bg-blue-100")}
            onClick={() => setViewMode("week")}
          >
            Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            className={cn(viewMode === "month" && "bg-blue-100")}
            onClick={() => setViewMode("month")}
          >
            Month
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <Button variant="ghost" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="text-lg font-medium">Tuesday, June 15, 2023</h3>
          <Button variant="ghost" size="icon">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {viewMode === "day" && (
          <div className="space-y-2">
            {events.map((event) => (
              <div key={event.id} className={cn("p-2 rounded-md", event.color || "bg-gray-100")}>
                <div className="flex justify-between">
                  <h4 className="font-medium">{event.title}</h4>
                  <span className="text-xs">
                    {event.type === "meeting" ? "Meeting" : event.type === "call" ? "Call" : "Review"}
                  </span>
                </div>
                <p className="text-xs">{event.time}</p>
              </div>
            ))}
          </div>
        )}

        {viewMode === "month" && (
          <div>
            <div className="grid grid-cols-7 text-center text-xs mb-2">
              <div>Su</div>
              <div>Mo</div>
              <div>Tu</div>
              <div>We</div>
              <div>Th</div>
              <div>Fr</div>
              <div>Sa</div>
            </div>
            <div className="grid grid-cols-7 gap-1">
              {calendarDays.map((day, index) => (
                <div
                  key={index}
                  className={cn(
                    "h-8 flex items-center justify-center text-sm rounded-md",
                    day.isToday && "bg-blue-100 font-bold",
                    !day.isCurrentMonth && "text-gray-400",
                  )}
                >
                  {day.date}
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-center justify-center mt-4">
          <Button variant="link" size="sm" className="text-blue-600">
            View full calendar
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
