import { useState, useEffect } from "react";
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
import { ExpensesTable } from "@/components/InstitutionExpenses";
import { GeneratePDF } from "@/components/GeneratePDF";
import { useParams } from "react-router";
import { InstitutionDashboard } from "@/components/InstitutionDashboard";
import { Notifications } from "@/components/InstitutionNotifications";

interface Project {
  projectID: number;
  projectName: string;
  start: string;
  attachment: string;
  institutionID: number;
  actorID: number;
  state: "pending" | "active" | "closed" | "rejected";
}

export default function Page() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [institutionID, setInstitutionID] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);

  const { name } = useParams<{ name: string }>();
  const institutionName = name || "DefaultInstitution";

  useEffect(() => {
    const fetchInstitution = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/institution/name/${institutionName}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch institution");
        }

        const data = await response.json();
        setInstitutionID(data.institutionID);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchInstitution();
  }, [institutionName]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!institutionID) return;
  
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/expense/institution/${institutionID}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch expenses");
        }
  
        const data = await response.json();
        setExpenses(data);
      } catch (err: any) {
        console.log(err);
      }
    };
  
    fetchExpenses();
  }, [institutionID]);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!institutionID) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/project/institution/${institutionID}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }

        const data = await response.json();
        setProjects(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchProjects();
  }, [institutionID]);

  const handleComponentChange = (component: string) => {
    if(activeComponent === component){
      setActiveComponent(null);
    } else {
      setActiveComponent(component);
    }
  };

  return (
    <SidebarProvider>
      <AppSidebar onComponentChange={handleComponentChange} />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <Header institutionName={institutionName} />
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

            {activeComponent === "dashboard" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <InstitutionDashboard projects={projects} />
              </div>
            )}
            {activeComponent === "expenses" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <ExpensesTable expenses={expenses} />
                <GeneratePDF expenses={expenses} institutionName={institutionName} name={null} />
              </div>
            )}
            {activeComponent === "notifications" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <Notifications />
              </div>
            )}
            {!activeComponent && (
              <div className="flex flex-col md:flex-row items-start justify-between h-full bg-muted/10 pt-10 px-6 rounded-xl">
                <div className="w-full md:w-1/2 text-left mb-6 md:mb-0 md:pr-8">
                  <h1 className="text-2xl font-bold text-primary mb-4">
                    Welcome to Institution {institutionName}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    We hope you're enjoying your stay here. Unfortunately, as a default user in this institution, this page may not be the most useful for you at the moment. 
                    To get started, you can click on the sidebar to explore the <span className="font-semibold">"Projects"</span> section, 
                    where you can open an ongoing project you are in or request to create a new project or join a current one using the <span className="font-semibold">"Join Project"</span> option at the top right.
                  </p>
                </div>
                <div className="w-full md:w-1/2 flex flex-col items-center justify-center md:justify-start md:items-start">
                  <div className="w-full h-px bg-gray-200 my-6 md:hidden"></div>
                  <div className="hidden md:block w-px bg-gray-200 self-stretch mx-8"></div>
                  <img 
                    src="../images/Logo.png" 
                    alt="Application Logo" 
                    className="max-w-full h-auto md:max-h-64 hidden md:block mt-6 md:mt-0"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
