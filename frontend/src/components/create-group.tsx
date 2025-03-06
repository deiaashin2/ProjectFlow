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
import { CirclePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function CreateGroup() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className="bg-indigo-500 hover:bg-indigo-500 hover:opacity-85 cursor-pointer dark:text-foreground text-base"
          size="lg"
        >
          <CirclePlus />
          Create Group
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
          <DialogDescription>Customize your group.</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <div>
            <Label htmlFor="group_name">Group Name</Label>
            <Input type="text" id="group_name" />
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
        </div>
        <div>
          <Label htmlFor="banner">Choose a banner</Label>
          <Input type="file" id="banner" />
        </div>
        <DialogFooter className="pt-2">
          <Button>Create</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateGroup;
