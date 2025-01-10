import { useEffect, useState } from "react";
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
  const [actors, setActors] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
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
      const userData = localStorage.getItem("user");
      if (!userData){
        return;
      }
      const parsedData = JSON.parse(userData);
      const actorID = parsedData.id;
      try {
        const actorsResponse = await fetch(`/api/user/institution/${institutionID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const projectsResponse = await fetch(`/api/project/${actorID}/inside/${institutionID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        if (actorsResponse.ok) {
          const actorsData = await actorsResponse.json();
          setActors(actorsData);
        } else{
          console.error("Failed to fetch actors");
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
        title: actor.actorUsername,
      })),
    },
    {
      title: "Projects",
      icon: FolderDot,
      items: projects.map((project) => ({
        title: project.projectName,
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
          <TeamSwitcher />
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
