import { createFileRoute } from "@tanstack/react-router";
import { MessageSidebar } from "@/components/messages-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Ellipsis, Pencil, Smile, Forward } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-2" />
          <span className="text-xl"># Project Flow</span>
        </header>
        <div className="flex flex-row h-full">
          <div className="flex flex-col w-full  gap-4 h-full justify-end border-r border-t">
            <MessageList />
            <div className="px-4 pb-6">
              <Textarea
                placeholder="Type your message here."
                className="resize-none"
              />
            </div>
          </div>

          <div className="hidden md:flex min-w-56 lg:min-w-64 p-2 border-l border-t">
            <UsersList />
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}

function MessageList() {
  const messages = [
    {
      username: "HH",
      avatar: "",
      timestamp: "2/1/3000 3:15 AM",
      content: "First Message",
    },
    {
      username: "Some",
      avatar: "",
      timestamp: "1/1555 3:15 AM",
      content: "Another message",
    },
    {
      username: "Some",
      avatar: "",
      timestamp: "Today at 6:15 PM",
      content:
        "Very Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long Message Very Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long Message Very Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long MessageVery Long Message",
    },
  ];
  return (
    <div className="flex flex-col  ">
      {messages.map((message) => (
        <Message
          key={message.username}
          username={message.username}
          avatar={message.avatar}
          timestamp={message.timestamp}
          content={message.content}
        />
      ))}
    </div>
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
    <div className="flex gap-4 hover:bg-accent py-4 px-6 ">
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
  const users = [
    { username: "HH", avatar: "AZ", online: true },
    { username: "1234", avatar: "IH", online: false },
    { username: "Yes", avatar: "NO", online: true },
    { username: "Glass", avatar: "QW", online: true },
    { username: "asdfasdf", avatar: "TY", online: false },
  ];
  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex flex-col ">
        <h3 className="font-semibold text-muted-foreground text-sm">
          Online - 100
        </h3>
        {users
          .filter((user) => user.online === true)
          .map((user) => (
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm"
              key={user.username}
            >
              <Avatar className="size-7 text-xs">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.username}</span>
            </div>
          ))}
      </div>
      <Separator />
      <div className="flex flex-col ">
        <h3 className="font-semibold text-muted-foreground text-sm">
          Offline - 98
        </h3>
        {users
          .filter((user) => user.online === false)
          .map((user) => (
            <div
              className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm"
              key={user.username}
            >
              <Avatar className="size-7 text-xs">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>{user.avatar}</AvatarFallback>
              </Avatar>
              <span className="text-sm">{user.username}</span>
            </div>
          ))}
      </div>
    </div>
  );
}
