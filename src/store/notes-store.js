import { create } from "zustand"
import { notesApi, type Note, type CreateNoteData, type UpdateNoteData, type NotesStats } from "../services/notes-api"

interface NotesState {
  notes: Note[]
  selectedNote: Note | null
  stats: NotesStats | null
  isLoading: boolean
  isCreating: boolean
  isUpdating: boolean
  isDeleting: boolean
  error: string | null

  // Actions
  fetchNotes: (leadId: string) => Promise<void>
  createNote: (leadId: string, data: CreateNoteData) => Promise<void>
  updateNote: (noteId: string, data: UpdateNoteData) => Promise<void>
  deleteNote: (noteId: string) => Promise<void>
  addComment: (noteId: string, content: string) => Promise<void>
  deleteComment: (commentId: string, noteId: string) => Promise<void>
  selectNote: (note: Note | null) => void
  clearError: () => void
}

export const useNotesStore = create<NotesState>((set, get) => ({
  notes: [],
  selectedNote: null,
  stats: null,
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,

  fetchNotes: async (leadId: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await notesApi.getNotes(leadId)
      set({
        notes: response.notes,
        stats: response.stats,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch notes",
        isLoading: false,
      })
    }
  },

  createNote: async (leadId: string, data: CreateNoteData) => {
    set({ isCreating: true, error: null })
    try {
      const newNote = await notesApi.createNote(leadId, data)
      set((state) => ({
        notes: [newNote, ...state.notes],
        isCreating: false,
      }))

      // Refresh stats
      const { fetchNotes } = get()
      await fetchNotes(leadId)
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create note",
        isCreating: false,
      })
    }
  },

  updateNote: async (noteId: string, data: UpdateNoteData) => {
    set({ isUpdating: true, error: null })
    try {
      const updatedNote = await notesApi.updateNote(noteId, data)
      set((state) => ({
        notes: state.notes.map((note) => (note.id === noteId ? updatedNote : note)),
        selectedNote: state.selectedNote?.id === noteId ? updatedNote : state.selectedNote,
        isUpdating: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to update note",
        isUpdating: false,
      })
    }
  },

  deleteNote: async (noteId: string) => {
    set({ isDeleting: true, error: null })
    try {
      await notesApi.deleteNote(noteId)
      set((state) => ({
        notes: state.notes.filter((note) => note.id !== noteId),
        selectedNote: state.selectedNote?.id === noteId ? null : state.selectedNote,
        isDeleting: false,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete note",
        isDeleting: false,
      })
    }
  },

  addComment: async (noteId: string, content: string) => {
    set({ error: null })
    try {
      const newComment = await notesApi.addComment(noteId, content)
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId ? { ...note, comments: [...note.comments, newComment] } : note,
        ),
        selectedNote:
          state.selectedNote?.id === noteId
            ? { ...state.selectedNote, comments: [...state.selectedNote.comments, newComment] }
            : state.selectedNote,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to add comment",
      })
    }
  },

  deleteComment: async (commentId: string, noteId: string) => {
    set({ error: null })
    try {
      await notesApi.deleteComment(commentId)
      set((state) => ({
        notes: state.notes.map((note) =>
          note.id === noteId
            ? { ...note, comments: note.comments.filter((comment) => comment.id !== commentId) }
            : note,
        ),
        selectedNote:
          state.selectedNote?.id === noteId
            ? {
                ...state.selectedNote,
                comments: state.selectedNote.comments.filter((comment) => comment.id !== commentId),
              }
            : state.selectedNote,
      }))
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete comment",
      })
    }
  },

  selectNote: (note: Note | null) => {
    set({ selectedNote: note })
  },

  clearError: () => {
    set({ error: null })
  },
}))
