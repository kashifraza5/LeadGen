import React, { useState, useEffect, useRef, useCallback } from "react"
import { Search, User, Activity, Mail, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"

const mockResults = [
  // Leads
  {
    id: "lead-1",
    title: "John Smith",
    subtitle: "Senior Financial Advisor • Active Lead",
    category: "leads",
    url: "/leads/1",
  },
  {
    id: "lead-2",
    title: "Sarah Johnson",
    subtitle: "Investment Consultant • Hot Lead",
    category: "leads",
    url: "/leads/2",
  },
  // Activities
  {
    id: "activity-1",
    title: "Client Meeting Scheduled",
    subtitle: "Meeting with John Smith on Dec 15, 2024",
    category: "activities",
    url: "/activities/1",
  },
  // Emails
  {
    id: "email-1",
    title: "john.smith@email.com",
    subtitle: "Last email: Investment proposal sent",
    category: "emails",
    url: "/emails/1",
  },
]

const categoryConfig = {
  leads: { icon: User, label: "Leads", color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
  activities: {
    icon: Activity,
    label: "Activities",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  emails: {
    icon: Mail,
    label: "Emails",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  phones: {
    icon: Phone,
    label: "Phone Numbers",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
  },
}

export function GlobalSearch() {
  const [isOpen, setIsOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const [recentSearches, setRecentSearches] = useState([
    { id: "1", query: "john smith", timestamp: new Date(Date.now() - 1000 * 60 * 30) },
    { id: "2", query: "investment proposal", timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2) },
  ])

  const searchRef = useRef(null)
  const inputRef = useRef(null)

  // Filter results based on query
  const filterResults = useCallback((searchQuery) => {
    if (!searchQuery.trim()) {
      setResults([])
      return
    }

    const filtered = mockResults.filter((result) => {
      const searchText = `${result.title} ${result.subtitle}`.toLowerCase()
      return searchText.includes(searchQuery.toLowerCase())
    })

    setResults(filtered)
    setSelectedIndex(-1)
  }, [])

  // Handle search input
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      filterResults(query)
    }, 150)

    return () => clearTimeout(timeoutId)
  }, [query, filterResults])

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Cmd+K or Ctrl+K to open search
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault()
        setIsOpen(true)
      }

      // Escape to close search
      if (e.key === "Escape" && isOpen) {
        e.preventDefault()
        setIsOpen(false)
      }

      // Arrow keys for navigation
      if (isOpen && results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : 0))
        } else if (e.key === "ArrowUp") {
          e.preventDefault()
          setSelectedIndex((prev) => (prev > 0 ? prev - 1 : results.length - 1))
        } else if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault()
          handleResultClick(results[selectedIndex])
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [isOpen, results, selectedIndex])

  // Click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleResultClick = (result) => {
    // Add to recent searches
    const newSearch = {
      id: Date.now().toString(),
      query: query,
      timestamp: new Date(),
    }
    setRecentSearches((prev) => [newSearch, ...prev.slice(0, 4)])

    // Close search and navigate
    setIsOpen(false)
    setQuery("")
    setResults([])
  }

  const handleRecentSearchClick = (searchQuery) => {
    setQuery(searchQuery)
    filterResults(searchQuery)
  }

  const highlightMatch = (text, query) => {
    if (!query) return text

    const regex = new RegExp(`(${query})`, "gi")
    const parts = text.split(regex)

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="font-semibold text-blue-600 bg-blue-100 px-0.5 rounded">
          {part}
        </span>
      ) : (
        part
      ),
    )
  }

  const groupedResults = results.reduce(
    (acc, result) => {
      if (!acc[result.category]) {
        acc[result.category] = []
      }
      acc[result.category].push(result)
      return acc
    },
    {},
  )

  return (
    <div ref={searchRef} className="relative w-full max-w-3xl">
      <Button
        variant="outline"
        className="w-full justify-start text-sm text-muted-foreground"
        onClick={() => setIsOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        Search leads, activities, emails...
        <kbd className="pointer-events-none absolute right-2 top-2 h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-3 border-b">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                ref={inputRef}
                placeholder="Search leads, activities, emails..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="pl-10"
                autoFocus
              />
            </div>
          </div>

          <ScrollArea className="max-h-96">
            {query ? (
              <div>
                {results.length > 0 ? (
                  Object.entries(groupedResults).map(([category, categoryResults]) => {
                    const config = categoryConfig[category]
                    const Icon = config.icon

                    return (
                      <div key={category} className="p-3 border-b last:border-b-0">
                        <div className="flex items-center mb-2">
                          <Icon className={`h-4 w-4 mr-2 ${config.color}`} />
                          <span className={`text-sm font-medium ${config.color}`}>{config.label}</span>
                          <Badge variant="secondary" className="ml-2">
                            {categoryResults.length}
                          </Badge>
                        </div>
                        <div className="space-y-1">
                          {categoryResults.map((result) => (
                            <Link
                              key={result.id}
                              to={result.url}
                              className={`block p-2 rounded-md hover:bg-gray-50 ${
                                selectedIndex === results.findIndex((r) => r.id === result.id) ? "bg-gray-50" : ""
                              }`}
                              onClick={() => handleResultClick(result)}
                            >
                              <div className="font-medium">{highlightMatch(result.title, query)}</div>
                              <div className="text-sm text-gray-500">{result.subtitle}</div>
                            </Link>
                          ))}
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    <Search className="h-8 w-8 mx-auto mb-2 text-gray-300" />
                    <p>No results found for "{query}"</p>
                  </div>
                )}
              </div>
            ) : (
              <div className="p-3">
                <div className="mb-3">
                  <h3 className="text-sm font-medium text-gray-700 mb-2">Recent Searches</h3>
                  <div className="space-y-1">
                    {recentSearches.map((search) => (
                      <button
                        key={search.id}
                        className="w-full text-left p-2 rounded-md hover:bg-gray-50 text-sm"
                        onClick={() => handleRecentSearchClick(search.query)}
                      >
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-2 text-gray-400" />
                          <span className="flex-1">{search.query}</span>
                          <span className="text-xs text-gray-400">
                            {search.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {results.length > 0 && (
              <div className="p-3 border-t bg-muted/20 text-xs text-muted-foreground text-center">
                Use ↑↓ to navigate, Enter to select, Esc to close
              </div>
            )}
          </ScrollArea>
        </div>
      )}
    </div>
  )
}
