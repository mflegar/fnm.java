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
import { Skeleton } from "@/components/ui/skeleton";

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
      name: "Institution Notifications",
      icon: BellRing,
    },
    {
      name: "Institution Dashboard",
      icon: LayoutDashboard,
    },
  ],
};

export function AppSidebar({
  onComponentChange,
  ...props
}: {
  onComponentChange: (component: string) => void;
}) {
  const navigate = useNavigate();
  const { name } = useParams<{ name: string }>();
  const [actors, setActors] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [user, setUser] = useState<{
    id: number;
    email: string;
    username: string;
  } | null>(null);
  const [isOwner, setIsOwner] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token"); // token

  const handleInstitutionExpensesClick = () => {
    onComponentChange("expenses");
  };

  const handleInstitutionDashboardClick = () => {
    onComponentChange("dashboard");
  };

  const handleNotificationsClick = () => {
    onComponentChange("notifications");
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
    const fetchInstitutionData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/institution/name/${name}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const institutionData = await response.json();
          const { institutionID } = institutionData;
          await Promise.all([
            checkOwnership(user.id, institutionID),
            fetchAdditionalData(institutionID),
          ]);
        } else {
          console.error("Error fetching institution data");
          navigate("/dashboard");
        }
      } catch (error) {
        console.error("Error fetching institution data:", error);
        navigate("/dashboard");
      } finally {
        setLoading(false);
      }
    };

    const fetchAdditionalData = async (institutionID: string) => {
      try {
        const actorsResponse = await fetch(
          `/api/user/institution/${institutionID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const projectsResponse = await fetch(
          `/api/project/${user?.id}/inside/${institutionID}`,
          {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
          }
        );

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

    const checkOwnership = async (actorID: number, institutionID: string) => {
      try {
        const response = await fetch(
          `/api/user/${actorID}/isInstitutionOwner/${institutionID}`,
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
        console.error("Error checking ownership:", error);
      }
    };

    if (user) fetchInstitutionData();
  }, [name, user, navigate]);

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
      title: "Projects",
      icon: FolderDot,
      items: projects.map((project) => ({
        title: project.projectName,
        url: `/institution/${name}/${project.projectName}`,
      })),
    },
    ...(isOwner
      ? [
          {
            title: "Institution Expenses",
            icon: BadgeDollarSign,
            items: [
              {
                title: "View Expenses",
              },
            ],
          },
        ]
      : []),
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent>
        <NavMain
          items={navMainItems}
          onViewExpensesClick={handleInstitutionExpensesClick}
          ownerName={user?.username || "Default User"}
        />
        {isOwner && (
          <NavProjects
            personal={data.personal}
            onSecondOptionClick={handleInstitutionDashboardClick}
            onFirstOptionClick={handleNotificationsClick}
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
