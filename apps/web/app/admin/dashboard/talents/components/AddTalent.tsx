import TalentDialogForm from "@/app/admin/dashboard/talents/components/TalentDialogForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { CreateTalentForm, createTalentSchema, DungeonClient } from "@repo/types/dist";
import { Button } from "@repo/ui/components/button";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function AddTalent({
  dungeons,
  isDungeonsLoading,
}: {
  dungeons: DungeonClient[];
  isDungeonsLoading: boolean;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);

  const form = useForm<CreateTalentForm>({
    resolver: zodResolver(createTalentSchema),
    defaultValues: {
      name: "",
      // description: "",
      info: undefined,
      class: 0,
      spec: 0,
      hero_talent: 0,
      screenshot: "",
      export_string: "",
      dungeon_ids: [],
    },
  });

  const onSubmit = async (data: CreateTalentForm) => {
    console.log(data);
  };

  const handleAddImage = (imageUrl: string | null) => {
    form.setValue("screenshot", imageUrl || "");
  };

  const handleClearImage = (index: number) => {
    form.setValue("screenshot", "");
  };

  const currentClass = form.watch("class");
  const currentSpec = form.watch("spec");
  const currentHeroTalent = form.watch("hero_talent");

  const currentImage = form.watch("screenshot");

  return (
    <div>
      {currentClass} {currentSpec} {currentHeroTalent}
      {currentImage}
      <TalentDialogForm
        open={dialogOpen}
        onOpenChangeAction={setDialogOpen}
        form={form}
        onSubmitAction={onSubmit}
        dungeons={dungeons}
        isDungeonsLoading={isDungeonsLoading}
        title="Ajouter un talent"
        submitLabel="Ajouter le talent"
        onAddImageAction={handleAddImage}
        onClearImageAction={handleClearImage}
        dialogTrigger={
          <Button variant="default" className="w-fit">
            Ajouter des talents
          </Button>
        }
        isSubmitting={false}
      />
    </div>
  );
}
