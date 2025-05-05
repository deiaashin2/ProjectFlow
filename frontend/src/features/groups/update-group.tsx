import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Group } from "@/hooks/groups/useGroups";
import useUpdateGroup from "@/hooks/groups/useUpdateGroup";
import { Terminal } from "lucide-react";

type Props = {
  group: Group;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function UpdateGroupMenu({ group, setOpen }: Props) {
  const updateGroupMutation = useUpdateGroup();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const banner = formData.get("banner") as File;

    updateGroupMutation.mutate(
      { id: group.id, name, description, banner },
      {
        onSuccess: () => {
          setOpen(false);
        },
      }
    );
  }
  return (
    <div className="px-6">
      <form
        onSubmit={handleSubmit}
        className="h-[525px] flex flex-col justify-between"
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" name="name" defaultValue={group.name} />
          </div>

          <Separator />

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              className="max-w-[600px]"
              id="description"
              name="description"
              defaultValue={group.description}
            />
            <span className="text-muted-foreground text-sm">
              Tell the world about your group
            </span>
          </div>

          <Separator />
          <div>
            <Label htmlFor="banner">Banner</Label>
            <Input
              id="banner"
              name="banner"
              type="file"
              placeholder="Enter image URL"
            />
            <span className="text-muted-foreground text-sm text-end">
              Accepted file types: PNG, JPEG, JPG, SVG.
            </span>
          </div>
        </div>

        <div>
          {updateGroupMutation.isError && (
            <Alert variant="destructive">
              <Terminal className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {updateGroupMutation.error.message}
              </AlertDescription>
            </Alert>
          )}
          <DialogFooter className="mt-2">
            <Button type="submit">
              {updateGroupMutation.isPending ? "Loading..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </div>
      </form>
    </div>
  );
}

export default UpdateGroupMenu;
