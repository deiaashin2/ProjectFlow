import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import ThemeToggle from "@/components/theme-toggle";
import useSignout from "@/hooks/useSignout";

function GroupHeader() {
  const { query } = useSearch({ from: "/groups/" });
  const navigate = useNavigate({ from: "/groups" });
  const [searchParam, setSearchParam] = useState(query || "");
  const signoutMutation = useSignout();

  // Debouncing search input
  useEffect(() => {
    const debounce = setTimeout(() => {
      navigate({
        search: (prev) => ({
          ...prev,
          query: searchParam || undefined,
        }),
        replace: true,
      });
    }, 500);

    return () => clearTimeout(debounce);
  }, [searchParam, navigate]);

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchParam(e.target.value);
  }

  function handleSignout(e: any) {
    e.preventDefault();

    signoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: "/log-in" });
      },
    });
  }
  return (
    <header className="sticky top-0 z-10 items-center bg-background">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between p-4 ">
        <div className=" relative">
          <Search className="absolute left-2.5 top-2.5 size-4" />
          <Input
            type="text"
            value={searchParam}
            onChange={handleInputChange}
            className="pl-8 w-72 md:w-80"
            placeholder="Search groups..."
          />
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle/>
            {/* <div className="pr-3">
              <Avatar>
                <AvatarImage src="https://i.pinimg.com/736x/0f/0c/b4/0f0cb42c40ba352a1489456e5de875a6.jpg" />
                <AvatarFallback>PF</AvatarFallback>
              </Avatar>
            </div> */}
          <Button onClick={handleSignout} className="hover:cursor-pointer">
            {signoutMutation.isPending ? "Signing out..." : "Sign Out"}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default GroupHeader;
