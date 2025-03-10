import useGroups, { Group } from "@/hooks/groups/useGroups";
import GroupActionMenu from "./group-actions";
import { Link } from "@tanstack/react-router";
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


export default function GroupList() {
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
