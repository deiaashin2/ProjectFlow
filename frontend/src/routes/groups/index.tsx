import { z } from "zod";
import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import GroupHeader from "@/features/groups/group-header";
import GroupList from "@/features/groups/group-list";
import GroupSidebar from "@/features/groups/group-sidebar";
import TimeOfDayHeader from "@/components/time-of-day";
import CreateGroupMenu from "@/features/groups/create-group";

const groupSearchSchema = z.object({ query: z.string().optional() });

export const Route = createFileRoute("/groups/")({
  component: GroupsPage,
  validateSearch: groupSearchSchema,
});

function GroupsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);

  const toggleSidebar = () => setIsSidebarCollapsed((prevState) => !prevState);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": isSidebarCollapsed ? "48px" : "250px",
          fontFamily: "Manrope",
        } as React.CSSProperties
      }
    >
      <GroupSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <SidebarInset>
        <div className="min-h-screen">
          <GroupHeader />
          <main className="flex flex-col flex-grow mx-auto w-full max-w-7xl gap-4 p-4 ">
            <div className="mt-2">
              <TimeOfDayHeader />
            </div>

            <div className="flex items-center gap-4 text-lg">
              <span className="border-b-2 border-purple-400">Your Groups</span>
              {/* <span>Recent</span> */}
              <div className="ml-auto">
                <CreateGroupMenu />
              </div>
            </div>

            <GroupList />
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
