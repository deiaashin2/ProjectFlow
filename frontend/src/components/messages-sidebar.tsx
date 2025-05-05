import * as React from "react";
import {
  Command,
  ChevronDown,
  Hash,
  ChevronsUpDown,
  Settings,
  FolderPlus,
  CirclePlus,
  MessageCircle,
  CalendarCheck,
  LayoutDashboard,
  Home,
} from "lucide-react";
import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Link, useLocation } from "@tanstack/react-router";

const user = {
  name: "shadcn",
  email: "m@example.com",
  avatar: "/avatars/shadcn.jpg",
};

const channels = [
  { name: "Information", subChannels: ["welcomes", "announcements"] },
  { name: "Text Channels", subChannels: ["general", "notes", "help"] },
  { name: "Voice Channels", subChannels: ["Study Room"] },
];

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

export function MessageSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const { pathname } = useLocation();
  let location = "Information Hub";

  if (pathname.includes("messages")) location = "Message";
  if (pathname.includes("task")) location = "Tasks";
  const [activeItem, setActiveItem] = React.useState(location);
  const { setOpen, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row h-dvh"
      {...props}
    >
      <Sidebar
        collapsible="none"
        className="w-[calc(var(--sidebar-width-icon)+1px)]! border-r"
      >
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton size="lg" asChild className="md:h-8 md:p-0">
                <a href="/groups">
                  <div className="bg-blue-700 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                    <Command className="size-4" />
                  </div>
                  <div className="grid flex-1 text-left text-sm leading-tight">
                    <span className="truncate font-medium">Project Flow</span>
                    <span className="truncate text-xs">
                      Group Collaboration Tool
                    </span>
                  </div>
                </a>
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
                    <Link to={item.url}>
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
                        className="md:h-8 md:p-0"
                      >
                        <div className="bg-sidebar-border text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer hover:opacity-55 ">
                          <item.icon className="size-4 dark:text-primary" />
                        </div>
                        <span>{item.title}</span>
                      </SidebarMenuButton>
                    </Link>
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

      <Sidebar collapsible="none" className="hidden flex-1 md:flex">
        <SidebarHeader className="gap-3.5 border-b">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center justify-between p-2 hover:bg-sidebar-accent rounded-lg cursor-pointer">
                <h2 className="font-semibold text-lg">Project Flow</h2>
                <ChevronsUpDown className="size-4.5" />
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-60">
              <DropdownMenuItem>
                <FolderPlus />
                Create Category
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CirclePlus />
                Create Channel
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Settings />
                Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarHeader>
        <SidebarContent>
          {channels.map((channel) => (
            <Collapsible
              defaultOpen
              className="group/collapsible"
              key={channel.name}
              title={channel.name}
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  className="group/label text-sm text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  asChild
                >
                  <CollapsibleTrigger>
                    {channel.name}
                    <ChevronDown className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-180" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {channel.subChannels.map((subChannel) => (
                        <SidebarMenuItem key={subChannel}>
                          <SidebarMenuButton
                            className="cursor-pointer ml-2"
                            asChild
                          >
                            <span className="font-medium">
                              <Hash /> {subChannel}
                            </span>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ))}
        </SidebarContent>
        <SidebarFooter>
          <NavUser user={user} />
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>
    </Sidebar>
  );
}
