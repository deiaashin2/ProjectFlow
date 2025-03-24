import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Group } from "@/hooks/groups/useGroups";
import useUpdateGroup from "@/hooks/groups/useUpdateGroup";

type Props = {
  group: Group;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateGroupMenu({ group, isOpen, setIsOpen }: Props) {
  const updateGroupMutation = useUpdateGroup();
  function handleSubmit(formData: FormData) {
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const banner = formData.get("banner") as string;

    updateGroupMutation.mutate(
      { id: group.id, name, description, banner },
      { onSuccess: () => setIsOpen(false) }
    );
  }
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Group Settings</DialogTitle>
          <DialogDescription>
            Customize your group's name, description, and banner.
          </DialogDescription>
        </DialogHeader>
        <form action={handleSubmit} className="flex flex-col gap-2">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={group.name} />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="max-w-[460px]"
              id="description"
              name="description"
              defaultValue={group.description}
            />
          </div>
          <div>
            <Label htmlFor="banner">Banner</Label>
            <Input
              id="banner"
              name="banner"
              type="input"
              defaultValue={group.banner}
              placeholder="Enter image URL"
            />
          </div>
          <DialogFooter className="mt-2">
            <DialogClose>
              <Button type="button" variant="ghost">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit">
              {updateGroupMutation.isPending ? "Loading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateGroupMenu;
