import * as React from "react";
import {
  Command,
  Home,
  MessageCircle,
  CalendarCheck,
  LayoutDashboard,
} from "lucide-react";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Link, useLocation } from "@tanstack/react-router";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const navMain = [
  {
    title: "Home",
    url: "/groups",
    icon: Home,
    isActive: false,
  },
  {
    title: "Information Hub",
    url: "/groups/1/information-hub",
    icon: LayoutDashboard,
    isActive: false,
  },
  {
    title: "Tasks",
    url: "/groups/1/task-management",
    icon: CalendarCheck,
    isActive: false,
  },
  {
    title: "Messages",
    url: "/groups/1/messages",
    icon: MessageCircle,
    isActive: false,
  },
];

export default function AppSidebar({ ...props }) {
  const { pathname } = useLocation();
  let location = "Information Hub";

  if (pathname.includes("messages")) location = "Message";
  if (pathname.includes("task")) location = "Tasks";

  const [activeItem, setActiveItem] = React.useState(location);
  const { setOpen } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className={`w-[calc(var(--sidebar-width-icon)+275px)]! border-r`}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <Link to="/">
                  <div className="bg-blue-700 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-base leading-tight">
                    <span className="truncate font-semibold">Project Flow</span>
                  </div>
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
                  <Link to={item.url} key={item.title}>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        tooltip={{
                          children: item.title,
                          hidden: false,
                        }}
                        onClick={() => {
                          setActiveItem(item.title);
                          setOpen(true);
                        }}
                        isActive={activeItem === item.title}
                        size="lg"
                        className="md:h-8 md:p-0 cursor-pointer"
                      >
                        <div className="bg-sidebar-border text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer hover:opacity-55 ">
                          <item.icon className="size-4 dark:text-primary" />
                        </div>
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  </Link>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
      </Sidebar>
    </Sidebar>
  );
}
