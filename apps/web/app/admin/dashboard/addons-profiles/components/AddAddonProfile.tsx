"use client";

import DownloadImage from "@/components/cdn/images/DownloadImage";
import ImagePreviewForm from "@/components/cdn/images/ImagePreviewForm";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { FormAreaText } from "@/components/Form/FormAreaText";
import { FormInput } from "@/components/Form/FormInput";
import { cn } from "@/lib/utils";
import { useGetAddonsQuery } from "@/redux/api/addon.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AddonClient, CreateAddonProfileForm, createAddonProfileSchema } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@repo/ui/components/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddAddonProfile() {
  const { data: addons, isLoading } = useGetAddonsQuery();
  const [open, setOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const form = useForm<CreateAddonProfileForm>({
    resolver: zodResolver(createAddonProfileSchema),
    defaultValues: {
      addonId: "",
      name: "",
      description: "",
      info: "",
      export_string: "",
      screenshots: [],
    },
  });

  function onSubmit(values: CreateAddonProfileForm) {
    console.log(values);
    setOpen(false);
    form.reset();
  }

  const handleAddImageToUrlArray = (imageUrl: string | null) => {
    if (imageUrl) {
      form.setValue("screenshots", [...form.getValues("screenshots"), imageUrl]);
    }
  };

  const handleClearImage = (index: number) => {
    form.setValue(
      "screenshots",
      form.getValues("screenshots").filter((_, i) => i !== index),
    );
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Liste des profils d'addons</h2>
        <div className={cn(lightboxOpen && "pointer-events-none")}>
          {/* Modal personnalisée avec fond plus sombre */}
          <div
            className={cn(
              "fixed inset-0 bg-black/70 z-40 flex items-center justify-center transition-opacity",
              open ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          ></div>
          <Dialog open={open} onOpenChange={setOpen} modal={false} key={open ? "open" : "closed"}>
            <DialogOverlay className="bg-black/70" />
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <PlusIcon className="h-4 w-4" />
                Ajouter un profil
              </Button>
            </DialogTrigger>
            <DialogContent
              className={cn(
                "sm:max-w-[550px] max-h-[90vh] overflow-y-auto transition-all duration-200",
                lightboxOpen && "!z-10 pointer-events-none opacity-50",
              )}
              onInteractOutside={(e) => {
                if (lightboxOpen) {
                  e.preventDefault();
                }
              }}
              onEscapeKeyDown={(e) => {
                if (lightboxOpen) {
                  e.preventDefault();
                }
              }}
              onPointerDownOutside={(e) => {
                if (lightboxOpen) {
                  e.preventDefault();
                }
              }}
            >
              <DialogHeader>
                <DialogTitle>Ajouter un nouveau profil d'addon</DialogTitle>
                <VisuallyHidden asChild>
                  <DialogDescription>
                    Créez un nouveau profil pour partager votre configuration d'addon avec la communauté.
                  </DialogDescription>
                </VisuallyHidden>
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
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sélectionnez un addon" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {isLoading ? (
                                <SelectItem value="loading">Chargement...</SelectItem>
                              ) : (
                                addons?.data.map((addon: AddonClient) => (
                                  <SelectItem key={addon.id} value={addon.id}>
                                    <div className="flex items-center gap-2">
                                      <img src={addon.imageUrl} alt={addon.name} className="w-6 h-6 rounded-full" />
                                      {addon.name}
                                    </div>
                                  </SelectItem>
                                ))
                              )}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormInput control={form.control} name="name" label="Nom du profil" placeholder="Nom du profil" />

                  <FormAreaText
                    control={form.control}
                    name="description"
                    label="Description"
                    placeholder="Description du profil"
                  />

                  <FormInput
                    control={form.control}
                    name="info"
                    label="Informations supplémentaires"
                    placeholder="Instalation, utilisation... (optionnel)"
                  />

                  <FormInput
                    control={form.control}
                    name="export_string"
                    label="Export text *"
                    placeholder="Collez ici le text d'export"
                  />

                  <FormField
                    control={form.control}
                    name="screenshots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Screenshots</FormLabel>
                        <FormControl>
                          <div className="space-y-4">
                            <div className="flex flex-col gap-2">
                              <div className="grid grid-cols-2 gap-2 w-full h-full">
                                <DownloadImage
                                  setUploadedImageUrl={handleAddImageToUrlArray}
                                  setIsUploading={setIsUploading}
                                />

                                <PasteImageZone
                                  setUploadedImageUrl={handleAddImageToUrlArray}
                                  setIsUploading={setIsUploading}
                                />
                              </div>

                              <ImagePreviewForm
                                fieldValue={field.value}
                                isUploading={isUploading}
                                handleClearImageAction={handleClearImage}
                                showTumbails={field.value.length > 1 ? true : false}
                                showArrows={field.value.length > 1 ? true : false}
                                isLightboxOpen={lightboxOpen}
                                setIsLightboxOpenAction={setLightboxOpen}
                              />
                            </div>
                          </div>
                        </FormControl>
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
    </div>
  );
}
