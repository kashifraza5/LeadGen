
import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, MoreHorizontal, Clock, Tag, MessageSquare, Loader2, X } from "lucide-react"
import { AddNoteModal } from "./add-note-modal"
import { Comments } from "./comments"
import { useNotesStore } from "@/store/notes-store"

interface User {
  id: string
  name: string
  initials: string
}

interface SectionProps {
  leadId?: string
}

export function Section({ leadId = "lead-123" }: SectionProps) {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)

  // Get state and actions from the store
  const {
    notes,
    stats,
    isLoading,
    error,
    fetchNotes,
    createNote,
    updateNote,
    deleteNote,
    addComment,
    deleteComment,
    clearError,
  } = useNotesStore()

  // Current user for comments
  const currentUser: User = {
    id: "user1",
    name: "Jennifer Wilson",
    initials: "JW",
  }

  // Fetch notes when component mounts
  useEffect(() => {
    if (leadId) {
      fetchNotes(leadId)
    }
  }, [leadId, fetchNotes])

  // Handle adding a new note
  const handleAddNote = async (noteData: { title: string; content: string; tags: string[] }) => {
    try {
      await createNote(leadId, noteData)
      setIsAddNoteModalOpen(false)
    } catch (error) {
      console.error("Failed to create note:", error)
    }
  }

  // Handle adding a comment to a note
  const handleAddComment = async (noteId: string, content: string) => {
    try {
      await addComment(noteId, content)
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  // Handle deleting a note
  const handleDeleteNote = async (noteId: string) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await deleteNote(noteId)
      } catch (error) {
        console.error("Failed to delete note:", error)
      }
    }
  }

  // Handle updating a note
  const handleUpdateNote = async (noteId: string, data: { title: string; content: string; tags: string[] }) => {
    try {
      await updateNote(noteId, data)
    } catch (error) {
      console.error("Failed to update note:", error)
    }
  }

  // Handle deleting a comment
  const handleDeleteComment = async (commentId: string, noteId: string) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await deleteComment(commentId, noteId)
      } catch (error) {
        console.error("Failed to delete comment:", error)
      }
    }
  }

  // Helper function to get initials from name
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  if (isLoading && notes.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-6 w-6 animate-spin mr-2" />
        <span>Loading notes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={clearError} className="h-auto p-1">
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Header with Stats */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Notes</h2>
          {stats && (
            <p className="text-sm text-gray-500">
              {stats.totalNotes} notes • {stats.totalComments} comments
              {stats.lastActivity && <span> • Last activity {new Date(stats.lastActivity).toLocaleDateString()}</span>}
            </p>
          )}
        </div>
        <Button onClick={() => setIsAddNoteModalOpen(true)} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" /> Add Note
        </Button>
      </div>

      {/* Notes List */}
      <div className="space-y-6">
        {notes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notes yet</h3>
              <p className="text-gray-500 mb-4">Start by adding your first note for this lead.</p>
              <Button onClick={() => setIsAddNoteModalOpen(true)}>
                <Plus className="h-4 w-4 mr-2" /> Add First Note
              </Button>
            </CardContent>
          </Card>
        ) : (
          notes.map((note) => (
            <Card key={note.id}>
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-medium text-lg">{note.title}</h3>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <div className="flex items-center">
                        <Avatar className="h-5 w-5 mr-1">
                          <AvatarFallback className="text-xs bg-blue-100 text-blue-600">
                            {getInitials(note.authorName || "Unknown")}
                          </AvatarFallback>
                        </Avatar>
                        {note.authorName || "Unknown Author"}
                        {note.authorRole && <span className="ml-1 text-xs text-gray-400">({note.authorRole})</span>}
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {new Date(note.createdAt).toLocaleString()}
                      </div>
                      {note.updatedAt && note.updatedAt !== note.createdAt && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-xs">Updated {new Date(note.updatedAt).toLocaleString()}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleDeleteNote(note.id)} disabled={isLoading}>
                      Delete
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{note.content}</p>
                </div>

                {note.tags && note.tags.length > 0 && (
                  <div className="flex items-center mt-4">
                    <Tag className="h-3.5 w-3.5 text-gray-500 mr-2" />
                    <div className="flex flex-wrap gap-1">
                      {note.tags.map((tag) => (
                        <Badge key={tag} variant="outline" className="bg-gray-50">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center text-sm text-gray-500">
                  <MessageSquare className="h-3.5 w-3.5 mr-1" />
                  <span>{note.comments?.length || 0} comments</span>
                </div>

                <Comments
                  noteId={note.id}
                  comments={note.comments || []}
                  currentUser={currentUser}
                  onAddComment={handleAddComment}
                  onDeleteComment={handleDeleteComment}
                />
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Loading indicator for operations */}
      {isLoading && notes.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-gray-500">Updating...</span>
        </div>
      )}

      {/* Add Note Modal */}
      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        onAddNote={handleAddNote}
        isLoading={isLoading}
      />
    </div>
  )
}
