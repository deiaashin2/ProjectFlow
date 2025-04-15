import {useEffect, useRef } from "react";
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

  // Automatically scroll into view on page load`
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
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>

          <Button
            onClick={() => navigate({ to: `/groups/${groupId}/information-hub` })}
            className="w-full mt-4"
          > Login</Button>

          <p className="text-sm text-center text-gray-500">
            Don't have an account? <a href="/groups/$groupId/sign-up" className="text-blue-600 hover:underline">Sign up</a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

