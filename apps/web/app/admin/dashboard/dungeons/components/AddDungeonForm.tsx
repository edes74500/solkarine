"use client";

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const dungeonFormSchema = z.object({
  slug: z.string().min(1, "Le slug est requis"),
  name: z.string().min(1, "Le nom est requis"),
  short_name: z.string().min(1, "Le nom court est requis"),
  keystone_timer_seconds: z.coerce.number().min(1, "Le timer est requis"),
  icon_url: z.string().url("L'URL de l'icône doit être valide"),
  background_image_url: z.string().url("L'URL de l'image de fond doit être valide"),
});

type DungeonFormValues = z.infer<typeof dungeonFormSchema>;

export default function AddDungeonForm() {
  const form = useForm<DungeonFormValues>({
    resolver: zodResolver(dungeonFormSchema),
    defaultValues: {
      slug: "",
      name: "",
      short_name: "",
      keystone_timer_seconds: 0,
      icon_url: "",
      background_image_url: "",
    },
  });

  function onSubmit(data: DungeonFormValues) {
    console.log("Données du donjon soumises:", data);
    // Ici, vous pourriez appeler une API pour créer le donjon
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold">Ajouter un nouveau donjon</h2>

        <div className="grid gap-4 md:grid-cols-2">
          <FormField
            name="name"
            control={form.control}
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
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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

        <Button type="submit" className="w-full">
          Ajouter le donjon
        </Button>
      </form>
    </Form>
  );
}
