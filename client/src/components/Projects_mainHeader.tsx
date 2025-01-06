'use client'

import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

export function Header() {
  const router = useNavigate()

  const handleLogout = () => {
    router('/logout')
  }

  const handleNewProject = () => {
    router('/pp/new')
  }

  return (
    <header className="flex justify-between items-center h-14 px-4 border-b bg-background w-full">
      <h1 className="text-lg font-semibold">Dashboard</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleNewProject}>
          New project
        </Button>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
