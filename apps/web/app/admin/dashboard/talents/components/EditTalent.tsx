import TalentDialogForm from "@/app/admin/dashboard/talents/components/TalentDialogForm";
import { useTalentEditSubmit } from "@/app/admin/dashboard/talents/hooks/useTalentSubmit";
import { useGetDungeonsQuery } from "@/redux/api/dungeons.apiSlice";
import { zodResolver } from "@hookform/resolvers/zod";
import { EditTalentForm, editTalentSchema, TalentClientWithDungeonPopulated } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { PencilIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function EditTalent({ talent }: { talent: TalentClientWithDungeonPopulated }) {
  const { data: dungeons, isLoading } = useGetDungeonsQuery();
  const [open, setOpen] = useState(false);
  const initialScreenshot = useRef(talent.screenshot);

  const defaultValues = {
    name: talent.name,
    info: talent.info ?? "",
    class: talent.class,
    spec: talent.spec,
    hero_talent: talent.hero_talent,
    screenshot: talent.screenshot,
    export_string: talent.export_string,
    dungeon_ids: talent.dungeon_ids.map((dungeon) => dungeon._id),
  };

  const form = useForm<EditTalentForm>({
    resolver: zodResolver(editTalentSchema),
    defaultValues: defaultValues,
  });

  const { onSubmitAction, isSubmitting } = useTalentEditSubmit({
    form,
    onSuccessAction: () => {
      toast.success("Talent modifié");
      setOpen(false);
      form.reset(defaultValues);
    },
  });

  useEffect(() => {
    if (!open) {
      form.reset(defaultValues);
    }
  }, [open, form, talent]);

  const onSubmit = async (values: EditTalentForm) => {
    await onSubmitAction(values, talent._id, initialScreenshot.current);
  };

  const handleAddImage = (imageUrl: string | null) => {
    form.setValue("screenshot", imageUrl || "");
  };

  const handleClearImage = (index: number) => {
    form.setValue("screenshot", "");
  };

  return (
    <TalentDialogForm
      dialogTrigger={
        <Button variant="outline" className="h-8 w-8 p-0">
          <PencilIcon className="w-4 h-4" />
        </Button>
      }
      isSubmitting={isSubmitting}
      open={open}
      onOpenChangeAction={setOpen}
      title={`Modifier le talent ${talent.name}`}
      submitLabel="Modifier le talent"
      form={form}
      onSubmitAction={onSubmit}
      dungeons={dungeons?.data || []}
      isDungeonsLoading={isLoading}
      onAddImageAction={handleAddImage}
      onClearImageAction={handleClearImage}
    />
  );
}
