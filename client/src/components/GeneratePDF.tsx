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
  const handleGeneratePDF = () => {
    const doc = new jsPDF();

    const reportName = name || institutionName || "default_report"; // Default to "default_report" if both are null
    const filename = `${reportName}_expenses.pdf`;

    // Calculate the total cost
    const totalCost = expenses.reduce(
      (sum, expense) => sum + expense.expense,
      0
    );

    // Adding title to the PDF
    doc.text("Institution Expenses", 20, 20);

    // Generate table using autoTable
    (doc as any).autoTable({
      head: [["ID", "Description", "Cost", "Actor ID", "Project ID"]], // Removed 'Date' from table headers
      body: expenses.map((expense) => [
        expense.expenseID,
        expense.description,
        `$${expense.expense.toFixed(2)}`,
        expense.actorID, // Added actorID to the table
        expense.projectID, // Added projectID to the table
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
