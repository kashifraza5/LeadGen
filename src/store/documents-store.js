import { create } from "zustand"
import { documentsApi } from "@/services/documents-api"
  DocumentStructure,
  DocumentFolder,
  CreateFolderRequest,
  UploadFileRequest,
  MoveFileRequest,
  DocumentStats,
} from "@/types/document"

interface DocumentsState {
  // State
  documents: DocumentStructure | null
  currentFolder: DocumentFolder | null
  stats: DocumentStats | null
  isLoading: boolean
  isUploading: boolean
  error: string | null

  // Actions
  fetchDocuments: (leadId: string) => Promise<void>
  createFolder: (leadId: string, data: CreateFolderRequest) => Promise<void>
  deleteFolder: (folderId: string) => Promise<void>
  uploadFiles: (leadId: string, data: UploadFileRequest) => Promise<void>
  deleteFile: (fileId: string) => Promise<void>
  downloadFile: (fileId: string, fileName: string) => Promise<void>
  moveFile: (data: MoveFileRequest) => Promise<void>
  fetchStats: (leadId: string) => Promise<void>
  setCurrentFolder: (folder: DocumentFolder | null) => void
  clearError: () => void
  reset: () => void
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  // Initial state
  documents: null,
  currentFolder: null,
  stats: null,
  isLoading: false,
  isUploading: false,
  error: null,

  // Actions
  fetchDocuments: async (leadId: string) => {
    set({ isLoading: true, error: null })
    try {
      const documents = await documentsApi.getDocuments(leadId)
      set({ documents, isLoading: false })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch documents",
        isLoading: false,
      })
    }
  },

  createFolder: async (leadId: string, data: CreateFolderRequest) => {
    set({ isLoading: true, error: null })
    try {
      const newFolder = await documentsApi.createFolder(leadId, data)

      // Update the documents structure with the new folder
      const { documents } = get()
      if (documents) {
        const updatedDocuments = { ...documents }

        if (data.parentId) {
          // Add to parent folder
          const updateFolders = (folders: DocumentFolder[]): DocumentFolder[] => {
            return folders.map((folder) => {
              if (folder.id === data.parentId) {
                return {
                  ...folder,
                  subfolders: [...folder.subfolders, newFolder],
                }
              }
              if (folder.subfolders.length > 0) {
                return {
                  ...folder,
                  subfolders: updateFolders(folder.subfolders),
                }
              }
              return folder
            })
          }
          updatedDocuments.folders = updateFolders(updatedDocuments.folders)
        } else {
          // Add to root level
          updatedDocuments.folders = [...updatedDocuments.folders, newFolder]
        }

        updatedDocuments.totalFolders += 1
        set({ documents: updatedDocuments, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to create folder",
        isLoading: false,
      })
    }
  },

  deleteFolder: async (folderId: string) => {
    set({ isLoading: true, error: null })
    try {
      await documentsApi.deleteFolder(folderId)

      // Remove folder from documents structure
      const { documents } = get()
      if (documents) {
        const removeFolderRecursive = (folders: DocumentFolder[]): DocumentFolder[] => {
          return folders
            .filter((folder) => folder.id !== folderId)
            .map((folder) => ({
              ...folder,
              subfolders: removeFolderRecursive(folder.subfolders),
            }))
        }

        const updatedDocuments = {
          ...documents,
          folders: removeFolderRecursive(documents.folders),
          totalFolders: documents.totalFolders - 1,
        }

        set({ documents: updatedDocuments, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete folder",
        isLoading: false,
      })
    }
  },

  uploadFiles: async (leadId: string, data: UploadFileRequest) => {
    set({ isUploading: true, error: null })
    try {
      const uploadedFiles = await documentsApi.uploadFiles(leadId, data)

      // Update documents structure with new files
      const { documents } = get()
      if (documents) {
        const updatedDocuments = { ...documents }

        if (data.folderId) {
          // Add files to specific folder
          const updateFolders = (folders: DocumentFolder[]): DocumentFolder[] => {
            return folders.map((folder) => {
              if (folder.id === data.folderId) {
                return {
                  ...folder,
                  files: [...folder.files, ...uploadedFiles],
                  fileCount: folder.fileCount + uploadedFiles.length,
                  totalSize: folder.totalSize + uploadedFiles.reduce((sum, file) => sum + file.size, 0),
                }
              }
              if (folder.subfolders.length > 0) {
                return {
                  ...folder,
                  subfolders: updateFolders(folder.subfolders),
                }
              }
              return folder
            })
          }
          updatedDocuments.folders = updateFolders(updatedDocuments.folders)
        } else {
          // Add files to root level
          updatedDocuments.files = [...updatedDocuments.files, ...uploadedFiles]
        }

        updatedDocuments.totalFiles += uploadedFiles.length
        updatedDocuments.totalSize += uploadedFiles.reduce((sum, file) => sum + file.size, 0)

        set({ documents: updatedDocuments, isUploading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to upload files",
        isUploading: false,
      })
    }
  },

  deleteFile: async (fileId: string) => {
    set({ isLoading: true, error: null })
    try {
      await documentsApi.deleteFile(fileId)

      // Remove file from documents structure
      const { documents } = get()
      if (documents) {
        const removeFileRecursive = (folders: DocumentFolder[]): DocumentFolder[] => {
          return folders.map((folder) => ({
            ...folder,
            files: folder.files.filter((file) => file.id !== fileId),
            fileCount: folder.files.filter((file) => file.id !== fileId).length,
            subfolders: removeFileRecursive(folder.subfolders),
          }))
        }

        const deletedFile = documents.files.find((file) => file.id === fileId)
        const updatedDocuments = {
          ...documents,
          files: documents.files.filter((file) => file.id !== fileId),
          folders: removeFileRecursive(documents.folders),
          totalFiles: documents.totalFiles - 1,
          totalSize: documents.totalSize - (deletedFile?.size || 0),
        }

        set({ documents: updatedDocuments, isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to delete file",
        isLoading: false,
      })
    }
  },

  downloadFile: async (fileId: string, fileName: string) => {
    try {
      const blob = await documentsApi.downloadFile(fileId)

      // Create download link
      const url = window.URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.href = url
      link.download = fileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      window.URL.revokeObjectURL(url)
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to download file",
      })
    }
  },

  moveFile: async (data: MoveFileRequest) => {
    set({ isLoading: true, error: null })
    try {
      const movedFile = await documentsApi.moveFile(data)

      // Update file location in documents structure
      const { documents } = get()
      if (documents) {
        // This would require more complex logic to move files between folders
        // For now, just refresh the documents
        set({ isLoading: false })
      }
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to move file",
        isLoading: false,
      })
    }
  },

  fetchStats: async (leadId: string) => {
    try {
      const stats = await documentsApi.getDocumentStats(leadId)
      set({ stats })
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : "Failed to fetch document stats",
      })
    }
  },

  setCurrentFolder: (folder: DocumentFolder | null) => {
    set({ currentFolder: folder })
  },

  clearError: () => {
    set({ error: null })
  },

  reset: () => {
    set({
      documents: null,
      currentFolder: null,
      stats: null,
      isLoading: false,
      isUploading: false,
      error: null,
    })
  },
}))
