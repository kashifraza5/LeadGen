"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Mail } from "lucide-react";

export function CampaignHistory({ campaigns }) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle>Campaign History</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="timeline" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="timeline">Execution Timeline</TabsTrigger>
            <TabsTrigger value="communications">Communications</TabsTrigger>
            <TabsTrigger value="responses">Responses</TabsTrigger>
          </TabsList>

          {/* Timeline View */}
          <TabsContent value="timeline" className="space-y-4">
            {campaigns.length > 0 ? (
              <div className="relative pl-8 pt-2">
                {campaigns
                  .flatMap((campaign) =>
                    campaign.steps.map((step) => ({
                      campaignName: campaign.name,
                      campaignId: campaign.id,
                      ...step,
                    }))
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 10)
                  .map((step, index, array) => (
                    <div
                      key={`${step.campaignId}-${step.id}`}
                      className="mb-8 relative"
                    >
                      <div className="absolute left-[-28px] top-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "Executed"
                              ? "bg-green-100 text-green-600"
                              : step.status === "Failed"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {step.type === "email" ? (
                            <Mail className="w-5 h-5" />
                          ) : (
                            <MessageSquare className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      {index < array.length - 1 && (
                        <div className="absolute left-[-25px] top-6 bottom-[-32px] w-0.5 bg-gray-200 " />
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm ml-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500">
                              {step.campaignName}
                            </div>
                            <h4 className="font-medium text-gray-900">
                              {step.name}
                            </h4>
                            {step.subject && (
                              <div className="mt-1 text-sm text-gray-600 font-normal">
                                {step.subject}
                              </div>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              step.status === "Executed"
                                ? "bg-green-100 text-green-800"
                                : step.status === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {step.matrix.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {new Date(step.matrix.date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No campaign history available.
              </div>
            )}
          </TabsContent>

          {/* Communications View */}
          {/* <TabsContent value="communications">
            <div className="space-y-4">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-3 flex justify-between items-center">
                    <div className="font-bold text-lg">{campaign.name}</div>
                    <Badge
                      variant="outline"
                      className={
                        campaign.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : campaign.status === "Completed"
                            ? "bg-gray-100 text-gray-800"
                            : "bg-blue-100 text-blue-800"
                      }
                    >
                      {campaign.status}
                    </Badge>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div className="bg-blue-50 rounded-md p-3 text-center">
                        <div className="text-sm text-gray-600">Total Emails</div>
                        <div className="text-2xl font-bold text-blue-600">{campaign.totalEmails}</div>
                      </div>
                      <div className="bg-green-50 rounded-md p-3 text-center">
                        <div className="text-sm text-gray-600">Total SMS</div>
                        <div className="text-2xl font-bold text-green-600">{campaign.totalSMS}</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Email Steps</span>
                        <span>{campaign.steps.filter((s) => s.type === "email").length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>SMS Steps</span>
                        <span>{campaign.steps.filter((s) => s.type === "sms").length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Executed Steps</span>
                        <span>{campaign.steps.filter((s) => s.status === "Executed").length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Pending Steps</span>
                        <span>{campaign.steps.filter((s) => s.status === "Scheduled").length}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Failed Steps</span>
                        <span>{campaign.steps.filter((s) => s.status === "Failed").length}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent> */}

          <TabsContent value="communications" className="space-y-4">
            {campaigns.length > 0 ? (
              <div className="relative pl-8 pt-2">
                {campaigns
                  .flatMap((campaign) =>
                    campaign.steps.map((step) => ({
                      campaignName: campaign.name,
                      campaignId: campaign.id,
                      ...step,
                    }))
                  )
                  .sort(
                    (a, b) =>
                      new Date(b.date).getTime() - new Date(a.date).getTime()
                  )
                  .slice(0, 10)
                  .map((step, index, array) => (
                    <div
                      key={`${step.campaignId}-${step.id}`}
                      className="mb-8 relative"
                    >
                      <div className="absolute left-[-28px] top-0">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center ${
                            step.status === "Executed"
                              ? "bg-green-100 text-green-600"
                              : step.status === "Failed"
                              ? "bg-red-100 text-red-600"
                              : "bg-blue-100 text-blue-600"
                          }`}
                        >
                          {step.type === "email" ? (
                            <Mail className="w-5 h-5" />
                          ) : (
                            <MessageSquare className="w-5 h-5" />
                          )}
                        </div>
                      </div>
                      {index < array.length - 1 && (
                        <div className="absolute left-[-25px] top-6 bottom-[-32px] w-0.5 bg-gray-200 " />
                      )}
                      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm ml-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <div className="text-sm text-gray-500">
                              {step.campaignName}
                            </div>
                            <h4 className="font-medium text-gray-900">
                              {step.name}
                            </h4>
                            {step.matrix?.message && (
                              <div className="mt-4 pt-3 border-t border-gray-100">
                                <div className="flex justify-between">
                                  {/* Sender Details */}
                                  <div className="flex-1">
                                    <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                      From:
                                    </div>
                                    <div className="text-base text-gray-900 font-semibold mb-1">
                                      {step.matrix.message.sender.name}
                                    </div>
                                    <div className="text-sm text-blue-600 font-medium">
                                      {step.matrix.message.sender.email}
                                    </div>
                                    {step.type === "sms" &&
                                      step.matrix.message.sender
                                        .phone_number && (
                                        <div className="text-sm text-green-600 font-medium mt-1">
                                          {
                                            step.matrix.message.sender
                                              .phone_number
                                          }
                                        </div>
                                      )}
                                  </div>

                                  {/* Receiver Details */}
                                  <div className="flex-1 ml-6">
                                    <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                      To:
                                    </div>
                                    <div className="text-base text-gray-900 font-semibold mb-1">
                                      {step.matrix.message.receiver.name}
                                    </div>
                                    <div className="text-sm text-blue-600 font-medium">
                                      {step.matrix.message.receiver.email}
                                    </div>
                                    {step.type === "sms" &&
                                      step.matrix.message.receiver
                                        .phone_number && (
                                        <div className="text-sm text-green-600 font-medium mt-1">
                                          {
                                            step.matrix.message.receiver
                                              .phone_number
                                          }
                                        </div>
                                      )}
                                  </div>
                                </div>
                              </div>
                            )}
                            {step.matrix?.message?.subject && (
                              <div className="mt-3 text-sm text-gray-600 font-normal ">
                                <span className="font-bold">Subject:</span>{" "}
                                {step.matrix.message.subject}
                              </div>
                            )}
                            {step.type === "email" &&
                              step.matrix?.message?.content && (
                                <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                  <div className="text-sm text-gray-700 font-medium mb-2">
                                    Content:
                                  </div>
                                  <div
                                    className="text-sm text-gray-600"
                                    dangerouslySetInnerHTML={{
                                      __html: step.matrix.message.content,
                                    }}
                                  />
                                </div>
                              )}
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              step.status === "Executed"
                                ? "bg-green-100 text-green-800"
                                : step.status === "Failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-blue-100 text-blue-800"
                            }
                          >
                            {step.matrix.status}
                          </Badge>
                        </div>
                        <div className="mt-2 text-sm text-gray-500">
                          {new Date(
                            step.matrix?.message?.updated_at
                          ).toLocaleDateString()}
                        </div>

                        {/* Sender and Receiver Details */}
                      </div>
                    </div>
                  ))}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No campaign history available.
              </div>
            )}
          </TabsContent>

          {/* Status View */}
          {/* <TabsContent value="status">
            <div className="space-y-6">
              {campaigns.map((campaign) => (
                <div key={campaign.id} className="border rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-3">
                    <div className="font-bold text-lg">{campaign.name}</div>
  
                  </div>
                  <div className="p-4">
                    <table className="w-full">
                      <thead>
                        <tr className="text-xs text-gray-600 border-b">
                          <th className="text-left text-base font-bold py-2">STEP</th>
                          <th className="text-left text-base font-bold py-2">TYPE</th>
                          <th className="text-left  text-base font-bold py-2">DATE</th>
                          <th className="text-left  text-base font-bold py-2">STATUS</th>
                        </tr>
                      </thead>
                      <tbody>
                        {campaign.steps.map((step) => (
                          <tr key={step.id} className="border-b last:border-0 text-gray-500 font-medium text-sm">
                            <td className="py-3">{step.name}</td>
                            <td className="py-3 capitalize">{step.type}</td>
                            <td className="py-3">{new Date(step.matrix.date).toLocaleString()}</td>
                            <td className="py-3">
                              <Badge
                                variant="outline"
                                className={
                                  step.status === "Executed"
                                    ? "bg-green-100 text-green-800"
                                    : step.status === "Failed"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-blue-100 text-blue-800"
                                }
                              >
                                {step.matrix.status}
                              </Badge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent> */}
          <TabsContent value="responses" className="space-y-4">
            {campaigns.length > 0 ? (
              <div className="relative pl-8 pt-2">
                {(() => {
                  return campaigns
                    .flatMap((campaign) => {
                      return (
                        campaign.response?.messages?.map((response) => ({
                          campaignName: campaign.name,
                          campaignId: campaign.id,
                          ...response,
                        })) || []
                      );
                    })
                    .map((response, index, array) => {
                      return (
                        <div
                          key={`${response.campaignId}-${response.id}`}
                          className="mb-8 relative"
                        >
                          <div className="absolute left-[-28px] top-0">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center 
                                ${
                                  response.sending_status === "queued"
                                    ? "bg-blue-100 text-blue-600"
                                    : response.sending_status === "delivered"
                                    ? "bg-green-100 text-green-600"
                                    : "bg-gray-100 text-gray-600"
                                } `}
                            >
                              {response.type === "email" ? (
                                <Mail className="w-5 h-5" />
                              ) : (
                                <MessageSquare className="w-5 h-5" />
                              )}
                            </div>
                          </div>
                          {index < array.length - 1 && (
                            <div className="absolute left-[-25px] top-6 bottom-[-32px] w-0.5 bg-gray-200 " />
                          )}
                          <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm ml-2">
                            <div className="flex justify-between items-start">
                              <div className="flex-1">
                                <div className="text-sm text-gray-500">
                                  {response.campaignName}
                                </div>
                            

                                <div className="mt-4 pt-3 border-t border-gray-100">
                                  <div className="flex justify-between">
                                    {/* Sender Details */}
                                    <div className="flex-1">
                                      <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                        From:
                                      </div>
                                      <div className="text-base text-gray-900 font-semibold mb-1">
                                        {response.sender.name}
                                      </div>
                                      <div className="text-sm text-blue-600 font-medium">
                                        {response.sender.email}
                                      </div>
                                      {response.type === "sms" &&
                                        response.sender.phone_number && (
                                          <div className="text-sm text-green-600 font-medium mt-1">
                                            {response.sender.phone_number}
                                          </div>
                                        )}
                                    </div>

                                    {/* Receiver Details */}
                                    <div className="flex-1 ml-6">
                                      <div className="text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                                        To:
                                      </div>
                                      <div className="text-base text-gray-900 font-semibold mb-1">
                                        {response.receiver.name}
                                      </div>
                                      <div className="text-sm text-blue-600 font-medium">
                                        {response.receiver.email}
                                      </div>
                                      {response.type === "sms" &&
                                        response.receiver.phone_number && (
                                          <div className="text-sm text-green-600 font-medium mt-1">
                                            {response.receiver.phone_number}
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>

                                {response.subject && (
                                  <div className="mt-3 text-sm text-gray-600 font-normal ">
                                    <span className="font-bold">Subject:</span>{" "}
                                    {response.subject}
                                  </div>
                                )}
                                {response.type === "email" &&
                                  response.content && (
                                    <div className="mt-3 p-3 bg-gray-50 rounded-md">
                                      <div className="text-sm text-gray-700 font-medium mb-2">
                                        Content:
                                      </div>
                                      <div
                                        className="text-sm text-gray-600"
                                        dangerouslySetInnerHTML={{
                                          __html: response.content,
                                        }}
                                      />
                                    </div>
                                  )}
                              </div>
                              <Badge 
                                variant="outline"
                                className={
                                  response.sending_status === "queued"
                                    ? "bg-blue-100 text-blue-800 border-blue-200"
                                    : response.sending_status === "delivered"
                                    ? "bg-green-100 text-green-800 border-green-200"
                                    : "bg-gray-100 text-gray-800 border-gray-200"
                                }
                              >
                                {response.sending_status.charAt(0).toUpperCase() +
                                  response.sending_status.slice(1)}
                              </Badge>
                            </div>
                            <div className="mt-2 text-sm text-gray-500">
                              {new Date(
                                response.updated_at
                              ).toLocaleDateString()}
                            </div>

                            {/* Sender and Receiver Details */}
                          </div>
                        </div>
                      );
                    });
                })()}
              </div>
            ) : (
              <div className="text-center py-6 text-gray-500">
                No campaign history available.
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
