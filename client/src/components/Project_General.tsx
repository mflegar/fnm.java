import { ChevronRight, type LucideIcon } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

export function ProjectGeneral({
  items,
  ownerName,
}: {
  items: {
    title: string;
    icon?: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url?: string;
    }[]; // For subitems
  }[];
  ownerName: string; // Prop for owner name
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          let noItemsMessage = ""; // Message for empty sections

          // Determine message based on the item type
          if (item.title === "Users" && (!item.items || item.items.length === 0)) {
            noItemsMessage = "No Users in this project.";
          } else if (item.title === "Tasks" && (!item.items || item.items.length === 0)) {
            noItemsMessage = "No Tasks assigned.";
          }

          return (
            <Collapsible
              key={`${item.title}-${index}`} // Use both title and index to ensure uniqueness
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip={item.title}>
                    {item.icon && <item.icon />}
                    <span>{item.title}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {item.items && item.items.length > 0 ? (
                    <SidebarMenuSub>
                      {item.items.map((subItem, subIndex) => (
                        <SidebarMenuSubItem key={`${subItem.title}-${subIndex}`}> {/* Unique key for each subitem */}
                          <SidebarMenuSubButton asChild>
                            {subItem.url ? (
                              <a
                                href={subItem.url}
                                className="w-full text-left p-2 block"
                              >
                                <span>{subItem.title}</span>
                              </a>
                            ) : (
                              <button
                                className="w-full text-left p-2"
                              >
                                <span>
                                  {subItem.title}
                                  {item.title === "Users" && subItem.title === ownerName && " - Project Leader"}
                                </span>
                              </button>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground">{noItemsMessage}</div>
                  )}
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
}