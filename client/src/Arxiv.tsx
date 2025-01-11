'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from 'lucide-react'

interface Result {
  title: string
  link: string
  summary: string
  showFull?: boolean
}

export function ArxivSearchForm() {
  const [query, setQuery] = useState<string>("")
  const [category, setCategory] = useState<string>("cs.AI")
  const [maxResults, setMaxResults] = useState<number>(5)
  const [results, setResults] = useState<Result[]>([])
  const [error, setError] = useState<string>("")
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [hasSearched, setHasSearched] = useState<boolean>(false)

  const handleSearch = async () => {
    if (!query) {
      setError("Please enter a search query.")
      return
    }

    setIsLoading(true)
    setError("")
    setHasSearched(true)

    try {
      const token = localStorage.getItem("token")
      if (!token) {
        throw new Error("No authentication token found. Please log in.")
      }

      const response = await fetch(
        `/api/arxiv/search?query=${encodeURIComponent(
          query
        )}&category=${category}&maxResults=${maxResults}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      )

      if (!response.ok) {
        throw new Error("Failed to fetch results.")
      }

      const data = await response.json()
      setResults(data)
    } catch (err) {
      console.error("Error during search:", err)
      setError("Error fetching results. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleSummary = (index: number) => {
    const updatedResults = [...results]
    updatedResults[index].showFull = !updatedResults[index].showFull
    setResults(updatedResults)
  }

  return (
    <div className="space-y-6">
      {!hasSearched && (
        <Card>
          <CardHeader>
            <CardTitle>Welcome to ArXiv Search</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="mb-4">Explore the latest research papers from various fields of computer science. Use the search bar above to find papers on topics that interest you.</p>
            <ul className="list-disc list-inside space-y-2">
              <li>Enter keywords in the search box</li>
              <li>Select a category to narrow down your search</li>
              <li>Choose the number of results you want to see</li>
              <li>Click "Search" to find relevant papers</li>
            </ul>
          </CardContent>
        </Card>
      )}
      <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Input
          type="text"
          placeholder="Enter keywords"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="flex-grow"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cs.AI">Artificial Intelligence</SelectItem>
            <SelectItem value="cs.CV">Computer Vision</SelectItem>
            <SelectItem value="cs.CL">Natural Language Processing</SelectItem>
            <SelectItem value="cs.LG">Machine Learning</SelectItem>
          </SelectContent>
        </Select>
        <Input
          type="number"
          min="1"
          max="100"
          value={maxResults}
          onChange={(e) => setMaxResults(Number(e.target.value))}
          className="w-full sm:w-[100px]"
        />
      </div>
      <Button onClick={handleSearch} disabled={isLoading} className="w-full sm:w-auto">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Searching...
          </>
        ) : (
          'Search'
        )}
      </Button>

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-4">
        {results.map((result, index) => (
          <Card key={index}>
            <CardHeader>
              <CardTitle>
                <a
                  href={result.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {result.title}
                </a>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p 
                onClick={() => toggleSummary(index)} 
                className="cursor-pointer"
              >
                {result.showFull
                  ? result.summary
                  : `${result.summary.split(". ").slice(0, 2).join(". ")}...`}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

