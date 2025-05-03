import useAuth from "@/hooks/useAuth";
import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/groups")({
  component: GroupsLayout,
});

function GroupsLayout() {
  const { isAuthenticated, isPending } = useAuth();

  if (isPending) return <div>Loading...</div>;

  if (!isAuthenticated) return <Navigate to="/log-in" />;
  
  return <Outlet />;
}
