import {
  ChevronRight,
  MoreHorizontal,
  CheckCircle,
  type LucideIcon,
} from "lucide-react";
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
  SidebarMenuAction,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useState } from "react";

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
  const [taskItems, setTaskItems] = useState(items); // State to manage the items

  const handleMarkAsDone = async (taskTitle: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Authorization token not found in localStorage.");
      }
  
      // Fetch taskID based on taskTitle
      const response = await fetch(`/api/task/name/${taskTitle}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch task ID for "${taskTitle}".`);
      }
  
      const { taskID } = await response.json();
      if (!taskID) {
        throw new Error(`No task ID found for "${taskTitle}".`);
      }
  
      // Send DELETE request to remove the task
      const deleteResponse = await fetch(`/api/task/delete/${taskID}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!deleteResponse.ok) {
        throw new Error(`Failed to delete task with ID "${taskID}".`);
      }
  
      console.log(`Task "${taskTitle}" (ID: ${taskID}) has been deleted.`);
  
      // Remove the task from the state (taskItems)
      setTaskItems((prevItems) => {
        return prevItems.map((item) => {
          if (item.title === "Tasks" && item.items) {
            item.items = item.items.filter(
              (subItem) => subItem.title !== taskTitle
            );
          }
          return item;
        });
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Project Navigation</SidebarGroupLabel>
      <SidebarMenu>
        {taskItems.map((item, index) => {
          let noItemsMessage = ""; // Message for empty sections

          // Determine message based on the item type
          if (
            item.title === "Users" &&
            (!item.items || item.items.length === 0)
          ) {
            noItemsMessage = "No Users in this project.";
          } else if (
            item.title === "Tasks" &&
            (!item.items || item.items.length === 0)
          ) {
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
                        <SidebarMenuSubItem
                          key={`${subItem.title}-${subIndex}`}
                        >
                          <SidebarMenuSubButton asChild>
                            {subItem.url ? (
                              <a
                                href={subItem.url}
                                className="w-full text-left p-2 block"
                              >
                                <span>{subItem.title}</span>
                              </a>
                            ) : (
                              <div className="w-full flex items-center justify-between p-2">
                                <button className="text-left">
                                  <span>
                                    {subItem.title}
                                    {item.title === "Users" &&
                                      subItem.title === ownerName &&
                                      " - Leader"}
                                  </span>
                                </button>
                                {item.title === "Tasks" && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <SidebarMenuAction showOnHover>
                                        <MoreHorizontal />
                                        <span className="sr-only">More</span>
                                      </SidebarMenuAction>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent
                                      className="w-48 rounded-lg"
                                      side="right"
                                      align="start"
                                    >
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleMarkAsDone(subItem.title)
                                        }
                                      >
                                        <CheckCircle className="mr-2 h-4 w-4 text-muted-foreground" />
                                        <span>Mark as Done</span>
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>
                            )}
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground">
                      {noItemsMessage}
                    </div>
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
