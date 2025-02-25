import { createRootRoute, Outlet } from "@tanstack/react-router";

export const Route = createRootRoute({
  component: () => (
    <>
      {/* Layout/shared components here */}
      <Outlet />
    </>
  ),
});
