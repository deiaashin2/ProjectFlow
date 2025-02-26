import { usersData } from "@/lib/mock-data";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "@/lib/mock-data";

function UsersList() {
  const groupedUsers: Record<string, User[]> = {};
  for (const user of usersData) {
    const key = user.online ? user.role : "Offline";

    if (!(key in groupedUsers)) {
      groupedUsers[key] = [];
    }
    groupedUsers[key].push(user);
  }

  // Displays roles in this order
  const roleOrder = ["Owner", "Admin", "Moderator", "User", "Offline"];
  return (
    <div className="flex flex-col gap-2 w-full">
      {Object.entries(groupedUsers)
        .sort(
          ([roleA], [roleB]) =>
            roleOrder.indexOf(roleA) - roleOrder.indexOf(roleB)
        )
        .map(([role, users]) => (
          <UserGroup key={role} usersData={users} role={role} />
        ))}
    </div>
  );
}

function UserGroup({ usersData, role }: { usersData: User[]; role?: string }) {
  return (
    <div className="flex flex-col">
      <h3 className="font-semibold text-muted-foreground text-base">{role}</h3>
      {usersData.map(({ username, avatar }) => (
        <UserItem key={username} username={username} avatar={avatar} />
      ))}
    </div>
  );
}

function UserItem({ username, avatar }: { username: string; avatar: string }) {
  return (
    <div className="flex items-center gap-2 hover:bg-gray-200 p-1 rounded-sm">
      <Avatar className="size-8 text-xs">
        <AvatarImage src={avatar} />
        <AvatarFallback className="bg-sidebar-border">{avatar}</AvatarFallback>
      </Avatar>
      <span className="text-sm font-medium">{username}</span>
    </div>
  );
}

export default UsersList;
