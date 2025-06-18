import { ApiService } from "./api"

export interface Note {
  id: string
  leadId: string
  title: string
  content: string
  tags: string[]
  authorId: string
  authorName: string
  authorRole: string
  authorAvatar: string
  createdAt: string
  updatedAt: string
  comments: Comment[]
}

export interface Comment {
  id: string
  noteId: string
  content: string
  authorId: string
  authorName: string
  authorRole: string
  authorAvatar: string
  createdAt: string
}

export interface CreateNoteData {
  title: string
  content: string
  tags: string[]
}

export interface UpdateNoteData {
  title?: string
  content?: string
  tags?: string[]
}

export interface NotesStats {
  totalNotes: number
  totalComments: number
  lastActivity: string
}

export class NotesApiService extends ApiService {
  async getNotes(leadId: string): Promise<{ notes: Note[]; stats: NotesStats }> {
    // TODO: Replace with actual API call
    // const response = await this.get<{ notes: Note[]; stats: NotesStats }>(`/leads/${leadId}/notes`);
    // return response;

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const dummyNotes: Note[] = [
      {
        id: "note-1",
        leadId,
        title: "Initial Contact",
        content:
          "Had a great conversation with the client about their investment goals. They seem interested in our retirement planning services.",
        tags: ["initial-contact", "retirement"],
        authorId: "advisor-1",
        authorName: "Sarah Johnson",
        authorRole: "Senior Advisor",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        createdAt: "2024-01-15T10:30:00Z",
        updatedAt: "2024-01-15T10:30:00Z",
        comments: [
          {
            id: "comment-1",
            noteId: "note-1",
            content: "Great work on the initial contact! Let's schedule a follow-up meeting.",
            authorId: "advisor-2",
            authorName: "Mike Chen",
            authorRole: "Investment Advisor",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            createdAt: "2024-01-15T14:20:00Z",
          },
        ],
      },
      {
        id: "note-2",
        leadId,
        title: "Follow-up Meeting",
        content:
          "Discussed portfolio diversification strategies. Client is particularly interested in ESG investments.",
        tags: ["follow-up", "esg", "portfolio"],
        authorId: "advisor-2",
        authorName: "Mike Chen",
        authorRole: "Investment Advisor",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        createdAt: "2024-01-18T09:15:00Z",
        updatedAt: "2024-01-18T09:15:00Z",
        comments: [],
      },
      {
        id: "note-3",
        leadId,
        title: "Risk Assessment",
        content:
          "Completed comprehensive risk assessment. Client has moderate risk tolerance with 15-year investment horizon.",
        tags: ["risk-assessment", "moderate-risk"],
        authorId: "advisor-1",
        authorName: "Sarah Johnson",
        authorRole: "Senior Advisor",
        authorAvatar: "/placeholder.svg?height=32&width=32",
        createdAt: "2024-01-20T16:45:00Z",
        updatedAt: "2024-01-20T16:45:00Z",
        comments: [
          {
            id: "comment-2",
            noteId: "note-3",
            content: "Perfect! This aligns well with our balanced portfolio options.",
            authorId: "advisor-3",
            authorName: "Emily Davis",
            authorRole: "Portfolio Manager",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            createdAt: "2024-01-20T17:30:00Z",
          },
          {
            id: "comment-3",
            noteId: "note-3",
            content: "I'll prepare some portfolio recommendations based on this assessment.",
            authorId: "advisor-2",
            authorName: "Mike Chen",
            authorRole: "Investment Advisor",
            authorAvatar: "/placeholder.svg?height=32&width=32",
            createdAt: "2024-01-21T08:15:00Z",
          },
        ],
      },
    ]

    const dummyStats: NotesStats = {
      totalNotes: dummyNotes.length,
      totalComments: dummyNotes.reduce((total, note) => total + note.comments.length, 0),
      lastActivity: "2024-01-21T08:15:00Z",
    }

    return { notes: dummyNotes, stats: dummyStats }
  }

  async createNote(leadId: string, data: CreateNoteData): Promise<Note> {
    // TODO: Replace with actual API call
    // const response = await this.post<Note>(`/leads/${leadId}/notes`, data);
    // return response;

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newNote: Note = {
      id: `note-${Date.now()}`,
      leadId,
      title: data.title,
      content: data.content,
      tags: data.tags,
      authorId: "current-advisor",
      authorName: "Current Advisor",
      authorRole: "Senior Advisor",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      comments: [],
    }

    return newNote
  }

  async updateNote(noteId: string, data: UpdateNoteData): Promise<Note> {
    // TODO: Replace with actual API call
    // const response = await this.put<Note>(`/notes/${noteId}`, data);
    // return response;

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    // Simulate updating the note
    const updatedNote: Note = {
      id: noteId,
      leadId: "current-lead",
      title: data.title || "Updated Note",
      content: data.content || "Updated content",
      tags: data.tags || [],
      authorId: "current-advisor",
      authorName: "Current Advisor",
      authorRole: "Senior Advisor",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: "2024-01-15T10:30:00Z",
      updatedAt: new Date().toISOString(),
      comments: [],
    }

    return updatedNote
  }

  async deleteNote(noteId: string): Promise<void> {
    // TODO: Replace with actual API call
    // await this.delete(`/notes/${noteId}`);

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    // Simulate successful deletion
  }

  async addComment(noteId: string, content: string): Promise<Comment> {
    // TODO: Replace with actual API call
    // const response = await this.post<Comment>(`/notes/${noteId}/comments`, { content });
    // return response;

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))

    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      noteId,
      content,
      authorId: "current-advisor",
      authorName: "Current Advisor",
      authorRole: "Senior Advisor",
      authorAvatar: "/placeholder.svg?height=32&width=32",
      createdAt: new Date().toISOString(),
    }

    return newComment
  }

  async deleteComment(commentId: string): Promise<void> {
    // TODO: Replace with actual API call
    // await this.delete(`/comments/${commentId}`);

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 300))
    // Simulate successful deletion
  }

  async getNotesStats(leadId: string): Promise<NotesStats> {
    // TODO: Replace with actual API call
    // const response = await this.get<NotesStats>(`/leads/${leadId}/notes/stats`);
    // return response;

    // DUMMY DATA - Replace this entire block with the above API call
    await new Promise((resolve) => setTimeout(resolve, 200))

    return {
      totalNotes: 3,
      totalComments: 3,
      lastActivity: "2024-01-21T08:15:00Z",
    }
  }
}

export const notesApi = new NotesApiService()
