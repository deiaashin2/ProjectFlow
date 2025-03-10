import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Group } from "@/hooks/groups/useGroups";
import {
  Ellipsis,
  SquareArrowOutUpRight,
  PencilLine,
  UserPlus,
  Users2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import useDeleteGroup from "@/hooks/groups/useDeleteGroup";

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
          <Link
            to={`/groups/$groupId/information-hub`}
            params={{ groupId: group.id }}
          >
            <DropdownMenuItem>
              <SquareArrowOutUpRight />
              Open
            </DropdownMenuItem>
          </Link>
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

export default GroupActionMenu;
