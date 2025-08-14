"use client";

import AddonProfileFormDialog from "@/app/admin/dashboard/addons-profiles/components/AddonProfileFormDIalog";
import { useCreateAddonProfileForm } from "@/app/admin/dashboard/addons-profiles/hooks/useAddonProfileForm";
import { useAddonProfileCreateSubmit } from "@/app/admin/dashboard/addons-profiles/hooks/useAddonProfileSubmit";
import { useGetAddonsQuery } from "@/redux/api/addon.apiSlice";
import { CreateAddonProfileForm } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AddAddonProfile() {
  const { data: addons, isLoading } = useGetAddonsQuery();
  // const [createAddonProfile, { isLoading: isCreating }] = useCreateAddonProfileMutation();
  const [open, setOpen] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);
  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [isSubmitting, setIsSubmitting] = useState(false);

  const { createAddonProfileForm } = useCreateAddonProfileForm();
  const form = createAddonProfileForm;
  const { onSubmitAction, isSubmitting } = useAddonProfileCreateSubmit({
    form,
    onSuccessAction: () => {
      setOpen(false);
      form.reset();
      toast.success("Profil d'addon créé avec succès");
    },
  });

  // const handleCreateAddonProfile = async (values: CreateAddonProfileForm) => {
  //   console.log(values);
  //   try {
  //     // setIsSubmitting(true);
  //     await createAddonProfile(values).unwrap();
  //     setOpen(false);
  //     form.reset();
  //     toast.success("Profil d'addon créé avec succès");
  //   } catch (error) {
  //     console.error(error);
  //     toast.error("Erreur lors de la création du profil d'addon");
  //   }
  // };

  const onSubmit = async (values: CreateAddonProfileForm) => {
    await onSubmitAction(values);
  };

  const handleAddImageToUrlArray = (imageUrl: string | null) => {
    if (imageUrl) {
      form.setValue("screenshots", [...form.getValues("screenshots"), imageUrl]);
    }
  };

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const handleClearImage = (index: number) => {
    form.setValue(
      "screenshots",
      form.getValues("screenshots").filter((_, i) => i !== index),
    );
  };

  return (
    <AddonProfileFormDialog
      open={open}
      onOpenChangeAction={setOpen}
      title="Ajouter un nouveau profil d'addon"
      submitLabel="Ajouter le profil"
      form={form}
      onSubmitAction={onSubmit}
      addons={addons?.data || []}
      isAddonsLoading={isLoading}
      dialogTrigger={
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Ajouter un profil
        </Button>
      }
      // lightboxOpen={lightboxOpen}
      // isUploading={isUploading}
      // setIsUploadingAction={setIsUploading}
      // setLightboxOpenAction={setLightboxOpen}
      onAddImageAction={handleAddImageToUrlArray}
      onClearImageAction={handleClearImage}
      isSubmitting={isSubmitting}
    />
  );

  /* <Dialog open={open} onOpenChange={setOpen} modal={false} key={open ? "open" : "closed"}>
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
                    name="addon_id"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Addon *</FormLabel>
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

                  <FormInput control={form.control} name="name" label="Nom du profil *" placeholder="Nom du profil" />

                  <FormAreaText
                    control={form.control}
                    name="description"
                    label="Description *"
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
                    label="Export texte *"
                    placeholder="Collez ici le text d'export"
                  />

                  <FormField
                    control={form.control}
                    name="screenshots"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Screenshots *</FormLabel>
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
          </Dialog> */
}
