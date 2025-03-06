import ThemeToggle from "@/components/theme-toggle";
import GithubLinkButton from "@/components/github-link-button";
import useGroups from "@/hooks/useGroups";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Users, UserPlus, EllipsisVertical, CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense } from "react";
import CreateGroup from "@/components/create-group";

export const Route = createFileRoute("/groups/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="min-h-screen flex flex-col bg-accent">
      <GroupHeader />
      <main className="flex flex-col mx-auto w-full max-w-7xl gap-6 p-2">
        <div className="flex items-center justify-between pt-6">
          <h1 className="text-2xl font-bold">Your Groups</h1>
          <CreateGroup />
        </div>

        <Suspense fallback={<p>Loading...</p>}>
          <GroupList />
        </Suspense>
      </main>
    </div>
  );
}

function GroupHeader() {
  return (
    <header className="sticky top-0 p-4 items-center border-b shadow-sm bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          <Link to="/">Project Flow</Link>
        </h1>
        <div>
          <ThemeToggle />
          <GithubLinkButton />
        </div>
      </div>
    </header>
  );
}

function GroupList() {
  const { data } = useGroups();
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {data.map((group, index) => (
        <Card key={index} className="pt-0">
          <img
            src={`${group.banner}?random=${index}`}
            className="h-52 object-cover rounded-t-xl"
          />
          <CardHeader>
            <CardTitle className="flex justify-between items-center">
              <span className="text-xl">{group.name}</span>
              <Button size="icon" variant="ghost" className="cursor-pointer ">
                <EllipsisVertical className="size-6" />
              </Button>
            </CardTitle>
            <CardDescription>{group.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Users />
              <span>{group.members} members</span>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              to="/groups/$groupId/information-hub"
              params={{ groupId: index.toString() }}
            >
              <Button
                className="bg-indigo-500 hover:bg-indigo-500 hover:opacity-85 cursor-pointer dark:text-foreground"
                size="lg"
              >
                Visit Group
              </Button>
            </Link>
            <Button className="cursor-pointer" variant="outline" size="lg">
              <UserPlus />
              Invite
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
