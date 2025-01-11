import { Folder, MoreHorizontal, type LucideIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
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
  personal,
  onFirstOptionClick,
  onSecondOptionClick, // Dodaj prop za "Your notifications"
}: {
  personal: {
    name: string;
    url?: string;
    icon: LucideIcon;
  }[];
  onFirstOptionClick: () => void;
  onSecondOptionClick: () => void;
}) {
  const { isMobile } = useSidebar();
  const handlePersonalClick = (name: string) => {
    const lowerName = name.toLowerCase();
    if (lowerName === "institution dashboard") {
      onSecondOptionClick();
    } else if (lowerName === "institution notifications") {
      onFirstOptionClick();
    } else if (lowerName === "expenses") {
      onFirstOptionClick();
    } else if (lowerName === "tasks") {
      onSecondOptionClick();
    } else {
      console.warn(`Unhandled personal item click: ${name}`);
    }
  };
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Personal</SidebarGroupLabel>
      <SidebarMenu>
        {personal.map((item) => (
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
                  onClick={() => handlePersonalClick(item.name)}
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
                  onClick={() => handlePersonalClick(item.name)}
                >
                  <Folder className="text-muted-foreground" />
                  <span>View</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
