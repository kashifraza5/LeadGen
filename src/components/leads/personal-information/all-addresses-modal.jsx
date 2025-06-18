
import { X, MapPin, Star, StarOff, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Address {
  id: string
  street: string
  city: string
  state: string
  zip: string
  country: string
  type: string
  isPrimary: boolean
}

interface AllAddressesModalProps {
  isOpen: boolean
  onClose: () => void
  addresses: Address[]
  onSetPrimary: (id: string) => void
  onDeleteAddress: (id: string) => void
}

export function AllAddressesModal({
  isOpen,
  onClose,
  addresses,
  onSetPrimary,
  onDeleteAddress,
}: AllAddressesModalProps) {
  if (!isOpen) return null

  const getTypeColor = (type: string) => {
    switch (type) {
      case "home":
        return "bg-green-100 text-green-800"
      case "work":
        return "bg-blue-100 text-blue-800"
      case "mailing":
        return "bg-purple-100 text-purple-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">All Addresses</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-4 max-h-[60vh] overflow-y-auto">
          {addresses.map((address) => (
            <div key={address.id} className="p-4 bg-gray-50 rounded-md">
              <div className="flex justify-between items-start">
                <div className="flex items-start space-x-3">
                  <MapPin className="h-5 w-5 text-gray-500 mt-0.5" />
                  <div>
                    <div className="font-medium">{address.street}</div>
                    <div>
                      {address.city}, {address.state} {address.zip}
                    </div>
                    <div>{address.country}</div>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant="outline" className={getTypeColor(address.type)}>
                        {address.type}
                      </Badge>
                      {address.isPrimary && (
                        <Badge variant="outline" className="bg-purple-100 text-purple-800">
                          Primary
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex space-x-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8" title="View on map">
                    <MapPin className="h-4 w-4 text-gray-500" />
                  </Button>
                  {!address.isPrimary && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onSetPrimary(address.id)}
                      title="Set as primary"
                    >
                      <Star className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  {!address.isPrimary && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onDeleteAddress(address.id)}
                      title="Delete address"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                  {address.isPrimary && (
                    <Button variant="ghost" size="icon" className="h-8 w-8" disabled title="Primary address">
                      <StarOff className="h-4 w-4 text-gray-300" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-end mt-4">
          <Button onClick={onClose}>Close</Button>
        </div>
      </div>
    </div>
  )
}
