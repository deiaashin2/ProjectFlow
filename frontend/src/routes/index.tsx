// import {
//   createFileRoute,
//   redirect,
//   // useNavigate
// } from "@tanstack/react-router";
// // import { Alert, AlertTitle, AlertDescription } from "../components/ui/alert";
// // import { Terminal } from "lucide-react";
// // import { Link } from "@tanstack/react-router";
// // import ThemeToggle from "@/components/theme-toggle";
// // import { Button } from "@/components/ui/button";
// // import useSignout from "@/hooks/useSignout";

// export const Route = createFileRoute("/")({
//   // component: Index,
//   // throwing a redirect object
//   loader: () => {
//     throw redirect({
//       to: "/log-in",
//     });
//   },
// });


// function Index() {
//   const signoutMutation = useSignout();
//   const navigate = useNavigate();

//   function handleSignout(e: any) {
//     e.preventDefault();

//     signoutMutation.mutate(undefined, {
//       onSuccess: () => {
//         navigate({ to: "/log-in" });
//       },
//     });
//   }
//   return (
//     <div>
//       <div className="flex gap-4 underline">
//         <Link to="/" className="[&.active]:font-bold text-blue-600">
//           Home
//         </Link>
//         <Link to="/groups" className="[&.active]:font-bold text-blue-600">
//           Groups
//         </Link>

//         <Link to="/log-in" className="[&.active]:font-bold text-blue-600">
//           Login
//         </Link>

//         <Link to="/sign-up" className="[&.active]:font-bold text-blue-600">
//           Signup
//         </Link>

//         <Button onClick={handleSignout}>
//           {signoutMutation.isPending ? "Signing out..." : "Sign Out"}
//         </Button>
//         <ThemeToggle />
//       </div>

//       <Alert>
//         <Terminal className="h-6 w-6" />
//         <AlertTitle className=" text-3xl">Heads up!</AlertTitle>
//         <AlertDescription className=" text-3xl">
//           You can add components and dependencies to your app using the cli.
//         </AlertDescription>
//       </Alert>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import rocketVideo from "@/assets/space-launch.mp4";
import ThemeToggle from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import useSignout from "@/hooks/useSignout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";


export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const signoutMutation = useSignout();
  const navigate = useNavigate();

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  useEffect(() => {
    const handleStorage = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  function handleSignout(e: any) {
    e.preventDefault();

    localStorage.removeItem("token"); // Clear the token

    signoutMutation.mutate(undefined, {
      onSuccess: () => {
        setIsAuthenticated(false);
        navigate({ to: "/log-in" });
      },
    });
  }

  return (
    <div>
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <div className="flex items-center space-x-4">
          {/* Left-side buttons */}
          {isAuthenticated && (
            <Link to="/groups">
              <Button variant="ghost" size="sm">Groups</Button>
            </Link>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button onClick={handleSignout} variant="outline" size="sm">
              {signoutMutation.isPending ? "Signing out..." : "Sign Out"}
            </Button>
          ) : (
            <Link to="/log-in">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
          )}
        </div>
      </div>

      <div className="relative w-full" style={{ height: "calc(100vh - 64px)" }}>
        {/* Background Video */}
        <video
          src={rocketVideo}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        />

        {/* Text Content Over Video */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
          <h1 className="text-white text-5xl font-bold drop-shadow-lg mb-6">
            Welcome to ProjectFlow
          </h1>

          <Card className="max-w-3xl bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl">ProjectFlow</CardTitle>
            </CardHeader>
            <CardContent className="text-base text-muted-foreground">
              A web application designed to help collaborations, group projects, and other teamwork activities.
              It is a platform where team members can manage schedules, share files, communicate, track progress,
              and organize tasks (to-do's). The platform is designed to solve issues such as disorganized
              communication, difficulty tracking responsibilities, and scattered information.
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}