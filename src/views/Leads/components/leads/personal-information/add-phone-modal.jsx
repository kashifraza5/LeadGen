import React, { useState, useCallback } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const AddPhoneModal = ({ isOpen, onClose, onAddPhone }) => {
  const [phone, setPhone] = useState("")
  const [phoneType, setPhoneType] = useState("mobile")
  const [isPrimary, setIsPrimary] = useState(false)

  // Input change handlers
  const handlePhoneChange = useCallback((e) => {
    setPhone(e.target.value)
  }, [])

  const handlePhoneTypeChange = useCallback((value) => {
    setPhoneType(value)
  }, [])

  const handlePrimaryChange = useCallback((e) => {
    setIsPrimary(e.target.checked)
  }, [])

  // Form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (phone.trim()) {
      onAddPhone({
        number: phone.trim(),
        type: phoneType,
        isPrimary,
      })
      
      // Reset form
      setPhone("")
      setPhoneType("mobile")
      setIsPrimary(false)
      onClose()
    }
  }, [phone, phoneType, isPrimary, onAddPhone, onClose])

  // Reset form when modal closes
  const handleClose = useCallback(() => {
    setPhone("")
    setPhoneType("mobile")
    setIsPrimary(false)
    onClose()
  }, [onClose])

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Phone Number</h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={handlePhoneChange}
                placeholder="Enter phone number"
                required
              />
            </div>

            <div>
              <Label>Phone Type</Label>
              <RadioGroup value={phoneType} onValueChange={handlePhoneTypeChange} className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Label htmlFor="mobile">Mobile</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work-phone" />
                  <Label htmlFor="work-phone">Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="home" id="home" />
                  <Label htmlFor="home">Home</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="primary-phone"
                checked={isPrimary}
                onChange={handlePrimaryChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="primary-phone">Set as primary phone</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Phone
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export { AddPhoneModal }
