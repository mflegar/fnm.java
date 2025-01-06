'use client'

import { useNavigate, useLocation } from "react-router"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  institutionName: string;  // Dodan prop za ime institucije
}

export function Header({ institutionName }: HeaderProps) {
  const router = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    router('/logout')
  }

  const handleNewProject = () => {
    const previousRoute = location.pathname  // Dohvati trenutnu rutu
    localStorage.setItem("previousRoute", previousRoute)  // Spremi je u localStorage
    localStorage.setItem("institutionName", institutionName)
    router('/pp/new')
  }

  const handleJoinProject = () => {
    router('/pp/join')
  };

  return (
    <header className="flex justify-between items-center h-14 px-4 border-b bg-background w-full">
      <h1 className="text-lg font-semibold">Institution</h1>
      <div className="flex items-center space-x-2">
        <Button variant="outline" size="sm" onClick={handleJoinProject}>
          Join project
        </Button>
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
