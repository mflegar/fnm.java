// Page.tsx
import { useState } from "react";
import { AppSidebar } from "@/components/ProjectsSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Header } from "@/components/Projects_mainHeader";
import { ExpensesTable } from "@/components/InstitutionExpenses"; // Pretpostavljamo da je ova komponenta dostupna
import { GeneratePDF } from "@/components/GeneratePDF"; // Import GeneratePDF komponentu
import { useParams } from "react-router";

export default function Page() {
  // State koji će pratiti koja je komponenta aktivna
  const [activeComponent, setActiveComponent] = useState<string | null>(null);

  const { name } = useParams<{ name: string }>();
  const institutionName = name || "DefaultInstitution";

  // Primjer podataka za troškove
  const exampleExpenses = [
    { expenseID: 1, description: "Office Supplies", expense: 150.75, actorID: 101, projectID: 201, date: "2024-01-02" },
    { expenseID: 2, description: "Consulting Fees", expense: 1200.50, actorID: 102, projectID: 202, date: "2024-01-05" },
    { expenseID: 3, description: "Marketing Campaign", expense: 500.00, actorID: 103, projectID: 203, date: "2024-01-07" },
    { expenseID: 4, description: "Travel Expenses", expense: 200.00, actorID: 104, projectID: 204, date: "2024-01-10" },
    { expenseID: 5, description: "Software Licenses", expense: 350.99, actorID: 105, projectID: 205, date: "2024-01-12" },
    { expenseID: 6, description: "Employee Salaries", expense: 3000.00, actorID: 106, projectID: 206, date: "2024-01-15" },
    { expenseID: 7, description: "Client Dinner", expense: 150.40, actorID: 107, projectID: 207, date: "2024-01-18" },
    { expenseID: 8, description: "Office Rent", expense: 2500.00, actorID: 108, projectID: 208, date: "2024-01-20" },
    { expenseID: 9, description: "Team Building Event", expense: 1000.00, actorID: 109, projectID: 209, date: "2024-01-22" },
    { expenseID: 10, description: "Internet & Utilities", expense: 180.00, actorID: 110, projectID: 210, date: "2024-01-25" },
    { expenseID: 11, description: "Web Hosting", expense: 75.00, actorID: 111, projectID: 211, date: "2024-01-28" },
    { expenseID: 12, description: "Employee Benefits", expense: 1200.00, actorID: 112, projectID: 212, date: "2024-02-02" },
    { expenseID: 13, description: "Advertising", expense: 800.00, actorID: 113, projectID: 213, date: "2024-02-05" },
    { expenseID: 14, description: "Research & Development", expense: 2200.00, actorID: 114, projectID: 214, date: "2024-02-08" },
    { expenseID: 15, description: "Business Insurance", expense: 500.00, actorID: 115, projectID: 215, date: "2024-02-10" },
    { expenseID: 16, description: "Printing Services", expense: 300.00, actorID: 116, projectID: 216, date: "2024-02-12" },
    { expenseID: 17, description: "Corporate Gifts", expense: 450.00, actorID: 117, projectID: 217, date: "2024-02-15" },
  ];

  const handleComponentChange = (component: string) => {
    setActiveComponent(component);
  };

  return (
    <SidebarProvider>
      <AppSidebar onComponentChange={handleComponentChange} />
      <SidebarInset>
        <div className="flex flex-col h-screen">
        <Header institutionName={institutionName} /> {/* Poslano ime institucije */}
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Institution</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            {/* Render active component dynamically */}
            {activeComponent === "expenses" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <ExpensesTable expenses={exampleExpenses} />
                <GeneratePDF expenses={exampleExpenses} institutionName={institutionName} name={null} />
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
