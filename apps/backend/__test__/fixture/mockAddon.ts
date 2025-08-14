import { CreateAddonForm, EditAddonForm } from "@repo/types";

export const mockCreateAddon = (customValues: Partial<CreateAddonForm> = {}): CreateAddonForm => {
  return {
    name: "Addon 1",
    description: "Description de l'addon",
    imageUrl: "http://example.com/image.jpg",
    addonUrl: "http://example.com/addon.zip",
    tags: ["tag1", "tag2"],
    info: "Info de l'addon",
    ...customValues,
  };
};

export const mockEditAddon = (customValues: Partial<EditAddonForm> = {}): EditAddonForm => {
  return {
    name: "Addon 1",
    description: "Description de l'addon",
    imageUrl: "http://example.com/image.jpg",
    addonUrl: "http://example.com/addon.zip",
    tags: ["tag1", "tag2"],
    info: "Info de l'addon",
    ...customValues,
  };
};
