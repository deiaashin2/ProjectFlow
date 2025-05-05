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
import useDeleteGroup from "@/hooks/groups/useDeleteGroup";
import { useState } from "react";

type Props = {
  group: Group;
};

function DeleteGroupDialog({ group }: Props) {
  const mutation = useDeleteGroup();
  const [open, setOpen] = useState(false);

  function handleDelete() {
    mutation.mutate(group.id, {
      onSuccess: () => {
        setOpen(false);
      },
    });
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <SidebarMenuItem>
          <SidebarMenuButton
            asChild
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
          <AlertDialogAction onClick={() => handleDelete()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteGroupDialog;
