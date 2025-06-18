import { ApiService } from "./api"
  DocumentStructure,
  DocumentFolder,
  DocumentFile,
  CreateFolderRequest,
  UploadFileRequest,
  MoveFileRequest,
  DocumentStats,
} from "@/types/document"

class DocumentsApiService extends ApiService {
  constructor() {
    super()
  }

  async getDocuments(leadId: string): Promise<DocumentStructure> {
    // TODO: Replace with actual API call
    // const response = await this.get<DocumentStructure>(`/leads/${leadId}/documents`)
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with actual API call
    const dummyData: DocumentStructure = {
      folders: [
        {
          id: "folder1",
          name: "Financial Documents",
          leadId,
          parentId: null,
          createdAt: "2023-06-01T10:00:00Z",
          updatedAt: "2023-06-15T14:30:00Z",
          files: [
            {
              id: "file3",
              name: "Tax Return 2022.pdf",
              type: "application/pdf",
              size: 3870000,
              sizeFormatted: "3.7 MB",
              createdAt: "2023-05-20T09:15:00Z",
              updatedAt: "2023-05-20T09:15:00Z",
              leadId,
              folderId: "folder1",
              uploadedBy: "John Doe",
              url: "/placeholder.svg?height=800&width=600",
            },
            {
              id: "file4",
              name: "Bank Statements.xlsx",
              type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
              size: 1880000,
              sizeFormatted: "1.8 MB",
              createdAt: "2023-05-15T11:20:00Z",
              updatedAt: "2023-05-15T11:20:00Z",
              leadId,
              folderId: "folder1",
              uploadedBy: "Jane Smith",
              url: "/placeholder.svg?height=800&width=600",
            },
          ],
          subfolders: [],
          fileCount: 2,
          totalSize: 5750000,
        },
        {
          id: "folder2",
          name: "Identity Documents",
          leadId,
          parentId: null,
          createdAt: "2023-04-10T08:00:00Z",
          updatedAt: "2023-04-10T16:45:00Z",
          files: [
            {
              id: "file5",
              name: "Passport Copy.jpg",
              type: "image/jpeg",
              size: 1570000,
              sizeFormatted: "1.5 MB",
              createdAt: "2023-04-10T08:30:00Z",
              updatedAt: "2023-04-10T08:30:00Z",
              leadId,
              folderId: "folder2",
              uploadedBy: "Admin User",
              url: "/placeholder.svg?height=800&width=600",
            },
          ],
          subfolders: [
            {
              id: "folder3",
              name: "Additional Verification",
              leadId,
              parentId: "folder2",
              createdAt: "2023-04-05T12:00:00Z",
              updatedAt: "2023-04-05T12:00:00Z",
              files: [
                {
                  id: "file6",
                  name: "Utility Bill.pdf",
                  type: "application/pdf",
                  size: 838000,
                  sizeFormatted: "0.8 MB",
                  createdAt: "2023-04-05T12:15:00Z",
                  updatedAt: "2023-04-05T12:15:00Z",
                  leadId,
                  folderId: "folder3",
                  uploadedBy: "Support Team",
                  url: "/placeholder.svg?height=800&width=600",
                },
              ],
              subfolders: [],
              fileCount: 1,
              totalSize: 838000,
            },
          ],
          fileCount: 2,
          totalSize: 2408000,
        },
      ],
      files: [
        {
          id: "file1",
          name: "Investment Summary.pdf",
          type: "application/pdf",
          size: 2516000,
          sizeFormatted: "2.4 MB",
          createdAt: "2023-06-15T14:00:00Z",
          updatedAt: "2023-06-15T14:00:00Z",
          leadId,
          folderId: null,
          uploadedBy: "Financial Advisor",
          url: "/placeholder.svg?height=800&width=600",
        },
        {
          id: "file2",
          name: "Client Agreement.docx",
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          size: 1258000,
          sizeFormatted: "1.2 MB",
          createdAt: "2023-06-10T10:30:00Z",
          updatedAt: "2023-06-10T10:30:00Z",
          leadId,
          folderId: null,
          uploadedBy: "Legal Team",
          url: "/placeholder.svg?height=800&width=600",
        },
      ],
      totalFiles: 6,
      totalFolders: 3,
      totalSize: 12770000,
    }

    return dummyData
  }

  async createFolder(leadId: string, data: CreateFolderRequest): Promise<DocumentFolder> {
    // TODO: Replace with actual API call
    // const response = await this.post<DocumentFolder>(`/leads/${leadId}/folders`, data)
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with actual API call
    const newFolder: DocumentFolder = {
      id: `folder${Date.now()}`,
      name: data.name,
      leadId,
      parentId: data.parentId || null,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      files: [],
      subfolders: [],
      fileCount: 0,
      totalSize: 0,
    }

    return newFolder
  }

  async getFolderDetails(folderId: string): Promise<DocumentFolder> {
    // TODO: Replace with actual API call
    // const response = await this.get<DocumentFolder>(`/folders/${folderId}`)
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // DUMMY DATA - Replace this entire block with actual API call
    const folderDetails: DocumentFolder = {
      id: folderId,
      name: "Sample Folder",
      leadId: "lead123",
      parentId: null,
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: "2023-06-15T14:30:00Z",
      files: [],
      subfolders: [],
      fileCount: 0,
      totalSize: 0,
    }

    return folderDetails
  }

  async deleteFolder(folderId: string): Promise<void> {
    // TODO: Replace with actual API call
    // await this.delete(`/folders/${folderId}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500))

    // DUMMY DATA - Replace this entire block with actual API call
    console.log(`Folder ${folderId} deleted successfully`)
  }

  async uploadFiles(leadId: string, data: UploadFileRequest): Promise<DocumentFile[]> {
    // TODO: Replace with actual API call
    // const formData = new FormData()
    // data.files.forEach(file => formData.append('files', file))
    // if (data.folderId) formData.append('folderId', data.folderId)
    // const response = await this.post<DocumentFile[]>(`/leads/${leadId}/files`, formData)
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    // DUMMY DATA - Replace this entire block with actual API call
    const uploadedFiles: DocumentFile[] = data.files.map((file, index) => ({
      id: `file${Date.now()}-${index}`,
      name: file.name,
      type: file.type,
      size: file.size,
      sizeFormatted: this.formatFileSize(file.size),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      leadId,
      folderId: data.folderId || null,
      uploadedBy: "Current User",
      url: URL.createObjectURL(file),
    }))

    return uploadedFiles
  }

  async deleteFile(fileId: string): Promise<void> {
    // TODO: Replace with actual API call
    // await this.delete(`/files/${fileId}`)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with actual API call
    console.log(`File ${fileId} deleted successfully`)
  }

  async downloadFile(fileId: string): Promise<Blob> {
    // TODO: Replace with actual API call
    // const response = await this.get<Blob>(`/files/${fileId}/download`, { responseType: 'blob' })
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 600))

    // DUMMY DATA - Replace this entire block with actual API call
    const dummyBlob = new Blob(["Dummy file content"], { type: "application/octet-stream" })
    return dummyBlob
  }

  async moveFile(data: MoveFileRequest): Promise<DocumentFile> {
    // TODO: Replace with actual API call
    // const response = await this.put<DocumentFile>(`/files/${data.fileId}/move`, { targetFolderId: data.targetFolderId })
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 400))

    // DUMMY DATA - Replace this entire block with actual API call
    const movedFile: DocumentFile = {
      id: data.fileId,
      name: "Moved File.pdf",
      type: "application/pdf",
      size: 1000000,
      sizeFormatted: "1.0 MB",
      createdAt: "2023-06-01T10:00:00Z",
      updatedAt: new Date().toISOString(),
      leadId: "lead123",
      folderId: data.targetFolderId,
      uploadedBy: "Current User",
      url: "/placeholder.svg?height=800&width=600",
    }

    return movedFile
  }

  async getDocumentStats(leadId: string): Promise<DocumentStats> {
    // TODO: Replace with actual API call
    // const response = await this.get<DocumentStats>(`/leads/${leadId}/documents/stats`)
    // return response

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 300))

    // DUMMY DATA - Replace this entire block with actual API call
    const stats: DocumentStats = {
      totalFiles: 6,
      totalFolders: 3,
      totalSize: 12770000,
      recentUploads: 2,
    }

    return stats
  }

  private formatFileSize(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }
}

export const documentsApi = new DocumentsApiService()
