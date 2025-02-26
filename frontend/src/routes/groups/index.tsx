import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Terminal } from "lucide-react";

export const Route = createFileRoute("/groups/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Link to="/" className="underline text-blue-500 text-lg">Home</Link>
      <Alert variant={"destructive"}>
        <Terminal />
        <AlertTitle className="text-xl">Group Page</AlertTitle>
        <AlertDescription className="text-xl">Groups Go Here</AlertDescription>
      </Alert>
    </div>
  );
}
