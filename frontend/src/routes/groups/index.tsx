import ThemeToggle from "@/components/theme-toggle";
import GithubLinkButton from "@/components/github-link-button";
import useGroups, { Group } from "@/hooks/groups/useGroups";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Users,
  UserPlus,
  Ellipsis,
  Trash2,
  PencilLine,
  SquareArrowOutUpRight,
  Users2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Suspense, useState } from "react";
import CreateGroup from "@/components/create-group";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useDeleteGroup from "@/hooks/groups/useDeleteGroup";

export const Route = createFileRoute("/groups/")({
  component: GroupsPage,
});

function GroupsPage() {
  return (
    <div className="min-h-screen flex flex-col gap-6 bg-accent">
      <GroupHeader />
      <main className="flex flex-col flex-grow mx-auto w-full max-w-7xl gap-6 p-2">
        <div className="flex items-center justify-between">
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
    <header className="sticky top-0 z-10 p-4 items-center border-b shadow-sm bg-background">
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
      {data.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="relative pt-0 group">
      <GroupActionMenu group={group} />
      <img
        src={`${group.banner}?random=${group.id}`}
        className="h-52 object-cover rounded-t-xl"
        alt={`${group.name} banner`}
      />
      <CardHeader>
        <CardTitle className="text-xl">{group.name}</CardTitle>
        <CardDescription className="line-clamp-2 break-words text-ellipsis min-h-10">
          {group.description}
        </CardDescription>
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
          params={{ groupId: group.id }}
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
  );
}
function GroupActionMenu({ group }: { group: Group }) {
  const [isMenuOpen, setisMenuOpen] = useState(false);

  const deleteGroupMutation = useDeleteGroup();

  const menuVisibilityClasses = `absolute right-2 top-2 transition-opacity cursor-pointer ${
    isMenuOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

  function handleDelete() {
    deleteGroupMutation.mutate(group.id);
  }

  return (
    <DropdownMenu open={isMenuOpen} onOpenChange={setisMenuOpen}>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className={menuVisibilityClasses}>
          <Ellipsis className="size-5.5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-background">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <SquareArrowOutUpRight />
            <Link
              to={`/groups/$groupId/information-hub`}
              params={{ groupId: group.id }}
            >
              Open
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <PencilLine />
            <span>Rename</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <UserPlus />
            <span>Invite </span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Users2 />
            <span>Members </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 className="text-destructive" />
            <span className="text-destructive">Delete</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
