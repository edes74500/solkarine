import { getAllAddonsTags } from "@/lib/api/addon";
import { Badge } from "@repo/ui/components/badge";

export async function TagList() {
  const tags = await getAllAddonsTags();
  return (
    <div className="flex flex-wrap gap-2">
      {tags.data.map((tag) => (
        <Badge key={tag}>{tag}</Badge>
      ))}
    </div>
  );
}
