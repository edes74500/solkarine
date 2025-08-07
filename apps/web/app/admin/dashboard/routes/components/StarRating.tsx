import { cn } from "@repo/ui/lib/utils";
import { Star } from "lucide-react";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
  starColor?: string;
}

export function StarRating({ value, onChange, max = 5, className, starColor = "amber-500" }: StarRatingProps) {
  return (
    <div className={cn("flex items-center space-x-1", className)}>
      {Array.from({ length: max }).map((_, index) => (
        <Star
          key={index}
          className={`h-5 w-5 cursor-pointer ${index < value ? `fill-${starColor} text-${starColor}` : "text-gray-300"}`}
          onClick={() => onChange(index + 1)}
        />
      ))}
    </div>
  );
}
