import React, { useState, useCallback } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

const AddEmailModal = ({ isOpen, onClose, onAddEmail }) => {
  const [email, setEmail] = useState("")
  const [emailType, setEmailType] = useState("personal")
  const [isPrimary, setIsPrimary] = useState(false)

  // Input change handlers
  const handleEmailChange = useCallback((e) => {
    setEmail(e.target.value)
  }, [])

  const handleEmailTypeChange = useCallback((value) => {
    setEmailType(value)
  }, [])

  const handlePrimaryChange = useCallback((e) => {
    setIsPrimary(e.target.checked)
  }, [])

  // Form submission handler
  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (email.trim()) {
      onAddEmail({
        address: email.trim(),
        type: emailType,
        isPrimary,
      })
      
      // Reset form
      setEmail("")
      setEmailType("personal")
      setIsPrimary(false)
      onClose()
    }
  }, [email, emailType, isPrimary, onAddEmail, onClose])

  // Reset form when modal closes
  const handleClose = useCallback(() => {
    setEmail("")
    setEmailType("personal")
    setIsPrimary(false)
    onClose()
  }, [onClose])

  // Don't render if modal is not open
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Email Address</h3>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="Enter email address"
                required
              />
            </div>

            <div>
              <Label>Email Type</Label>
              <RadioGroup value={emailType} onValueChange={handleEmailTypeChange} className="flex space-x-4 mt-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="personal" id="personal" />
                  <Label htmlFor="personal">Personal</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="work" id="work" />
                  <Label htmlFor="work">Work</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="other" id="other" />
                  <Label htmlFor="other">Other</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="primary"
                checked={isPrimary}
                onChange={handlePrimaryChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <Label htmlFor="primary">Set as primary email</Label>
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={handleClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Add Email
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export { AddEmailModal }
