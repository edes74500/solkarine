import { DungeonClient, EditDungeonForm } from "@repo/types";
import { apiSlice } from "./config/apiSlice";

export const dungeonsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDungeons: builder.query<{ data: DungeonClient[]; status: boolean }, void>({
      query: () => "/dungeon",
      providesTags: ["Dungeons"],
    }),
    editDungeon: builder.mutation<{ status: boolean }, { id: string; dungeon: EditDungeonForm }>({
      query: ({ id, dungeon }) => ({
        url: `/dungeon/${id}`,
        method: "PUT",
        body: dungeon,
      }),
      invalidatesTags: ["Dungeons"],
    }),
  }),
});

export const { useGetDungeonsQuery, useEditDungeonMutation } = dungeonsApiSlice;
