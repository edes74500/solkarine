"use client";

import { StarRating } from "@/app/admin/dashboard/routes/components/StarRating";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { useImageUpload } from "@/hooks/useImageUpload";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { useCreateRouteMutation } from "@/redux/api/routes.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { createRouteSchema } from "@repo/types";
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
import { Textarea } from "@repo/ui/components/textarea";
import { PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function AddRouteDialog() {
  const [open, setOpen] = useState(false);
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [createRoute] = useCreateRouteMutation();
  const { data: dungeons } = useGetDungeonsQuery();
  const { uploadUrl } = useImageUpload();

  const form = useForm<z.infer<typeof createRouteSchema>>({
    resolver: zodResolver(createRouteSchema),
    defaultValues: {
      name: "",
      description: "",
      dungeon_id: "",
      difficulty: 3,
      speed: 3,
      lien_mdt: "",
      key_level: {
        min: 2,
        max: 30,
      },
      info: "",
      image: "",
    },
    mode: "all",
  });

  console.log("form", form.formState.errors);
  console.log("form", form.getValues());
  console.log("errors", form.formState.errors);
  console.log("form valid", form.formState.isValid);

  useEffect(() => {
    form.setValue("key_level", { min: 2, max: 30 }, { shouldValidate: true });
  }, []);

  useEffect(() => {
    form.trigger("image");
  }, [form.watch("image")]);

  //*submit
  const onSubmit = async (data: z.infer<typeof createRouteSchema>) => {
    setIsSubmitting(true);

    try {
      //* formatage de l'image
      if (!uploadedImage) return;
      const imgName =
        data.name
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "_")
          .replace(/:/g, "_") +
        "_" +
        dungeons?.data
          .find((dungeon) => dungeon.id === data.dungeon_id)
          ?.name.toLowerCase()
          .replace(/ /g, "_");
      const image = await uploadUrl(uploadedImage, imgName);
      console.log("image compressée", image);
      if (!image) {
        console.log("no uploadUrl");
        toast.error("Erreur lors de la création de la route, impossible d'uploader l'image");
        return;
      }

      const finalData = {
        ...data,
        image,
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

  const resetForm = useCallback(() => {
    form.reset();
    setUploadedImage(null);
    setPreviewImage(null);
  }, [form]);

  const handleImageUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
      form.setValue("image", file.name);
      console.log("handleImageUpload");
    }
  }, []);

  const handlePasteImage = useCallback((file: File) => {
    setUploadedImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setPreviewImage(e.target.result as string);
      }
    };
    form.setValue("image", file.name);
    reader.readAsDataURL(file);
    console.log("handlePasteImage");
  }, []);

  const handleClearImage = useCallback(() => {
    setUploadedImage(null);
    setPreviewImage(null);
    form.setValue("image", "");
  }, []);

  // Réinitialiser le formulaire quand le dialogue est fermé
  useEffect(() => {
    if (!open) {
      resetForm();
    }
  }, [open, resetForm]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusCircle className="h-4 w-4" />
          Ajouter une route
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Ajouter une nouvelle route</DialogTitle>
          <DialogDescription>
            Créez une nouvelle route pour un donjon. Remplissez tous les champs requis.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nom *</FormLabel>
                  <FormControl>
                    <Input placeholder="Nom de la route" {...field} />
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
                  <FormLabel>Description *</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Description de la route" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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
                              {/* <FormLabel className="text-sm">Minimum</FormLabel> */}
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
                              {/* <FormLabel className="text-sm">Maximum</FormLabel> */}
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

            <FormField
              control={form.control}
              name="lien_mdt"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Lien MDT *</FormLabel>
                  <FormControl>
                    <Input placeholder="Lien MDT" {...field} />
                  </FormControl>
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
                    <Textarea placeholder="Utilisation d'invi pots, compo meta, melee etc..." {...field} />
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
                  <FormLabel>Image *</FormLabel>
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
                            // Réinitialiser la valeur pour permettre de sélectionner la même image
                            onClick={(e) => (e.currentTarget.value = "")}
                          />
                        </label>

                        <PasteImageZone onFileReceived={handlePasteImage} />

                        {previewImage && (
                          <div className="mt-2">
                            <p className="text-sm font-medium mb-1">Aperçu de l'image:</p>
                            <div className="relative w-fit">
                              <img src={previewImage} alt="Aperçu" className="max-h-40 rounded-md object-contain" />
                              <button
                                type="button"
                                onClick={handleClearImage}
                                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs aspect-square w-5 h-5 flex items-center justify-center"
                              >
                                X
                              </button>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Champ caché pour stocker l'URL de l'image */}
                      <input type="hidden" {...field} />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit" disabled={isSubmitting || !form.formState.isValid || !uploadedImage}>
                {isSubmitting ? "Création en cours..." : "Créer la route"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
