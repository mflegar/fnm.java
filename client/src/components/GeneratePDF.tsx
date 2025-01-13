import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Ensure this is imported
import { Button } from "@/components/ui/button"; // Import Shadcn UI Button

interface GeneratePDFProps {
  expenses: {
    expenseID: number;
    description: string;
    expense: number;
    actorID: number;
    projectID: number;
  }[]; // Removed "date" field from the interface
  institutionName: string | null;
  name: string | null;
}

export const GeneratePDF = ({
  expenses,
  institutionName,
  name,
}: GeneratePDFProps) => {
  const handleGeneratePDF = async () => {
    const doc = new jsPDF();

    const reportName = name || institutionName || "default_report"; // Default to "default_report" if both are null
    const filename = `${reportName}_expenses.pdf`;

    // Calculate the total cost
    const totalCost = expenses.reduce(
      (sum, expense) => sum + expense.expense,
      0
    );

    // Fetch actor usernames and project names
    const actorNamesMap = new Map<number, string>();
    const projectNamesMap = new Map<number, string>();

    for (const expense of expenses) {
      // Fetch actor username if not already fetched
      if (!actorNamesMap.has(expense.actorID)) {
        try {
          const response = await fetch(`/api/user/${expense.actorID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            const actor = await response.json();
            actorNamesMap.set(expense.actorID, actor.actorUsername);
          } else {
            console.error(`Failed to fetch actor with ID ${expense.actorID}`);
            actorNamesMap.set(expense.actorID, "Unknown"); // Fallback if API fails
          }
        } catch (error) {
          console.error(`Error fetching actor with ID ${expense.actorID}`, error);
          actorNamesMap.set(expense.actorID, "Unknown");
        }
      }

      // Fetch project name if not already fetched
      if (!projectNamesMap.has(expense.projectID)) {
        try {
          const response = await fetch(`/api/project/${expense.projectID}`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          if (response.ok) {
            const project = await response.json();
            projectNamesMap.set(expense.projectID, project.projectName);
          } else {
            console.error(`Failed to fetch project with ID ${expense.projectID}`);
            projectNamesMap.set(expense.projectID, "Unknown"); // Fallback if API fails
          }
        } catch (error) {
          console.error(`Error fetching project with ID ${expense.projectID}`, error);
          projectNamesMap.set(expense.projectID, "Unknown");
        }
      }
    }

    // Adding title to the PDF
    doc.text("Institution Expenses", 20, 20);

    // Generate table using autoTable
    (doc as any).autoTable({
      head: [["ID", "Description", "Cost", "Actor", "Project"]], // Replaced 'Project ID' with 'Project'
      body: expenses.map((expense) => [
        expense.expenseID,
        expense.description,
        `$${expense.expense.toFixed(2)}`,
        actorNamesMap.get(expense.actorID) || "Unknown", // Use actorUsername or fallback
        projectNamesMap.get(expense.projectID) || "Unknown", // Use projectName or fallback
      ]),
      startY: 30, // Start table below the title
      margin: { top: 20 },
      theme: "grid", // Add a grid theme to the table
      styles: {
        halign: "center", // Align text in the center
      },
    });

    // Use autoTable.previous.finalY to get the position of the last row
    const lastTableY = (doc as any).autoTable.previous.finalY;
    // Display Total Cost after the table
    doc.text(`Total Cost: $${totalCost.toFixed(2)}`, 20, lastTableY + 10);
    // Save the PDF file
    doc.save(filename);
  };

  return (
    <div className="absolute bottom-6 right-6">
      {" "}
      {/* Positioned button at the bottom right */}
      <Button variant="outline" onClick={handleGeneratePDF}>
        Generate PDF
      </Button>
    </div>
  );
};