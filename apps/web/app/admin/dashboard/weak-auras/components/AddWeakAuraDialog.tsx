"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAddWeakAuraMutation, useGetWeakAuraScrapperMutation } from "@/redux/api/weakAuras.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { WEAK_AURA_TAGS } from "@repo/constants";
import { CreateWeakAuraForm, ScrapingResult, createWeakAuraSchema } from "@repo/types";
import { Loader2, Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddWeakAuraDialogProps {
  onSuccess?: (data: any) => void;
}

// Tags disponibles
const AVAILABLE_TAGS = WEAK_AURA_TAGS;

export function AddWeakAuraDialog({ onSuccess }: AddWeakAuraDialogProps) {
  const [open, setOpen] = useState(false);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedData, setScrapedData] = useState<ScrapingResult | null>(null);

  const form = useForm<CreateWeakAuraForm>({
    resolver: zodResolver(createWeakAuraSchema),
    defaultValues: {
      title: "",
      description: "",
      image: "",
      url: "",
      info: "",
      tags: [],
    },
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const url = watch("url");
  const selectedTags = watch("tags") || [];

  const [addWeakAura, { isLoading: isAdding }] = useAddWeakAuraMutation();
  const [scrapeWeakAura] = useGetWeakAuraScrapperMutation();

  const handleScrape = async () => {
    if (!url) {
      toast.error("Veuillez entrer une URL");
      return;
    }

    if (!url.includes("wago.io")) {
      toast.error("L'URL doit être un lien wago.io");
      return;
    }

    setIsScraping(true);
    try {
      const response = await scrapeWeakAura({ url });
      if (response.data?.success) {
        const data = response.data.data;
        setScrapedData(data);
        setValue("title", data.basic.title);
        setValue("description", data.basic.description);
        setValue("image", data.basic.ogImageUrl);
        toast.success("Données récupérées avec succès");
      } else {
        toast.error("Erreur lors de la récupération des données");
      }
    } catch (error) {
      console.error("Erreur lors du scrapping:", error);
      toast.error("Erreur lors de la récupération des données");
    } finally {
      setIsScraping(false);
    }
  };

  const onSubmit = async (data: CreateWeakAuraForm) => {
    if (!scrapedData) {
      toast.error("Veuillez d'abord récupérer les données de la WeakAura");
      return;
    }

    try {
      const response = await addWeakAura(data);

      if (response?.data?.success) {
        toast.success("WeakAura ajoutée avec succès");
        setOpen(false);
        resetForm();
        if (onSuccess) {
          onSuccess(response);
        }
      } else {
        toast.error("Erreur lors de l'ajout de la WeakAura");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout:", error);
      toast.error("Erreur lors de l'ajout de la WeakAura");
    }
  };

  const resetForm = () => {
    reset();
    setScrapedData(null);
  };

  const toggleTag = (tag: (typeof WEAK_AURA_TAGS)[number]) => {
    const currentTags = selectedTags || [];
    const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
    setValue("tags", newTags);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Ajouter une WeakAura
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une WeakAura</DialogTitle>
          <DialogDescription>
            Entrez l'URL d'une WeakAura pour l'ajouter à votre collection. Les données seront automatiquement
            récupérées.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Section URL et Scrapping */}
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="url"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>URL de la WeakAura</FormLabel>
                        <FormControl>
                          <Input placeholder="https://wago.io/..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="button" onClick={handleScrape} disabled={isScraping || !url} className="mt-auto">
                  {isScraping ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                  Récupérer
                </Button>
              </div>
            </div>

            {/* Section données scrapées */}
            {scrapedData && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Données récupérées</CardTitle>
                  <CardDescription>Vérifiez et modifiez les informations si nécessaire</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Titre</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea rows={3} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Image URL</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            )}

            {/* Section informations supplémentaires */}
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations supplémentaires (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Informations sur l'utilisation de la WeakAura..." rows={3} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            {/* Section tags */}
            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {AVAILABLE_TAGS.map((tag) => (
                        <Badge
                          key={tag}
                          variant={selectedTags?.includes(tag) ? "default" : "outline"}
                          className="cursor-pointer hover:bg-primary/80"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          {/* {selectedTags?.includes(tag) && <X className="ml-1 h-3 w-3" />} */}
                        </Badge>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit" disabled={isAdding || !scrapedData}>
                {isAdding ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
