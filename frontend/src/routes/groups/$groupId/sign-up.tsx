import { createFileRoute } from '@tanstack/react-router'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

export const Route = createFileRoute('/groups/$groupId/sign-up')({
  component: RouteComponent,
})
function RouteComponent() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">Create an Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input id="name"  />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email"  />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" placeholder="••••••••" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button className="w-full">Sign Up</Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <a href="/groups/$groupId/log-in" className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

