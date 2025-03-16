import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function GroupHeader() {
  return (
    <header className="sticky top-0 z-10 items-center border-dashed border-b bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between p-4 ">
        <h1 className="font-bold text-2xl">
          <Link to="/">Project Flow</Link>
        </h1>
        <div className="flex items-center gap-2">
          <div className="invisible sm:visible relative">
            <Search className="absolute left-2.5 top-2.5 size-4" />
            <Input className="pl-8" placeholder="Search groups..." />
          </div>
          <ThemeToggle />
          <Avatar>
            <AvatarImage src=""/>
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default GroupHeader;
