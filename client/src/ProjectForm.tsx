'use client'

import * as React from "react"
import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface Notification {
  type: 'success' | 'error'
  message: string
}

export function ProjectForm() {
  const [projectName, setProjectName] = React.useState("")
  const [attachment, setAttachment] = React.useState("")
  const [notification, setNotification] = React.useState<Notification | null>(null)
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const navigate = useNavigate()

  const handleGoBack = () => {
    const previousRoute = localStorage.getItem("previousRoute")
    localStorage.removeItem("previousRoute")
    localStorage.removeItem("institutionName")
    navigate(previousRoute || "/dashboard")
  }

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message })
    setTimeout(() => setNotification(null), 5000) // Hide notification after 5 seconds
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    setIsSubmitting(true)

    if (!projectName.trim() || !attachment.trim()) {
      showNotification('error', 'Please fill in all fields')
      setIsSubmitting(false)
      return
    }

    const userData = localStorage.getItem("user")
    const institutionName = localStorage.getItem("institutionName")

    if (!userData || !institutionName) {
      showNotification('error', 'User data or institution name not found')
      setIsSubmitting(false)
      return
    }

    try {
      const parsedUser = JSON.parse(userData)
      const actorID = parsedUser.id
      const token = localStorage.getItem("token")

      if (!token) {
        showNotification('error', 'Authentication token not found')
        setIsSubmitting(false)
        return
      }

      const institutionResponse = await fetch(`/api/institution/name/${institutionName}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      })

      if (!institutionResponse.ok) {
        throw new Error('Failed to fetch institution ID')
      }

      const institutionData = await institutionResponse.json()
      const institutionID = institutionData.institutionID

      const projectData = {
        projectName,
        attachment,
        actorID,
        institutionID,
      }

      const response = await fetch("/api/project/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(projectData),
      })

      if (response.ok) {
        showNotification('success', 'Project submitted successfully!')
        localStorage.removeItem("institutionName")
        const previousRoute = localStorage.getItem("previousRoute")
        localStorage.removeItem("previousRoute")
        setTimeout(() => navigate(previousRoute || "/dashboard"), 1000)
      } else {
        throw new Error('Failed to submit project')
      }
    } catch (error) {
      console.error("Error submitting project", error)
      showNotification('error', 'An error occurred while submitting the project')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Create Project</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input 
                id="name" 
                placeholder="Name of your project" 
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required 
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="attachment">Attachment</Label>
              <Textarea 
                id="attachment" 
                placeholder="Project attachment" 
                value={attachment}
                onChange={(e) => setAttachment(e.target.value)}
                required
                className="min-h-[100px]"
              />
            </div>
            {notification && (
              <div className={`p-3 rounded-md ${
                notification.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                {notification.message}
              </div>
            )}
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={handleGoBack} disabled={isSubmitting}>
            Go back
          </Button>
          <Button type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit project'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ProjectForm