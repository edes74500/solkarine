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
import { useUpdateWeakAuraMutation } from "@/redux/api/weakAuras.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { WEAK_AURA_TAGS } from "@repo/constants";
import { EditWeakAuraForm, WeakAuraClient, editWeakAuraSchema } from "@repo/types";
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface EditWeakAuraDialogProps {
  weakAura: WeakAuraClient;
  onSuccess?: (data: any) => void;
}

// Tags disponibles
const AVAILABLE_TAGS = WEAK_AURA_TAGS;

export function EditWeakAuraDialog({ weakAura, onSuccess }: EditWeakAuraDialogProps) {
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [updateWeakAura] = useUpdateWeakAuraMutation();

  const form = useForm<EditWeakAuraForm>({
    resolver: zodResolver(editWeakAuraSchema),
    defaultValues: {
      title: weakAura.title,
      description: weakAura.description,
      image: weakAura.image,
      info: weakAura.info || "",
      tags: weakAura.tags,
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

  const onSubmit = async (data: EditWeakAuraForm) => {
    setIsEditing(true);
    try {
      const response = await updateWeakAura({ id: weakAura.id, data });

      if (response?.data?.success) {
        setOpen(false);
        if (onSuccess) {
          onSuccess(response);
        }
        toast.success("WeakAura modifiée avec succès");
      } else {
        toast.error("Erreur lors de la modification de la WeakAura");
      }
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      toast.error("Erreur lors de la modification de la WeakAura");
    } finally {
      setIsEditing(false);
    }
  };

  const resetForm = () => {
    reset({
      title: weakAura.title,
      description: weakAura.description,
      image: weakAura.image,
      info: weakAura.info || "",
      tags: weakAura.tags,
    });
  };

  const toggleTag = (tag: (typeof WEAK_AURA_TAGS)[number]) => {
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
          <DialogTitle>Modifier la WeakAura</DialogTitle>
          <DialogDescription>Modifiez les informations de la WeakAura "{weakAura.title}".</DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Section données de base */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Informations de base</CardTitle>
                <CardDescription>Modifiez les informations principales de la WeakAura</CardDescription>
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
