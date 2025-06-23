import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Plus, MoreHorizontal, Clock, Tag, MessageSquare, Loader2, X } from "lucide-react"
import { AddNoteModal } from "./add-note-modal"
import { Comments } from "./comments"
import { getNotes } from "@/services/LeadService"
import { useParams } from "react-router-dom"

export function NotesTab() {
  const [isAddNoteModalOpen, setIsAddNoteModalOpen] = useState(false)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const params = useParams()
  const leadId = params?.id || 2

  const fetchNotes = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await getNotes(leadId);
      console.log("🚀 ~ fetchNotes ~ response:", response);
      setNotes(response?.results || response || []);
    } catch (error) {
      console.error("Error fetching notes:", error);
      setError("Failed to fetch notes");
      setNotes([]);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchNotes();
  }, [leadId]);

  const currentUser = {
    id: "user1",
    name: "Jennifer Wilson",
    initials: "JW",
  }

  const handleAddNote = async (noteData) => {
    try {
      // TODO: Implement create note functionality
      console.log("Creating note:", noteData)
      setIsAddNoteModalOpen(false)
    } catch (error) {
      console.error("Failed to create note:", error)
    }
  }

  const handleAddComment = async (noteId, content) => {
    try {
      // TODO: Implement add comment functionality
      console.log("Adding comment to note:", noteId, content)
    } catch (error) {
      console.error("Failed to add comment:", error)
    }
  }

  const handleDeleteNote = async (noteId) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        // TODO: Implement delete note functionality
        console.log("Deleting note:", noteId)
      } catch (error) {
        console.error("Failed to delete note:", error)
      }
    }
  }

  const handleUpdateNote = async (noteId, data) => {
    try {
      // TODO: Implement update note functionality
      console.log("Updating note:", noteId, data)
    } catch (error) {
      console.error("Failed to update note:", error)
    }
  }

  const handleDeleteComment = async (commentId, noteId) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        // TODO: Implement delete comment functionality
        console.log("Deleting comment:", commentId, "from note:", noteId)
      } catch (error) {
        console.error("Failed to delete comment:", error)
      }
    }
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    
    const date = new Date(dateString);
    if (isNaN(date.getTime())) {
      return "Invalid date";
    }
    
    return date.toLocaleString();
  }

  if (isLoading && notes.length === 0) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-12 w-12 animate-spin mr-2" />
        <span>Loading notes...</span>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {error && (
        <Alert variant="destructive">
          <AlertDescription className="flex items-center justify-between">
            {error}
            <Button variant="ghost" size="sm" onClick={() => setError(null)} className="h-auto p-1">
              <X className="h-4 w-4" />
            </Button>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Notes</h2>
          <p className="text-sm text-gray-500">
            {notes.length} notes
          </p>
        </div>
        <Button onClick={() => setIsAddNoteModalOpen(true)} disabled={isLoading}>
          <Plus className="h-4 w-4 mr-2" /> Add Note
        </Button>
      </div>

      <div className="space-y-6">
        {notes?.length === 0 ? (
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
          notes?.map((note) => (
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
                        {note.authorRole && (
                          <span className="ml-1 text-xs text-gray-400">({note.authorRole})</span>
                        )}
                      </div>
                      <span className="mx-2">•</span>
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        {formatDate(note.created_at)}

                      </div>
                      {/* {note.created_at && note.updated_at !== note.created_at && (
                        <>
                          <span className="mx-2">•</span>
                          <span className="text-xs">
                            Updated {formatDate(note.updated_at)}
                          </span>
                        </>
                      )} */}
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
                  <p className="text-gray-700 whitespace-pre-wrap">{stripHtml(note.content)}</p>
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

      {isLoading && notes.length > 0 && (
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-4 w-4 animate-spin mr-2" />
          <span className="text-sm text-gray-500">Updating...</span>
        </div>
      )}

      <AddNoteModal
        isOpen={isAddNoteModalOpen}
        onClose={() => setIsAddNoteModalOpen(false)}
        onAddNote={handleAddNote}
        isLoading={isLoading}
      />
    </div>
  )
}
