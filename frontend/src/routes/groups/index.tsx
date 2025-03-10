import { createFileRoute } from "@tanstack/react-router";
import { Suspense } from "react";
import GroupHeader from "@/features/groups/group-header";
import CreateGroupMenu from "@/features/groups/create-group";
import GroupList from "@/features/groups/group-list";
import { NotebookPen } from "lucide-react";

export const Route = createFileRoute("/groups/")({
  component: GroupsPage,
});

function GroupsPage() {
  return (
    <div className="min-h-screen flex flex-col gap-6 bg-accent">
      <GroupHeader />
      <main className="flex flex-col flex-grow mx-auto w-full max-w-7xl gap-6 p-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <NotebookPen className="size-6 shrink-0" />
            <h2 className="text-2xl font-bold">Your Groups</h2>
          </div>
          <CreateGroupMenu />
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <GroupList />
        </Suspense>
      </main>
    </div>
  );
}
