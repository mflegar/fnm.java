"use client";

import { useState, useEffect } from "react";
import { DashboardSidebar } from "@/components/Dashboard_Sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DashboardHeader } from "@/components/Dashboard_mainHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Rocket } from "lucide-react";

export default function DashboardPage() {
  const [institutions, setInstitutions] = useState<any[]>([]);

  useEffect(() => {
    const fetchInstitutions = async () => {
      try {
        const userData = localStorage.getItem("user");
        if (!userData) return;

        const user = JSON.parse(userData);
        const actorId = user.id;
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/institution/actor/${actorId}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch institutions");
        }

        const data = await response.json();
        setInstitutions(data);
      } catch (err: any) {
        console.error("Error fetching institutions:", err);
      }
    };

    fetchInstitutions();
  }, []);

  return (
    <SidebarProvider>
      <DashboardSidebar />
      <SidebarInset>
        <div className="flex flex-col h-screen">
          <DashboardHeader />
          <div className="flex-1 overflow-y-auto flex flex-col gap-4 p-4 pt-0">
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbPage>Dashboard</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Your Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="mb-4">
                  This is your central hub inside the application. Here's how to
                  get started:
                </p>
                <ul className="list-disc pl-6 mb-4 space-y-2">
                  <li>View your institutions in the sidebar on the left</li>
                  <li>
                    Join an existing institution or create a new one using the
                    options in the header above
                  </li>
                  <li>
                    Once you're part of an institution, you can work on many
                    sorts of projects
                  </li>
                  <li>Collaborate with team members, and achieve your goals</li>
                </ul>
                <p className="mb-4">
                  As you use this application more and more, you'll see the
                  management improvement you will achieve.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Your Institutions</CardTitle>
              </CardHeader>
              <CardContent>
                {institutions.length > 0 ? (
                  <div className="space-y-2">
                    <p>
                      You are currently a member of{" "}
                      <span className="font-medium">{institutions.length}</span>{" "}
                      institution{institutions.length !== 1 ? "s" : ""}.
                    </p>
                    <p className="text-muted-foreground">
                      Access your institutions through the sidebar to view
                      projects, team members, and other details.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <p>You haven't joined any institutions yet.</p>
                    <p className="text-muted-foreground">
                      Use the "Join Institution" or "Create Institution" buttons
                      in the header to get started and begin collaborating with
                      others.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center space-x-2">
                <Rocket className="w-6 h-6 text-primary" />
                <CardTitle>Welcome to Our Application</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p>
                    We're thrilled to have you on board! Our application is
                    designed to revolutionize the way institutions collaborate
                    and manage projects, with a focus on efficiency, monitoring,
                    and communication.
                  </p>
                  <p>
                    Here's how our platform can transform your project
                    management:
                  </p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>
                      <span className="font-medium">Increased Efficiency:</span>{" "}
                      Project managers can assign specific tasks to each team
                      member, allowing researchers to focus on their work rather
                      than planning.
                    </li>
                    <li>
                      <span className="font-medium">Enhanced Monitoring:</span>{" "}
                      Team leaders and institution heads can easily track
                      progress, adjust resources, and oversee project costs,
                      promoting better organization and financial transparency.
                    </li>
                    <li>
                      <span className="font-medium">
                        Improved Communication:
                      </span>{" "}
                      Our integrated notification system keeps all team members
                      promptly informed about key project events, enhancing
                      collaboration and overall efficiency.
                    </li>
                    <li>
                      <span className="font-medium">
                        Streamlined Workflows:
                      </span>{" "}
                      Customizable processes to fit your institution's unique
                      needs.
                    </li>
                  </ul>
                  <p>
                    As you explore the application, you'll discover how these
                    features can help your institution achieve its goals more
                    efficiently than ever before.
                  </p>
                  <p className="font-medium">
                    Ready to boost your team's productivity? Join or create an
                    institution, and let's begin this journey of enhanced
                    project management together!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
