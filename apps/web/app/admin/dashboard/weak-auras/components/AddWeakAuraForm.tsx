"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddWeakAuraMutation } from "@/redux/api/weakAuras.apiSlice";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

interface AddWeakAuraFormProps {
  onSuccess?: (data: any) => void;
}

export function AddWeakAuraForm({ onSuccess }: AddWeakAuraFormProps) {
  const [url, setUrl] = useState("");
  const [info, setInfo] = useState("");
  const [addWeakAura, { isLoading, error }] = useAddWeakAuraMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("url", url);
      const response = await addWeakAura({ url, info });
      setUrl("");
      if (response?.data?.success) {
        toast.success("WeakAura ajoutée avec succès");
      } else {
        toast.error(response?.data?.message || "Erreur lors de l'ajout de la WeakAura");
      }
      if (onSuccess) {
        onSuccess(response);
      }
      console.log(response);
    } catch (error) {
      console.error("Erreur lors de la récupération des données", error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Ajouter une WeakAura</CardTitle>
        <CardDescription>
          Entrez l&apos;URL d&apos;une WeakAura pour l&apos;ajouter à votre collection. Si elle existe déjà, elle sera
          mise à jour.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Entrez l'URL de la WeakAura"
              className="w-full"
            />
          </div>
          <div>
            <Textarea
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="Entrez des informations supplémentaires sur l'utilisation de la WeakAura (optionnel)"
              className="w-full min-h-[100px]"
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
              Envoyer
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
