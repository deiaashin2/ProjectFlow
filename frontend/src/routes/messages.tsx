import { createFileRoute } from "@tanstack/react-router";
import { MessageSidebar } from "../components/messages-sidebar";
import { Separator } from "../components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "../components/ui/sidebar";

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
        <div className="flex flex-1 flex-col gap-4 p-4"></div>
      </SidebarInset>
    </SidebarProvider>
  );
}
