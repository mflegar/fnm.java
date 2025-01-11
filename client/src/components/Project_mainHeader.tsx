'use client'

import { useNavigate } from "react-router"
import { Button } from "@/components/ui/button"

interface HeaderProps {
    projectName: string; // Dodan prop za ime projekta
}

export function ProjectHeader({ projectName }: HeaderProps) {

    const router = useNavigate();

    const handleLogout = () => {
        router('/logout');
    };

    const handleAddExpense = () => {
        localStorage.setItem("projectName", projectName)
        router('/expense/add')
    };

    return (
        <header className="flex justify-between items-center h-14 px-4 border-b bg-background w-full">
          <h1 className="text-lg font-semibold">{projectName}</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={handleAddExpense}>
              Add expense
            </Button>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </header>
    )
}