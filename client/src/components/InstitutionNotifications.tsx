'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Bell, CheckCircle, XCircle } from 'lucide-react'

interface Notification {
  notificationID: number
  createdAt: string
  actorID: number
  institutionID: number
}

export function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const token = localStorage.getItem("token");

  const fetchNotifications = async () => {
    setLoading(true)
    setError(null)
    try {
      const userData = localStorage.getItem("user")
      if (!userData) {
        throw new Error("User data not found")
      }
      const user = JSON.parse(userData)
      const actorID = user.id

      const response = await fetch(`/api/notification/actor/${actorID}`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })

      if (!response.ok) {
        throw new Error("Failed to fetch notifications")
      }

      const data = await response.json()
      setNotifications(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleAction = (action: 'accept' | 'reject', notificationID: number) => {
    console.log(`${action} clicked for notification ${notificationID}`)
    // Add API later
    setNotifications(notifications.filter(n => n.notificationID !== notificationID))
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-2xl font-bold">Notifications to join your institution</CardTitle>
        <Button onClick={fetchNotifications} disabled={loading}>
          {loading ? "Loading..." : "Refresh Notifications"}
        </Button>
      </CardHeader>
      <CardContent>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        {notifications.length === 0 ? (
          <div className="text-center py-10">
            <Bell className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-gray-500">You're all caught up! No new notifications at the moment.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">ID</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Actor ID</TableHead>
                  <TableHead>Institution ID</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {notifications.map((notification) => (
                  <TableRow key={notification.notificationID}>
                    <TableCell className="font-medium">{notification.notificationID}</TableCell>
                    <TableCell>{new Date(notification.createdAt).toLocaleString()}</TableCell>
                    <TableCell>{notification.actorID}</TableCell>
                    <TableCell>{notification.institutionID}</TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction('accept', notification.notificationID)}
                        className="mr-2"
                      >
                        <CheckCircle className="mr-2 h-4 w-4" />
                        Accept
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAction('reject', notification.notificationID)}
                      >
                        <XCircle className="mr-2 h-4 w-4" />
                        Reject
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}