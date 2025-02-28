import { useTheme } from "@/components/theme-provider";
import IconTooltip from "@/components/icon-tooltip";
import { SunMoon, MoonStar } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <IconTooltip label="Toggle Theme">
      <span
        className="hover:bg-sidebar-accent p-2 rounded-lg cursor-pointer"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      >
        {theme === "dark" ? <SunMoon /> : <MoonStar />}
      </span>
    </IconTooltip>
  );
}
