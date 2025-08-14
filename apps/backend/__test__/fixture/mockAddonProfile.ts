import { CreateAddonProfileForm, EditAddonProfileForm } from "@repo/types";

export const mockCreateAddonProfile = (customValues: Partial<CreateAddonProfileForm> = {}): CreateAddonProfileForm => {
  return {
    name: "Addon Profile 1",
    description: "Description de l'addon profile",
    addon_id: "123",
    screenshots: ["http://example.com/image.jpg"],
    export_string: "export_string",
    ...customValues,
  };
};
export const mockEditAddonProfile = (customValues: Partial<EditAddonProfileForm> = {}): EditAddonProfileForm => {
  return {
    name: "Addon Profile 1",
    description: "Description de l'addon profile",
    addon_id: "123",
    screenshots: ["http://example.com/image.jpg"],
    export_string: "export_string",
    ...customValues,
  };
};
