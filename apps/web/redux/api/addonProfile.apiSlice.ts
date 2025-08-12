import { apiSlice } from "@/redux/api/config/apiSlice";
import { AddonProfileDBWithAddonPopulated, CreateAddonProfileForm } from "@repo/types/dist";

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
  }),
});

export const { useGetAddonProfilesQuery, useCreateAddonProfileMutation } = addonProfileApi;
