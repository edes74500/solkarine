import AddonProfileFormDialog from "@/app/admin/dashboard/addons-profiles/components/AddonProfileFormDIalog";
import { useEditAddonProfileForm } from "@/app/admin/dashboard/addons-profiles/hooks/useAddonProfileForm";
import { useAddonProfileEditSubmit } from "@/app/admin/dashboard/addons-profiles/hooks/useAddonProfileSubmit";
import { useGetAddonsQuery } from "@/redux/api/addon.apiSlice";
import { AddonProfileDBWithAddonPopulated, EditAddonProfileForm } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function EditAddonProfile({ addonProfile }: { addonProfile: AddonProfileDBWithAddonPopulated }) {
  const { data: addons, isLoading } = useGetAddonsQuery();
  const [open, setOpen] = useState(false);
  // const [lightboxOpen, setLightboxOpen] = useState(false);
  // const [isUploading, setIsUploading] = useState(false);
  const initialScreenshots = useRef(addonProfile.screenshots);
  const { editAddonProfileForm } = useEditAddonProfileForm(addonProfile);
  const form = editAddonProfileForm;
  const { onSubmitAction, isSubmitting } = useAddonProfileEditSubmit({
    form,
    onSuccessAction: () => {
      toast.success("Profil d'addon modifié");
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset();
    }
  }, [open]);

  const onSubmit = async (values: EditAddonProfileForm) => {
    await onSubmitAction(values, addonProfile.id, initialScreenshots.current);
    setOpen(false);
    form.reset();
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
    <AddonProfileFormDialog
      dialogTrigger={
        <Button variant="outline" className="h-8 w-8 p-0">
          <PencilIcon className="w-4 h-4 " />
        </Button>
      }
      isSubmitting={isSubmitting}
      open={open}
      onOpenChangeAction={setOpen}
      title={`Modifier le profil d'addon ${addonProfile.name}`}
      submitLabel="Modifier le profil"
      form={form}
      onSubmitAction={onSubmit}
      addons={addons?.data || []}
      isAddonsLoading={isLoading}
      // lightboxOpen={lightboxOpen}
      // isUploading={isUploading}
      // setIsUploadingAction={setIsUploading}
      // setLightboxOpenAction={setLightboxOpen}
      onAddImageAction={handleAddImageToUrlArray}
      onClearImageAction={handleClearImage}
    />
  );
}
