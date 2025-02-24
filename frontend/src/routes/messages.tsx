import { createFileRoute } from "@tanstack/react-router";
import { MessageSidebar } from "../components/messages-sidebar";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import { Textarea } from "../components/ui/textarea";
import { EllipsisVertical } from "lucide-react";

export const Route = createFileRoute("/messages")({
  component: RouteComponent,
});

function RouteComponent() {
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
        <header className="sticky top-0 flex shrink-0 items-center gap-2 border-b bg-background p-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-2" />
          <span className="text-xl"># Project Flow</span>
        </header>
        <div className="flex flex-col gap-4 h-full justify-end border-red-600">
          <MessageList />
          <div className="px-4 pb-6">
            <Textarea
              placeholder="Type your message here."
              className="resize-none"
            />
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
    <div className="flex gap-4 hover:bg-accent py-4 px-6">
      <div>
        <Avatar className="size-9 text-sm">
          <AvatarImage src={avatar} />
          <AvatarFallback>AN</AvatarFallback>
        </Avatar>
      </div>
      <div className="grow">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold">{username}</h3>
            <span className="text-gray-500 text-xs">{timestamp}</span>
          </div>
          <div>
            <span className="flex hover:bg-gray-300 cursor-pointer p-1 rounded-full">
              <EllipsisVertical className="shrink-0 size-6" />
            </span>
          </div>
        </div>
        <p className="text-sm">{content}</p>
      </div>
    </div>
  );
}
