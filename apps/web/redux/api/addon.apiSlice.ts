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
      invalidatesTags: ["Addons"],
    }),
    deleteAddon: builder.mutation<{ success: boolean; data: AddonClient }, string>({
      query: (id: string) => ({
        url: `/addon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Addons"],
    }),
    updateAddon: builder.mutation<{ success: boolean; data: AddonClient }, { id: string; data: EditAddonForm }>({
      query: ({ id, data }) => ({
        url: `/addon/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Addons"],
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
