import { cn } from "@/lib/utils";
import { Badge } from "@repo/ui/components/badge";
import { X } from "lucide-react";

interface BadgeListProps {
  tag: string;
  selectedTag: string | null;
  handleTagClick: (tag: string) => void;
  tagCount: number;
}

export function BadgeList({ tag, selectedTag, handleTagClick, tagCount }: BadgeListProps) {
  return (
    <Badge
      key={tag}
      variant={selectedTag === tag ? "default" : "outline"}
      className={cn(
        "cursor-pointer px-4 py-1.5 flex items-center gap-2 text-sm font-medium rounded-md transition-all",
        selectedTag === tag ? "bg-primary text-primary-foreground shadow-md" : "hover:bg-secondary",
      )}
      onClick={() => handleTagClick(tag)}
    >
      <span className="uppercase">
        {tag.replace("_", " ")}{" "}
        <span className={`text-xs ml-2 ${selectedTag !== tag ? "text-muted-foreground" : ""}`}>{tagCount}</span>
      </span>
      {selectedTag === tag ? (
        <X
          className="h-3.5 w-3.5 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            handleTagClick(tag);
          }}
        />
      ) : (
        <></>
      )}
    </Badge>
  );
}
