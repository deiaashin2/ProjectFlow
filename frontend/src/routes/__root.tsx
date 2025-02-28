import { createRootRoute, Outlet } from "@tanstack/react-router";
import { ThemeProvider } from "@/components/theme-provider";

export const Route = createRootRoute({
  component: () => (
    <>
      <ThemeProvider storageKey="vite-ui-theme">
        {/* Layout/shared components here */}
        <Outlet />
      </ThemeProvider>
    </>
  ),
});
