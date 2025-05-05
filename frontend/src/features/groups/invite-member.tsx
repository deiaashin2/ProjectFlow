import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Group } from "@/hooks/groups/useGroups";
import useInvite from "@/hooks/groups/useInvite";
import useMembers from "@/hooks/groups/useMembers";
import { Terminal } from "lucide-react";
import { useState } from "react";

type Props = {
  group: Group;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function InviteMemberMenu({ group, setOpen }: Props) {
  const inviteMutation = useInvite();
  const [searchResults, setSearchResults] = useState("");
  const { data } = useMembers(group.id);

  function handleInvite(e: any) {
    e.preventDefault();

    const data = {
      id: group.id,
      email: searchResults,
    };

    inviteMutation.mutate(data, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }

  return (
    <div className="px-6 flex flex-col gap-4 h-[525px]">
      <h2 className="text-lg font-semibold">Group Invite</h2>
      <Separator />
      <form className="space-y-4">
        <div className="space-y-2">
          <div className="flex gap-2">
            <Input
              placeholder="Search user by email..."
              value={searchResults}
              onChange={(e) => setSearchResults(e.target.value)}
            />
            <Button onClick={handleInvite}>Invite User</Button>
          </div>

          {inviteMutation.isError && (
            <Alert variant="destructive">
              <Terminal className="size-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {inviteMutation.error.message}
              </AlertDescription>
            </Alert>
          )}
        </div>

        <div>
          <h2 className="font-semibold">Members</h2>
          <ul>
            {data &&
              data.map((member) => (
                <li
                  key={member.id}
                  className="px-1 py-2 hover:bg-muted flex items-center gap-3 cursor-pointer rounded-md"
                >
                  <Avatar>
                    <AvatarFallback className="bg-red-200">{member.name[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{member.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.email}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default InviteMemberMenu;
