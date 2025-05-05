import useGroups, { Group } from "@/hooks/groups/useGroups";
import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { UserPlus, Users } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import GroupSettingsDialog from "@/features/groups/group-settings";

export default function GroupList() {
  const { query } = useSearch({ from: "/groups/" });
  const { data, isPending, isError } = useGroups(query);

  if (isPending) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error</div>;
  }

  if (data.length === 0) {
    return (
      <div className="text-center text-lg">No groups match your search. </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
      {data.map((group) => (
        <GroupCard key={group.id} group={group} />
      ))}
    </div>
  );
}

function GroupCard({ group }: { group: Group }) {
  return (
    <Card className="relative z-10 pt-0 group">
      <GroupSettingsDialog group={group} />
      {group.banner ? (
        <img
          src={`data:${group.mime_type};base64,${group.banner}`}
          className="h-44 object-cover rounded-t-xl"
          alt={`${group.name} banner`}
        />
      ) : (
        <div className="h-44 object-cover rounded-t-xl bg-indigo-500"></div>
      )}
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
          <Button className="cursor-pointer" size="lg">
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
