import useCreateGroup from "@/hooks/groups/useCreateGroup";
import { useState } from "react";
import {
  Dialog,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateGroupMenu() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createGroupMutation = useCreateGroup();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get("groupName") as string;

    createGroupMutation.mutate(name, {
      onSuccess: () => setIsDialogOpen(false),
    });
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer" size="lg">
          <Plus className="size-5" />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Group</DialogTitle>
          <DialogDescription>Customize your group.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input type="text" id="groupName" name="groupName" required />
          </div>

          <DialogFooter className="pt-2">
            <DialogClose>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>

            <Button type="submit" disabled={createGroupMutation.isPending}>
              {createGroupMutation.isPending ? "Submitting..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGroupMenu;
