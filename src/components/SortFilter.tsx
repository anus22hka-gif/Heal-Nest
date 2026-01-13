import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type SortOption = "distance" | "price-low" | "price-high" | "rating";

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
}

const SortFilter = ({ currentSort, onSortChange }: SortFilterProps) => {
  const sortOptions = [
    { value: "distance" as SortOption, label: "Distance (Nearest)" },
    { value: "price-low" as SortOption, label: "Price (Low to High)" },
    { value: "price-high" as SortOption, label: "Price (High to Low)" },
    { value: "rating" as SortOption, label: "Rating (Highest)" },
  ];

  const currentLabel = sortOptions.find((opt) => opt.value === currentSort)?.label;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2 hover:bg-accent transition-[var(--transition-smooth)]">
          <ArrowUpDown className="w-4 h-4" />
          Sort: {currentLabel}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        {sortOptions.map((option) => (
          <DropdownMenuItem
            key={option.value}
            onClick={() => onSortChange(option.value)}
            className={currentSort === option.value ? "bg-accent" : ""}
          >
            {option.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SortFilter;
