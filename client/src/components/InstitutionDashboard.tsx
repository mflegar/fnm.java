"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { jsPDF } from "jspdf"
import "jspdf-autotable"  // Import the autoTable plugin

interface Project {
  projectID: number
  projectName: string
  start: string
  attachment: string
  institutionID: number
  actorID: number
  state: "pending" | "active" | "closed" | "rejected"
}

interface Expense {
  expenseID: number
  description: string
  expense: number
  actorID: number
  projectID: number
}

interface InstitutionDashboardProps {
  projects: Project[]
}

export const InstitutionDashboard: React.FC<InstitutionDashboardProps> = ({ projects }) => {
  const [projectStates, setProjectStates] = useState<{ [key: number]: Project["state"] }>(
    projects.reduce((acc, project) => {
      acc[project.projectID] = project.state
      return acc
    }, {} as { [key: number]: Project["state"] })
  )
  const [expenses, setExpenses] = useState<Expense[]>([])  // Initialize expenses state

  // Pagination setup
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 5 // Set page size to 5 items per page
  const totalPages = Math.ceil(projects.length / pageSize)

  const getCurrentPageProjects = () => {
    const startIndex = (currentPage - 1) * pageSize
    const endIndex = startIndex + pageSize
    return projects.slice(startIndex, endIndex)
  }

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  const fetchExpenses = async (projectID: number) => {
    const token = localStorage.getItem("token")  // Or wherever your token is stored
    if (!token) {
      console.error("No authorization token found!")
      return
    }

    try {
      const response = await fetch(`/api/expense/project/${projectID}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`,  // Add Bearer token in Authorization header
          "Content-Type": "application/json",
        },
      })
      if (!response.ok) {
        throw new Error("Failed to fetch expenses")
      }
      const data = await response.json()
      setExpenses((prevExpenses) => [...prevExpenses, ...data])  // Append the expenses for the current project
    } catch (error) {
      console.error("Error fetching expenses:", error)
    }
  }

  const calculateTotalExpenses = (projectID: number): number => {
    return expenses
      .filter((expense) => expense.projectID === projectID)
      .reduce((total, expense) => total + expense.expense, 0)
  }

  useEffect(() => {
    projects.forEach((project) => {
      fetchExpenses(project.projectID)
    })
  }, [projects])  // Fetch expenses when projects change

  const handleStateChange = (projectID: number, newState: Project["state"]): void => {
    setProjectStates((prevStates) => ({
      ...prevStates,
      [projectID]: newState,
    }))
  }

  const handleSaveState = async (projectID: number) => {
    const state = projectStates[projectID]
    state.toString();
    console.log(state);
    const token = localStorage.getItem("token")
  
    if (!token) {
      console.error("No authorization token found!")
      return
    }
  
    try {
      const response = await fetch(`/api/project/change/${projectID}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,  // Add Bearer token
          "Content-Type": "application/json",
        },
        body: JSON.stringify(state),
      })
  
      if (!response.ok) {
        throw new Error("Failed to save project state")
      }
  
      console.log(`State for project ${projectID} successfully saved as ${state}`)
    } catch (error) {
      console.error("Error saving project state:", error)
    }
  }

  // For project selection
  const [selectedProject, setSelectedProject] = useState<number | null>(null)

  // Generate PDF Logic
  const generatePDF = () => {
    if (selectedProject === null) return;
  
    // Filter expenses for the selected project
    const projectExpenses = expenses.filter((expense) => expense.projectID === selectedProject);
  
    // If no expenses found for the selected project, show a message
    if (projectExpenses.length === 0) {
      const doc = new jsPDF();
      doc.text(`No expenses found for the selected project.`, 20, 20);
      doc.save("No_Expenses.pdf");
      return;
    }
  
    // Create a new PDF instance
    const doc = new jsPDF();
    const project = projects.find((p) => p.projectID === selectedProject);
  
    // Set document title
    const title = project ? `Expenses for ${project.projectName}` : 'Project Expenses';
    doc.text(title, 20, 20);
  
    // Calculate total cost
    const totalCost = projectExpenses.reduce((sum, expense) => sum + expense.expense, 0);
  
    // Generate table using autoTable
    (doc as any).autoTable({
      head: [['ID', 'Description', 'Cost', 'Actor ID', 'Project ID']], // Table headers
      body: projectExpenses.map((expense) => [
        expense.expenseID,
        expense.description,
        `$${expense.expense.toFixed(2)}`,
        expense.actorID,
        expense.projectID,
      ]),
      startY: 30, // Start table below the title
      margin: { top: 20 },
      theme: 'grid', // Add a grid theme to the table
      styles: {
        halign: 'center', // Align text in the center
      },
    });
  
    // Get the position of the last table row and display total cost
    const lastTableY = (doc as any).autoTable.previous.finalY;
    doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 20, lastTableY + 10);
  
    // Save the generated PDF
    doc.save(`${title}.pdf`);
  }

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-primary">Institution Dashboard</h2>
      <div className="overflow-x-auto">
        <Table className="min-w-full bg-muted/10 rounded-lg overflow-hidden">
          <TableHeader className="bg-muted/20">
            <TableRow>
              <TableHead className="p-2 text-left">Project Name</TableHead>
              <TableHead className="p-2 text-left hidden sm:table-cell">Start Date</TableHead>
              <TableHead className="p-2 text-left">Total Expenses</TableHead>
              <TableHead className="p-1 text-left">State</TableHead>
              <TableHead className="p-2 text-left">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {getCurrentPageProjects().map((project) => (
              <TableRow key={project.projectID} className="border-b border-muted/20">
                <TableCell className="p-2">{project.projectName}</TableCell>
                <TableCell className="p-2 hidden sm:table-cell">{project.start}</TableCell>
                <TableCell className="p-2">${calculateTotalExpenses(project.projectID).toFixed(2)}</TableCell>
                <TableCell className="p-1">
                  <select
                    value={projectStates[project.projectID]}
                    onChange={(e) => handleStateChange(project.projectID, e.target.value as Project["state"])}
                    className="border rounded-md p-1 w-24"
                  >
                    <option value="pending">Pending</option>
                    <option value="active">Active</option>
                    <option value="closed">Closed</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </TableCell>
                <TableCell className="p-2 flex flex-wrap gap-2">
                  <Button
                    onClick={() => handleSaveState(project.projectID)}
                    variant="default"
                    color="green"
                    className="py-2 px-4"
                  >
                    Save State
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Project selection for PDF generation */}
      <div className="mt-4">
        <label htmlFor="projectSelect" className="mr-2">Select Project for PDF:</label>
        <select
          id="projectSelect"
          value={selectedProject || ""}
          onChange={(e) => setSelectedProject(Number(e.target.value))}
          className="border rounded-md p-2"
        >
          <option value="">-- Select Project --</option>
          {projects.map((project) => (
            <option key={project.projectID} value={project.projectID}>
              {project.projectName}
            </option>
          ))}
        </select>
      </div>

      {/* Generate PDF Button */}
      {selectedProject && (
        <div className="mt-4 flex justify-center gap-2">
          <Button
            variant="outline"
            onClick={generatePDF} // Call generatePDF function here
            className="px-6 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 transition-all"
          >
            Generate PDF
          </Button>
        </div>
      )}

      {/* Pagination controls */}
      <div className="mt-4 flex justify-center gap-2">
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-6 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 transition-all"
        >
          Previous
        </Button>
        <span className="px-4 py-2 text-lg font-semibold">
          {`Page ${currentPage} of ${totalPages}`}
        </span>
        <Button
          variant="outline"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-6 py-2 border-2 border-gray-400 rounded-lg hover:bg-gray-200 disabled:bg-gray-300 transition-all"
        >
          Next
        </Button>
      </div>
    </div>
  )
}