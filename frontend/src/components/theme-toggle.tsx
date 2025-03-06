import { useTheme } from "@/components/theme-provider";
import { SunMoon, MoonStar } from "lucide-react";
import { Button } from "./ui/button";
import IconTooltip from "@/components/icon-tooltip";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconTooltip label="Toggle Theme">
      <Button
        variant="ghost"
        size="icon"
        className="cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? (
          <SunMoon className="size-6" />
        ) : (
          <MoonStar className="size-6" />
        )}
      </Button>
    </IconTooltip>
  );
}
