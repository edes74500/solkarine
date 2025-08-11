"use client";

import ImagePreviewForm from "@/components/cdn/images/ImagePreviewForm";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { useLightboxState } from "@/components/wrapper/lightboxProvider";
import { useImageUpload } from "@/hooks/img/useImageUpload";
import { cn } from "@/lib/utils";
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
  DialogOverlay,
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
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddAddonProfile() {
  const { data: addons, isLoading } = useGetAddonsQuery();
  const [open, setOpen] = useState(false);
  const { uploadToTempR2 } = useImageUpload();
  const [isUploading, setIsUploading] = useState(false);
  const { isOpen: lightboxOpen } = useLightboxState();

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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      const reader = new FileReader();
      const uploadUrl = await uploadToTempR2(file);
      console.log(uploadUrl);

      reader.onload = (e) => {
        handleAddImageToUrlArray(uploadUrl);
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

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
                          <Textarea placeholder="Description du profil" {...field} />
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
                    name="export_string"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Export text *</FormLabel>
                        <FormControl>
                          <Input placeholder="Collez ici le text d'export" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
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
                              <label htmlFor="image-upload" className="cursor-pointer">
                                <div className="border border-dashed border-gray-300 rounded-md p-4 text-center hover:bg-gray-50 transition-colors">
                                  <span className="text-sm text-gray-500">
                                    Cliquez pour sélectionner une image ou utilisez la zone de collage ci-dessous
                                  </span>
                                </div>
                                <input
                                  id="image-upload"
                                  type="file"
                                  accept="image/*"
                                  className="hidden"
                                  onChange={handleImageUpload}
                                  onClick={(e) => (e.currentTarget.value = "")}
                                />
                              </label>

                              <PasteImageZone setUploadedImageUrl={handleAddImageToUrlArray} />

                              <ImagePreviewForm
                                fildValue={field.value}
                                isUploading={isUploading}
                                handleClearImageAction={handleClearImage}
                                showTumbails={field.value.length > 1 ? true : false}
                                showArrows={field.value.length > 1 ? true : false}
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
