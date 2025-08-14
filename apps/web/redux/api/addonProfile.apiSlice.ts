import { apiSlice } from "@/redux/api/config/apiSlice";
import { AddonProfileDBWithAddonPopulated, CreateAddonProfileForm, EditAddonProfileForm } from "@repo/types/dist";

export const addonProfileApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAddonProfiles: builder.query<{ success: boolean; data: AddonProfileDBWithAddonPopulated[] }, void>({
      query: () => "/addon-profile",
      providesTags: ["AddonProfiles"],
    }),

    createAddonProfile: builder.mutation<
      { success: boolean; data: AddonProfileDBWithAddonPopulated },
      CreateAddonProfileForm
    >({
      query: (body) => ({
        url: "/addon-profile/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["AddonProfiles"],
    }),

    editAddonProfile: builder.mutation<
      { success: boolean; data: AddonProfileDBWithAddonPopulated },
      { formData: EditAddonProfileForm; id: string; initialScreenshots: string[] }
    >({
      query: (body) => ({
        url: `/addon-profile/edit/${body.id}`,
        method: "PUT",
        body: {
          formData: body.formData,
          initialScreenshots: body.initialScreenshots,
        },
      }),
      invalidatesTags: ["AddonProfiles"],
    }),

    deleteAddonProfile: builder.mutation<{ success: boolean; data: AddonProfileDBWithAddonPopulated }, string>({
      query: (id) => ({
        url: `/addon-profile/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AddonProfiles"],
    }),
  }),
});

export const {
  useGetAddonProfilesQuery,
  useCreateAddonProfileMutation,
  useEditAddonProfileMutation,
  useDeleteAddonProfileMutation,
} = addonProfileApi;
