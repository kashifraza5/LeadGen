"use client"

import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Bell,
  Mail,
  MessageSquare,
  Smartphone,
  FileText,
  CheckCircle,
  XCircle,
  Download,
  Eye,
  BarChart4,
} from "lucide-react"

export default function NotificationsPage() {
  const [emailEnabled, setEmailEnabled] = useState(true)
  const [smsEnabled, setSmsEnabled] = useState(true)
  const [inAppEnabled, setInAppEnabled] = useState(true)
  const [pushEnabled, setPushEnabled] = useState(false)

  // Notification category states
  const [leadNotifications, setLeadNotifications] = useState(true)
  const [campaignNotifications, setCampaignNotifications] = useState(true)
  const [systemNotifications, setSystemNotifications] = useState(true)
  const [teamNotifications, setTeamNotifications] = useState(true)
  const [clientNotifications, setClientNotifications] = useState(true)

  return (
      <div className="flex flex-col space-y-6 p-6 w-[calc(100vw-200px)]">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Notification Settings</h1>
            <p className="text-muted-foreground">Manage how and when your company receives notifications.</p>
          </div>
          <Button>Save Changes</Button>
        </div>

        {/* Notification Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Notifications</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">Across all channels</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sent Today</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">145</div>
              <p className="text-xs text-muted-foreground">+12% from yesterday</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Rate</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">68%</div>
              <p className="text-xs text-muted-foreground">+5% from last week</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Click Rate</CardTitle>
              <BarChart4 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24%</div>
              <p className="text-xs text-muted-foreground">+2% from last week</p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="channels" className="w-full">
          <TabsList className="grid grid-cols-5 w-full max-w-3xl">
            <TabsTrigger value="channels">Channels</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="settings">Advanced</TabsTrigger>
          </TabsList>

          {/* Notification Channels Tab */}
          <TabsContent value="channels" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Configure how email notifications are sent to your team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via email to team members</p>
                  </div>
                  <Switch checked={emailEnabled} onCheckedChange={setEmailEnabled} />
                </div>

                <div className="space-y-2">
                  <Label>Email Sender Name</Label>
                  <Input defaultValue="Acme Financial CRM" />
                </div>

                <div className="space-y-2">
                  <Label>Reply-To Email</Label>
                  <Input defaultValue="notifications@acmefinancial.com" />
                </div>

                <div className="space-y-2">
                  <Label>Email Footer Text</Label>
                  <Textarea defaultValue="This email was sent from Acme Financial CRM. To unsubscribe from these notifications, please contact your administrator." />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Configure how SMS notifications are sent to your team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send notifications via SMS to team members</p>
                  </div>
                  <Switch checked={smsEnabled} onCheckedChange={setSmsEnabled} />
                </div>

                <div className="space-y-2">
                  <Label>SMS Sender ID</Label>
                  <Input defaultValue="AcmeCRM" />
                  <p className="text-xs text-muted-foreground">Maximum 11 characters, no spaces</p>
                </div>

                <div className="space-y-2">
                  <Label>Default SMS Character Limit</Label>
                  <Select defaultValue="160">
                    <SelectTrigger>
                      <SelectValue placeholder="Select character limit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="160">160 characters (Standard SMS)</SelectItem>
                      <SelectItem value="306">306 characters (2 SMS messages)</SelectItem>
                      <SelectItem value="459">459 characters (3 SMS messages)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Notifications</CardTitle>
                <CardDescription>Configure how notifications appear within the application.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable In-App Notifications</Label>
                    <p className="text-sm text-muted-foreground">Show notifications within the application</p>
                  </div>
                  <Switch checked={inAppEnabled} onCheckedChange={setInAppEnabled} />
                </div>

                <div className="space-y-2">
                  <Label>Display Duration (seconds)</Label>
                  <Input type="number" defaultValue="5" min="1" max="30" />
                </div>

                <div className="space-y-2">
                  <Label>Maximum Notifications</Label>
                  <Input type="number" defaultValue="5" min="1" max="20" />
                  <p className="text-xs text-muted-foreground">Maximum number of notifications to show at once</p>
                </div>

                <div className="space-y-2">
                  <Label>Position</Label>
                  <Select defaultValue="top-right">
                    <SelectTrigger>
                      <SelectValue placeholder="Select position" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="top-right">Top Right</SelectItem>
                      <SelectItem value="top-left">Top Left</SelectItem>
                      <SelectItem value="bottom-right">Bottom Right</SelectItem>
                      <SelectItem value="bottom-left">Bottom Left</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Configure push notifications for mobile devices.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">Send push notifications to mobile devices</p>
                  </div>
                  <Switch checked={pushEnabled} onCheckedChange={setPushEnabled} />
                </div>

                <div className={pushEnabled ? "" : "opacity-50 pointer-events-none"}>
                  <div className="space-y-2">
                    <Label>Icon</Label>
                    <Select defaultValue="default">
                      <SelectTrigger>
                        <SelectValue placeholder="Select icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="default">Default (Company Logo)</SelectItem>
                        <SelectItem value="bell">Bell Icon</SelectItem>
                        <SelectItem value="alert">Alert Icon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2 mt-4">
                    <Label>Badge Count</Label>
                    <Select defaultValue="cumulative">
                      <SelectTrigger>
                        <SelectValue placeholder="Select badge behavior" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cumulative">Cumulative (Count all unread)</SelectItem>
                        <SelectItem value="replace">Replace (Show only newest)</SelectItem>
                        <SelectItem value="none">None (No badge)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Push notifications require users to opt-in on their devices.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Notification Categories Tab */}
          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Lead Notifications</CardTitle>
                <CardDescription>Notifications related to lead activity and updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Lead Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about lead activities</p>
                  </div>
                  <Switch checked={leadNotifications} onCheckedChange={setLeadNotifications} />
                </div>

                <div className={leadNotifications ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>New Lead Assigned</Label>
                      <p className="text-sm text-muted-foreground">When a new lead is assigned to an advisor</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lead Status Change</Label>
                      <p className="text-sm text-muted-foreground">When a lead's status changes</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Lead Conversion</Label>
                      <p className="text-sm text-muted-foreground">When a lead converts to a client</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Campaign Notifications</CardTitle>
                <CardDescription>Notifications related to marketing campaigns.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable Campaign Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive notifications about campaign activities</p>
                  </div>
                  <Switch checked={campaignNotifications} onCheckedChange={setCampaignNotifications} />
                </div>

                <div className={campaignNotifications ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Launch</Label>
                      <p className="text-sm text-muted-foreground">When a new campaign is launched</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Performance</Label>
                      <p className="text-sm text-muted-foreground">Weekly campaign performance reports</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Campaign Completion</Label>
                      <p className="text-sm text-muted-foreground">When a campaign ends</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Notifications</CardTitle>
                <CardDescription>System alerts and important updates.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label>Enable System Notifications</Label>
                    <p className="text-sm text-muted-foreground">Receive system alerts and updates</p>
                  </div>
                  <Switch checked={systemNotifications} onCheckedChange={setSystemNotifications} />
                </div>

                <div className={systemNotifications ? "space-y-4" : "space-y-4 opacity-50 pointer-events-none"}>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label>System Maintenance</Label>
                      <p className="text-sm text-muted-foreground">Scheduled maintenance notifications</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Security Alerts</Label>
                      <p className="text-sm text-muted-foreground">Important security notifications</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <Label>Feature Updates</Label>
                      <p className="text-sm text-muted-foreground">New features and improvements</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        <Switch />
                      </div>
                      <div className="flex items-center gap-2">
                        <Bell className="h-4 w-4" />
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification Templates Tab */}
          <TabsContent value="templates" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Email Templates</CardTitle>
                <CardDescription>Customize email notification templates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Last Modified</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Lead Assigned</TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lead Status Change</TableCell>
                      <TableCell>1 week ago</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Campaign Performance</TableCell>
                      <TableCell>2 weeks ago</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Maintenance</TableCell>
                      <TableCell>1 month ago</TableCell>
                      <TableCell>
                        <Badge className="bg-yellow-100 text-yellow-800">Draft</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" /> Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>SMS Templates</CardTitle>
                <CardDescription>Customize SMS notification templates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Character Count</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Lead Alert</TableCell>
                      <TableCell>87 chars</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lead Conversion</TableCell>
                      <TableCell>124 chars</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Urgent System Alert</TableCell>
                      <TableCell>92 chars</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" /> Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In-App Templates</CardTitle>
                <CardDescription>Customize in-app notification templates.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Template Name</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Lead</TableCell>
                      <TableCell>High</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Campaign Update</TableCell>
                      <TableCell>Medium</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Alert</TableCell>
                      <TableCell>Critical</TableCell>
                      <TableCell>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                        <Button variant="ghost" size="sm">
                          <FileText className="h-4 w-4 mr-1" /> Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="mt-4">
                  <Button>
                    <FileText className="h-4 w-4 mr-2" /> Create New Template
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notification History Tab */}
          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Notification History</CardTitle>
                  <CardDescription>View all sent notifications and their status.</CardDescription>
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" /> Export
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Input placeholder="Search notifications..." className="max-w-sm" />
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="in-app">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select defaultValue="7days">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24hours">Last 24 Hours</SelectItem>
                      <SelectItem value="7days">Last 7 Days</SelectItem>
                      <SelectItem value="30days">Last 30 Days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Notification</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Recipient</TableHead>
                      <TableHead>Sent</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Lead Assigned</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Mail className="h-3 w-3 mr-1" /> Email
                        </Badge>
                      </TableCell>
                      <TableCell>john.smith@example.com</TableCell>
                      <TableCell>Today, 10:42 AM</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Delivered
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lead Status Change</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                          <Smartphone className="h-3 w-3 mr-1" /> SMS
                        </Badge>
                      </TableCell>
                      <TableCell>+1 (555) 123-4567</TableCell>
                      <TableCell>Today, 9:15 AM</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Delivered
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Campaign Performance</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Mail className="h-3 w-3 mr-1" /> Email
                        </Badge>
                      </TableCell>
                      <TableCell>sarah.johnson@example.com</TableCell>
                      <TableCell>Yesterday, 4:30 PM</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Opened
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Maintenance</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
                          <Bell className="h-3 w-3 mr-1" /> In-App
                        </Badge>
                      </TableCell>
                      <TableCell>All Users</TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" /> Delivered
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Security Alert</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                          <Mail className="h-3 w-3 mr-1" /> Email
                        </Badge>
                      </TableCell>
                      <TableCell>admin@acmefinancial.com</TableCell>
                      <TableCell>3 days ago</TableCell>
                      <TableCell>
                        <div className="flex items-center">
                          <XCircle className="h-4 w-4 text-red-500 mr-1" /> Failed
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
                <div className="flex items-center justify-center space-x-2 mt-4">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm" className="bg-blue-50">
                    1
                  </Button>
                  <Button variant="outline" size="sm">
                    2
                  </Button>
                  <Button variant="outline" size="sm">
                    3
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Advanced Settings Tab */}
          <TabsContent value="settings" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Delivery Settings</CardTitle>
                <CardDescription>Configure when and how notifications are delivered.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Quiet Hours</Label>
                  <div className="flex items-center space-x-4">
                    <div className="grid gap-2">
                      <Label htmlFor="from">From</Label>
                      <Input type="time" id="from" defaultValue="22:00" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="to">To</Label>
                      <Input type="time" id="to" defaultValue="07:00" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Only critical notifications will be sent during quiet hours.
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Notification Frequency</Label>
                  <Select defaultValue="immediate">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="immediate">Immediate (As they occur)</SelectItem>
                      <SelectItem value="batched">Batched (Hourly digest)</SelectItem>
                      <SelectItem value="daily">Daily Digest</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select defaultValue="america_new_york">
                    <SelectTrigger>
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="america_new_york">America/New York (EDT)</SelectItem>
                      <SelectItem value="america_chicago">America/Chicago (CDT)</SelectItem>
                      <SelectItem value="america_denver">America/Denver (MDT)</SelectItem>
                      <SelectItem value="america_los_angeles">America/Los Angeles (PDT)</SelectItem>
                      <SelectItem value="etc_utc">UTC</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-muted-foreground">
                    All notification times will be based on this timezone.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Role-Based Notifications</CardTitle>
                <CardDescription>Configure which roles receive which notifications.</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Notification Type</TableHead>
                      <TableHead>Admin</TableHead>
                      <TableHead>Manager</TableHead>
                      <TableHead>Advisor</TableHead>
                      <TableHead>Support</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">New Lead Assigned</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Lead Status Change</TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Campaign Performance</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">System Maintenance</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Security Alerts</TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch defaultChecked />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                      <TableCell>
                        <Switch />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Notification Retention</CardTitle>
                <CardDescription>Configure how long notifications are stored.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label>Email Notifications</Label>
                  <Select defaultValue="365">
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>SMS Notifications</Label>
                  <Select defaultValue="90">
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                      <SelectItem value="forever">Forever</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label>In-App Notifications</Label>
                  <Select defaultValue="30">
                    <SelectTrigger>
                      <SelectValue placeholder="Select retention period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7">7 days</SelectItem>
                      <SelectItem value="30">30 days</SelectItem>
                      <SelectItem value="90">90 days</SelectItem>
                      <SelectItem value="180">180 days</SelectItem>
                      <SelectItem value="365">1 year</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="pt-4">
                  <Button variant="destructive">Clear All Notification History</Button>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Notification retention policies comply with data protection regulations.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
