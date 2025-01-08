import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  GalleryVerticalEnd,
  Users,
  FolderDot,
  BadgeDollarSign,
  BellRing,
  LayoutDashboard,
} from "lucide-react";

import { NavMain } from "@/components/Sidebar_General";
import { NavProjects } from "@/components/Sidebar_Personal";
import { NavUser } from "@/components/ProjectsFooter";
import { TeamSwitcher } from "@/components/ProjectsHeader";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Sample data
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
    },
  ],
  navMain: [
    {
      title: "Actors",
      url: "#",
      icon: Users,
      isActive: true,
      items: [
        {
          title: "History",
          url: "#",
        },
        {
          title: "Starred",
          url: "#",
        },
        {
          title: "Settings",
          url: "#",
        },
      ],
    },
    {
      title: "Projects",
      url: "#",
      icon: FolderDot,
      items: [
        {
          title: "Genesis",
          url: "#",
        },
        {
          title: "Explorer",
          url: "#",
        },
        {
          title: "Quantum",
          url: "#",
        },
      ],
    },
    {
      title: "Institution expenses",
      url: "#",
      icon: BadgeDollarSign,
      items: [
        {
          title: "Introduction",
          url: "#",
        },
        {
          title: "Get Started",
          url: "#",
        },
        {
          title: "Tutorials",
          url: "#",
        },
        {
          title: "Changelog",
          url: "#",
        },
      ],
    },
  ],
  projects: [
    {
      name: "Your notifications",
      url: "#",
      icon: BellRing,
    },
    {
      name: "Institution dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
  ],
};

export function AppSidebar({ onComponentChange, ...props }: { onComponentChange: (component: string) => void }) {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [institution, setInstitution] = useState<any>(null);
  const [expenses, setExpenses] = useState<any[]>([
    { id: 1, description: "Office rent", cost: 1500, date: "2025-01-01" },
    { id: 2, description: "Software licenses", cost: 300, date: "2025-01-02" },
    { id: 3, description: "Marketing budget", cost: 500, date: "2025-01-03" },
    { id: 4, description: "Employee salaries", cost: 12000, date: "2025-01-04" },
  ]);
  const [actors, setActors] = useState<any[]>([
    { id: 1, username: "John Doe", role: "Manager" },
    { id: 2, username: "Jane Smith", role: "Developer" },
    { id: 3, username: "Alice Brown", role: "Designer" },
    { id: 4, username: "Bob White", role: "Tester" },
  ]);
  const [projects, setProjects] = useState<any[]>([
    { projectID: 1, name: "Genesis", description: "A cutting-edge AI project" },
    { projectID: 2, name: "Explorer", description: "A new space exploration initiative" },
    { projectID: 3, name: "Quantum", description: "Research on quantum computing" },
    { projectID: 4, name: "Aurora", description: "A renewable energy project" },
  ]);
  const [user, setUser] = useState<{ id: Number; email: string; username: string } | null>(null);

  const handleInstitutionExpensesClick = () => {
    console.log("Expenses clicked")
    onComponentChange("expenses");
  };
  
  const handleInstitutionDashboardClick = () => {
    console.log("Institution Dashboard clicked")
    onComponentChange("dashboard");
  };

  const handleNotificationsClick = () => {
    console.log("Notifications clicked");
    onComponentChange("notifications");
  };


  const token = localStorage.getItem("token"); // token

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({ id: parsedUser.id, email: parsedUser.email, username: parsedUser.username });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchInstitutionData = async () => {
      try {
        const response = await fetch(`/api/institution/name/${name}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.ok) {
          const institutionData = await response.json();
          setInstitution(institutionData);
          const { institutionID } = institutionData;
          fetchAdditionalData(institutionID);
        } else {
          console.error("Error fetching institution data");
          //navigate("/dashboard")
        }
      } catch (error) {
        console.error("Error fetching institution data:", error);
        //navigate("/dashboard")
      }
    };

    const fetchAdditionalData = async (institutionID: string) => {
      try {
        const expensesResponse = await fetch(`/api/expense/institution/${institutionID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const actorsResponse = await fetch(`/api/users/institution/${institutionID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectsResponse = await fetch(`/api/projects/institution/${institutionID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (expensesResponse.ok) {
          setExpenses(await expensesResponse.json());
        }
        if (actorsResponse.ok) {
          setActors(await actorsResponse.json());
        }
        if (projectsResponse.ok) {
          setProjects(await projectsResponse.json());
        }
      } catch (error) {
        console.error("Error fetching additional data:", error);
      }
    };

    fetchInstitutionData();
  }, [name, navigate, token]);

  const navMainItems = [
    {
      title: "Actors",
      icon: Users,
      items: actors.map((actor) => ({
        title: actor.username,
      })),
    },
    {
      title: "Projects",
      icon: FolderDot,
      items: projects.map((project) => ({
        title: project.name,
        url: `/institution/${name}/${project.projectID}`,
      })),
    },
    {
      title: "Institution Expenses",
      icon: BadgeDollarSign,
      items: [
        {
          title: "View Expenses",
        },
      ],
    },
  ];

  return (
    <>
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <TeamSwitcher institution={institution} />
        </SidebarHeader>
        <SidebarContent>
          <NavMain items={navMainItems} onViewExpensesClick={handleInstitutionExpensesClick} ownerName={user?.username || "Default User"} />
          <NavProjects projects={data.projects} onInstitutionDashboardClick={handleInstitutionDashboardClick} onNotificationsClick={handleNotificationsClick} />
        </SidebarContent>
        <SidebarFooter>
          {user ? (
            <NavUser user={{ email: user.email, username: user.username }} />
          ) : (
            <div>Loading user...</div>
          )}
        </SidebarFooter>
      </Sidebar>
    </>
  );
}
