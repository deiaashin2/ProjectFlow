import * as React from "react";
import {
  Bird,
  Command,
  Rabbit,
  Snail,
  Turtle,
  Squirrel,
  ChevronDown,
  Hash,
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
    title: "Bird",
    url: "#",
    icon: Bird,
    isActive: true,
  },
  {
    title: "Drafts",
    url: "#",
    icon: Rabbit,
    isActive: false,
  },
  {
    title: "Sent",
    url: "#",
    icon: Snail,
    isActive: false,
  },
  {
    title: "Junk",
    url: "#",
    icon: Turtle,
    isActive: false,
  },
  {
    title: "Trash",
    url: "#",
    icon: Squirrel,
    isActive: false,
  },
];

export function InformationHubSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const [activeItem, setActiveItem] = React.useState(navMain[0]);
  const { setOpen, isMobile } = useSidebar();

  return (
    <Sidebar
      collapsible="icon"
      className="overflow-hidden *:data-[sidebar=sidebar]:flex-row "
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
                <a href="#">
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
                    <SidebarMenuButton
                      tooltip={{
                        children: item.title,
                        hidden: false,
                      }}
                      onClick={() => {
                        setActiveItem(item);
                        setOpen(true);
                      }}
                      isActive={activeItem.title === item.title}
                      size="lg"
                      className="md:h-8 md:p-0"
                    >
                      <div className="bg-sidebar-border text-sidebar-primary flex aspect-square size-8 items-center justify-center rounded-lg cursor-pointer hover:opacity-55 ">
                        <item.icon className="size-4 dark:text-primary" />
                      </div>
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
