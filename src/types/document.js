export interface DocumentFile {
  id: string
  name: string
  type: string
  size: number
  sizeFormatted: string
  url?: string
  downloadUrl?: string
  createdAt: string
  updatedAt: string
  leadId: string
  folderId: string | null
  uploadedBy: string
}

export interface DocumentFolder {
  id: string
  name: string
  leadId: string
  parentId: string | null
  createdAt: string
  updatedAt: string
  files: DocumentFile[]
  subfolders: DocumentFolder[]
  fileCount: number
  totalSize: number
}

export interface DocumentStructure {
  folders: DocumentFolder[]
  files: DocumentFile[]
  totalFiles: number
  totalFolders: number
  totalSize: number
}

export interface CreateFolderRequest {
  name: string
  parentId?: string | null
}

export interface UploadFileRequest {
  files: File[]
  folderId?: string | null
}

export interface MoveFileRequest {
  fileId: string
  targetFolderId: string | null
}

export interface DocumentStats {
  totalFiles: number
  totalFolders: number
  totalSize: number
  recentUploads: number
}
