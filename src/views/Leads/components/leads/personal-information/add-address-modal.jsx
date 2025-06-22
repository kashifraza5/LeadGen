import React, { useState, useCallback } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const AddAddressModal = ({ isOpen, onClose, onAddAddress }) => {
  const [street, setStreet] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("USA")
  const [addressType, setAddressType] = useState("home")
  const [isPrimary, setIsPrimary] = useState(false)

  // Input change handlers
  const handleStreetChange = useCallback((e) => {
    setStreet(e.target.value)
  }, [])

  const handleCityChange = useCallback((e) => {
    setCity(e.target.value)
  }, [])

  const handleStateChange = useCallback((e) => {
    setState(e.target.value)
  }, [])

  const handleZipChange = useCallback((e) => {
    setZip(e.target.value)
  }, [])

  const handleCountryChange = useCallback((value) => {
    setCountry(value)
  }, [])

  const handleAddressTypeChange = useCallback((value) => {
    setAddressType(value)
  }, [])

  const handlePrimaryChange = useCallback((e) => {
    setIsPrimary(e.target.checked)
  }, [])

  // Form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (street.trim() && city.trim() && state.trim() && zip.trim()) {
      onAddAddress({
        street: street.trim(),
        city: city.trim(),
        state: state.trim(),
        zip: zip.trim(),
        country,
        type: addressType,
        isPrimary,
      })
      
      // Reset form
      setStreet("")
      setCity("")
      setState("")
      setZip("")
      setCountry("USA")
      setAddressType("home")
      setIsPrimary(false)
      onClose()
    }
  }, [street, city, state, zip, country, addressType, isPrimary, onAddAddress, onClose])

  // Reset form when modal closes
  const handleClose = useCallback(() => {
    setStreet("")
    setCity("")
    setState("")
    setZip("")
    setCountry("USA")
    setAddressType("home")
    setIsPrimary(false)
    onClose()
  }, [onClose])

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Address</h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="street">Street Address</Label>
              <Input
                id="street"
                value={street}
                onChange={handleStreetChange}
                placeholder="Enter street address"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={city}
                  onChange={handleCityChange}
                  placeholder="Enter city"
                  required
                />
              </div>
              <div>
                <Label htmlFor="state">State/Province</Label>
                <Input
                  id="state"
                  value={state}
                  onChange={handleStateChange}
                  placeholder="Enter state"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="zip">ZIP/Postal Code</Label>
                <Input
                  id="zip"
                  value={zip}
                  onChange={handleZipChange}
                  placeholder="Enter ZIP code"
                  required
                />
              </div>
              <div>
                <Label htmlFor="country">Country</Label>
                <Select value={country} onValueChange={handleCountryChange}>
                  <SelectTrigger id="country">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="CAN">Canada</SelectItem>
                    <SelectItem value="MEX">Mexico</SelectItem>
                    <SelectItem value="GBR">United Kingdom</SelectItem>
                    <SelectItem value="AUS">Australia</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>Address Type</Label>
              <RadioGroup value={addressType} onValueChange={handleAddressTypeChange} className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home-address" />
                  <Label htmlFor="home-address">Home</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work-address" />
                  <Label htmlFor="work-address">Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mailing" id="mailing" />
                  <Label htmlFor="mailing">Mailing</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="primary-address"
                checked={isPrimary}
                onChange={handlePrimaryChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="primary-address">Set as primary address</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Address
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export { AddAddressModal }
