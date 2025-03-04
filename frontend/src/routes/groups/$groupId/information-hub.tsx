import React, { useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { InformationHubSidebar } from "@/components/info-hub-sidebar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowRight,
  BellRing,
  Calendar,
  ChevronDown,
  Circle,
  ListCheck,
  Mail,
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

export const Route = createFileRoute("/groups/$groupId/information-hub")({
  component: MessagePage,
});

function MessagePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // Automatically scroll into view on page load`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  let mockData = {
    groupName: "ProjectFlow",
    groupDescription: "A group for members working on ProjectFlow.",
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "48px",
        } as React.CSSProperties
      }
    >
      <InformationHubSidebar />
      <SidebarInset>
        <header className=" sticky top-0 flex shrink-0 gap-4 border-b dark:bg-sidebar">
          <div className="flex items-center gap-2 flex-grow p-4 ">
            <MessageBreadcrumb />
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
        <InformationHub {...mockData} />
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageBreadcrumb() {
  const navItems = [
    { title: "Home", url: "/" },
    { title: "Groups", url: "/groups" },
    { title: "Information Hub", url: "/groups/1/information-hub" },
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

function InformationHub(props) {
  return (
    <section className="py-32 flex justify-center">
      <section className="container">
        <header className="mb-24 flex flex-col items-center gap-6">
          <h1 className="text-center text-3xl font-semibold lg:max-w-3xl lg:text-5xl">
            {props.groupName} Information Hub
          </h1>
          <p className="text-center text-lg font-medium text-muted-foreground md:max-w-4xl lg:text-xl">
            {props.groupDescription}
          </p>
        </header>
        <section className="relative flex justify-center">
          <div className="relative flex w-full flex-col border border-muted2 md:w-1/2 lg:w-full">
            <section className="relative flex flex-col lg:flex-row">
              <div className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r">
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center">
                    <ListCheck className="mr-1" />
                    <h2 className="text-xl font-semibold">Tasks</h2>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    Time to get started...
                  </h3>
                </section>
                <ul>
                  <li className="flex items-center">
                    <Circle size={16} className="me-2" />
                    Work on ProjectFlow
                  </li>
                  <li className="flex items-center">
                    <Circle size={16} className="me-2" />
                    Study for midterm
                  </li>
                  <li className="flex items-center">
                    <Circle size={16} className="me-2" />
                    Try not to crash out
                  </li>
                </ul>
              </div>
              <div className="flex flex-col border-b border-solid border-muted2 p-10 lg:w-3/5 lg:border-b-0 lg:border-r">
                <section className="flex items-end justify-between border-b pb-1 mb-1">
                  <div className="flex items-center">
                    <BellRing className="mr-1" />
                    <h2 className="text-xl font-semibold">Reminders</h2>
                  </div>
                  <h3 className="text-xs font-medium text-muted-foreground md:max-w-4xl lg:text-s pb-2">
                    Don't forget about me!
                  </h3>
                </section>
                <div className="flex grow justify-center items-center">
                  <p className="text-muted-foreground">No new reminders.</p>
                </div>
                {/* <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                  /> */}
              </div>
            </section>
            <section className="relative flex flex-col border-t border-solid border-muted2 lg:flex-row">
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
                <p className="mb-4">
                  <span className="font-bold">17 March 2025</span>
                  <Separator />
                  Midterm
                </p>
                <p>
                  <span className="font-bold">26 April 2025</span>
                  <Separator />
                  Pizza Party
                </p>
                {/* <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                /> */}
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
                {/* <img
                  src={feature1.image}
                  alt={feature1.title}
                  className="mt-8 aspect-[1.5] h-full w-full object-cover lg:aspect-[2.4]"
                /> */}
              </div>
            </section>
          </div>
        </section>
      </section>
    </section>
  );
}
