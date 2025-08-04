import { DungeonClient } from "@repo/types";
import { apiSlice } from "./config/apiSlice";

export const dungeonsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<{ data: DungeonClient[]; status: boolean }, void>({
      query: () => "/dungeon",
      providesTags: ["Dungeons"],
    }),
  }),
});

export const { useGetDungeonsQuery } = dungeonsApiSlice;
