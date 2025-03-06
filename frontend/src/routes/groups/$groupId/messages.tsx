import React, { Suspense, useEffect, useRef } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { MessageSidebar } from "@/components/messages-sidebar";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis, Pencil, Smile, Forward, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import IconTooltip from "@/components/icon-tooltip";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import useMessages from "@/hooks/useMessages";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useInView } from "react-intersection-observer";
import { ErrorBoundary } from "react-error-boundary";
import UsersList from "@/features/messages/users-list";
import ThemeToggle from "@/components/theme-toggle";
import CustomTrigger from "@/components/custom-trigger";
import GithubLinkButton from "@/components/github-link-button";

export const Route = createFileRoute("/groups/$groupId/messages")({
  component: MessagePage,
});

function MessagePage() {
  const scrollRef = useRef<HTMLDivElement>(null);

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
          "--sidebar-width": "325px",
        } as React.CSSProperties
      }
    >
      <MessageSidebar />
      <SidebarInset>
        {/* Header */}
        <header className=" sticky top-0 flex shrink-0 gap-4 border-b dark:bg-sidebar">
          <div className="flex items-center gap-2 flex-grow p-4 ">
            <CustomTrigger />
            <Separator orientation="vertical" className="mr-2" />
            <MessageBreadcrumb />
          </div>
          <div className="flex items-center">
            <ThemeToggle />
            <GithubLinkButton />
          </div>
          <div className="hidden lg:flex items-center min-w-56 lg:min-w-64 border-l bg-sidebar pl-2 ">
            <h3 className="text-2xl font-semibold">Users</h3>
          </div>
        </header>

        {/* Messages Layout */}
        <div className="flex flex-grow h-0 dark:bg-sidebar">
          <div className="flex flex-col flex-grow">
            <div className="flex flex-col-reverse flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300  scrollbar-track-transparent dark:scrollbar-thumb-sidebar-accent ">
              <ErrorBoundary fallback={<div>Something went wrong</div>}>
                <Suspense fallback={<MessageSkeleton />}>
                  <MessageList />
                </Suspense>
              </ErrorBoundary>
            </div>

            <div className="px-4 pb-6 mt-6 ">
              <Textarea
                placeholder="Type your message here."
                className="resize-none "
              />
            </div>
          </div>

          {/* User Sidebar */}
          <div className="hidden lg:flex min-w-56 lg:min-w-64 p-2 border-l bg-sidebar">
            <Suspense fallback={<p>Loading...</p>}>
              <UsersList />
            </Suspense>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageBreadcrumb() {
  const navItems = [
    { title: "Home", url: "/" },
    { title: "Groups", url: "/groups" },
    { title: "Messages", url: "/groups/1/messages" },
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

function MessageList() {
  const { inView, ref } = useInView();
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useMessages();

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage]);

  return (
    <>
      {data.pages.map((page, index) => (
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
      ))}
      {hasNextPage && (
        <div ref={ref}>{isFetchingNextPage && <MessageSkeleton />}</div>
      )}
    </>
  );
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
        <React.Fragment key={index}>
          <IconTooltip label={action.label}>
            <span className="flex hover:bg-neutral-200 cursor-pointer p-1 border-r">
              <action.icon className="shrink-0 size-5" />
            </span>
          </IconTooltip>
        </React.Fragment>
      ))}
    </>
  );
}
