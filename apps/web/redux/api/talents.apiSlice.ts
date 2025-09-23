import { apiSlice } from "@/redux/api/config/apiSlice";
import {
  CreateTalentForm,
  EditTalentForm,
  TalentClientWithDungeonPopulated,
  TalentsDBWithDungeonPopulated,
} from "@repo/types";

export const talentsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllTalentsWithPopulatedDungeon: builder.query<
      { success: boolean; data: TalentClientWithDungeonPopulated[] },
      void
    >({
      query: () => "/talents/get-all-with-populated-dungeon",
      providesTags: ["Talents"],
    }),
    createTalent: builder.mutation<{ success: boolean; data: TalentsDBWithDungeonPopulated }, CreateTalentForm>({
      query: (body) => ({
        url: "/talents/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Talents"],
    }),
    deleteTalent: builder.mutation<{ success: boolean; data: boolean }, string>({
      query: (id) => ({
        url: `/talents/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Talents"],
    }),
    updateTalent: builder.mutation<
      { success: boolean; data: TalentsDBWithDungeonPopulated },
      { id: string; talent: EditTalentForm; initialScreenshot: string }
    >({
      query: (body) => ({
        url: `/talents/update/${body.id}`,
        method: "PUT",
        body: {
          talent: body.talent,
          initialScreenshot: body.initialScreenshot,
        },
      }),
      invalidatesTags: ["Talents"],
    }),
  }),
});

export const {
  useGetAllTalentsWithPopulatedDungeonQuery,
  useCreateTalentMutation,
  useDeleteTalentMutation,
  useUpdateTalentMutation,
} = talentsApi;
