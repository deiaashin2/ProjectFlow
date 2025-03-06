import { useSidebar } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { PanelRightClose, PanelRightOpen } from "lucide-react";
import { cn } from "@/lib/utils";

function CustomTrigger({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { toggleSidebar, open } = useSidebar();
  return (
    <Button
      data-sidebar="trigger"
      data-slot="sidebar-trigger"
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className={cn("h-7 w-7 ml-1 ", className)}
      {...props}
    >
      {open ? (
        <PanelRightOpen className="size-5.5 text-indigo-500" />
      ) : (
        <PanelRightClose className="size-5.5 text-indigo-500" />
      )}
    </Button>
  );
}

export default CustomTrigger;
