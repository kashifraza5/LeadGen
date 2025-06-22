import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MoreHorizontal, Trash2, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Send, Loader2 } from "lucide-react"
// import { useNotesStore } from "@/store/notes-store"

export function Comments({ noteId, comments, currentUser, onAddComment, onDeleteComment }) {
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [deletingCommentId, setDeletingCommentId] = useState(null)

  // Get loading state from store
  // const { error } = useNotesStore()

  // Helper function to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!newComment.trim() || isSubmitting) return

    setIsSubmitting(true)
    try {
      await onAddComment(noteId, newComment.trim())
      setNewComment("")
    } catch (error) {
      console.error("Failed to add comment:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId) => {
    if (!onDeleteComment) return

    if (window.confirm("Are you sure you want to delete this comment?")) {
      setDeletingCommentId(commentId)
      try {
        await onDeleteComment(commentId, noteId)
      } catch (error) {
        console.error("Failed to delete comment:", error)
      } finally {
        setDeletingCommentId(null)
      }
    }
  }

  return (
    <div className="mt-6 border-t pt-4">
      {/* Existing Comments */}
      {comments.length > 0 && (
        <div className="space-y-4 mb-4">
          {comments.map((comment) => (
            <div key={comment.id} className="flex space-x-3">
              <Avatar className="h-8 w-8">
                <AvatarFallback className="text-xs bg-gray-100 text-gray-600">
                  {getInitials(comment.authorName || "Unknown")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2 text-sm">
                    <span className="font-medium text-gray-900">{comment.authorName || "Unknown Author"}</span>
                    {comment.authorRole && <span className="text-xs text-gray-400">({comment.authorRole})</span>}
                    <div className="flex items-center text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {new Date(comment.createdAt).toLocaleString()}
                    </div>
                  </div>
                  {/* Delete button for comment author or current user */}
                  {onDeleteComment && (comment.authorId === currentUser.id || currentUser.id === "admin") && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDeleteComment(comment.id)}
                      disabled={deletingCommentId === comment.id}
                      className="h-auto p-1 text-gray-400 hover:text-red-600"
                    >
                      {deletingCommentId === comment.id ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <Trash2 className="h-3 w-3" />
                      )}
                    </Button>
                  )}
                </div>
                <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add New Comment */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs bg-blue-100 text-blue-600">{currentUser.initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="min-h-[80px] resize-none"
              disabled={isSubmitting}
              onKeyDown={(e) => {
                if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                  handleSubmit(e)
                }
              }}
            />
            <p className="text-xs text-gray-500 mt-1">Press Cmd+Enter (Mac) or Ctrl+Enter (Windows) to submit</p>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-xs text-gray-500">{newComment.length > 0 && `${newComment.length} characters`}</div>
          <div className="flex space-x-2">
            {newComment.trim() && (
              <Button type="button" variant="ghost" size="sm" onClick={() => setNewComment("")} disabled={isSubmitting}>
                Cancel
              </Button>
            )}
            <Button type="submit" size="sm" disabled={!newComment.trim() || isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-3 w-3 mr-1" />
                  Post Comment
                </>
              )}
            </Button>
          </div>
        </div>
      </form>

      {/* Error Display */}
      {/* {error && <div className="mt-2 text-sm text-red-600 bg-red-50 p-2 rounded">{error}</div>} */}
    </div>
  )
}
