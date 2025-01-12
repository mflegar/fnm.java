import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Users,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { NavUser } from "./ProjectsFooter";
import { DashboardGeneral } from "./Dashboard_General";

export function DashboardSidebar({ ...props }: {}) {
  const navigate = useNavigate();
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [user, setUser] = useState<{
    id: number;
    email: string;
    username: string;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const token = localStorage.getItem("token"); // token

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
    const fetchData = async () => {
      if (!user) return;

      try {
        const response = await fetch(`/api/institution/actor/${user.id}`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          setInstitutions(await response.json());
        } else {
          console.log("Error getting institution data");
        }
      } catch (error) {
        console.log("Error fetching institution data");
      } finally {
        setLoading(false);
      }
    };

    if (user) fetchData();
  }, [user, navigate]);

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
      title: "Institutions",
      icon: Users,
      items: institutions.map((institution) => ({
        title: institution.institutionName,
        url: `/institution/${institution.institutionName}`,
      })),
    },
  ];

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarContent>
        <DashboardGeneral
          items={navMainItems}
          ownerName={user?.username || "Default User"}
        />
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
