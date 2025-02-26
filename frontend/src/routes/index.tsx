import { createFileRoute } from "@tanstack/react-router";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Terminal } from "lucide-react";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <div className="flex gap-4 text-blue-600 underline">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link>{" "}
        <Link to="/about" className="[&.active]:font-bold">
          About
        </Link>
        <Link to="/groups" className="[&.active]:font-bold">
          Groups
        </Link>
        <Link
          to="/groups/$groupId/messages"
          params={{ groupId: "1" }}
          className="[&.active]:font-bold"
        >
          Messages
        </Link>
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
