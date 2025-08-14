export const handleAddImageToUrlArray = (imageUrl: string | null, form: any) => {
  if (imageUrl) {
    form.setValue("screenshots", [...form.getValues("screenshots"), imageUrl]);
  }
};

export const handleClearImage = (index: number, form: any) => {
  form.setValue(
    "screenshots",
    form.getValues("screenshots").filter((_: any, i: number) => i !== index),
  );
};
