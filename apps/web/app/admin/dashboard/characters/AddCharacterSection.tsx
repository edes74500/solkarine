"use client";

import { RaiderioCharacter } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { AddCharacterDialog } from "./AddCharacterDialog";

export default function AddCharacterSection() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [characterData, setCharacterData] = useState<RaiderioCharacter | null>(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState("eu");
  const [realm, setRealm] = useState("silvermoon");
  const [name, setName] = useState("elisdh");

  return (
    <div className="flex flex-col gap-4">
      <Button variant="default" className="w-fit" onClick={() => setDialogOpen(true)}>
        Ajouter un personnage
      </Button>
      <AddCharacterDialog dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
    </div>
  );
}
