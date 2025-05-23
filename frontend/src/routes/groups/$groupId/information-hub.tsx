import React, { useEffect, useRef, useState } from "react";
import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BellRing,
  // Calendar,
  // ChevronDown,
  ListCheck,
  // Mail,
} from "lucide-react";
import IconTooltip from "@/components/icon-tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import githubLogoLight from "@/assets/github-mark-white.png";
import githubLogoDark from "@/assets/github-mark.png";
import ThemeToggle from "@/components/theme-toggle";
import { useTheme } from "@/components/theme-provider";
import AppSidebar from "@/components/app-sidebar";
import CustomTrigger from "@/components/custom-trigger";
import useGroups from "@/hooks/groups/useGroups";

export const Route = createFileRoute("/groups/$groupId/information-hub")({
  component: InformationHubPage,
});

type Announcement = {
  id: string;
  title: string;
  details: string | null;
  created_by: string;
  created_at: string;
};
type Task = {
  id: string;
  name: string;
  details: string | null;
  group_id: number;
  due_date: string | null;
  status_id: number;
  user_id: string;
};

function InformationHub() {
  const { data, isPending, isError } = useGroups("");
  const params = useParams({ from: "/groups/$groupId/information-hub" });

  const [announcements, setAnnouncements] = useState<Announcement[]>();

  async function fetchAnnouncements(groupId: number) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/announcements/" + groupId
      );
      const announcements = await response.json();
      setAnnouncements(announcements);
    } catch (error) {
      console.error("Failed to fetch announcements:", error);
    }
  }

  useEffect(() => {
    if (!announcements) {
      fetchAnnouncements(Number(params.groupId));
    }
  }, []);

  const [tasks, setTasks] = useState<Task[]>();

  async function fetchTasks(groupId: number) {
    try {
      const response = await fetch(
        "http://localhost:5000/api/groups/" + groupId + "/tasks"
      );
      const tasks = await response.json();
      setTasks(tasks);
    } catch (error) {
      console.error("Failed to fetch tasks:", error);
    }
  }

  useEffect(() => {
    if (!tasks) {
      fetchTasks(Number(params.groupId));
    }
  }, []);

  const tasksLink = `/groups/${params.groupId}/task-management`;

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  let currentGroup = data.find((group) => {
    return group.id == params.groupId;
  });

  if (currentGroup === undefined) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center text-lg">Group not found. </div>
      </div>
    );
  }

  return (
    <section className="py-32 flex justify-center items-center h-full">
      <section className="container">
        <header className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            <span className="font-bold">{currentGroup?.name} </span>
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {currentGroup?.description}
          </p>
        </header>
        <section // Information
          className="relative flex justify-center"
        >
          <div className="relative flex w-full flex-col border border-muted2 md:w-1/2 lg:w-full">
            <section // Tasks and Announcements
              className="relative flex flex-col lg:flex-row"
            >
              <div // Tasks
                className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r"
              >
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center hover:text-muted-foreground">
                    <ListCheck className="mr-1" />
                    <Link className="text-xl font-semibold" to={tasksLink}>
                      Tasks
                    </Link>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    Time to get started...
                  </h3>
                </section>
                <div className="flex justify-center items-center">
                  {tasks && tasks.length > 0 ? (
                    <ul className="w-[100%] overflow-hidden">
                      {tasks.map((task) => {
                        return (
                          <>
                            <li
                              className="flex justify-between overflow-hidden max-h-[1.5rem]"
                              key={task.id}
                            >
                              <span>- {task.name}</span>
                              <span>
                                {task.status_id ? task.status_id : ""}
                              </span>
                            </li>
                          </>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">No new tasks.</p>
                  )}
                </div>
              </div>
              <div // Announcements
                className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r"
              >
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center">
                    <BellRing className="mr-1" />
                    <h2 className="text-xl font-semibold">Announcements</h2>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    Don't forget about me!
                  </h3>
                </section>
                <div className="flex grow justify-center items-center">
                  {announcements && announcements.length > 0 ? (
                    <ul className="w-[100%] h-[100%] overflow-hidden">
                      {announcements.map((announcement) => {
                        return (
                          <li
                            key={announcement.id}
                            className="flex overflow-hidden max-h-[1.5rem] gap-[1rem]"
                          >
                            <span>- {announcement.title}</span>
                            <span className="text-muted-foreground">
                              {announcement.created_by}
                            </span>
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-muted-foreground">
                      No new announcements.
                    </p>
                  )}
                </div>
              </div>
            </section>
            {/* <section className="relative flex flex-col border-t border-solid border-muted2 lg:flex-row">
              <div className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r">
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center">
                    <Calendar className="mr-1" />
                    <h2 className="text-xl font-semibold">Upcoming Events</h2>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    Let me pencil you in for next week.
                  </h3>
                </section>
                <span className="font-bold">17 March 2025</span>
                <Separator />
                <p className="mb-4">Midterm</p>
                <span className="font-bold">26 April 2025</span>
                <Separator />
                <p>Pizza Party</p>
              </div>
              <div className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r">
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center">
                    <Mail className="mr-1" />
                    <h2 className="text-xl font-semibold">Messages</h2>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    You've got mail! I hope.
                  </h3>
                </section>
                <div className="flex grow justify-center items-center">
                  <p className="mr-2">
                    You have <span className="font-bold">3</span> new messages
                  </p>
                  <ChevronDown />
                </div>
              </div>
            </section> */}
          </div>
        </section>
      </section>
    </section>
  );
}

function InformationHubBreadcrumb() {
  const params = useParams({ from: "/groups/$groupId/information-hub" });

  const navItems = [
    { title: "Groups", url: "/groups" },
    {
      title: "Information Hub",
      url: "/groups/" + params.groupId + "/information-hub",
    },
  ];
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {navItems.map((navItem, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link to={navItem.url} className="text-lg">
                  {navItem.title}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== navItems.length - 1 && (
              <BreadcrumbSeparator>
                <ArrowRight />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function InformationHubPage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Automatically scroll into view on page load`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "275px",
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      <AppSidebar />

      <SidebarInset>
        <header className=" sticky top-0 flex shrink-0 gap-4 border-b dark:bg-sidebar">
          <div className="flex items-center gap-2 flex-grow p-4 ">
            <CustomTrigger />
            <Separator orientation="vertical" className="mr-2" />
            <InformationHubBreadcrumb />
          </div>
          <div className="flex items-center pr-2">
            <ThemeToggle />

            <IconTooltip label="Visit Project on Github">
              <span className="hover:bg-sidebar-accent p-1 rounded-lg cursor-pointer">
                <Avatar className="flex items-center justify-center">
                  <a
                    href="https://github.com/deiaashin2/ProjectFlow"
                    target="_blank"
                  >
                    <AvatarImage
                      src={theme === "dark" ? githubLogoLight : githubLogoDark}
                      className="size-6"
                      alt="Logo of GitHub"
                    />
                  </a>
                </Avatar>
              </span>
            </IconTooltip>
          </div>
        </header>
        <InformationHub />
      </SidebarInset>
    </SidebarProvider>
  );
}
