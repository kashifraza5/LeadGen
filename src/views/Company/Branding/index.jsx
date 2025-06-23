import { useState } from "react"
import { AppLayout } from "@/components/layout/app-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Palette,
  Upload,
  Download,
  Eye,
  Smartphone,
  Monitor,
  Mail,
  Save,
  RotateCcw,
  ImageIcon,
  Type,
  Paintbrush,
} from "lucide-react"

export default function CompanyBrandingPage() {
  const [brandData, setBrandData] = useState({
    companyName: "Acme Corporation",
    tagline: "Innovation at its finest",
    description: "Leading provider of innovative business solutions and services.",
    website: "www.acme.com",
    primaryColor: "#3B82F6",
    secondaryColor: "#10B981",
    accentColor: "#F59E0B",
    backgroundColor: "#F8FAFC",
    textColor: "#1F2937",
    fontFamily: "Inter",
  })

  const [previewMode, setPreviewMode] = useState("desktop")

  const colorPresets = [
    {
      name: "Ocean Blue",
      primary: "#0EA5E9",
      secondary: "#06B6D4",
      accent: "#8B5CF6",
      background: "#F0F9FF",
      text: "#0F172A",
    },
    {
      name: "Forest Green",
      primary: "#059669",
      secondary: "#10B981",
      accent: "#F59E0B",
      background: "#F0FDF4",
      text: "#064E3B",
    },
    {
      name: "Sunset Orange",
      primary: "#EA580C",
      secondary: "#F97316",
      accent: "#EF4444",
      background: "#FFF7ED",
      text: "#9A3412",
    },
    {
      name: "Purple Passion",
      primary: "#7C3AED",
      secondary: "#A855F7",
      accent: "#EC4899",
      background: "#FAF5FF",
      text: "#581C87",
    },
    {
      name: "Monochrome",
      primary: "#374151",
      secondary: "#6B7280",
      accent: "#9CA3AF",
      background: "#F9FAFB",
      text: "#111827",
    },
  ]

  const fontOptions = ["Inter", "Roboto", "Open Sans", "Lato", "Montserrat", "Poppins", "Source Sans Pro", "Nunito"]

  const handleColorChange = (colorType, value) => {
    setBrandData((prev) => ({
      ...prev,
      [colorType]: value,
    }))
  }

  const applyColorPreset = (preset) => {
    setBrandData((prev) => ({
      ...prev,
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      accentColor: preset.accent,
      backgroundColor: preset.background,
      textColor: preset.text,
    }))
  }

  const resetToDefaults = () => {
    setBrandData({
      companyName: "Acme Corporation",
      tagline: "Innovation at its finest",
      description: "Leading provider of innovative business solutions and services.",
      website: "www.acme.com",
      primaryColor: "#3B82F6",
      secondaryColor: "#10B981",
      accentColor: "#F59E0B",
      backgroundColor: "#F8FAFC",
      textColor: "#1F2937",
      fontFamily: "Inter",
    })
  }

  return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Brand Management</h1>
            <p className="text-gray-600">Customize your company's brand identity and visual elements</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={resetToDefaults}>
              <RotateCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        {/* Tabs for different sections */}
        <Tabs defaultValue="identity" className="space-y-6">
          <TabsList>
            <TabsTrigger value="identity">Brand Identity</TabsTrigger>
            <TabsTrigger value="colors">Colors & Themes</TabsTrigger>
            <TabsTrigger value="assets">Brand Assets</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          {/* Brand Identity Tab */}
          <TabsContent value="identity" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="companyName">Company Name</Label>
                    <Input
                      id="companyName"
                      value={brandData.companyName}
                      onChange={(e) => setBrandData((prev) => ({ ...prev, companyName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="tagline">Tagline</Label>
                    <Input
                      id="tagline"
                      value={brandData.tagline}
                      onChange={(e) => setBrandData((prev) => ({ ...prev, tagline: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={brandData.description}
                      onChange={(e) => setBrandData((prev) => ({ ...prev, description: e.target.value }))}
                      rows={3}
                    />
                  </div>
                  <div>
                    <Label htmlFor="website">Website</Label>
                    <Input
                      id="website"
                      value={brandData.website}
                      onChange={(e) => setBrandData((prev) => ({ ...prev, website: e.target.value }))}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Type className="h-5 w-5" />
                    Typography
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fontFamily">Font Family</Label>
                    <Select
                      value={brandData.fontFamily}
                      onValueChange={(value) => setBrandData((prev) => ({ ...prev, fontFamily: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {fontOptions.map((font) => (
                          <SelectItem key={font} value={font}>
                            <span style={{ fontFamily: font }}>{font}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="textColor">Text Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="textColor"
                        type="color"
                        value={brandData.textColor}
                        onChange={(e) => handleColorChange("textColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandData.textColor}
                        onChange={(e) => handleColorChange("textColor", e.target.value)}
                        placeholder="#000000"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div
                    className="p-4 border rounded-lg"
                    style={{ fontFamily: brandData.fontFamily, color: brandData.textColor }}
                  >
                    <h3 className="text-xl font-bold mb-2">{brandData.companyName}</h3>
                    <p className="text-sm italic mb-2">{brandData.tagline}</p>
                    <p className="text-sm">{brandData.description}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Colors & Themes Tab */}
          <TabsContent value="colors" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Palette className="h-5 w-5" />
                    Color Palette
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        type="color"
                        value={brandData.primaryColor}
                        onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandData.primaryColor}
                        onChange={(e) => handleColorChange("primaryColor", e.target.value)}
                        placeholder="#3B82F6"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondaryColor">Secondary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="secondaryColor"
                        type="color"
                        value={brandData.secondaryColor}
                        onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandData.secondaryColor}
                        onChange={(e) => handleColorChange("secondaryColor", e.target.value)}
                        placeholder="#10B981"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        type="color"
                        value={brandData.accentColor}
                        onChange={(e) => handleColorChange("accentColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandData.accentColor}
                        onChange={(e) => handleColorChange("accentColor", e.target.value)}
                        placeholder="#F59E0B"
                        className="flex-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="backgroundColor">Background Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="backgroundColor"
                        type="color"
                        value={brandData.backgroundColor}
                        onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                        className="w-16 h-10 p-1"
                      />
                      <Input
                        value={brandData.backgroundColor}
                        onChange={(e) => handleColorChange("backgroundColor", e.target.value)}
                        placeholder="#F8FAFC"
                        className="flex-1"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Color Presets</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-3">
                    {colorPresets.map((preset) => (
                      <div
                        key={preset.name}
                        className="p-3 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => applyColorPreset(preset)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">{preset.name}</span>
                          <Button variant="ghost" size="sm">
                            Apply
                          </Button>
                        </div>
                        <div className="flex gap-2">
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: preset.primary }}
                            title="Primary"
                          />
                          <div
                            className="w-6 h-6 rounded"
                            style={{ backgroundColor: preset.secondary }}
                            title="Secondary"
                          />
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.accent }} title="Accent" />
                          <div
                            className="w-6 h-6 rounded border"
                            style={{ backgroundColor: preset.background }}
                            title="Background"
                          />
                          <div className="w-6 h-6 rounded" style={{ backgroundColor: preset.text }} title="Text" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Color Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Color Combination Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-lg" style={{ backgroundColor: brandData.primaryColor, color: "white" }}>
                    <h3 className="font-bold">Primary Color</h3>
                    <p className="text-sm opacity-90">Main brand color for buttons and highlights</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: brandData.secondaryColor, color: "white" }}>
                    <h3 className="font-bold">Secondary Color</h3>
                    <p className="text-sm opacity-90">Supporting color for secondary elements</p>
                  </div>
                  <div className="p-4 rounded-lg" style={{ backgroundColor: brandData.accentColor, color: "white" }}>
                    <h3 className="font-bold">Accent Color</h3>
                    <p className="text-sm opacity-90">Accent color for special highlights</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Brand Assets Tab */}
          <TabsContent value="assets" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Logo Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Primary Logo</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Upload your primary logo</p>
                      <Button variant="outline">Choose File</Button>
                    </div>
                  </div>
                  <div>
                    <Label>Logo (Dark Version)</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                      <p className="text-sm text-gray-600 mb-2">Upload dark version for light backgrounds</p>
                      <Button variant="outline">Choose File</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5" />
                    Additional Assets
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label>Favicon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-2">32x32 px recommended</p>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </div>
                  </div>
                  <div>
                    <Label>App Icon</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                      <p className="text-xs text-gray-600 mb-2">512x512 px recommended</p>
                      <Button variant="outline" size="sm">
                        Upload
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Brand Guidelines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Download className="h-6 w-6" />
                    <span>Download Brand Kit</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <Paintbrush className="h-6 w-6" />
                    <span>Style Guide</span>
                  </Button>
                  <Button variant="outline" className="h-20 flex-col gap-2">
                    <ImageIcon className="h-6 w-6" />
                    <span>Asset Library</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preview Tab */}
          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Brand Preview
                  </CardTitle>
                  <div className="flex gap-2">
                    <Button
                      variant={previewMode === "desktop" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("desktop")}
                    >
                      <Monitor className="mr-2 h-4 w-4" />
                      Desktop
                    </Button>
                    <Button
                      variant={previewMode === "mobile" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("mobile")}
                    >
                      <Smartphone className="mr-2 h-4 w-4" />
                      Mobile
                    </Button>
                    <Button
                      variant={previewMode === "email" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setPreviewMode("email")}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Email
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div
                  className={`border rounded-lg overflow-hidden ${previewMode === "mobile" ? "max-w-sm mx-auto" : ""}`}
                >
                  <div
                    className="p-6"
                    style={{
                      backgroundColor: brandData.backgroundColor,
                      fontFamily: brandData.fontFamily,
                      color: brandData.textColor,
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6 pb-4 border-b">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold"
                          style={{ backgroundColor: brandData.primaryColor }}
                        >
                          {brandData.companyName.charAt(0)}
                        </div>
                        <div>
                          <h1 className="text-xl font-bold">{brandData.companyName}</h1>
                          <p className="text-sm opacity-75">{brandData.tagline}</p>
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4">
                      <div>
                        <h2 className="text-lg font-semibold mb-2">Welcome to {brandData.companyName}</h2>
                        <p className="text-sm leading-relaxed">{brandData.description}</p>
                      </div>

                      <div className="flex gap-3">
                        <button
                          className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                          style={{ backgroundColor: brandData.primaryColor }}
                        >
                          Primary Button
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                          style={{ backgroundColor: brandData.secondaryColor }}
                        >
                          Secondary Button
                        </button>
                        <button
                          className="px-4 py-2 rounded-lg text-white font-medium text-sm"
                          style={{ backgroundColor: brandData.accentColor }}
                        >
                          Accent Button
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="p-4 rounded-lg border">
                          <h3 className="font-semibold mb-2">Feature One</h3>
                          <p className="text-sm opacity-75">Description of your first key feature or service.</p>
                        </div>
                        <div className="p-4 rounded-lg border">
                          <h3 className="font-semibold mb-2">Feature Two</h3>
                          <p className="text-sm opacity-75">Description of your second key feature or service.</p>
                        </div>
                        <div className="p-4 rounded-lg border">
                          <h3 className="font-semibold mb-2">Feature Three</h3>
                          <p className="text-sm opacity-75">Description of your third key feature or service.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
  )
}
