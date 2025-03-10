import { Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import ThemeToggle from "@/components/theme-toggle";
import GithubLinkButton from "@/components/github-link-button";

function GroupHeader() {
  return (
    <header className="sticky top-0 z-10 p-4 items-center border-b shadow-sm bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <h1 className="font-bold text-2xl">
          <Link to="/">Project Flow</Link>
        </h1>
        <div className="flex items-center">
          <div className="invisible sm:visible relative mr-2">
            <Search className="absolute left-2.5 top-2.5 size-4" />
            <Input className="pl-8" placeholder="Search groups..." />
          </div>
          <ThemeToggle />
          <GithubLinkButton />
        </div>
      </div>
    </header>
  );
}

export default GroupHeader;
