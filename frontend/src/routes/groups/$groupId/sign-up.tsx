import { useState } from "react";
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute('/groups/$groupId/sign-up')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const groupId = Route.useParams().groupId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSignUp = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("SIGN UP RESPONSE:", data);

      if (data.success) {
        console.log("Account created, navigating to login...");
        navigate({ to: `/groups/${groupId}/log-in` });
      } else {
        console.error("Sign up failed:", data.message);
        setError(data.message || "Sign up failed. Try again.");
      }
    } catch (error) {
      console.error("Sign up request failed:", error);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full" onClick={handleSignUp}>
            Sign Up
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <a
              href={`/groups/${groupId}/log-in`}
              className="text-blue-600 hover:underline"
            >
              Log In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
