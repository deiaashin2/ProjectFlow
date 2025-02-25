import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSidebar } from "@/components/messages-sidebar";
import { Separator } from "@/components/ui/separator";
import { usersData } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Ellipsis,
  Pencil,
  Smile,
  Forward,
  ArrowRight,
  SunMoon,
  MoonStar,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";
import useMessages, { Message } from "@/hooks/useMessages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import githubLogoDark from "../assets/github-mark.png";
import React from "react";
import { useInView } from "react-intersection-observer";
import { InfiniteData } from "@tanstack/react-query";

export const Route = createFileRoute("/messages")({
  component: RouteComponent,
});

function RouteComponent() {
  // const { data: messages, isPending } = useMessages();
  const {
    data: messages,
    isPending,
    isError,
    fetchNextPage,
    isFetchingNextPage,
  } = useMessages();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDarkMode, setIsDarkmode] = useState(false);
  const { inView, ref } = useInView();

  console.log(messages);

  // Automatically scroll into view on page load`
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  const toggleDarkMode = () => {
    setIsDarkmode((prevState) => !prevState);
  };

  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "300px",
        } as React.CSSProperties
      }
    >
      <MessageSidebar />
      <SidebarInset>
        {/* Header */}
        <header className=" sticky top-0 flex shrink-0 gap-4 border-b">
          <div className="flex items-center gap-2 flex-grow p-4 ">
            <SidebarTrigger className="ml-1" />
            <Separator orientation="vertical" className="mr-2" />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-lg" to="/">
                      Home
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <ArrowRight />
                </BreadcrumbSeparator>

                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    {/* Replace link with actual group url*/}
                    <Link className="text-lg" to="/">
                      Groups
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>

                <BreadcrumbSeparator>
                  <ArrowRight />
                </BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link className="text-lg" to="/messages">
                      Messages
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="flex items-center">
            <span
              className="hover:bg-sidebar-accent p-2 rounded-lg cursor-pointer"
              onClick={toggleDarkMode}
            >
              {isDarkMode ? (
                <SunMoon className="size-6" />
              ) : (
                <MoonStar className="size-6" />
              )}
            </span>
            <span className="hover:bg-sidebar-accent p-2 rounded-lg cursor-pointer">
              <Avatar className="flex items-center justify-center">
                <a
                  href="https://github.com/deiaashin2/ProjectFlow"
                  target="_blank"
                >
                  <AvatarImage
                    src={githubLogoDark}
                    className="size-6"
                    alt="Logo of GitHub"
                  />
                </a>
              </Avatar>
            </span>
          </div>
          <div className="hidden lg:flex items-center min-w-56 lg:min-w-64 border-l bg-sidebar-accent pl-2 ">
            <h3 className="text-2xl font-semibold ">Users</h3>
          </div>
        </header>

        {/* Messages Layout */}
        <div className="flex flex-row flex-grow h-0 ">
          <div className="flex flex-col w-full h-full gap-4">
            <div className="flex flex-col-reverse flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent ">
              {isPending && <MessageSkeleton />}
              {messages && <MessageList messages={messages} />}
              <div ref={ref}>{isFetchingNextPage && <MessageSkeleton />}</div>
            </div>

            <div className="px-4 pb-6">
              <Textarea
                placeholder="Type your message here."
                className="resize-none"
              />
            </div>
          </div>

          {/* User Sidebar */}
          <div className="hidden lg:flex min-w-56 lg:min-w-64 p-2 border-l bg-sidebar-accent ">
            <UsersList />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageList({
  messages,
}: {
  messages: InfiniteData<
    {
      data: Message[];
      currentPage: number;
      nextPage: number | null;
    },
    unknown
  >;
}) {
  return messages.pages.map((page, index) => (
    <React.Fragment key={index}>
      {page.data.map((message, index) => (
        <div className="flex gap-4 hover:bg-accent py-4 px-6" key={index}>
          <div className="py-1.5">
            <Avatar className="size-9 text-sm">
              <AvatarImage src={message.avatar} />
              <AvatarFallback className="bg-red-200">AN</AvatarFallback>
            </Avatar>
          </div>
          <div className="grow">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold">{message.username}</h3>
                <span className="text-gray-500 text-xs">
                  {message.timestamp}
                </span>
              </div>
              <div className="flex items-center border">
                <MessageActions />
              </div>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </React.Fragment>
  ));
}

function MessageSkeleton({ length = 10 }) {
  return Array.from({ length: length }).map((_, index) => (
    <div key={index} className="flex gap-4 py-4 px-6">
      <div className="py-1.5">
        <Skeleton className="rounded-full size-9" />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-full" />
      </div>
    </div>
  ));
}

function MessageActions() {
  const actions = [
    { icon: Smile, label: "React" },
    { icon: Pencil, label: "Edit" },
    { icon: Forward, label: "Forward" },
    { icon: Ellipsis, label: "More" },
  ];
  return (
    <>
      {actions.map((action, index) => (
        <TooltipProvider key={index}>
          <Tooltip>
            <TooltipTrigger>
              <span className="flex hover:bg-neutral-200 cursor-pointer p-1 border-r">
                <action.icon className="shrink-0 size-5" />
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p>{action.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </>
  );
}

function UsersList() {
  const groupedUsers: Record<string, User[]> = {};
  for (const user of usersData) {
    const key = user.online ? user.role : "Offline";

    if (!(key in groupedUsers)) {
      groupedUsers[key] = [];
    }
    groupedUsers[key].push(user);
  }

  // Displays roles in this order
  const roleOrder = ["Owner", "Admin", "Moderator", "User", "Offline"];
  return (
    <div className="flex flex-col gap-2 w-full">
      {Object.entries(groupedUsers)
        .sort(
          ([roleA], [roleB]) =>
            roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB)
        )
        .map(([role, users]) => (
          <UserGroup key={role} usersData={users} role={role} />
        ))}
    </div>
  );
}

type User = {
  username: string;
  avatar: string;
  online: boolean;
  role: string;
};

function UserGroup({ usersData, role }: { usersData: User[]; role?: string }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-muted-foreground text-base">{role}</h3>
      {usersData.map((user) => (
        <div
          className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm"
          key={user.username}
        >
          <Avatar className="size-8 text-xs">
            <AvatarImage src={user.avatar} />
            <AvatarFallback className="bg-sidebar-border">
              {user.avatar}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{user.username}</span>
        </div>
      ))}
    </div>
  );
}
