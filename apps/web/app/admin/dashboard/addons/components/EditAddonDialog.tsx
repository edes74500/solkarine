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
import { useUpdateAddonMutation } from "@/redux/api/addon.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddonClient, EditAddonForm, editAddonSchema } from "@repo/types";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditAddonDialogProps {
  addon: AddonClient;
  onSuccess?: (data: any) => void;
}

export function EditAddonDialog({ addon, onSuccess }: EditAddonDialogProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateAddon] = useUpdateAddonMutation();

  const form = useForm<EditAddonForm>({
    resolver: zodResolver(editAddonSchema),
    defaultValues: {
      name: addon.name,
      description: addon.description,
      imageUrl: addon.imageUrl,
      addonUrl: addon.addonUrl,
      info: addon.info || "",
      tags: addon.tags,
    },
    mode: "onChange",
  });

  const {
    watch,
    setValue,
    reset,
    formState: { errors },
  } = form;

  const selectedTags = watch("tags") || [];

  const onSubmit = async (data: EditAddonForm) => {
    setIsEditing(true);
    try {
      const response = await updateAddon({ id: addon.id, data });

      if (response?.data?.success) {
        setOpen(false);
        if (onSuccess) {
          onSuccess(response);
        }
        toast.success("Addon modifié avec succès");
      } else {
        toast.error("Erreur lors de la modification de l'addon");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      toast.error("Erreur lors de la modification de l'addon");
    } finally {
      setIsEditing(false);
    }
  };

  const resetForm = () => {
    reset({
      name: addon.name,
      description: addon.description,
      imageUrl: addon.imageUrl,
      addonUrl: addon.addonUrl,
      info: addon.info || "",
      tags: addon.tags,
    });
  };

  const toggleTag = (tag: string) => {
    const currentTags = selectedTags || [];
    const newTags = currentTags.includes(tag) ? currentTags.filter((t) => t !== tag) : [...currentTags, tag];
    setValue("tags", newTags);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 w-8 p-0">
          <Pencil className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Modifier l'addon</DialogTitle>
          <DialogDescription>Modifiez les informations de l'addon "{addon.name}".</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Section données de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de base</CardTitle>
                <CardDescription>Modifiez les informations principales de l'addon</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
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
                        <Textarea rows={3} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
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
              </CardContent>
            </Card>

            {/* Section informations supplémentaires */}
            <FormField
              control={form.control}
              name="info"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Informations supplémentaires (optionnel)</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Informations sur l'utilisation de l'addon..." rows={3} {...field} />
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
                      {selectedTags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="default"
                          className="cursor-pointer hover:bg-primary/80"
                          onClick={() => toggleTag(tag)}
                        >
                          {tag}
                          <span className="ml-1 text-xs">&times;</span>
                        </Badge>
                      ))}
                      <Input
                        placeholder="Ajouter un tag..."
                        className="w-32 h-7"
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && e.currentTarget.value) {
                            e.preventDefault();
                            const newTag = e.currentTarget.value.trim();
                            if (newTag && !selectedTags.includes(newTag)) {
                              toggleTag(newTag);
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
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
              <Button type="submit" disabled={isEditing}>
                {isEditing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                Modifier
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
