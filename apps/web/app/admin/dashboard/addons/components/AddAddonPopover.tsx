import { CurseForgeMod } from "@repo/types";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Calendar, Download, Loader2, RefreshCw, Tag } from "lucide-react";
import Image from "next/image";

interface AddAddonPopoverProps {
  isOpen: boolean;
  isLoading: boolean;
  addons: CurseForgeMod[];
  onAddonSelect: (addon: CurseForgeMod) => void;
  searchTerm: string;
}

export function AddAddonPopover({ isOpen, isLoading, addons, onAddonSelect, searchTerm }: AddAddonPopoverProps) {
  if (!isOpen || searchTerm.length < 3) {
    return null;
  }
  console.log(addons);
  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    return format(date, "dd MMM yyyy", { locale: fr });
  };

  return (
    <div className="border bg-card rounded-md shadow-md w-full max-w-4xl max-h-[400px] overflow-auto">
      {isLoading ? (
        <div className="flex items-center justify-center py-6">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
        </div>
      ) : addons.length === 0 ? (
        <div className="p-4 text-center text-muted-foreground">Aucun addon trouvé</div>
      ) : (
        <div className="p-2">
          <div className="text-sm font-medium text-muted-foreground px-2 py-1.5">Addons disponibles</div>
          {addons.map((addon) => (
            <div
              key={addon.id}
              onClick={() => onAddonSelect(addon)}
              className="flex items-center py-3 px-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md cursor-pointer"
            >
              <div className="h-10 w-10 relative mr-3 flex-shrink-0">
                <Image
                  src={addon?.logo?.url || "https://www.curseforge.com/images/flame.svg"}
                  alt={addon.name}
                  fill
                  sizes="100px"
                  className="object-cover rounded"
                />
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="font-medium">{addon.name}</div>
                <div className="text-sm text-muted-foreground truncate">{addon.summary}</div>
                <div className="flex flex-wrap gap-x-3 text-xs text-muted-foreground mt-1">
                  <span className="flex items-center gap-1">
                    <Download size={12} />
                    {addon.downloadCount.toLocaleString()}
                  </span>
                  <span className="flex items-center gap-1">
                    <RefreshCw size={12} />
                    {format(new Date(addon.dateModified), "dd/MM/yy", { locale: fr })}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {format(new Date(addon.dateCreated), "dd/MM/yy", { locale: fr })}
                  </span>
                </div>
                <span className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                  <Tag size={12} />
                  {addon.categories.map((category) => category.name).join(", ")}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
