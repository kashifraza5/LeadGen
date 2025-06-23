"use client";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import { CampaignHistory } from "./CampaignHistory";
import { useParams } from "react-router-dom";
import { getLeadCampaigns } from "@/services/LeadService";

export function CampaignsTab() {
  const [openCampaignId, setOpenCampaignId] = useState(null);
  const [campaigns, setCampaigns] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();
  const leadId = params?.id || "LD-10042"; // Fallback for demo

  const getLeadCampaignsData = async () => {
    try {
      setIsLoading(true);
      const response = await getLeadCampaigns(leadId);
      console.log("🚀 ~ getLeadCampaignsData ~ response:", response);
      setCampaigns(response || []);
    } catch (error) {
      console.error("Error fetching campaigns:", error);
      setCampaigns([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getLeadCampaignsData();
  }, [leadId]);

  const statusStyles = {
    active: "!bg-green-50 !text-green-700 !border-green-200",
    finished: "!bg-blue-50 !text-blue-700 !border-blue-200",
    responded: "!bg-purple-50 !text-purple-700 !border-purple-200",
    stopped: "!bg-red-50 !text-red-700 !border-red-200",
    paused: "!bg-yellow-50 !text-yellow-700 !border-yellow-200",
    completed: "!bg-gray-50 !text-gray-700 !border-gray-200",
    scheduled: "!bg-orange-50 !text-orange-700 !border-orange-200",
  };

  const textColor = {
    active: "text-green-500",
    finished: "text-blue-500",
    responded: "text-purple-500",
    stopped: "text-red-500",
    paused: "text-yellow-500",
    completed: "text-gray-500",
    scheduled: "text-orange-500",
  };

  // Show loading state
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle>Running Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-6 text-gray-500">
              Loading campaigns...
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Running Campaigns Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Campaigns</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {campaigns.length > 0 ? (
              campaigns.map((campaign, index) => (
                <div
                  key={campaign.id}
                  className="transition-all duration-300 ease-in-out"
                >
                  <div className="flex items-center justify-between p-4 border rounded-md">
                    <div className="">
                      <h3 className="font-bold">{campaign.name}</h3>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        <span>
                          {new Date(campaign.start_date).toLocaleDateString()} -{" "}
                          {new Date(campaign.end_date).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-bold">Advisor:</h3>
                      <p className="text-sm text-gray-500">
                        {campaign.advisor || "Advisor"}
                      </p>
                    </div>
                    <div className="flex items-center space-x-1">
                      <h3 className="font-bold">Status :</h3>
                      <Badge
                        variant="outline"
                        className={
                          statusStyles[campaign.status] ||
                          "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        
                        <span className={textColor[campaign.status]}>
                          {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                        </span>
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right flex space-x-1">
                        <div className="text-sm font-medium">Progress</div>
                        <div className="text-sm text-gray-500">
                          {campaign.progress}%
                        </div>
                      </div>
                      <div className="w-24 bg-gray-200 rounded-full h-2.5">
                        <div
                          className="bg-blue-600 h-2.5 rounded-full"
                          style={{ width: `${campaign.progress}%` }}
                        ></div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="transition-all duration-300 ease-in-out hover:scale-105"
                        onClick={() =>
                          setOpenCampaignId(
                            openCampaignId === campaign.id ? null : campaign.id
                          )
                        }
                      >
                        {openCampaignId === campaign.id
                          ? "Hide Details"
                          : "View Details"}
                      </Button>
                    </div>
                  </div>

                  {/* Campaign History Section - appears between campaigns */}
                  {openCampaignId === campaign.id && (
                    <div className="mt-4 mb-4 transition-all duration-500 ease-in-out animate-in slide-in-from-top-2 fade-in-0">
                      <CampaignHistory
                        campaigns={campaigns.filter(
                          (c) => c.id === openCampaignId
                        )}
                      />
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="text-center py-6 text-gray-500">
                No campaigns for this lead.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Campaign Analytics Section */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Campaign Analytics</CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="engagement" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="engagement">Engagement</TabsTrigger>
              <TabsTrigger value="funnel">Funnel Position</TabsTrigger>
              <TabsTrigger value="rates">Response Rates</TabsTrigger>
            </TabsList>

            {/* Engagement View */}
            <TabsContent value="engagement">
              <div className="space-y-6">
                {campaigns
                  .filter(
                    (c) =>
                      c.steps && c.steps.some((s) => s.status === "Executed")
                  )
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">{campaign.name}</h3>

                      <div className="space-y-4">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Email Opens</span>
                            <span>
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed" &&
                                    s.metrics?.opened
                                ).length
                              }{" "}
                              /{" "}
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed"
                                ).length
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  campaign.steps.filter(
                                    (s) =>
                                      s.type === "email" &&
                                      s.status === "Executed"
                                  ).length === 0
                                    ? 0
                                    : (campaign.steps.filter(
                                        (s) =>
                                          s.type === "email" &&
                                          s.status === "Executed" &&
                                          s.metrics?.opened
                                      ).length /
                                        campaign.steps.filter(
                                          (s) =>
                                            s.type === "email" &&
                                            s.status === "Executed"
                                        ).length) *
                                      100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Email Clicks</span>
                            <span>
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed" &&
                                    s.metrics?.clicked
                                ).length
                              }{" "}
                              /{" "}
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed"
                                ).length
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-green-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  campaign.steps.filter(
                                    (s) =>
                                      s.type === "email" &&
                                      s.status === "Executed"
                                  ).length === 0
                                    ? 0
                                    : (campaign.steps.filter(
                                        (s) =>
                                          s.type === "email" &&
                                          s.status === "Executed" &&
                                          s.metrics?.clicked
                                      ).length /
                                        campaign.steps.filter(
                                          (s) =>
                                            s.type === "email" &&
                                            s.status === "Executed"
                                        ).length) *
                                      100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Email Replies</span>
                            <span>
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed" &&
                                    s.metrics?.replied
                                ).length
                              }{" "}
                              /{" "}
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "email" &&
                                    s.status === "Executed"
                                ).length
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-purple-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  campaign.steps.filter(
                                    (s) =>
                                      s.type === "email" &&
                                      s.status === "Executed"
                                  ).length === 0
                                    ? 0
                                    : (campaign.steps.filter(
                                        (s) =>
                                          s.type === "email" &&
                                          s.status === "Executed" &&
                                          s.metrics?.replied
                                      ).length /
                                        campaign.steps.filter(
                                          (s) =>
                                            s.type === "email" &&
                                            s.status === "Executed"
                                        ).length) *
                                      100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>SMS Delivery</span>
                            <span>
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "sms" &&
                                    s.status === "Executed" &&
                                    s.metrics?.delivered
                                ).length
                              }{" "}
                              /{" "}
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "sms" && s.status === "Executed"
                                ).length
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-yellow-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  campaign.steps.filter(
                                    (s) =>
                                      s.type === "sms" &&
                                      s.status === "Executed"
                                  ).length === 0
                                    ? 0
                                    : (campaign.steps.filter(
                                        (s) =>
                                          s.type === "sms" &&
                                          s.status === "Executed" &&
                                          s.metrics?.delivered
                                      ).length /
                                        campaign.steps.filter(
                                          (s) =>
                                            s.type === "sms" &&
                                            s.status === "Executed"
                                        ).length) *
                                      100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>SMS Replies</span>
                            <span>
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "sms" &&
                                    s.status === "Executed" &&
                                    s.metrics?.replied
                                ).length
                              }{" "}
                              /{" "}
                              {
                                campaign.steps.filter(
                                  (s) =>
                                    s.type === "sms" && s.status === "Executed"
                                ).length
                              }
                            </span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-orange-600 h-2 rounded-full"
                              style={{
                                width: `${
                                  campaign.steps.filter(
                                    (s) =>
                                      s.type === "sms" &&
                                      s.status === "Executed"
                                  ).length === 0
                                    ? 0
                                    : (campaign.steps.filter(
                                        (s) =>
                                          s.type === "sms" &&
                                          s.status === "Executed" &&
                                          s.metrics?.replied
                                      ).length /
                                        campaign.steps.filter(
                                          (s) =>
                                            s.type === "sms" &&
                                            s.status === "Executed"
                                        ).length) *
                                      100
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            {/* Funnel Position View */}
            <TabsContent value="funnel">
              <div className="space-y-6">
                {campaigns
                  .filter((c) => c.funnelStages > 0)
                  .map((campaign) => (
                    <div key={campaign.id} className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">{campaign.name}</h3>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Funnel Position</span>
                          <span>
                            {campaign.funnelPosition} of {campaign.funnelStages}
                          </span>
                        </div>

                        <div className="relative pt-1">
                          <div className="flex mb-2 items-center justify-between">
                            <div className="text-xs text-gray-500">Start</div>
                            <div className="text-xs text-gray-500">End</div>
                          </div>
                          <div className="overflow-hidden h-6 mb-4 text-xs flex rounded-full bg-gray-200">
                            {Array.from({ length: campaign.funnelStages }).map(
                              (_, index) => (
                                <div
                                  key={index}
                                  className={`shadow-none flex flex-col text-center whitespace-nowrap justify-center ${
                                    index < campaign.funnelPosition
                                      ? "bg-blue-600"
                                      : index === campaign.funnelPosition
                                      ? "bg-blue-400"
                                      : "bg-gray-200"
                                  }`}
                                  style={{
                                    width: `${100 / campaign.funnelStages}%`,
                                  }}
                                >
                                  {index === campaign.funnelPosition && (
                                    <div className="text-white font-bold">
                                      Here
                                    </div>
                                  )}
                                </div>
                              )
                            )}
                          </div>
                          <div className="flex justify-between text-xs text-gray-500">
                            {Array.from({ length: campaign.funnelStages }).map(
                              (_, index) => (
                                <div
                                  key={index}
                                  className="text-center"
                                  style={{
                                    width: `${100 / campaign.funnelStages}%`,
                                  }}
                                >
                                  Stage {index + 1}
                                </div>
                              )
                            )}
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-blue-50 rounded-md p-3 text-center">
                              <div className="text-sm text-gray-600">
                                Response Rate
                              </div>
                              <div className="text-2xl font-bold text-blue-600">
                                {campaign.responseRate}%
                              </div>
                            </div>
                            <div className="bg-red-50 rounded-md p-3 text-center">
                              <div className="text-sm text-gray-600">
                                Unsubscribe Rate
                              </div>
                              <div className="text-2xl font-bold text-red-600">
                                {campaign.unsubscribeRate}%
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </TabsContent>

            {/* Response Rates View */}
            <TabsContent value="rates">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {campaigns.map((campaign) => (
                    <div key={campaign.id} className="border rounded-md p-4">
                      <h3 className="font-medium mb-3">{campaign.name}</h3>

                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm">Response Rate</div>
                          <Badge
                            variant="outline"
                            className="bg-blue-50 text-blue-700"
                          >
                            {campaign.responseRate}%
                          </Badge>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-blue-600 h-2.5 rounded-full"
                            style={{ width: `${campaign.responseRate}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">Unsubscribe Rate</div>
                          <Badge
                            variant="outline"
                            className="bg-red-50 text-red-700"
                          >
                            {campaign.unsubscribeRate}%
                          </Badge>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2.5">
                          <div
                            className="bg-red-600 h-2.5 rounded-full"
                            style={{ width: `${campaign.unsubscribeRate}%` }}
                          ></div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="text-sm">Campaign Status</div>
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
                      </div>
                    </div>
                  ))}
                </div>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm">
                      Overall Campaign Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average Response Rate</span>
                          <span>
                            {campaigns.length > 0
                              ? Math.round(
                                  campaigns.reduce(
                                    (acc, campaign) =>
                                      acc + campaign.responseRate,
                                    0
                                  ) / campaigns.length
                                )
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{
                              width: `${
                                campaigns.length > 0
                                  ? Math.round(
                                      campaigns.reduce(
                                        (acc, campaign) =>
                                          acc + campaign.responseRate,
                                        0
                                      ) / campaigns.length
                                    )
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Average Unsubscribe Rate</span>
                          <span>
                            {campaigns.length > 0
                              ? Math.round(
                                  campaigns.reduce(
                                    (acc, campaign) =>
                                      acc + campaign.unsubscribeRate,
                                    0
                                  ) / campaigns.length
                                )
                              : 0}
                            %
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-red-600 h-2 rounded-full"
                            style={{
                              width: `${
                                campaigns.length > 0
                                  ? Math.round(
                                      campaigns.reduce(
                                        (acc, campaign) =>
                                          acc + campaign.unsubscribeRate,
                                        0
                                      ) / campaigns.length
                                    )
                                  : 0
                              }%`,
                            }}
                          ></div>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-4 mt-4">
                        <div className="bg-green-50 rounded-md p-3 text-center">
                          <div className="text-xs text-gray-600">
                            Active Campaigns
                          </div>
                          <div className="text-xl font-bold text-green-600">
                            {
                              campaigns.filter((c) => c.status === "Active")
                                .length
                            }
                          </div>
                        </div>
                        <div className="bg-blue-50 rounded-md p-3 text-center">
                          <div className="text-xs text-gray-600">Scheduled</div>
                          <div className="text-xl font-bold text-blue-600">
                            {
                              campaigns.filter((c) => c.status === "Scheduled")
                                .length
                            }
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-md p-3 text-center">
                          <div className="text-xs text-gray-600">Completed</div>
                          <div className="text-xl font-bold text-gray-600">
                            {
                              campaigns.filter((c) => c.status === "Completed")
                                .length
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
