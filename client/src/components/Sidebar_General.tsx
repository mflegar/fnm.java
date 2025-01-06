"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url?: string
    }[] // For subitems
  }[]  
}) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>General</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => {
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
              key={item.title}
              asChild
              defaultOpen={item.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  {item.title === "Institution Expenses" ? (
                    // Ako je "Institution Expenses", samo dugme bez dropdowna
                    <SidebarMenuButton
                      onClick={() => window.location.href = `/institution/${name}/expenses`} 
                      tooltip={item.title}
                    >
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  ) : (
                    // Ako nije "Institution Expenses", onda s dropdownom
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
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton asChild>
                            {subItem.url ? (
                              <a
                                href={subItem.url}
                                className="w-full text-left p-2 block"
                              >
                                <span>{subItem.title}</span>
                              </a>
                            ) : (
                              <button className="w-full text-left p-2">
                                <span>{subItem.title}</span>
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
