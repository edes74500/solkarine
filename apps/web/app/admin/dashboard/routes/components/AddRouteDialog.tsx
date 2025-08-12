"use client";

import { StarRating } from "@/app/admin/dashboard/routes/components/StarRating";
import DownloadImage from "@/components/cdn/images/DownloadImage";
import ImagePreviewForm from "@/components/cdn/images/ImagePreviewForm";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { FormAreaText } from "@/components/Form/FormAreaText";
import { FormInput } from "@/components/Form/FormInput";
import { cn } from "@/lib/utils";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { useCreateRouteMutation, useUpdateRouteMutation } from "@/redux/api/routes.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRouteSchema, RouteDBWithDungeonPopulated } from "@repo/types";
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
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@repo/ui/components/form";
import { Input } from "@repo/ui/components/input";
import { Pencil, PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

type AddRouteDialogProps = { mode: "edit"; route: RouteDBWithDungeonPopulated } | { mode: "create" };

export default function AddRouteDialog(props: AddRouteDialogProps) {
  const { mode } = props;
  const isEditing = mode === "edit";
  const [isUploading, setIsUploading] = useState(false);
  const routeData = isEditing ? props.route : undefined;
  const [open, setOpen] = useState(false);
  const [updateRoute] = useUpdateRouteMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createRoute] = useCreateRouteMutation();
  const { data: dungeons } = useGetDungeonsQuery();
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const form = useForm<z.infer<typeof createRouteSchema>>({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: routeData?.name || "",
      description: routeData?.description || "",
      dungeon_id: routeData?.dungeon_id._id || "",
      difficulty: routeData?.difficulty || 3,
      speed: routeData?.speed || 3,
      lien_mdt: routeData?.lien_mdt || "",
      key_level: {
        min: routeData?.key_level.min || 2,
        max: routeData?.key_level.max || 30,
      },
      info: routeData?.info || "",
      image: routeData?.image || "",
    },
    mode: "onChange",
  });

  const uploadedImageUrl = form.watch("image");

  const setUploadedImageUrl = (url: string | null) => {
    form.setValue("image", url || "");
  };

  useEffect(() => {
    console.log("routeData", routeData);
    if (routeData?.image) {
      console.log("routeData.image", routeData.image, "setUploadedImageUrl");
      form.setValue("image", routeData.image);
    }
  }, [routeData, form]);

  useEffect(() => {
    form.setValue("key_level", { min: 2, max: 30 }, { shouldValidate: true });
  }, []);

  const handleEditRoute = async (data: z.infer<typeof createRouteSchema>) => {
    try {
      if (!routeData?.id) {
        toast.error("Erreur lors de la modification de la route, route non trouvée");
        return;
      }

      if (!uploadedImageUrl) {
        toast.error("Erreur lors de la modification de la route, impossible d'uploader l'image");
        return;
      }

      const finalData = {
        ...data,
        image: uploadedImageUrl,
      };

      const response = await updateRoute({
        id: routeData?.id,
        route: finalData,
        previousImage: routeData.image,
      });
      if (!response.data?.success) {
        toast.error("Erreur lors de la modification de la route");
      } else {
        toast.success("Route modifiée avec succès");
        setOpen(false);
        resetForm();
      }
    } catch (error) {
      toast.error("Erreur lors de la modification de la route");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCreateRoute = async (data: z.infer<typeof createRouteSchema>) => {
    try {
      //* formatage de l'image
      if (!uploadedImageUrl) {
        console.log("no uploadUrl");
        toast.error("Erreur lors de la création de la route, impossible d'uploader l'image");
        return;
      }

      const finalData = {
        ...data,
        image: uploadedImageUrl,
      };
      console.log("finalData", finalData);
      const response = await createRoute(finalData);
      if (!response.data?.success) {
        toast.error("Erreur lors de la création de la route");
      } else {
        toast.success("Route créée avec succès");
        setOpen(false);
        resetForm();
      }
    } catch (error) {
      toast.error("Erreur lors de la création de la route");
    } finally {
      setIsSubmitting(false);
    }
  };

  //*submit
  const onSubmit = async (data: z.infer<typeof createRouteSchema>) => {
    form.trigger();
    if (!form.formState.isValid) {
      toast.error("Veuillez remplir tous les champs requis");
      return;
    }
    setIsSubmitting(true);
    if (isEditing) {
      handleEditRoute(data);
    } else {
      handleCreateRoute(data);
    }
  };

  const resetForm = () => {
    form.reset();
    setUploadedImageUrl(null);
  };

  const handleClearImage = useCallback(() => {
    setUploadedImageUrl(null);
    form.setValue("image", "");
  }, []);

  return (
    <>
      <div
        className={cn(
          "fixed inset-0 bg-black/70 z-40 flex items-center justify-center transition-opacity",
          open ? "opacity-100" : "opacity-0 pointer-events-none",
        )}
      ></div>
      <Dialog open={open} onOpenChange={setOpen} modal={false}>
        <DialogTrigger asChild className={cn(mode === "edit" && "!p-0")}>
          {mode === "edit" ? (
            <Button className="flex items-center" variant="outline">
              <Pencil className="h-4 w-4" />
            </Button>
          ) : (
            <Button className="flex items-center gap-2" variant="default">
              <PlusCircle className="h-4 w-4" />
              Ajouter une route
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto"
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
            <DialogTitle>{mode === "edit" ? "Modifier la route" : "Ajouter une nouvelle route"}</DialogTitle>
            <DialogDescription>
              {mode === "edit"
                ? "Modifier la route pour un donjon. Remplissez tous les champs requis."
                : "Créez une nouvelle route pour un donjon. Remplissez tous les champs requis."}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormInput control={form.control} name="name" label="Nom *" placeholder="Nom de la route" />
              <FormAreaText
                control={form.control}
                name="description"
                label="Description"
                placeholder="Description de la route"
              />
              <FormField
                control={form.control}
                name="dungeon_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Donjon *</FormLabel>
                    <FormControl>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {dungeons?.data.map((dungeon) => (
                          <div
                            key={dungeon.id}
                            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                              field.value === dungeon.id ? "border-primary ring-2 ring-primary" : "border-transparent"
                            }`}
                            onClick={() => field.onChange(dungeon.id)}
                          >
                            <div
                              className="h-18 w-full bg-cover bg-center"
                              style={{ backgroundImage: `url(${dungeon.background_image_url})` }}
                            >
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                <span className="text-white font-medium text-center px-2">{dungeon.name}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-10">
                <FormField
                  control={form.control}
                  name="difficulty"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Difficulté *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="speed"
                  render={({ field }) => (
                    <FormItem className="flex flex-col">
                      <FormLabel>Vitesse *</FormLabel>
                      <FormControl>
                        <StarRating value={field.value} onChange={field.onChange} starColor={"green-500"} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="key_level"
                    render={({ field, formState }) => (
                      <FormItem>
                        <FormLabel>Niveau de clé (min-max) *</FormLabel>
                        <FormControl>
                          <div className="flex flex-col space-y-2">
                            <div className="flex items-center gap-4">
                              <div className="flex-1">
                                <Input
                                  type="number"
                                  min={2}
                                  max={field.value.max}
                                  value={field.value.min}
                                  onChange={(e) => {
                                    const newMin = Math.max(2, parseInt(e.target.value) || 2);
                                    field.onChange({ min: newMin, max: Math.max(field.value.max, newMin) });
                                  }}
                                />
                              </div>
                              <div className="flex-1">
                                <Input
                                  type="number"
                                  min={field.value.min}
                                  max={30}
                                  value={field.value.max}
                                  onChange={(e) => {
                                    const newMax = Math.min(30, parseInt(e.target.value) || 30);
                                    field.onChange({ min: field.value.min, max: newMax });
                                  }}
                                />
                              </div>
                            </div>
                            <span className="text-xs text-muted-foreground">Valeurs possibles: 2 à 30</span>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              <FormInput control={form.control} name="lien_mdt" label="Lien MDT *" placeholder="Lien MDT" />
              <FormInput
                control={form.control}
                name="info"
                label="Informations supplémentaires"
                placeholder="Utilisation d'invi pots, compo meta, melee etc..."
              />

              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Image *</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex flex-col gap-2 h-full">
                          <div className="grid grid-cols-2 gap-2 w-full h-full">
                            <DownloadImage setUploadedImageUrl={setUploadedImageUrl} setIsUploading={setIsUploading} />

                            <PasteImageZone setUploadedImageUrl={setUploadedImageUrl} setIsUploading={setIsUploading} />
                          </div>

                          <ImagePreviewForm
                            fieldValue={field.value}
                            isUploading={isUploading}
                            handleClearImageAction={handleClearImage}
                            showTumbails={false}
                            showArrows={false}
                            isLightboxOpen={lightboxOpen}
                            setIsLightboxOpenAction={setLightboxOpen}
                          />
                        </div>

                        <input type="hidden" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="submit" disabled={isSubmitting || !form.formState.isValid || !uploadedImageUrl}>
                  {isSubmitting ? "Traitement en cours..." : mode === "edit" ? "Modifier la route" : "Créer la route"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
}
