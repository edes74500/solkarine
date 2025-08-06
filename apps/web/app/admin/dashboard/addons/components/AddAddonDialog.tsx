import { useCreateAddonMutation } from "@/redux/api/addon.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateAddonForm, createAddonSchema, CurseForgeMod } from "@repo/types";
import { Badge } from "@repo/ui/components/badge";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Textarea } from "@repo/ui/components/textarea";
import { Loader2, Plus, X } from "lucide-react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface AddAddonDialogProps {
  dialogOpen: boolean;
  setDialogOpen: (open: boolean) => void;
  selectedAddon: CurseForgeMod | null;
  setSelectedAddon: (addon: CurseForgeMod | null) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  setSearchTerm: (term: string) => void;
  setPopoverOpen: (open: boolean) => void;
  canSetTags?: boolean;
  canSetUrl?: boolean;
}

export function AddAddonDialog({
  dialogOpen,
  setDialogOpen,
  selectedAddon,
  setSelectedAddon,
  searchInputRef,
  setSearchTerm,
  setPopoverOpen,
  canSetTags = false,
  canSetUrl = false,
}: AddAddonDialogProps) {
  const [newTag, setNewTag] = useState("");
  const form = useForm<CreateAddonForm>({
    resolver: zodResolver(createAddonSchema),
    defaultValues: {
      name: "",
      description: "",
      imageUrl: "",
      addonUrl: "",
      tags: [],
      info: "",
    },
  });
  const [createAddon, { isLoading, isSuccess, isError, reset }] = useCreateAddonMutation();

  // Réinitialiser le formulaire quand un addon est sélectionné
  React.useEffect(() => {
    if (selectedAddon && dialogOpen) {
      // Éliminer les doublons dans les tags
      const uniqueTags = selectedAddon.categories
        .map((category) => category.name)
        .filter((value, index, self) => self.indexOf(value) === index);

      form.reset({
        name: selectedAddon.name,
        description: selectedAddon.summary,
        imageUrl: selectedAddon.logo?.url || "https://www.curseforge.com/images/flame.svg",
        addonUrl: selectedAddon.links.websiteUrl,
        tags: uniqueTags,
      });
    }
  }, [selectedAddon, dialogOpen, form]);

  const onSubmit = async (values: CreateAddonForm) => {
    console.log("values", values);
    // if (!selectedAddon) return;

    try {
      const response = await createAddon(values);
      if (response.error) {
        toast.error("Erreur lors de la sauvegarde de l'addon");
      } else {
        toast.success("Addon ajouté avec succès");
      }
      setDialogOpen(false);
      setSelectedAddon(null);
      setSearchTerm("");
      setPopoverOpen(false);
      reset();
    } catch (error) {
      console.error("Erreur lors de la sauvegarde de l'addon:", error);
      toast.error("Erreur lors de la sauvegarde de l'addon");
    }
  };

  const handleCancel = () => {
    setDialogOpen(false);
    setSelectedAddon(null);
    setSearchTerm("");
    setPopoverOpen(false);
  };

  const addTag = () => {
    if (newTag.trim() !== "") {
      const currentTags = form.getValues("tags") || [];
      if (!currentTags.includes(newTag.trim())) {
        form.setValue("tags", [...currentTags, newTag.trim()]);
        setNewTag("");
      }
    }
  };

  const removeTag = (tagToRemove: string) => {
    const currentTags = form.getValues("tags") || [];
    form.setValue(
      "tags",
      currentTags.filter((tag) => tag !== tagToRemove),
    );
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Modifier les détails de l'addon</DialogTitle>
          <DialogDescription>
            Personnalisez les informations de l'addon avant de l'ajouter à votre base de données.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom</FormLabel>
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
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {canSetUrl && (
              <FormField
                control={form.control}
                name="addonUrl"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>URL de l'addon</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>URL de l'image</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("imageUrl") && (
              <div className="flex justify-center">
                <img
                  src={form.watch("imageUrl")}
                  alt="Aperçu"
                  className="h-32 object-contain rounded"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/200x200?text=Image+invalide";
                  }}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tags</FormLabel>
                  {canSetTags && (
                    <div className="flex gap-2 mb-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Ajouter un tag..."
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addTag();
                          }
                        }}
                      />
                      <Button type="button" size="sm" onClick={addTag}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                  <div className="flex flex-wrap gap-2">
                    {field.value && field.value.length > 0 ? (
                      field.value.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="flex items-center gap-1">
                          {tag}
                          {canSetTags && <X className="h-3 w-3 cursor-pointer" onClick={() => removeTag(tag)} />}
                        </Badge>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">Aucun tag disponible</p>
                    )}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations</FormLabel>
                  <FormControl>
                    <Textarea {...field} rows={4} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="button" variant="outline" onClick={handleCancel}>
                Annuler
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Ajouter
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
