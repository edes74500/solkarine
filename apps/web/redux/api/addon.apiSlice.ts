import { apiSlice } from "@/redux/api/config/apiSlice";
import { AddonClient, CreateAddonForm, EditAddonForm } from "@repo/types/dist";

export const addonApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddons: builder.query<{ success: boolean; data: AddonClient[] }, void>({
      query: () => "/addon",
      providesTags: ["Addons"],
    }),
    createAddon: builder.mutation<{ success: boolean; data: AddonClient }, CreateAddonForm>({
      query: (data: CreateAddonForm) => ({
        url: "/addon/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Addons", "AddonProfiles"],
    }),
    deleteAddon: builder.mutation<{ success: boolean; message: string }, { id: string; confirm?: boolean }>({
      query: ({ id, confirm = false }) => ({
        url: `/addon/${id}`,
        method: "DELETE",
        params: { confirm },
      }),
      invalidatesTags: ["Addons", "AddonProfiles"],
    }),
    updateAddon: builder.mutation<{ success: boolean; data: AddonClient }, { id: string; data: EditAddonForm }>({
      query: ({ id, data }) => ({
        url: `/addon/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addons", "AddonProfiles"],
    }),
    getAddonCount: builder.query<{ success: boolean; data: number }, void>({
      query: () => "/addon/count",
    }),
  }),
});

export const {
  useGetAddonsQuery,
  useCreateAddonMutation,
  useDeleteAddonMutation,
  useUpdateAddonMutation,
  useGetAddonCountQuery,
} = addonApi;
