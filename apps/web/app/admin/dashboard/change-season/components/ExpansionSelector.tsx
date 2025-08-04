"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ExpansionSelectorProps {
  currentExpansion: number;
  onExpansionChange: (value: number) => void;
  onFetchData: () => void;
  isLoading: boolean;
}

export function ExpansionSelector({
  currentExpansion,
  onExpansionChange,
  onFetchData,
  isLoading,
}: ExpansionSelectorProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Expansions</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">Choisissez une expansion pour changer de saison</p>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="expansion-input">Numéro d'expansion</Label>
          <div className="flex items-center gap-4">
            <Input
              id="expansion-input"
              type="number"
              value={currentExpansion}
              onChange={(e) => onExpansionChange(Number(e.target.value))}
              className="w-24"
              min="9"
            />
            <span className="text-sm text-muted-foreground">
              Expansion ID to get slugs for. 10 = The War Within, 9 = Dragonflight, 8 = Shadowlands, 7 = Battle for
              Azeroth, 6 = Legion
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-fit" onClick={onFetchData} disabled={isLoading}>
          {isLoading ? "Chargement..." : "Lancer la récupération des données"}
        </Button>
      </CardFooter>
    </Card>
  );
} 