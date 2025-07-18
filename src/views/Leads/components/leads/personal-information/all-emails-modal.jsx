import React, { useCallback } from "react"
import { X, Mail, Star, StarOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const AllEmailsModal = ({ isOpen, onClose, emails, onSetPrimary, onDeleteEmail }) => {
  // Memoized function to get type color
  const getTypeColor = useCallback((type) => {
    switch (type) {
      case "personal":
        return "bg-blue-100 text-blue-800"
      case "work":
        return "bg-green-100 text-green-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }, [])

  // Memoized handlers for better performance
  const handleSetPrimary = useCallback((id) => {
    onSetPrimary(id)
  }, [onSetPrimary])

  const handleDeleteEmail = useCallback((id) => {
    onDeleteEmail(id)
  }, [onDeleteEmail])

  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">All Email Addresses</h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-3 max-h-[60vh] overflow-y-auto">
          {emails.map((email) => (
            <div key={email.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-500" />
                <div>
                  <div className="font-medium">{email.address}</div>
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getTypeColor(email.type)}>
                      {email.type}
                    </Badge>
                    {email.isPrimary && (
                      <Badge variant="outline" className="bg-purple-100 text-purple-800">
                        Primary
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex space-x-1">
                {!email.isPrimary && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleSetPrimary(email.id)}
                    title="Set as primary"
                  >
                    <Star className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                {!email.isPrimary && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => handleDeleteEmail(email.id)}
                    title="Delete email"
                  >
                    <Trash2 className="h-4 w-4 text-gray-500" />
                  </Button>
                )}
                {email.isPrimary && (
                  <Button variant="ghost" size="icon" className="h-8 w-8" disabled title="Primary email">
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

export { AllEmailsModal }
