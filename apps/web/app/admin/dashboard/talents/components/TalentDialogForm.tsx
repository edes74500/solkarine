"use client";

import DownloadImage from "@/components/cdn/images/DownloadImage";
import ImagePreviewForm from "@/components/cdn/images/ImagePreviewForm";
import PasteImageZone from "@/components/cdn/images/PasteImage";
import { cn } from "@/lib/utils";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { CLASS_AND_TALENTS } from "@repo/constants/dist";
import { CreateTalentForm, EditTalentForm } from "@repo/types/dist";
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
import { Input } from "@repo/ui/components/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@repo/ui/components/select";
import { Textarea } from "@repo/ui/components/textarea";
import { useEffect, useState } from "react";
import { UseFormReturn } from "react-hook-form";

type TalentDialogFormProps = {
  open: boolean;
  onOpenChangeAction: (open: boolean) => void;
  showTrigger?: boolean;
  title: string;
  submitLabel: string;
  form: UseFormReturn<CreateTalentForm> | UseFormReturn<EditTalentForm>;
  onSubmitAction: (data: CreateTalentForm | EditTalentForm) => void;

  // dungeons
  dungeons: any[];
  isDungeonsLoading: boolean;

  // images
  onAddImageAction: (imageUrl: string | null) => void;
  onClearImageAction: (index: number) => void;
  dialogTrigger: React.ReactNode;
  isSubmitting: boolean;
};

export default function TalentDialogForm({
  open,
  onOpenChangeAction,
  showTrigger = true,
  title,
  submitLabel,
  form,
  onSubmitAction,
  dungeons = [],
  isDungeonsLoading = false,
  onAddImageAction,
  onClearImageAction,
  isSubmitting = false,
  dialogTrigger,
}: TalentDialogFormProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedClass, setSelectedClass] = useState<number | null>(null);
  const [selectedSpec, setSelectedSpec] = useState<number | null>(null);
  const [selectedHeroTalent, setSelectedHeroTalent] = useState<number | null>(null);

  const formValues = form.getValues();

  useEffect(() => {
    if (open) {
      setSelectedClass(formValues.class);
      setSelectedSpec(formValues.spec);
      setSelectedHeroTalent(formValues.hero_talent);
    }
  }, [open, form]);

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
                {selectedClass}
                {selectedSpec}
                {selectedHeroTalent}
                <VisuallyHidden asChild>
                  <DialogDescription>Formulaire de talent</DialogDescription>
                </VisuallyHidden>
              </DialogHeader>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmitAction)} className="space-y-4">
                  {/* Class */}
                  <FormField
                    control={form.control}
                    name="class"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Classe *</FormLabel>
                        <Select
                          value={field.value != null ? String(field.value) : undefined}
                          onValueChange={(value) => {
                            const n = value ? Number(value) : null;
                            field.onChange(n);
                            setSelectedClass(n);
                            // Réinitialiser spec et hero_talent quand la classe change
                            form.setValue("spec", 0, { shouldDirty: true });
                            form.setValue("hero_talent", 0, { shouldDirty: true });
                            form.clearErrors(["spec", "hero_talent"]);
                            setSelectedSpec(null);
                            setSelectedHeroTalent(null);
                          }}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Sélectionnez une classe" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectGroup>
                              {Object.entries(CLASS_AND_TALENTS).map(([classId, classData]) => (
                                <SelectItem key={classId} value={classId}>
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={classData.icon_url}
                                      alt={classData.name}
                                      className="w-4 h-4 rounded-full border border-foreground/80"
                                    />
                                    {classData.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Spec */}
                  <FormField
                    control={form.control}
                    name="spec"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Spécialisation *</FormLabel>
                          <Select
                            key={`spec-${selectedClass ?? "none"}`}
                            value={field.value != null ? String(field.value) : undefined}
                            onValueChange={(value) => {
                              const n = value ? Number(value) : null;
                              field.onChange(n);
                              setSelectedSpec(n);
                              // Réinitialiser hero_talent quand la spec change
                              form.setValue("hero_talent", 0, { shouldDirty: true });
                              form.clearErrors("hero_talent");
                              setSelectedHeroTalent(null);
                            }}
                            disabled={selectedClass == null}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    selectedClass != null
                                      ? "Sélectionnez une spécialisation"
                                      : "Sélectionnez d'abord une classe"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {selectedClass != null &&
                                  Object.entries(
                                    CLASS_AND_TALENTS[selectedClass as keyof typeof CLASS_AND_TALENTS] || {},
                                  )
                                    .filter(
                                      ([key]) =>
                                        !isNaN(Number(key)) &&
                                        key !== "hero_talent" &&
                                        key !== "name" &&
                                        key !== "icon_url",
                                    )
                                    .map(([specId, specData]) => (
                                      <SelectItem key={specId} value={specId}>
                                        <div className="flex items-center gap-2">
                                          <img
                                            src={(specData as any).icon_url}
                                            alt={(specData as any).name}
                                            className="w-4 h-4 rounded-full border border-foreground/80"
                                          />
                                          {(specData as any).name}
                                        </div>
                                      </SelectItem>
                                    ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Hero Talent */}
                  <FormField
                    control={form.control}
                    name="hero_talent"
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormLabel>Talent héroïque *</FormLabel>
                          <Select
                            key={`hero-talent-${selectedClass ?? "none"}-${selectedSpec ?? "none"}`}
                            value={field.value != null ? String(field.value) : undefined}
                            onValueChange={(value) => {
                              const n = value ? Number(value) : null;
                              field.onChange(n);
                              setSelectedHeroTalent(n);
                            }}
                            disabled={selectedClass == null || selectedSpec == null}
                          >
                            <FormControl>
                              <SelectTrigger className="w-full">
                                <SelectValue
                                  placeholder={
                                    selectedClass != null && selectedSpec != null
                                      ? "Sélectionnez un talent héroïque"
                                      : "Sélectionnez d'abord une classe et une spécialisation"
                                  }
                                />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectGroup>
                                {selectedClass &&
                                  selectedSpec &&
                                  (() => {
                                    const classKey = selectedClass as unknown as keyof typeof CLASS_AND_TALENTS;
                                    const classData = CLASS_AND_TALENTS[classKey];

                                    if (!classData) return null;

                                    const specKey = selectedSpec as unknown as keyof typeof classData;
                                    const specData = classData[specKey] as any;

                                    if (!specData?.hero_talent) return null;

                                    if (selectedClass > 0 && selectedSpec > 0) {
                                      return Object.entries(specData.hero_talent)
                                        .filter(([key]) => !isNaN(Number(key)))
                                        .map(([heroTalentId, heroTalentData]: [string, any]) => (
                                          <SelectItem key={heroTalentId} value={heroTalentId}>
                                            <div className="flex items-center gap-2">
                                              <img
                                                src={heroTalentData.icon_url}
                                                alt={heroTalentData.name}
                                                className="w-4 h-4 rounded-full border border-foreground/80"
                                              />
                                              {heroTalentData.name}
                                            </div>
                                          </SelectItem>
                                        ));
                                    }
                                  })()}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />

                  {/* Dungeon */}
                  <FormField
                    control={form.control}
                    name="dungeon_ids"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Donjons *</FormLabel>
                        <FormControl>
                          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {isDungeonsLoading ? (
                              <div>Chargement...</div>
                            ) : (
                              dungeons.map((dungeon: any) => {
                                const isSelected = field.value.includes(dungeon.id);

                                return (
                                  <div
                                    key={dungeon.id}
                                    className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                      isSelected ? "border-green-500 ring-2 ring-green-500" : "border-transparent"
                                    }`}
                                    onClick={() => {
                                      const selectedValues = isSelected
                                        ? field.value.filter((item: string) => item !== dungeon.id)
                                        : [...field.value, dungeon.id];
                                      field.onChange(selectedValues);
                                    }}
                                  >
                                    <div
                                      className={cn(
                                        "h-18 w-full bg-cover bg-center",
                                        isSelected ? "" : "grayscale",
                                        isSelected ? "border-green-500 ring-2 ring-green-500" : "border-transparent",
                                      )}
                                      style={{ backgroundImage: `url(${dungeon.background_image_url})` }}
                                    >
                                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                        <span
                                          className={`font-medium text-center px-2 ${isSelected ? "text-white" : "text-gray-400"}`}
                                        >
                                          {dungeon.name}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Name */}
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom du talent *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Nom du talent" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Info */}
                  <FormField
                    control={form.control}
                    name="info"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Informations supplémentaires</FormLabel>
                        <FormControl>
                          <Textarea {...field} placeholder="Changement pour prendre le dispell, etc..." />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* String */}
                  <FormField
                    control={form.control}
                    name="export_string"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>String *</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="Lien d'export" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Screenshots */}
                  <FormField
                    control={form.control}
                    name={"screenshot"}
                    render={({ field }) => {
                      const imgs: string[] = Array.isArray(field.value) ? field.value : [field.value];
                      const multi = imgs.length > 1;
                      return (
                        <FormItem>
                          <FormLabel>Screenshot *</FormLabel>
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
