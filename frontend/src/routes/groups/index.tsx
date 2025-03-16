import { createFileRoute } from "@tanstack/react-router";
import { Suspense, useState } from "react";
import GroupHeader from "@/features/groups/group-header";
import GroupList from "@/features/groups/group-list";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import GroupSidebar from "@/features/groups/group-sidebar";
import TimeOfDayHeader from "@/components/time-of-day";

export const Route = createFileRoute("/groups/")({
  component: GroupsPage,
});

function GroupsPage() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed((prevState) => !prevState);
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": isSidebarCollapsed ? "48px" : "225px",
          fontFamily: "Manrope",
        } as React.CSSProperties
      }
    >
      <GroupSidebar
        isCollapsed={isSidebarCollapsed}
        toggleSidebar={toggleSidebar}
      />
      <SidebarInset>
        <div className="min-h-screen flex flex-col">
          <GroupHeader />
          <main className="flex flex-col flex-grow mx-auto w-full max-w-7xl gap-6 p-4 ">
            <div className="flex items-center justify-between mt-4">
              <div className="flex items-center gap-2">
                <TimeOfDayHeader />
              </div>
            </div>

            <div className="flex items-center gap-4 text-lg">
              <span className="border-b-3 border-purple-400">Groups</span>
              <span>Recent</span>
            </div>

            <Suspense fallback={<p>Loading...</p>}>
              <GroupList />
            </Suspense>
          </main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
