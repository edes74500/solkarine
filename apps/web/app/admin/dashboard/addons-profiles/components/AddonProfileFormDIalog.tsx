"use client";

import DownloadImage from "@/components/cdn/images/DownloadImage";
import ImagePreviewForm from "@/components/cdn/images/ImagePreviewForm";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { FormAreaText } from "@/components/Form/FormAreaText";
import { FormInput } from "@/components/Form/FormInput";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { AddonClient, CreateAddonProfileForm, EditAddonProfileForm } from "@repo/types/dist";
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
import { useState } from "react";
import { UseFormReturn } from "react-hook-form";

type AddonProfileFormDialogProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  showTrigger?: boolean;
  title: string;
  submitLabel: string;
  form: UseFormReturn<CreateAddonProfileForm | EditAddonProfileForm>;
  onSubmitAction: (data: CreateAddonProfileForm | EditAddonProfileForm) => void;

  // addons
  addons: AddonClient[];
  isAddonsLoading: boolean;

  // images
  // lightboxOpen: boolean;
  // isUploading: boolean;
  // setIsUploadingAction: (b: boolean) => void;
  // setLightboxOpenAction: (b: boolean) => void;
  onAddImageAction: (imageUrl: string | null) => void;
  onClearImageAction: (index: number) => void;
  dialogTrigger: React.ReactNode;
  // état submit optionnel (edit, etc.)
  isSubmitting: boolean;
};

export default function AddonProfileFormDialog({
  open,
  onOpenChangeAction,
  showTrigger = true,
  title,
  submitLabel,
  form,
  onSubmitAction,
  addons = [],
  isAddonsLoading = false,
  // lightboxOpen,
  // isUploading,
  // setIsUploadingAction,
  // setLightboxOpenAction,
  onAddImageAction,
  onClearImageAction,
  isSubmitting = false,
  dialogTrigger,
}: AddonProfileFormDialogProps) {
  const [isUploading, setIsUploading] = useState(false);
  // const [open, setOpen] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  // const lightboxOpenRef = useRef(false);
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className={cn(lightboxOpen && "pointer-events-none")}>
          {/* Modal personnalisée avec fond plus sombre */}
          <div
            className={cn(
              "fixed inset-0 bg-black/70 z-40 flex items-center justify-center transition-opacity",
              open ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          ></div>

          <Dialog open={open} onOpenChange={onOpenChangeAction} modal={false} key={open ? "open" : "closed"}>
            <DialogOverlay className="bg-black/70" />
            {showTrigger && <DialogTrigger asChild>{dialogTrigger}</DialogTrigger>}
            <DialogContent
              className={cn(
                "sm:max-w-[550px] max-h-[90vh] overflow-y-auto transition-all duration-200",
                lightboxOpen && "!z-10 pointer-events-none opacity-50",
              )}
              onInteractOutside={(e) => lightboxOpen && e.preventDefault()}
              onEscapeKeyDown={(e) => lightboxOpen && e.preventDefault()}
              onPointerDownOutside={(e) => lightboxOpen && e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle>{title}</DialogTitle>
                <VisuallyHidden asChild>
                  <DialogDescription>Formulaire de profil d’addon</DialogDescription>
                </VisuallyHidden>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-4">
                  {/* Addon */}
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
                              {isAddonsLoading ? (
                                <SelectItem value="loading">Chargement...</SelectItem>
                              ) : (
                                addons.map((addon: AddonClient) => (
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

                  {/* Champs texte */}
                  <FormInput control={form.control} name="name" label="Nom du profil *" placeholder="Nom du profil" />
                  <FormAreaText
                    control={form.control}
                    name="description"
                    label="Description *"
                    placeholder="Description"
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

                  {/* Screenshots */}
                  <FormField
                    control={form.control}
                    name={"screenshots" as any}
                    render={({ field }) => {
                      const imgs: string[] = Array.isArray(field.value) ? field.value : [];
                      const multi = imgs.length > 1;
                      return (
                        <FormItem>
                          <FormLabel>Screenshots *</FormLabel>
                          <FormControl>
                            <div className="space-y-4">
                              <div className="grid grid-cols-2 gap-2 w-full ">
                                <DownloadImage setUploadedImageUrl={onAddImageAction} setIsUploading={setIsUploading} />
                                <PasteImageZone
                                  setUploadedImageUrl={onAddImageAction}
                                  setIsUploading={setIsUploading}
                                />
                              </div>

                              <ImagePreviewForm
                                fieldValue={imgs}
                                isUploading={isUploading}
                                handleClearImageAction={onClearImageAction}
                                showTumbails={multi}
                                showArrows={multi}
                                isLightboxOpen={lightboxOpen}
                                setIsLightboxOpenAction={setLightboxOpen}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  <DialogFooter>
                    <Button type="submit" disabled={isUploading || isSubmitting}>
                      {submitLabel}
                    </Button>
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
