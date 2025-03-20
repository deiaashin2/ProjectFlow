import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function GroupHeader() {
  return (
    <header className="sticky top-0 z-10 items-center bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between p-4 ">
        <div className=" relative">
          <Search className="absolute left-2.5 top-2.5 size-4" />
          <Input className="pl-8 w-72 md:w-80" placeholder="Search groups..." />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Avatar>
            <AvatarImage src="https://i.pinimg.com/736x/0f/0c/b4/0f0cb42c40ba352a1489456e5de875a6.jpg" />
            <AvatarFallback>PF</AvatarFallback>
          </Avatar>
        </div>
      </div>
    </header>
  );
}

export default GroupHeader;
