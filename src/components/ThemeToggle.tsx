import { Palette } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme, ColorTheme } from "@/contexts/ThemeContext";

const themes: { value: ColorTheme; label: string; color: string }[] = [
  { value: 'green', label: 'Green', color: 'hsl(116 97% 62%)' },
  { value: 'blue', label: 'Blue', color: 'hsl(210 95% 58%)' },
  { value: 'purple', label: 'Purple', color: 'hsl(270 95% 65%)' },
  { value: 'orange', label: 'Orange', color: 'hsl(30 95% 58%)' },
  { value: 'pink', label: 'Pink', color: 'hsl(330 95% 65%)' },
];

export const ThemeToggle = () => {
  const { colorTheme, setColorTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="relative bg-emerald-200 hover:bg-emerald-300 border-emerald-300 text-emerald-800">
          <Palette className="h-5 w-5" />
          <span className="sr-only">Toggle theme color</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => setColorTheme(theme.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <div
              className="w-4 h-4 rounded-full border border-border"
              style={{ backgroundColor: theme.color }}
            />
            <span className={colorTheme === theme.value ? 'font-semibold' : ''}>
              {theme.label}
            </span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
