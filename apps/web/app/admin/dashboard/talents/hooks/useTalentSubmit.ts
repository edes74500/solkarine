import {
  useCreateTalentMutation,
  useDeleteTalentMutation,
  useUpdateTalentMutation,
} from "@/redux/api/talents.apiSlice";
import { CreateTalentForm, EditTalentForm } from "@repo/types/dist";
import { UseFormReturn } from "react-hook-form";
import { toast } from "sonner";

export function useTalentCreateSubmit({
  form,
  onSuccessAction,
}: {
  form: UseFormReturn<CreateTalentForm>;
  onSuccessAction?: () => void;
}) {
  const [createTalent, { isLoading }] = useCreateTalentMutation();

  const onSubmitAction = async (values: CreateTalentForm) => {
    try {
      await createTalent(values).unwrap();
      toast.success("Talent créé");
      form.reset();
      onSuccessAction?.();
    } catch (e) {
      toast.error("Erreur lors de la création du talent");
    }
  };

  return { onSubmitAction, isSubmitting: isLoading };
}

export function useTalentEditSubmit({
  form,
  onSuccessAction,
}: {
  form: UseFormReturn<EditTalentForm>;
  onSuccessAction?: () => void;
}) {
  const [updateTalent, { isLoading }] = useUpdateTalentMutation();

  const onSubmitAction = async (values: EditTalentForm, id: string, initialScreenshot: string) => {
    try {
      await updateTalent({ id, talent: values, initialScreenshot }).unwrap();
      toast.success("Talent modifié");
      form.reset();
      onSuccessAction?.();
    } catch (e) {
      toast.error("Erreur lors de la modification du talent");
    }
  };

  return { onSubmitAction, isSubmitting: isLoading };
}

export function useTalentDeleteSubmit() {
  const [deleteTalent, { isLoading }] = useDeleteTalentMutation();

  const onSubmitAction = async (id: string) => {
    try {
      await deleteTalent(id).unwrap();
      toast.success("Talent supprimé");
    } catch (e) {
      toast.error("Erreur lors de la suppression du talent");
    }
  };
  return { onSubmitAction, isSubmitting: isLoading };
}
