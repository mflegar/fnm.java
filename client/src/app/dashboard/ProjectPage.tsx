import { useState, useEffect } from "react";
import { ProjectSidebar } from "@/components/ProjectSidebar";
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
import { ProjectHeader } from "@/components/Project_mainHeader";
import { GeneratePDF } from "@/components/GeneratePDF";
import { useParams } from "react-router";
import { ExpensesTable } from "@/components/InstitutionExpenses";

export default function ProjectPage() {
  const [activeComponent, setActiveComponent] = useState<string | null>(null);
  const [projectID, setProjectID] = useState<number | null>(null);
  const [expenses, setExpenses] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const { name, projectName } = useParams<{
    name: string;
    projectName: string;
  }>();
  const project_name = projectName || "DefaultProject";

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/project/name/${project_name}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch project");
        }

        const data = await response.json();
        setProjectID(data.projectID);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchProject();
  }, [project_name]);

  useEffect(() => {
    const fetchExpenses = async () => {
      if (!projectID) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/expense/project/${projectID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
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
  }, [projectID]);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!projectID) return;

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/task/project/${projectID}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch tasks");
        }

        const data = await response.json();
        setTasks(data);
      } catch (err: any) {
        console.log(err);
      }
    };

    fetchTasks();
  }, [projectID]);

  const handleComponentChange = (component: string) => {
    if (activeComponent === component) {
      setActiveComponent(null);
    } else {
      setActiveComponent(component);
    }
  };

  return (
    <SidebarProvider>
      <ProjectSidebar onComponentChange={handleComponentChange} />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <ProjectHeader projectName={project_name} />
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="/dashboard">
                        Dashboard
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={`/institution/${name}`}>
                        Institution
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Project</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            {activeComponent === "tasks" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <TuNestoIDE tasks={tasks} />
              </div>
            )}
            {activeComponent === "expenses" && (
              <div className="mt-6 min-h-[400px] flex-1 bg-muted/50 rounded-xl p-6">
                <ExpensesTable expenses={expenses} />
                <GeneratePDF
                  expenses={expenses}
                  institutionName={name || ""}
                  name={project_name}
                />
              </div>
            )}
            {!activeComponent && <div>EJ ALO BIDIBOU</div>}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
