# Leads Components Organization

This directory contains all the components related to the Leads functionality, organized by their purpose and functionality.

## Folder Structure

### 📁 `list-management/`
Contains components for displaying and managing lists of leads:
- `leads-list.jsx` - Main leads list component with search, filtering, and pagination
- `leads-table.jsx` - Table view component for displaying leads in a tabular format

### 📁 `detail-management/`
Contains components for viewing and managing individual lead details:
- `lead-detail.jsx` - Main lead detail component with tabs for different sections

### 📁 `tab-components/`
Contains tab wrapper components that import from the main components directory:
- `personal-information-tab.jsx` - Tab wrapper for personal information
- `family-tab.jsx` - Tab wrapper for family information
- `documents-tab.jsx` - Tab wrapper for document management
- `activities-tab.jsx` - Tab wrapper for activities
- `conversations-tab.jsx` - Tab wrapper for conversations
- `campaigns-tab.jsx` - Tab wrapper for campaigns
- `notes-tab.jsx` - Tab wrapper for notes
- `financials-tab.jsx` - Tab wrapper for financial information

### 📁 `personal-information/`
Contains components for managing personal information:
- `section.jsx` - Main personal information section component
- `add-phone-modal.jsx` - Modal for adding phone numbers
- `all-phones-modal.jsx` - Modal for viewing all phone numbers
- `add-email-modal.jsx` - Modal for adding email addresses
- `all-emails-modal.jsx` - Modal for viewing all email addresses
- `add-address-modal.jsx` - Modal for adding addresses
- `all-addresses-modal.jsx` - Modal for viewing all addresses

### 📁 `family/`
Contains components for managing family information:
- `section.jsx` - Main family section component
- `add-family-member-modal.jsx` - Modal for adding family members

### 📁 `documents/`
Contains components for document management:
- `section.jsx` - Document section wrapper
- `manager.jsx` - Main document manager component

### 📁 `notes/`
Contains components for managing notes:
- `section.jsx` - Main notes section component
- `comments.jsx` - Comments component
- `add-note-modal.jsx` - Modal for adding notes

### 📁 `financials/`
Contains components for financial information:
- `section.jsx` - Main financial section component

### 📁 `conversations/`
Contains components for managing conversations:
- `section.jsx` - Main conversations section component

### 📁 `campaigns/`
Contains components for campaign management:
- `section.jsx` - Main campaigns section component

### 📁 `activities/`
Contains components for activity management:
- `section.jsx` - Main activities section component

## Import Structure

The main components import from the centralized `@/components/leads/` directory, which contains:
- Tab wrapper components that import from their respective section folders
- Section components that contain the actual functionality
- Modal components for specific actions

## Usage

When importing components from this directory:

```javascript
// For list management
import { LeadsList } from "@/views/Leads/components/leads/list-management/leads-list"
import { LeadsTable } from "@/views/Leads/components/leads/list-management/leads-table"

// For detail management
import LeadDetail from "@/views/Leads/components/leads/detail-management/lead-detail"

// For tab components (if needed directly)
import { PersonalInformationTab } from "@/views/Leads/components/leads/tab-components/personal-information-tab"
```

## Notes

- The tab components in this directory are wrappers that import from the main `@/components/leads/` directory
- The actual functionality is implemented in the section components within each folder
- Modal components are co-located with their related section components for better organization
- All imports have been updated to reflect the new folder structure 