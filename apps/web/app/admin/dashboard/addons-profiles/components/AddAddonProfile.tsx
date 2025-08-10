"use client";

import { useGetAddonsQuery } from "@/redux/api/addon.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddonClient, CreateAddonProfileForm, createAddonProfileSchema } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddAddonProfile() {
  const { data: addons, isLoading } = useGetAddonsQuery();
  const [open, setOpen] = useState(false);

  const form = useForm<CreateAddonProfileForm>({
    resolver: zodResolver(createAddonProfileSchema),
    defaultValues: {
      addonId: "",
      name: "",
      description: "",
      info: "",
      content: "",
    },
  });

  function onSubmit(values: CreateAddonProfileForm) {
    console.log(values);
    setOpen(false);
    form.reset();
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des profils d'addons</h2>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <PlusIcon className="h-4 w-4" />
              Ajouter un profil
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[550px]">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau profil d'addon</DialogTitle>
              <DialogDescription>
                Créez un nouveau profil pour partager votre configuration d'addon avec la communauté.
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="addonId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Addon</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Sélectionnez un addon" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {isLoading ? (
                            <SelectItem value="loading">Chargement...</SelectItem>
                          ) : (
                            addons?.data.map((addon: AddonClient) => (
                              <SelectItem key={addon.id} value={addon.id}>
                                {addon.name}
                              </SelectItem>
                            ))
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nom du profil</FormLabel>
                      <FormControl>
                        <Input placeholder="Nom du profil" {...field} />
                      </FormControl>
                      <FormDescription>Donnez un nom clair à votre profil d'addon.</FormDescription>
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
                        <Input placeholder="Description du profil" {...field} />
                      </FormControl>
                      <FormDescription>Une brève description de ce que fait votre profil.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="info"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Informations supplémentaires</FormLabel>
                      <FormControl>
                        <Input placeholder="Informations supplémentaires (optionnel)" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contenu du profil</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Collez ici le contenu de votre profil d'addon"
                          className="min-h-[150px]"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Le code ou la configuration de votre profil d'addon.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <DialogFooter>
                  <Button type="submit">Ajouter le profil</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
