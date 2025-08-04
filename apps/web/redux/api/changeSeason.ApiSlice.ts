import { Season } from "@repo/types";
import { apiSlice } from "./config/apiSlice";

export const changeSeasonApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    postChangeSeason: builder.mutation<void, Season>({
      query: (data) => ({
        url: "/change-season",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dungeons"],
    }),
  }),
});

export const { usePostChangeSeasonMutation } = changeSeasonApiSlice;
