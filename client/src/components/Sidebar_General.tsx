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

export function NavMain({
  items,
  onViewExpensesClick,
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
  onViewExpensesClick: () => void; // Callback function type
  ownerName: string; // Prop for owner name
}) {
  const handleChildClick = (title: string) => {
    if (title.toLowerCase() === "view expenses") {
      onViewExpensesClick(); // Calling callback function
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item, index) => {
          let noItemsMessage = ""; // Message for empty sections

          // Determine message based on the item type
          if (item.title === "Actors" && (!item.items || item.items.length === 0)) {
            noItemsMessage = "No Actors in institution";
          } else if (item.title === "Projects" && (!item.items || item.items.length === 0)) {
            noItemsMessage = "No Projects in institution";
          } else if (item.title === "Institution Expenses" && (!item.items || item.items.length === 0)) {
            noItemsMessage = "No Expenses for institution";
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
                  {item.title === "Institution Expenses" ? (
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  ) : (
                    <SidebarMenuButton tooltip={item.title}>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  )}
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
                                onClick={() => handleChildClick(subItem.title)}
                              >
                                <span>
                                  {subItem.title}
                                  {subItem.title === ownerName && ` - Owner`}
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
