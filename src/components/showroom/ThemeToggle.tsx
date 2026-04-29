import { MoonStar, SunMedium } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useShowroom } from "@/hooks/use-showroom";

export function ThemeToggle() {
  const { theme, toggleTheme } = useShowroom();

  return (
    <Button
      type="button"
      variant="outline"
      size="icon"
      className="rounded-full border-line bg-card/80"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {theme === "dark" ? <SunMedium /> : <MoonStar />}
    </Button>
  );
}
