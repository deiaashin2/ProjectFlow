import { createFileRoute } from "@tanstack/react-router";
import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
import { Terminal } from "lucide-react";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div>
      <Alert >
        <Terminal className="h-6 w-6" />
        <AlertTitle className=" text-3xl">Heads up!</AlertTitle>
        <AlertDescription className=" text-3xl">
          You can add components and dependencies to your app using the cli.
        </AlertDescription>
      </Alert>
    </div>
  );
}
