import {
  Folder,
  MoreHorizontal,
  Trash2,
  type LucideIcon,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavProjects({
  projects,
  onInstitutionDashboardClick,
  onNotificationsClick, // Dodaj prop za "Your notifications"
}: {
  projects: {
    name: string;
    url?: string;
    icon: LucideIcon;
  }[];
  onInstitutionDashboardClick: () => void;
  onNotificationsClick: () => void; // Tipiziraj novi prop
}) {
  const { isMobile } = useSidebar();

  const handleProjectClick = (name: string) => {
    if (name.toLowerCase() === "institution dashboard") {
      onInstitutionDashboardClick();
    } else if (name.toLowerCase() === "your notifications") {
      onNotificationsClick(); // Poziva funkciju za "Your notifications"
    }
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Personal</SidebarGroupLabel>
      <SidebarMenu>
        {projects.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton asChild>
              {item.url ? (
                <a href={item.url}>
                  <item.icon />
                  <span>{item.name}</span>
                </a>
              ) : (
                <button
                  className="w-full text-left p-2 flex items-center gap-2"
                  onClick={() => handleProjectClick(item.name)}
                >
                  <item.icon />
                  <span>{item.name}</span>
                </button>
              )}
            </SidebarMenuButton>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuAction showOnHover>
                  <MoreHorizontal />
                  <span className="sr-only">More</span>
                </SidebarMenuAction>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-48 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem
                  onClick={() => handleProjectClick(item.name)}
                >
                  <Folder className="text-muted-foreground" />
                  <span>View</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Trash2 className="text-muted-foreground" />
                  <span>Goat</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
