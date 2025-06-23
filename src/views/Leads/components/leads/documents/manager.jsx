import React, { useState, useEffect, useCallback, useMemo } from "react";
import {
  Folder,
  File,
  Upload,
  Trash2,
  Download,
  ChevronRight,
  ChevronDown,
  ArrowLeft,
  Eye,
  X,
  FileText,
  ImageIcon,
  FileSpreadsheet,
  FileIcon as FilePdf,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { getLeadDocuments } from "@/services/LeadService";

// Type definitions
const FileItem = {
  id: String,
  name: String,
  type: String,
  size: String,
  lastModified: String,
  url: String,
};

const FolderItem = {
  id: String,
  name: String,
  files: Array,
  folders: Array,
  parentId: String,
};

const Manager = () => {
  const params = useParams();
  const leadId = params?.id || "LD-10042"; // Fallback for demo
  
  // Local state management
  const [leadDocuments, setLeadDocuments] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const getLeadDocumentsData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response = await getLeadDocuments(leadId);
      setLeadDocuments(response || {});
      console.log("🚀 ~ getLeadDocumentsData ~ response:", response);
    } catch (error) {
      console.log("🚀 ~ getLeadDocumentsData ~ error:", error);
      setError(error?.detail || error?.message || 'Failed to fetch lead documents');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getLeadDocumentsData();
  }, [leadId]);

  console.log("🚀 ~ leadDocuments:", leadDocuments);

  // Transform leadDocuments data to match the component's expected structure
  const transformFolderData = useCallback((folder) => {
    return {
      id: folder.id.toString(),
      name: folder.name,
      files: folder.files.map((file) => ({
        id: file.id.toString(),
        name: file.name,
        type: file.file_type,
        size: file.formatted_file_size,
        lastModified: new Date(file.updated_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        url: file.file_url,
        uploaded_by: file.uploaded_by,
        created_at: file.created_at,
        updated_at: file.updated_at,
      })),
      folders: folder.subfolders.map((subfolder) =>
        transformFolderData(subfolder)
      ),
      parentId: folder.parent ? folder.parent.toString() : null,
      files_count: folder.files_count,
      subfolders_count: folder.subfolders_count,
      total_size: folder.total_size,
      created_at: folder.created_at,
      updated_at: folder.updated_at,
    };
  }, []);

  // Create root folder structure from leadDocuments
  const rootFolder = useMemo(() => {
    if (!leadDocuments?.folders) {
      return {
        id: "root",
        name: "Documents",
        files: [],
        folders: [],
        parentId: null,
        files_count: 0,
        subfolders_count: 0,
        total_size: 0,
      };
    }

    return {
      id: "root",
      name: "Documents",
      files: [],
      folders: leadDocuments.folders.map((folder) =>
        transformFolderData(folder)
      ),
      parentId: null,
      files_count: leadDocuments.folders.reduce(
        (total, folder) => total + folder.files_count,
        0
      ),
      subfolders_count: leadDocuments.totalFolders,
      total_size: leadDocuments.totalSize,
    };
  }, [leadDocuments, transformFolderData]);

  const [currentPath, setCurrentPath] = useState(["root"]);
  const [expandedFolders, setExpandedFolders] = useState(["root"]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isNewFolderModalOpen, setIsNewFolderModalOpen] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewFile, setPreviewFile] = useState(null);
  const [viewMode, setViewMode] = useState("list");

  // Get current folder based on path
  const getCurrentFolder = useCallback(() => {
    let current = rootFolder;
    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.folders.find((f) => f.id === currentPath[i]);
      if (folder) {
        current = folder;
      } else {
        break;
      }
    }
    return current;
  }, [rootFolder, currentPath]);

  // Get breadcrumb names
  const getBreadcrumbNames = useCallback(() => {
    const breadcrumbs = [];
    let current = rootFolder;
    breadcrumbs.push({ id: current.id, name: "Documents" });

    for (let i = 1; i < currentPath.length; i++) {
      const folder = current.folders.find((f) => f.id === currentPath[i]);
      if (folder) {
        breadcrumbs.push({ id: folder.id, name: folder.name });
        current = folder;
      } else {
        break;
      }
    }
    return breadcrumbs;
  }, [rootFolder, currentPath]);

  // Navigate to folder
  const navigateToFolder = useCallback(
    (folderId) => {
      const index = currentPath.indexOf(folderId);
      if (index >= 0) {
        setCurrentPath(currentPath.slice(0, index + 1));
      } else {
        setCurrentPath([...currentPath, folderId]);
      }
    },
    [currentPath]
  );

  // Navigate up one level
  const navigateUp = useCallback(() => {
    if (currentPath.length > 1) {
      setCurrentPath(currentPath.slice(0, currentPath.length - 1));
    }
  }, [currentPath]);

  // Toggle folder expansion in sidebar
  const toggleFolderExpansion = useCallback((folderId) => {
    setExpandedFolders((prev) =>
      prev.includes(folderId)
        ? prev.filter((id) => id !== folderId)
        : [...prev, folderId]
    );
  }, []);

  // Create new folder
  const createNewFolder = useCallback(() => {
    if (!newFolderName.trim()) return;

    const currentFolder = getCurrentFolder();
    const newFolder = {
      id: `folder${Date.now()}`,
      name: newFolderName.trim(),
      files: [],
      folders: [],
      parentId: currentFolder.id,
    };

    // Update the folder structure
    const updateFolderStructure = (folder) => {
      if (folder.id === currentFolder.id) {
        return {
          ...folder,
          folders: [...folder.folders, newFolder],
        };
      }

      return {
        ...folder,
        folders: folder.folders.map((f) => updateFolderStructure(f)),
      };
    };

    setRootFolder(updateFolderStructure(rootFolder));
    setNewFolderName("");
    setIsNewFolderModalOpen(false);
    setExpandedFolders((prev) => [...prev, currentFolder.id]);
  }, [newFolderName, getCurrentFolder, rootFolder]);

  // Handle file upload
  const handleFileUpload = useCallback(
    (e) => {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      const currentFolder = getCurrentFolder();
      const newFiles = Array.from(files).map((file) => ({
        id: `file${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        name: file.name,
        type: file.type,
        size: formatFileSize(file.size),
        lastModified: new Date().toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }),
        url: URL.createObjectURL(file),
      }));

      // Update the folder structure
      const updateFolderStructure = (folder) => {
        if (folder.id === currentFolder.id) {
          return {
            ...folder,
            files: [...folder.files, ...newFiles],
          };
        }

        return {
          ...folder,
          folders: folder.folders.map((f) => updateFolderStructure(f)),
        };
      };

      setRootFolder(updateFolderStructure(rootFolder));
      setIsUploadModalOpen(false);
    },
    [getCurrentFolder, rootFolder]
  );

  // Delete file
  const deleteFile = useCallback(
    (fileId) => {
      const currentFolder = getCurrentFolder();

      // Update the folder structure
      const updateFolderStructure = (folder) => {
        if (folder.id === currentFolder.id) {
          return {
            ...folder,
            files: folder.files.filter((f) => f.id !== fileId),
          };
        }

        return {
          ...folder,
          folders: folder.folders.map((f) => updateFolderStructure(f)),
        };
      };

      setRootFolder(updateFolderStructure(rootFolder));
    },
    [getCurrentFolder, rootFolder]
  );

  // Delete folder
  const deleteFolder = useCallback(
    (folderId) => {
      const parentFolder = findParentFolder(rootFolder, folderId);
      if (!parentFolder) return;

      // Update the folder structure
      const updateFolderStructure = (folder) => {
        if (folder.id === parentFolder.id) {
          return {
            ...folder,
            folders: folder.folders.filter((f) => f.id !== folderId),
          };
        }

        return {
          ...folder,
          folders: folder.folders.map((f) => updateFolderStructure(f)),
        };
      };

      setRootFolder(updateFolderStructure(rootFolder));

      // If we're currently in the deleted folder, navigate up
      if (currentPath.includes(folderId)) {
        const index = currentPath.indexOf(folderId);
        setCurrentPath(currentPath.slice(0, index));
      }
    },
    [rootFolder, currentPath]
  );

  // Find parent folder
  const findParentFolder = useCallback((folder, childFolderId) => {
    for (const childFolder of folder.folders) {
      if (childFolder.id === childFolderId) {
        return folder;
      }
      const found = findParentFolder(childFolder, childFolderId);
      if (found) return found;
    }
    return null;
  }, []);

  // Format file size
  const formatFileSize = useCallback((bytes) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
    );
  }, []);

  // Get file icon based on type
  const getFileIcon = useCallback((fileType) => {
    if (fileType.includes("pdf")) {
      return <FilePdf className="h-5 w-5 text-red-500" />;
    } else if (fileType.includes("image")) {
      return <ImageIcon className="h-5 w-5 text-blue-500" />;
    } else if (fileType.includes("spreadsheet") || fileType.includes("excel")) {
      return <FileSpreadsheet className="h-5 w-5 text-green-500" />;
    } else if (fileType.includes("word") || fileType.includes("document")) {
      return <FileText className="h-5 w-5 text-blue-700" />;
    } else {
      return <File className="h-5 w-5 text-gray-500" />;
    }
  }, []);

  // Modal handlers
  const handleOpenUploadModal = useCallback(() => {
    setIsUploadModalOpen(true);
  }, []);

  const handleCloseUploadModal = useCallback(() => {
    setIsUploadModalOpen(false);
  }, []);

  const handleOpenNewFolderModal = useCallback(() => {
    setIsNewFolderModalOpen(true);
  }, []);

  const handleCloseNewFolderModal = useCallback(() => {
    setIsNewFolderModalOpen(false);
  }, []);

  const handleNewFolderNameChange = useCallback((e) => {
    setNewFolderName(e.target.value);
  }, []);

  const handlePreviewFile = useCallback((file) => {
    setPreviewFile(file);
  }, []);

  const handleClosePreview = useCallback(() => {
    setPreviewFile(null);
  }, []);

  const handleViewModeChange = useCallback((mode) => {
    setViewMode(mode);
  }, []);

  // Render folder tree (recursive)
  const renderFolderTree = useCallback(
    (folder, depth = 0) => {
      const isExpanded = expandedFolders.includes(folder.id);
      const isActive = currentPath[currentPath.length - 1] === folder.id;

      // Calculate the count to display
      const getDisplayCount = () => {
        if (folder.id === "root") {
          // For root folder, show totalFolders from leadDocuments
          return leadDocuments?.totalFolders || 0;
        } else {
          // For subfolders, show subfolder count
          return folder.subfolders_count || 0;
        }
      };

      return (
        <div key={folder.id} className="select-none">
          <div
            className={`flex items-center py-1 px-2 rounded-md cursor-pointer ${
              isActive ? "bg-blue-100 text-blue-700" : "hover:bg-gray-100"
            }`}
            style={{ paddingLeft: `${depth * 12 + 8}px` }}
            onClick={() => {
              navigateToFolder(folder.id);
              toggleFolderExpansion(folder.id);
            }}
          >
            {folder.folders.length > 0 ? (
              <button
                className="mr-1 p-0.5 rounded-sm hover:bg-gray-200"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFolderExpansion(folder.id);
                }}
              >
                {isExpanded ? (
                  <ChevronDown className="h-3 w-3" />
                ) : (
                  <ChevronRight className="h-3 w-3" />
                )}
              </button>
            ) : (
              <span className="w-5" />
            )}
            <Folder
              className={`h-4 w-4 mr-2 ${
                isActive ? "text-blue-600" : "text-gray-500"
              }`}
              fill={isActive ? "#dbeafe" : "transparent"}
            />
            <span className="text-sm truncate">{folder.name}</span>
            <Badge className="ml-2 text-xs" variant="outline">
              {getDisplayCount()}
            </Badge>
          </div>

          {isExpanded &&
            folder.folders.map((childFolder) =>
              renderFolderTree(childFolder, depth + 1)
            )}
        </div>
      );
    },
    [
      expandedFolders,
      currentPath,
      navigateToFolder,
      toggleFolderExpansion,
      leadDocuments,
    ]
  );

  // Memoized values
  const currentFolder = useMemo(() => getCurrentFolder(), [getCurrentFolder]);
  const breadcrumbs = useMemo(() => getBreadcrumbNames(), [getBreadcrumbNames]);

  // Show loading state for the entire component
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">
            Loading documents...
          </p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
          <Button onClick={getLeadDocumentsData}>Retry</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-64 border-r bg-gray-50 p-4 overflow-auto">
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Folders</h3>
          <div className="space-y-1">{renderFolderTree(rootFolder)}</div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Toolbar */}
        <div className="p-4 border-b flex justify-between items-center">
          <div className="flex items-center">
            {currentPath.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                className="mr-2"
                onClick={navigateUp}
              >
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            <div className="flex items-center text-sm">
              {breadcrumbs.map((crumb, index) => (
                <div key={crumb.id} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-3 w-3 mx-1 text-gray-400" />
                  )}
                  <button
                    className={`hover:underline ${
                      index === breadcrumbs.length - 1
                        ? "font-medium text-blue-600"
                        : "text-gray-600"
                    }`}
                    onClick={() => navigateToFolder(crumb.id)}
                  >
                    {crumb.name}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleOpenNewFolderModal}
            >
              <Folder className="h-4 w-4 mr-2" /> New Folder
            </Button>
            <Button variant="outline" size="sm" onClick={handleOpenUploadModal}>
              <Upload className="h-4 w-4 mr-2" /> Upload Files
            </Button>
            <div className="flex border rounded-md overflow-hidden">
              <button
                className={`px-2 py-1 ${
                  viewMode === "list" ? "bg-blue-50 text-blue-600" : "bg-white"
                }`}
                onClick={() => handleViewModeChange("list")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </button>
              <button
                className={`px-2 py-1 ${
                  viewMode === "grid" ? "bg-blue-50 text-blue-600" : "bg-white"
                }`}
                onClick={() => handleViewModeChange("grid")}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          {/* Folders */}
          {currentFolder.folders.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">
                Folders
              </h3>
              {viewMode === "list" ? (
                <div className="bg-white border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b">
                        <th className="text-left font-medium py-2 px-4">
                          NAME
                        </th>
                        <th className="text-left font-medium py-2 px-4">
                          ITEMS
                        </th>
                        <th className="text-right font-medium py-2 px-4">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFolder.folders.map((folder) => (
                        <tr
                          key={folder.id}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div
                              className="flex items-center cursor-pointer"
                              onClick={() => navigateToFolder(folder.id)}
                            >
                              <Folder className="h-5 w-5 text-gray-500 mr-2" />
                              <span className="font-medium">{folder.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">
                            {folder.files_count || 0} files,{" "}
                            {folder.subfolders_count || 0} folders
                          </td>
                          <td className="py-3 px-4 text-right">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-red-500"
                              onClick={() => deleteFolder(folder.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {currentFolder.folders.map((folder) => (
                    <div
                      key={folder.id}
                      className="bg-white border rounded-md p-3 hover:border-blue-300 hover:shadow-sm cursor-pointer group relative"
                    >
                      <div
                        className="flex flex-col items-center"
                        onClick={() => navigateToFolder(folder.id)}
                      >
                        <div className="h-16 w-16 flex items-center justify-center mb-2">
                          <Folder className="h-12 w-12 text-gray-400 group-hover:text-blue-500" />
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm truncate w-full">
                            {folder.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {folder.files_count || 0} files,{" "}
                            {folder.subfolders_count || 0} folders
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 text-red-500"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteFolder(folder.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Files */}
          {currentFolder.files.length > 0 ? (
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2">Files</h3>
              {viewMode === "list" ? (
                <div className="bg-white border rounded-md overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-gray-500 border-b">
                        <th className="text-left font-medium py-2 px-4">
                          NAME
                        </th>
                        <th className="text-left font-medium py-2 px-4">
                          SIZE
                        </th>
                        <th className="text-left font-medium py-2 px-4">
                          MODIFIED
                        </th>
                        <th className="text-right font-medium py-2 px-4">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentFolder.files.map((file) => (
                        <tr
                          key={file.id}
                          className="border-b last:border-0 hover:bg-gray-50"
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              {getFileIcon(file.type)}
                              <span className="ml-2">{file.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm">{file.size}</td>
                          <td className="py-3 px-4 text-sm">
                            {file.lastModified}
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex justify-end space-x-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-blue-500"
                                onClick={() => handlePreviewFile(file)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-green-500"
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500"
                                onClick={() => deleteFile(file.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {currentFolder.files.map((file) => (
                    <div
                      key={file.id}
                      className="bg-white border rounded-md p-3 hover:border-blue-300 hover:shadow-sm cursor-pointer group relative"
                    >
                      <div
                        className="flex flex-col items-center"
                        onClick={() => handlePreviewFile(file)}
                      >
                        <div className="h-16 w-16 flex items-center justify-center mb-2">
                          {file.type.includes("image") && file.url ? (
                            <div className="h-16 w-16 bg-gray-100 rounded overflow-hidden">
                              <img
                                src={file.url || "/placeholder.svg"}
                                alt={file.name}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/placeholder.svg?height=64&width=64";
                                }}
                              />
                            </div>
                          ) : (
                            <div className="h-12 w-12 flex items-center justify-center">
                              {getFileIcon(file.type)}
                            </div>
                          )}
                        </div>
                        <div className="text-center">
                          <div className="font-medium text-sm truncate w-full">
                            {file.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {file.size}
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-green-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              // Download logic would go here
                            }}
                          >
                            <Download className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-6 w-6 text-red-500"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteFile(file.id);
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            currentFolder.folders.length === 0 && (
              <div className="text-center py-12">
                <File className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                <h3 className="text-lg font-medium text-gray-700">
                  No files in this folder
                </h3>
                <p className="text-gray-500 mb-4">
                  Upload files or create a new folder
                </p>
                <div className="flex justify-center space-x-2">
                  <Button variant="outline" onClick={handleOpenNewFolderModal}>
                    <Folder className="h-4 w-4 mr-2" /> New Folder
                  </Button>
                  <Button onClick={handleOpenUploadModal}>
                    <Upload className="h-4 w-4 mr-2" /> Upload Files
                  </Button>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Upload Modal */}
      <Dialog open={isUploadModalOpen} onOpenChange={setIsUploadModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upload Files</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500 mb-4">
                Drag and drop files here, or click to select files
              </p>
              <Input
                type="file"
                multiple
                className="hidden"
                id="file-upload"
                onChange={handleFileUpload}
              />
              <label htmlFor="file-upload">
                <Button as="span">Select Files</Button>
              </label>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* New Folder Modal */}
      <Dialog
        open={isNewFolderModalOpen}
        onOpenChange={setIsNewFolderModalOpen}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label
                htmlFor="folder-name"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Folder Name
              </label>
              <Input
                id="folder-name"
                value={newFolderName}
                onChange={handleNewFolderNameChange}
                placeholder="Enter folder name"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={handleCloseNewFolderModal}>
                Cancel
              </Button>
              <Button
                onClick={createNewFolder}
                disabled={!newFolderName.trim()}
              >
                Create Folder
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* File Preview Modal */}
      <Dialog open={!!previewFile} onOpenChange={handleClosePreview}>
        <DialogContent className="sm:max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex flex-row items-center justify-between">
            <DialogTitle className="flex items-center">
              {previewFile && getFileIcon(previewFile.type)}
              <span className="ml-2">{previewFile?.name}</span>
            </DialogTitle>
            <div className="flex space-x-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" /> Download
              </Button>
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </DialogHeader>
          <div className="flex-1 overflow-auto p-4 bg-gray-50 rounded-md">
            {previewFile?.type.includes("image") && previewFile?.url ? (
              <div className="flex items-center justify-center h-full">
                <img
                  src={previewFile.url || "/placeholder.svg"}
                  alt={previewFile.name}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/placeholder.svg?height=400&width=600";
                  }}
                />
              </div>
            ) : previewFile?.type.includes("pdf") ? (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <div className="text-center">
                  <FilePdf className="h-16 w-16 text-red-500 mx-auto mb-4" />
                  <p className="text-gray-700">PDF Preview not available</p>
                  <Button className="mt-4">
                    <Download className="h-4 w-4 mr-2" /> Download to View
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-100 rounded-md">
                <div className="text-center">
                  {getFileIcon(previewFile?.type || "")}
                  <p className="text-gray-700 mt-4">
                    Preview not available for this file type
                  </p>
                  <Button className="mt-4">
                    <Download className="h-4 w-4 mr-2" /> Download to View
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div className="pt-4 text-sm text-gray-500">
            <div className="flex justify-between">
              <span>Size: {previewFile?.size}</span>
              <span>Last Modified: {previewFile?.lastModified}</span>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { Manager };
