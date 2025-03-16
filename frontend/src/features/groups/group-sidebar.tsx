import * as React from "react";
import {
  PanelLeftOpen,
  Plus,
  PanelRightOpen,
  Search,
  Bell,
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
import CreateGroupMenu from "./create-group";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

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
  const [activeItem, setActiveItem] = React.useState(navMain[0]);
  const { setOpen, isMobile } = useSidebar();

  const sidebarWidth = isCollapsed ? "1px" : "180px";

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row "
      {...props}
    >
      <Sidebar
        collapsible="none"
        className={`w-[calc(var(--sidebar-width-icon)+${sidebarWidth})]! border-r`}
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <div>
                  <CreateGroupMenu />
                </div>
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
        {isMobile && (
          <SidebarFooter>
            <NavUser user={user} />
          </SidebarFooter>
        )}
      </Sidebar>
    </Sidebar>
  );
}
