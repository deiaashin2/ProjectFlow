import { createFileRoute } from "@tanstack/react-router";
import { MessageSidebar } from "@/components/messages-sidebar";
import { Separator } from "@/components/ui/separator";
import { messagesData, usersData } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis, Pencil, Smile, Forward } from "lucide-react";
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
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/messages")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-2" />
          <span className="text-xl grow"># Project Flow</span>
        </header>

        {/* Messages Layout */}
        <div className="flex flex-row flex-grow h-0 ">
          <div className="flex flex-col w-full h-full gap-4 ">
            <div className="flex flex-col-reverse gap-4 flex-grow overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-300 scrollbar-track-transparent">
              {messagesData.map((message) => (
                <Message
                  key={message.username}
                  username={message.username}
                  avatar={message.avatar}
                  timestamp={message.timestamp}
                  content={message.content}
                />
              ))}
            </div>

            <div className="px-4 pb-6">
              <Textarea
                placeholder="Type your message here."
                className="resize-none"
              />
            </div>
          </div>

          {/* User Sidebar */}
          <div className="hidden md:flex min-w-56 lg:min-w-64 p-2 border-l bg-sidebar-accent ">
            <UsersList />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function Message({
  username,
  avatar,
  timestamp,
  content,
}: {
  username: string;
  avatar: string;
  timestamp: string;
  content: string;
}) {
  return (
    <div className="flex gap-4 hover:bg-accent py-4 px-6">
      <div className="py-1.5">
        <Avatar className="size-9 text-sm">
          <AvatarImage src={avatar} />
          <AvatarFallback className="bg-red-200">AN</AvatarFallback>
        </Avatar>
      </div>
      <div className="grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{username}</h3>
            <span className="text-gray-500 text-xs">{timestamp}</span>
          </div>
          <div className="flex items-center border">
            <MessageActions />
          </div>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
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
      {actions.map((action) => (
        <TooltipProvider>
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
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col">
        <h3 className="font-semibold text-muted-foreground text-base">
          Online - 100
        </h3>
        {usersData
          .filter((user) => user.online === true)
          .map((user) => (
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm"
              key={user.username}
            >
              <Avatar className="size-8 text-xs">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          ))}
      </div>
      <Separator />
      <div className="flex flex-col">
        <h3 className="font-semibold text-muted-foreground text-base">
          Offline - 98
        </h3>
        {usersData
          .filter((user) => user.online === false)
          .map((user) => (
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm"
              key={user.username}
            >
              <Avatar className="size-8 text-xs">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium">{user.username}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
