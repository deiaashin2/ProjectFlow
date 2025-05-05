import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Settings, Users, Ellipsis } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Group } from "@/hooks/groups/useGroups";
import DeleteGroupDialog from "@/features/groups/delete-group";
import UpdateGroupMenu from "@/features/groups/update-group";

type Props = {
  group: Group;
};

function GroupSettingsDialog({ group }: Props) {
  const [activeItem, setActiveItem] = useState("General");
  const [open, setOpen] = useState(false);

  const menuVisibilityClasses = `absolute right-2 top-2 transition-opacity cursor-pointer ${
    open ? "opacity-100" : "opacity-0 group-hover:opacity-100"
  }`;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="icon" className={menuVisibilityClasses}>
          <Ellipsis className="size-7" />
        </Button>
      </DialogTrigger>
      <DialogContent className="overflow-hidden p-0 md:max-h-[620px] md:max-w-[900px]">
        <DialogTitle className="sr-only">Group Settings</DialogTitle>
        <DialogDescription className="sr-only">
          Customize your group settings here.
        </DialogDescription>
        <SidebarProvider className="items-start">
          <Sidebar collapsible="none" className="hidden md:flex">
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Group</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={"General" === activeItem}
                        onClick={() => setActiveItem("General")}
                      >
                        <div>
                          <Settings />
                          <span>General</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <SidebarMenuItem>
                      <SidebarMenuButton
                        asChild
                        isActive={"Invite" === activeItem}
                        onClick={() => setActiveItem("Invite")}
                      >
                        <div>
                          <Users />
                          <span>Invite</span>
                        </div>
                      </SidebarMenuButton>
                    </SidebarMenuItem>

                    <DeleteGroupDialog
                      group={group}
                      activeItem={activeItem}
                      setActiveItem={setActiveItem}
                    />
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
          </Sidebar>

          <main className="flex h-[600px] flex-1 flex-col overflow-hidden ">
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem className="hidden md:block">
                      <BreadcrumbLink>Settings</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{activeItem}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </div>
            </header>

            <ScrollArea className="overflow-y-auto">
              {activeItem === "General" && (
                <UpdateGroupMenu group={group} setOpen={setOpen} />
              )}
            </ScrollArea>
          </main>
        </SidebarProvider>
      </DialogContent>
    </Dialog>
  );
}

export default GroupSettingsDialog;
