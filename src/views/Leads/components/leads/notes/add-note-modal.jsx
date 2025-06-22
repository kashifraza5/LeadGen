import React, { useState } from "react"
import { X, Bold, Italic, List, ListOrdered, Link, ImageIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

export function AddNoteModal({ isOpen, onClose, onAddNote }) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [currentTag, setCurrentTag] = useState("")
  const [tags, setTags] = useState([])

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    if (title.trim() && content.trim()) {
      onAddNote({
        title: title.trim(),
        content: content.trim(),
        tags,
      })
      setTitle("")
      setContent("")
      setTags([])
      onClose()
    }
  }

  const handleAddTag = () => {
    if (currentTag.trim() && !tags.includes(currentTag.trim())) {
      setTags([...tags, currentTag.trim()])
      setCurrentTag("")
    }
  }

  const handleRemoveTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && currentTag.trim()) {
      e.preventDefault()
      handleAddTag()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Add Note</h3>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="note-title">Title</Label>
              <Input
                id="note-title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter note title"
                required
              />
            </div>

            <div>
              <Label htmlFor="note-content">Content</Label>
              <div className="border rounded-md">
                {/* Rich text toolbar */}
                <div className="flex items-center space-x-1 p-1 border-b">
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Bold className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Italic className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <List className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <ListOrdered className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <Link className="h-4 w-4" />
                  </Button>
                  <Button type="button" variant="ghost" size="icon" className="h-8 w-8">
                    <ImageIcon className="h-4 w-4" />
                  </Button>
                </div>

                {/* Text area */}
                <Textarea
                  id="note-content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Enter note content..."
                  className="min-h-[200px] border-0 focus-visible:ring-0 resize-none"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="note-tags">Tags</Label>
              <div className="flex items-center">
                <Input
                  id="note-tags"
                  value={currentTag}
                  onChange={(e) => setCurrentTag(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Add tags (press Enter to add)"
                  className="flex-1"
                />
                <Button type="button" variant="outline" onClick={handleAddTag} className="ml-2">
                  Add
                </Button>
              </div>

              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-blue-50 text-blue-700">
                      {tag}
                      <button
                        type="button"
                        className="ml-1 text-blue-700 hover:text-blue-900"
                        onClick={() => handleRemoveTag(tag)}
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                Save Note
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
