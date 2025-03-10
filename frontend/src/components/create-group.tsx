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
} from "@/components/ui/dialog";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function CreateGroup() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const createGroupMutation = useCreateGroup();

  function handleSubmit(formData: FormData) {
    console.log("Form Submitted");

    const name = formData.get("groupName") as string;
    const description = formData.get("groupDescription") as string;
    const banner = formData.get("banner") as File;

    createGroupMutation.mutate(
      { name, description, banner },
      { onSuccess: () => setIsDialogOpen(false) }
    );
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button
          className="bg-indigo-500 hover:bg-indigo-500 hover:opacity-85 cursor-pointer dark:text-foreground text-base"
          size="lg"
        >
          <Plus />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Customize your group.</DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="groupName">Group Name</Label>
            <Input type="text" id="groupName" name="groupName" required />
          </div>
          <div>
            <Label htmlFor="groupDescription">Group Description</Label>
            <Textarea id="groupDescription" name="groupDescription" required />
          </div>
          <div>
            <Label>Invite users</Label>
            <Command className="rounded-lg border shadow-md h-44">
              <CommandInput placeholder="Search for users..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup heading="Users">
                  <CommandItem>Username1</CommandItem>
                  <CommandItem>Username2</CommandItem>
                  <CommandItem>Username3</CommandItem>
                </CommandGroup>
              </CommandList>
            </Command>
          </div>

          <div>
            <Label htmlFor="banner">Choose a banner</Label>
            <Input type="file" id="banner" name="banner" />
          </div>

          <DialogFooter className="pt-2">
            <Button type="submit" disabled={createGroupMutation.isPending}>
              {createGroupMutation.isPending ? "Submitting..." : "Create"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGroup;
