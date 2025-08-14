// app/mapage/_hooks/useAddonProfileSubmit.ts
"use client";

import { useCreateAddonProfileMutation, useEditAddonProfileMutation } from "@/redux/api/addonProfile.apiSlice";
import { CreateAddonProfileForm, EditAddonProfileForm } from "@repo/types/dist";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function useAddonProfileCreateSubmit({
  form,
  onSuccessAction,
}: {
  form: UseFormReturn<CreateAddonProfileForm>;
  onSuccessAction?: () => void;
}) {
  const [createAddonProfile, { isLoading }] = useCreateAddonProfileMutation();

  const onSubmitAction = async (values: CreateAddonProfileForm) => {
    try {
      await createAddonProfile(values).unwrap();
      toast.success("Profil d'addon créé");
      form.reset();
      onSuccessAction?.();
    } catch (e) {
      toast.error("Erreur lors de la création du profil");
    }
  };

  return { onSubmitAction, isSubmitting: isLoading };
}

export function useAddonProfileEditSubmit({
  onSuccessAction,
  form,
}: {
  onSuccessAction?: () => void;
  form: UseFormReturn<EditAddonProfileForm>;
}) {
  const [editAddonProfile, { isLoading }] = useEditAddonProfileMutation();

  const onSubmitAction = async (formData: EditAddonProfileForm, id: string, initialScreenshots: string[]) => {
    console.log(formData, id, initialScreenshots);
    try {
      await editAddonProfile({ formData, id, initialScreenshots }).unwrap();
      toast.success("Profil d'addon modifié");
      form.reset();
      onSuccessAction?.();
    } catch (e) {
      toast.error("Erreur lors de la modification du profil");
      console.log(e);
    }
  };

  return { onSubmitAction, isSubmitting: isLoading };
}
