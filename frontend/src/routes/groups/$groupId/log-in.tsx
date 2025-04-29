import { useEffect, useRef, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router"; 
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export const Route = createFileRoute("/groups/$groupId/log-in")({
  component: MessagePage,
});

function MessagePage() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const groupId = Route.useParams().groupId;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("RESPONSE STATUS:", response.status);
  
      const data = await response.json();
      console.log("LOGIN RESPONSE:", data);
  
      if (data.success) {
        console.log("Login successful, navigating...");
        navigate({ to: `/groups/${groupId}/information-hub` });
      } else {
        console.log("Login failed, navigating to sign-up...");
        navigate({ to: `/groups/${groupId}/sign-up` });
      }
    } catch (error) {
      console.error("Login request failed:", error);
      alert("Something went wrong. Check your network and backend.");
    }
  };
  

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg p-6">
        <CardContent className="space-y-4">
          <h1 className="text-2xl font-bold text-center">Login</h1>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <Button onClick={handleLogin} className="w-full mt-4">
            Login
          </Button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account?{" "}
            <a
              href={`/groups/${groupId}/sign-up`}
              className="text-blue-600 hover:underline"
            >
              Sign up
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

