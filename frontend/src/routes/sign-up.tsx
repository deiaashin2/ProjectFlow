import { useState } from "react";
import { createFileRoute, Navigate, useNavigate } from "@tanstack/react-router";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { API_BASE_URL } from "@/lib/constants";
import useAuth from "@/hooks/useAuth";
import { useQueryClient } from "@tanstack/react-query";

export const Route = createFileRoute("/sign-up")({
  component: SignupPage,
});

function getPasswordErrors(password: string): string[] {
  const errors = [];
  if (password.length < 8) errors.push("At least 8 characters");
  if (!/[A-Z]/.test(password)) errors.push("At least one uppercase letter");
  if (!/[a-z]/.test(password)) errors.push("At least one lowercase letter");
  if (!/\d/.test(password)) errors.push("At least one number");
  if (!/[!@#$%^&*(),.?\":{}|<>]/.test(password))
    errors.push("At least one special character");
  return errors;
}

function SignupPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient()

  const { isAuthenticated, isPending } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const passwordErrors = getPasswordErrors(password);
  const isPasswordValid = passwordErrors.length === 0;

  if (isPending) {
    return <></>;
  }

  if (isAuthenticated) {
    console.log("user is auth");
    return <Navigate to="/groups" />;
  }

  const handleSignUp = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await response.json();
      console.log("SIGN UP RESPONSE:", data);

      if (data.success) {
        queryClient.invalidateQueries({ queryKey: ["auth-status"] }),
        navigate({ to: `/log-in` });
      } else {
        setError(data.message || "Sign up failed. Try again.");
      }
    } catch (err) {
      console.error("Sign up request failed:", err);
      setError("Network error. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Create an Account
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
              <button
                type="button"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-sm text-blue-600 hover:underline"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <ul className="mt-2 text-sm space-y-1">
              <li
                className={
                  password.length >= 8 ? "text-green-600" : "text-red-600"
                }
              >
                • At least 8 characters
              </li>
              <li
                className={
                  /[A-Z]/.test(password) ? "text-green-600" : "text-red-600"
                }
              >
                • At least one uppercase letter
              </li>
              <li
                className={
                  /[a-z]/.test(password) ? "text-green-600" : "text-red-600"
                }
              >
                • At least one lowercase letter
              </li>
              <li
                className={
                  /\d/.test(password) ? "text-green-600" : "text-red-600"
                }
              >
                • At least one number
              </li>
              <li
                className={
                  /[!@#$%^&*(),.?\":{}|<>]/.test(password)
                    ? "text-green-600"
                    : "text-red-600"
                }
              >
                • At least one special character
              </li>
            </ul>
          </div>

          {error && (
            <p className="text-red-600 text-sm mt-2 text-center">{error}</p>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button
            className="w-full"
            onClick={handleSignUp}
            disabled={!isPasswordValid}
          >
            Sign Up
          </Button>
          <p className="text-sm text-muted-foreground text-center">
            Already have an account?{" "}
            <a href={`/log-in`} className="text-blue-600 hover:underline">
              Log In
            </a>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
