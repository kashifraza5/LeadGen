import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  Mail,
  MessageSquare,
  Search,
  Filter,
  Send,
  Paperclip,
  MoreVertical,
  Target,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Reply,
  Forward,
  Archive,
  Loader2,
} from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { fetchMessages } from "@/views/Leads/store/dataSlice"
// import { useConversationsStore } from "@/store/conversations-store"
import { useParams } from "react-router-dom"
import reducer from "@/store/index"
export function ConversationsTab() {
  // const { messages, selectedMessage, isLoading, error, fetchMessages, selectMessage, sendMessage, clearError } =
  //   useConversationsStore()
  const params = useParams()
  const leadId = params?.id || 2
  console.log("🚀 ~ leadId:", leadId)
  const dispatch = useDispatch()
  const leadsState = useSelector((state) => state.leads) || {};
  const messages = leadsState?.data?.messages?.results || leadsState?.data?.messages || [];
  const isLoading = leadsState?.data?.isLoading || false;
  const [searchTerm, setSearchTerm] = useState("")
  const [filterType, setFilterType] = useState("all")
  const [filterAdvisor, setFilterAdvisor] = useState("all")
  const [filterCampaign, setFilterCampaign] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [showFilters, setShowFilters] = useState(false)
  const [composeType, setComposeType] = useState("email")
  const [composeSubject, setComposeSubject] = useState("")
  const [composeContent, setComposeContent] = useState("")
  const [selectedCampaign, setSelectedCampaign] = useState("")
  const [showCompose, setShowCompose] = useState(false)
  const [selectedMessage, setSelectedMessage] = useState(null)

  useEffect(() => {
    dispatch(fetchMessages(leadId))
  }, [leadId, dispatch])

  // Map API response to expected format
  const mappedMessages = messages.map((message) => ({
    id: message.id,
    type: message.type,
    subject: message.subject || `${message.type.toUpperCase()} Message`,
    content: message.content || message.subject || "",
    direction: "outbound", // Assuming all messages are outbound for now
    status: message.sending_status || "sent",
    timestamp: message.created_at,
    advisor: {
      id: message.sender?.id || "unknown",
      name: message.sender?.name || "Unknown Advisor",
      avatar: null,
      role: message.sender?.role || "employee"
    },
    campaign: message.campaign ? {
      id: message.campaign.id,
      name: message.campaign.name,
      type: message.campaign.type
    } : null,
    attachments: [],
    deliveryInfo: {
      sentAt: message.created_at,
      deliveredAt: message.updated_at,
      readAt: null
    }
  }))

  // Filter messages based on current filters
  const filteredMessages = mappedMessages.filter((message) => {
    const matchesSearch =
      message.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === "all" || message.type === filterType
    const matchesAdvisor = filterAdvisor === "all" || message.advisor.id === filterAdvisor
    const matchesCampaign = filterCampaign === "all" || message.campaign?.id === filterCampaign
    const matchesStatus = filterStatus === "all" || message.status === filterStatus

    return matchesSearch && matchesType && matchesAdvisor && matchesCampaign && matchesStatus
  })

  const getStatusIcon = (status) => {
    switch (status) {
      case "sent":
        return <Clock className="h-3 w-3" />
      case "delivered":
        return <CheckCircle className="h-3 w-3" />
      case "read":
        return <CheckCircle className="h-3 w-3 text-green-500" />
      case "failed":
        return <XCircle className="h-3 w-3 text-red-500" />
      case "queued":
        return <Clock className="h-3 w-3 text-yellow-500" />
      default:
        return <AlertCircle className="h-3 w-3" />
    }
  }

  const getTypeIcon = (type) => {
    return type === "email" ? <Mail className="h-4 w-4" /> : <MessageSquare className="h-4 w-4" />
  }

  const handleSendMessage = async () => {
    if (!composeContent.trim()) return

    const messageData = {
      type: composeType,
      subject: composeType === "email" ? composeSubject : "",
      content: composeContent,
      campaignId: selectedCampaign || undefined,
    }

    // TODO: Implement sendMessage function
    console.log("Sending message:", messageData)

    // Reset form
    setComposeContent("")
    setComposeSubject("")
    setSelectedCampaign("")
    setShowCompose(false)
  }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60)

    if (diffInHours < 24) {
      return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    } else if (diffInHours < 168) {
      // 7 days
      return date.toLocaleDateString([], { weekday: "short", hour: "2-digit", minute: "2-digit" })
    } else {
      return date.toLocaleDateString([], { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })
    }
  }

  const selectMessage = (message) => {
    setSelectedMessage(message)
  }

  const clearError = () => {
    // TODO: Implement clear error function
    console.log("Clearing error")
  }
if (isLoading) {
  return (
    <div className="flex  items-center justify-center h-full">
      <div className="text-center ">
        <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
        <p className="text-gray-600 text-lg font-medium">Loading messages...</p>
      </div>
    </div>
  )
}
  return (
    <div className="flex flex-col h-[calc(100vh-12rem)]">
      {/* {error && ( */}
        <Alert className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="flex justify-between items-center">
            {/* {error} */}
            <Button variant="ghost" size="sm" onClick={clearError}>
              Dismiss
            </Button>
          </AlertDescription>
        </Alert>
      {/* )} */}

      <div className="flex border rounded-lg overflow-hidden flex-1">
        {/* Left Panel - Messages List */}
        <div className="w-1/2 border-r flex flex-col">
          {/* Header */}
          <div className="p-4 border-b bg-gray-50">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Messages</h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" onClick={() => setShowCompose(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  New Message
                </Button>
                <Button variant="ghost" size="icon" onClick={() => setShowFilters(!showFilters)}>
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            {showFilters && (
              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-2 gap-3">
                  <Select value={filterType} onValueChange={(value) => setFilterType(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="sent">Sent</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="queued">Queued</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <Select value={filterAdvisor} onValueChange={setFilterAdvisor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Advisor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Advisors</SelectItem>
                      <SelectItem value="44">Jason Xu</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={filterCampaign} onValueChange={setFilterCampaign}>
                    <SelectTrigger>
                      <SelectValue placeholder="Campaign" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Campaigns</SelectItem>
                      <SelectItem value="camp6">Jason's Smartvestor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setFilterType("all")
                      setFilterAdvisor("all")
                      setFilterCampaign("all")
                      setFilterStatus("all")
                    }}
                  >
                    Reset
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Messages List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">No messages found</div>
            ) : (
              filteredMessages.map((message) => (
                <div
                  key={message.id}
                  className={`p-4 border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                    selectedMessage?.id === message.id ? "bg-blue-50 border-blue-200" : ""
                  }`}
                  onClick={() => selectMessage(message)}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        message.type === "email" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                      }`}
                    >
                      {getTypeIcon(message.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-1">
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm">
                            {message.direction === "outbound" ? "To Lead" : "From Lead"}
                          </span>
                          {getStatusIcon(message.status)}
                        </div>
                        <span className="text-xs text-gray-500">{formatTimestamp(message.timestamp)}</span>
                      </div>

                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="h-5 w-5">
                          <AvatarImage src={message.advisor.avatar || "/placeholder.svg"} />
                          <AvatarFallback className="text-xs">
                            {message.advisor.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-xs text-gray-600">{message.advisor.name}</span>
                        {message.campaign && (
                          <Badge variant="outline" className="text-xs">
                            <Target className="h-3 w-3 mr-1" />
                            {message.campaign.name}
                          </Badge>
                        )}
                      </div>

                      <div className="text-sm font-medium truncate mb-1">
                        {message.subject || `${message.type.toUpperCase()} Message`}
                      </div>
                      <div className="text-sm text-gray-600 truncate">
                        {message.type === "email" 
                          ? message.content.replace(/<[^>]*>/g, '').substring(0, 100) + "..."
                          : message.content || message.subject
                        }
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="flex-1 flex flex-col">
          {selectedMessage ? (
            <>
              <div className="p-4 border-b bg-gray-50">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-full ${
                        selectedMessage.type === "email" ? "bg-blue-100 text-blue-600" : "bg-green-100 text-green-600"
                      }`}
                    >
                      {getTypeIcon(selectedMessage.type)}
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {selectedMessage.subject || `${selectedMessage.type.toUpperCase()} Message`}
                      </h3>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <span>{selectedMessage.direction === "outbound" ? "To Lead" : "From Lead"}</span>
                        <span>•</span>
                        <span>{formatTimestamp(selectedMessage.timestamp)}</span>
                        <div className="flex items-center gap-1">
                          {getStatusIcon(selectedMessage.status)}
                          <span className="capitalize">{selectedMessage.status}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Reply className="h-4 w-4 mr-2" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Forward className="h-4 w-4 mr-2" />
                        Forward
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="h-4 w-4 mr-2" />
                        Archive
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Advisor:</span>
                    <div className="flex items-center gap-2 mt-1">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={selectedMessage.advisor.avatar || "/placeholder.svg"} />
                        <AvatarFallback className="text-xs">
                          {selectedMessage.advisor.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span>{selectedMessage.advisor.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {selectedMessage.advisor.role}
                      </Badge>
                    </div>
                  </div>

                  {selectedMessage.campaign && (
                    <div>
                      <span className="font-medium">Campaign:</span>
                      <div className="flex items-center gap-2 mt-1">
                        <Target className="h-4 w-4 text-blue-600" />
                        <span>{selectedMessage.campaign.name}</span>
                        <Badge variant="outline" className="text-xs">
                          {selectedMessage.campaign.type}
                        </Badge>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex-1 p-4 overflow-y-auto">
                <Card>
                  <CardContent className="p-4">
                    {selectedMessage.type === "email" ? (
                      <div className="prose max-w-none" dangerouslySetInnerHTML={{ __html: selectedMessage.content }} />
                    ) : (
                      <div className="whitespace-pre-wrap text-sm">{selectedMessage.content}</div>
                    )}

                    {selectedMessage.attachments && selectedMessage.attachments.length > 0 && (
                      <div className="mt-4 pt-4 border-t">
                        <h4 className="font-medium mb-2">Attachments</h4>
                        <div className="space-y-2">
                          {selectedMessage.attachments.map((attachment, index) => (
                            <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                              <Paperclip className="h-4 w-4" />
                              <span className="text-sm">{attachment.name}</span>
                              <span className="text-xs text-gray-500">({attachment.size})</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {selectedMessage.deliveryInfo && (
                  <Card className="mt-4">
                    <CardHeader>
                      <CardTitle className="text-sm">Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-2">
                      <div className="flex justify-between">
                        <span>Sent:</span>
                        <span>{formatTimestamp(selectedMessage.deliveryInfo.sentAt)}</span>
                      </div>
                      {selectedMessage.deliveryInfo.deliveredAt && (
                        <div className="flex justify-between">
                          <span>Delivered:</span>
                          <span>{formatTimestamp(selectedMessage.deliveryInfo.deliveredAt)}</span>
                        </div>
                      )}
                      {selectedMessage.deliveryInfo.readAt && (
                        <div className="flex justify-between">
                          <span>Read:</span>
                          <span>{formatTimestamp(selectedMessage.deliveryInfo.readAt)}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>

              <div className="p-4 border-t bg-gray-50">
                <Button variant="outline" className="w-full">
                  <Reply className="h-4 w-4 mr-2" />
                  Quick Reply
                </Button>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              <div className="text-center">
                <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-medium mb-2">Select a message</p>
                <p className="text-sm">Choose a message from the list to view its details</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {showCompose && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Compose Message</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Tabs value={composeType} onValueChange={(value) => setComposeType(value)}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="email">
                    <Mail className="h-4 w-4 mr-2" />
                    Email
                  </TabsTrigger>
                  <TabsTrigger value="sms">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    SMS
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="email" className="space-y-4">
                  <Input
                    placeholder="Subject"
                    value={composeSubject}
                    onChange={(e) => setComposeSubject(e.target.value)}
                  />
                  <Textarea
                    placeholder="Email content..."
                    value={composeContent}
                    onChange={(e) => setComposeContent(e.target.value)}
                    rows={8}
                  />
                </TabsContent>

                <TabsContent value="sms" className="space-y-4">
                  <Textarea
                    placeholder="SMS message..."
                    value={composeContent}
                    onChange={(e) => setComposeContent(e.target.value)}
                    rows={4}
                    maxLength={160}
                  />
                  <div className="text-right text-sm text-gray-500">{composeContent.length}/160 characters</div>
                </TabsContent>
              </Tabs>

              <Select value={selectedCampaign} onValueChange={setSelectedCampaign}>
                <SelectTrigger>
                  <SelectValue placeholder="Link to campaign (optional)" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Campaign</SelectItem>
                  <SelectItem value="1">Retirement Planning</SelectItem>
                  <SelectItem value="2">Investment Options</SelectItem>
                  <SelectItem value="3">Tax Planning</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowCompose(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage} disabled={!composeContent.trim()}>
                  <Send className="h-4 w-4 mr-2" />
                  Send {composeType === "email" ? "Email" : "SMS"}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}
