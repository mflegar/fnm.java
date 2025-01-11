import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  GalleryVerticalEnd,
  Users,
  LayoutDashboard,
  PiggyBank,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { TeamSwitcher } from "./ProjectsHeader";
import { NavUser } from "./ProjectsFooter";
import { NavProjects } from "./Sidebar_Personal";
import { ProjectGeneral } from "./Project_General";

// Sample data
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: GalleryVerticalEnd,
    },
  ],
  personal: [
    {
      name: "Expenses",
      icon: PiggyBank,
    },
    {
      name: "Tasks",
      icon: LayoutDashboard,
    },
  ],
};

export function ProjectSidebar({
  onComponentChange,
  ...props
}: {
  onComponentChange: (component: string) => void;
}) {
  const navigate = useNavigate();
  const { projectName } = useParams<{
    name: string;
    projectName: string;
  }>();
  const [actors, setActors] = useState<any[]>([]);
  const [tasks, setTasks] = useState<any[]>([]);
  const [user, setUser] = useState<{
    id: number;
    email: string;
    username: string;
  } | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token"); // token

  const handleProjectExpensesClick = () => {
    onComponentChange("expenses");
  };

  const handleProjectTasksClick = () => {
    onComponentChange("tasks");
  };

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser({
          id: parsedUser.id,
          email: parsedUser.email,
          username: parsedUser.username,
        });
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchProjectData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/project/name/${projectName}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const projectData = await response.json();
          const { projectID } = projectData;
          await Promise.all([
            checkOwnership(user.id, projectID),
            fetchAdditionalData(projectID),
          ]);
        } else {
          console.error("Error fetching project data");
          //navigate(`/institution/${name}`);
        }
      } catch (error) {
        console.error("Error fetching project data:", error);
        //navigate(`/institution/${name}`);
      } finally {
        setLoading(false);
      }
    };

    const fetchAdditionalData = async (projectID: string) => {
      try {
        // Dobiti usere koji su u projektu
        const actorsResponse = await fetch(`/api/user/project/${projectID}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        const tasksResponse = await fetch(
          `/api/task/${user?.id}/inside/${projectID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (actorsResponse.ok) {
          setActors(await actorsResponse.json());
        }
        if (tasksResponse.ok) {
          setTasks(await tasksResponse.json());
        }
      } catch (error) {
        console.log("Error fetching additional data:", error);
      }
    };

    const checkOwnership = async (actorID: number, projectID: string) => {
      try {
        const response = await fetch(
          `/api/user/${actorID}/isProjectOwner/${projectID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        if (response.ok) {
          setIsOwner(await response.json());
        } else {
          console.error("Failed to check ownership");
        }
      } catch (error) {
        console.log("Error checking ownership:", error);
      }
    };

    if (user) fetchProjectData();
  }, [projectName, user, navigate]);

  if (loading) {
    // Skeleton
    return (
      <Sidebar collapsible="icon" {...props}>
        <SidebarHeader>
          <Skeleton className="h-10 w-full" />
        </SidebarHeader>
        <SidebarContent>
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full mb-4" />
          <Skeleton className="h-10 w-full" />
        </SidebarContent>
        <SidebarFooter>
          <Skeleton className="h-10 w-full" />
        </SidebarFooter>
      </Sidebar>
    );
  }

  const navMainItems = [
    {
      title: "Users",
      icon: Users,
      items: actors.map((actor) => ({
        title: actor.actorUsername,
      })),
    },
    {
      title: "Tasks",
      icon: LayoutDashboard,
      items: tasks.map((task) => ({
        title: task.taskName,
      })),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <ProjectGeneral
          items={navMainItems}
          ownerName={user?.username || "Default User"}
        />
        {isOwner && (
          <NavProjects
            personal={data.personal}
            onSecondOptionClick={handleProjectTasksClick}
            onFirstOptionClick={handleProjectExpensesClick}
          />
        )}
      </SidebarContent>
      <SidebarFooter>
        {user ? (
          <NavUser user={{ email: user.email, username: user.username }} />
        ) : (
          <div>Loading user...</div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
