import * as React from "react";
import {
  PanelLeftOpen,
  PanelRightOpen,
  Search,
  Bell,
  Command,
  Home,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link } from "@tanstack/react-router";

type Props = {
  isCollapsed: boolean;
  toggleSidebar: () => void;
} & React.ComponentProps<typeof Sidebar>;

export default function GroupSidebar({
  isCollapsed,
  toggleSidebar,
  children,
  ...props
}: Props) {
  const navMain = [
    {
      title: isCollapsed ? "Expand" : "Collapse",
      url: "#",
      icon: isCollapsed ? PanelLeftOpen : PanelRightOpen,
      isActive: false,
      action: toggleSidebar,
    },
    {
      title: "Home",
      url: "/",
      icon: Home,
      isActive: false,
    },
    {
      title: "Search",
      url: "#",
      icon: Search,
      isActive: false,
    },
    {
      title: "Notifications",
      url: "#",
      icon: Bell,
      isActive: false,
    },
  ];
  const [activeItem, setActiveItem] = React.useState(navMain[1]);
  const { setOpen } = useSidebar();

  const sidebarWidth = isCollapsed ? "1px" : "200px";

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className={`w-[calc(var(--sidebar-width-icon)+${sidebarWidth})]! border-r`}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className={`md:h-8  md:p-0`}>
                <Link to="/">
                  <div className="bg-blue-700 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <span className="font-semibold text-lg">Project Flow</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent className="px-1.5 md:px-0 ">
              <SidebarMenu>
                {navMain.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        if (item.action) {
                          item.action();
                        }
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      className="px-2.5 md:px-2 cursor-pointer"
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </Sidebar>
  );
}
