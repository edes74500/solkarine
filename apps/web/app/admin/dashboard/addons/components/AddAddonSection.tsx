"use client";

import { CurseForgeApiResponse, CurseForgeMod } from "@repo/types";
import { Alert, AlertDescription, AlertTitle } from "@repo/ui/components/alert";
import { Button } from "@repo/ui/components/button";
import { Input } from "@repo/ui/components/input";
import debounce from "lodash/debounce";
import { InfoIcon, Search, X } from "lucide-react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { AddAddonDialog } from "./AddAddonDialog";
import { AddAddonPopover } from "./AddAddonPopover";

export function AddAddonSection() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [addons, setAddons] = useState<CurseForgeMod[]>([]);
  const [selectedAddon, setSelectedAddon] = useState<CurseForgeMod | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [canSetTags, setCanSetTags] = useState(false);
  const [canSetUrl, setCanSetUrl] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleAddonSelect = (addon: CurseForgeMod) => {
    setSelectedAddon(addon);
    setSearchTerm(addon.name);
    setPopoverOpen(false);
    setDialogOpen(true);
    setCanSetTags(false);

    // Redonner le focus à l'input après une courte période
    setTimeout(() => {
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    }, 100);
  };

  const fetchCurseForgeAddons = async (query: string) => {
    if (!query || query.length < 3) {
      setAddons([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`/api/curseforge?q=${encodeURIComponent(query)}`);

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const data: CurseForgeApiResponse = await response.json();
      setAddons(data.data);
    } catch (error) {
      console.error("Erreur lors de la récupération des addons:", error);
      toast.error("Impossible de récupérer les addons");
    } finally {
      setIsLoading(false);
    }
  };

  // Utilisation de debounce pour limiter les requêtes API
  const debouncedFetch = useCallback(
    debounce((query: string) => {
      fetchCurseForgeAddons(query);
    }, 500),
    [],
  );

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    debouncedFetch(value);
    if (value.length >= 3 && !popoverOpen) {
      setPopoverOpen(true);
    }
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setAddons([]);
    setPopoverOpen(false);
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  const handleManualAddClick = () => {
    setSelectedAddon(null);
    setCanSetTags(true);
    setDialogOpen(true);
    setCanSetUrl(true);
  };

  return (
    <div className="space-y-6">
      <h2>Ajouter un addon</h2>
      <div className="flex items-center space-x-2 relative max-w-4xl">
        <Search className="h-5 w-5 text-gray-500 absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none" />
        <Input
          ref={searchInputRef}
          placeholder="Rechercher un addon sur CurseForge..."
          value={searchTerm}
          onChange={(e) => handleSearchChange(e.target.value)}
          className="flex-1 pl-10 !ring-primary !ring-2"
          onFocus={() => searchTerm.length >= 3 && setPopoverOpen(true)}
        />
        {searchTerm && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6"
            onClick={handleClearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      <AddAddonPopover
        isOpen={popoverOpen}
        isLoading={isLoading}
        addons={addons}
        onAddonSelect={handleAddonSelect}
        searchTerm={searchTerm}
      />

      <Alert className="max-w-4xl">
        <InfoIcon className="h-4 w-4" />
        <AlertTitle>Ajout manuel</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>
            Si l'addon que vous cherchez n'est pas dans la liste, vous pouvez l'ajouter manuellement en cliquant sur le
            bouton ci-dessous.
          </p>
          <Button variant="outline" className="w-fit" onClick={handleManualAddClick}>
            Ajouter un addon
          </Button>
        </AlertDescription>
      </Alert>

      <AddAddonDialog
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
        selectedAddon={selectedAddon}
        setSelectedAddon={setSelectedAddon}
        searchInputRef={searchInputRef}
        setSearchTerm={setSearchTerm}
        setPopoverOpen={setPopoverOpen}
        canSetTags={canSetTags}
        canSetUrl={canSetUrl}
      />
    </div>
  );
}
