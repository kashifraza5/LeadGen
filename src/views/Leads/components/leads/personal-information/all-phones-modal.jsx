import React, { useCallback } from "react"
import { X, Phone, MessageSquare, Star, StarOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const AllPhonesModal = ({ isOpen, onClose, phones, onSetPrimary, onDeletePhone }) => {
  // Memoized function to get type color
  const getTypeColor = useCallback((type) => {
    switch (type) {
      case "mobile":
        return "bg-green-100 text-green-800"
      case "work":
        return "bg-blue-100 text-blue-800"
      case "home":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  // Memoized handlers for better performance
  const handleSetPrimary = useCallback((id) => {
    onSetPrimary(id)
  }, [onSetPrimary])

  const handleDeletePhone = useCallback((id) => {
    onDeletePhone(id)
  }, [onDeletePhone])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">All Phone Numbers</h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {phones.map((phone) => (
            <div key={phone.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{phone.number}</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getTypeColor(phone.type)}>
                      {phone.type}
                    </Badge>
                    {phone.isPrimary && (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        Primary
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Call">
                  <Phone className="h-4 w-4 text-gray-500" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" title="Message">
                  <MessageSquare className="h-4 w-4 text-gray-500" />
                </Button>
                {!phone.isPrimary && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleSetPrimary(phone.id)}
                    title="Set as primary"
                  >
                    <Star className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                {!phone.isPrimary && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeletePhone(phone.id)}
                    title="Delete phone"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                {phone.isPrimary && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled title="Primary phone">
                    <StarOff className="h-4 w-4 text-gray-300" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={handleClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}

export { AllPhonesModal }
