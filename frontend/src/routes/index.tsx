import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Terminal } from "lucide-react";
import { Link } from "@tanstack/react-router";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import useSignout from "@/hooks/useSignout";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const signoutMutation = useSignout();
  const navigate = useNavigate();

  function handleSignout(e: any) {
    e.preventDefault();

    signoutMutation.mutate(undefined, {
      onSuccess: () => {
        navigate({ to: "/log-in" });
      },
    });
  }
  return (
    <div>
      <div className="flex gap-4 underline">
        <Link to="/" className="[&.active]:font-bold text-blue-600">
          Home
        </Link>
        <Link to="/groups" className="[&.active]:font-bold text-blue-600">
          Groups
        </Link>

        <Link to="/log-in" className="[&.active]:font-bold text-blue-600">
          Login
        </Link>

        <Link to="/sign-up" className="[&.active]:font-bold text-blue-600">
          Signup
        </Link>

        <Button onClick={handleSignout}>
          {signoutMutation.isPending ? "Signing out..." : "Sign Out"}
        </Button>
        <ThemeToggle />
      </div>

      <Alert>
        <Terminal className="h-6 w-6" />
        <AlertTitle className=" text-3xl">Heads up!</AlertTitle>
        <AlertDescription className=" text-3xl">
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}
