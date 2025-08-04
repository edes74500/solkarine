"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useEditDungeonMutation } from "@/redux/api/dungeons.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { DungeonClient, EditDungeonForm } from "@repo/types";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const dungeonFormSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  name: z.string().min(1, "Le nom est requis"),
  short_name: z.string().min(1, "Le nom court est requis"),
  keystone_timer_seconds: z.coerce.number().min(1, "Le timer est requis"),
  icon_url: z.string().url("L'URL de l'icône doit être valide"),
  background_image_url: z.string().url("L'URL de l'image de fond doit être valide"),
});

interface EditDungeonProps {
  dungeon: DungeonClient;
  onEdit: (dungeon: DungeonClient) => void;
}

export default function EditDungeon({ dungeon, onEdit }: EditDungeonProps) {
  const [open, setOpen] = useState(false);
  const [timerFormatted, setTimerFormatted] = useState("");
  const [editDungeon] = useEditDungeonMutation();

  const form = useForm<EditDungeonForm>({
    resolver: zodResolver(dungeonFormSchema),
    defaultValues: {
      slug: dungeon.slug,
      name: dungeon.name,
      short_name: dungeon.short_name,
      keystone_timer_seconds: dungeon.keystone_timer_seconds,
      icon_url: dungeon.icon_url,
      background_image_url: dungeon.background_image_url,
    },
  });

  // Fonction pour générer un slug à partir du nom
  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .normalize("NFD") // Décompose les caractères accentués
      .replace(/[\u0300-\u036f]/g, "") // Supprime les accents
      .replace(/[^a-z0-9]+/g, "-") // Remplace les caractères spéciaux par des tirets
      .replace(/^-+|-+$/g, ""); // Supprime les tirets en début et fin
  };

  // Mettre à jour le slug lorsque le nom change
  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (name === "name") {
        form.setValue("slug", generateSlug(value.name || ""));
      }
      if (name === "keystone_timer_seconds" || value.keystone_timer_seconds) {
        const seconds = Number(value.keystone_timer_seconds || 0);
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        setTimerFormatted(`${minutes}m ${remainingSeconds}s`);
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  // Formater le timer initial
  useEffect(() => {
    const seconds = dungeon.keystone_timer_seconds;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    setTimerFormatted(`${minutes}m ${remainingSeconds}s`);
  }, [dungeon.keystone_timer_seconds]);

  async function onSubmit(data: EditDungeonForm) {
    try {
      const response = await editDungeon({ id: dungeon.id, dungeon: data });
      if (response.error) {
        toast.error("Erreur lors de la modification du donjon");
      } else {
        toast.success("Donjon modifié avec succès");
        setOpen(false);
        onEdit(dungeon);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          Éditer
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            Éditer le donjon {dungeon.name} ({dungeon.id})
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="name"
                control={form.control}
                key={dungeon.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nom</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom du donjon"
                        className={`h-11 ${form.formState.errors.name ? "ring-destructive ring-2" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                name="short_name"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Nom court</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Nom court"
                        className={`h-11 ${form.formState.errors.short_name ? "ring-destructive ring-2" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              name="slug"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Slug</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="slug-du-donjon"
                      className={`h-11 ${form.formState.errors.slug ? "ring-destructive ring-2" : ""}`}
                      {...field}
                      disabled
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 md:grid-cols-2">
              <FormField
                name="keystone_timer_seconds"
                control={form.control}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-base">Timer (secondes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="1800"
                        className={`h-11 ${form.formState.errors.keystone_timer_seconds ? "ring-destructive ring-2" : ""}`}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormItem>
                <FormLabel className="text-base text-transparent">Timer</FormLabel>
                <Input value={timerFormatted} className="h-11" disabled />
              </FormItem>
            </div>

            <FormField
              name="icon_url"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">URL de l'icône</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemple.com/icon.png"
                      className={`h-11 ${form.formState.errors.icon_url ? "ring-destructive ring-2" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              name="background_image_url"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">URL de l'image de fond</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="https://exemple.com/background.png"
                      className={`h-11 ${form.formState.errors.background_image_url ? "ring-destructive ring-2" : ""}`}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Annuler
              </Button>
              <Button type="submit">Enregistrer les modifications</Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
