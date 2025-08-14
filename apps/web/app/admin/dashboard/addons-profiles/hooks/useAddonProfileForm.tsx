import { zodResolver } from "@hookform/resolvers/zod";
import {
  AddonProfileDBWithAddonPopulated,
  CreateAddonProfileForm,
  createAddonProfileSchema,
  EditAddonProfileForm,
  editAddonProfileSchema,
} from "@repo/types/dist";
import { useForm } from "react-hook-form";

export function useCreateAddonProfileForm() {
  const createAddonProfileForm = useForm<CreateAddonProfileForm>({
    resolver: zodResolver(createAddonProfileSchema),
    defaultValues: {
      addon_id: "",
      name: "",
      description: "",
      info: "",
      export_string: "",
      screenshots: [],
    },
  });

  return { createAddonProfileForm };
}

export function useEditAddonProfileForm(addonProfile: AddonProfileDBWithAddonPopulated) {
  const editAddonProfileForm = useForm<EditAddonProfileForm>({
    resolver: zodResolver(editAddonProfileSchema),
    defaultValues: {
      addon_id: addonProfile.addon_id._id,
      name: addonProfile.name,
      description: addonProfile.description,
      info: addonProfile.info,
      export_string: addonProfile.export_string,
      screenshots: addonProfile.screenshots ? [...addonProfile.screenshots] : [],
    },
  });

  return { editAddonProfileForm };
}
