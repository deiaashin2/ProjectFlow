import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Trash } from "lucide-react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Group } from "@/hooks/groups/useGroups";

type Props = {
  group: Group;
  activeItem: string;
  setActiveItem: React.Dispatch<React.SetStateAction<string>>;
};

function DeleteGroupDialog({ group, activeItem, setActiveItem }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
            isActive={"Delete" === activeItem}
            onClick={() => setActiveItem("Delete")}
            className="text-red-500 hover:text-red-500"
          >
            <div>
              <Trash />
              <span>Delete</span>
            </div>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete group "{group.name}". This action
            cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteGroupDialog;
