import { apiSlice } from "@/redux/api/config/apiSlice";
import { CharacterDB, CreateCharacterForm, EditCharacterForm } from "@repo/types";

export const characterApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCharacters: builder.query<{ success: boolean; data: CharacterDB[] }, void>({
      query: () => "/character",
      providesTags: ["Characters"],
    }),
    createCharacter: builder.mutation<{ success: boolean; data: CharacterDB }, CreateCharacterForm>({
      query: (character) => ({
        url: "/character",
        method: "POST",
        body: character,
      }),
      invalidatesTags: ["Characters"],
    }),
    editCharacter: builder.mutation<
      { success: boolean; data: CharacterDB },
      { id: string; character: EditCharacterForm }
    >({
      query: ({ id, character }) => ({
        url: `/character/${id}`,
        method: "PUT",
        body: character,
      }),
      invalidatesTags: ["Characters"],
    }),
    deleteCharacter: builder.mutation<{ success: boolean; data: boolean }, string>({
      query: (id) => ({
        url: `/character/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Characters"],
    }),
    getCharacter: builder.query<{ success: boolean; data: CharacterDB }, string>({
      query: (id) => `/character/${id}`,
      providesTags: ["Characters"],
    }),
    getCharacterCount: builder.query<{ success: boolean; data: number }, void>({
      query: () => "/character/count",
      providesTags: ["Characters"],
    }),
  }),
});

export const {
  useGetCharactersQuery,
  useCreateCharacterMutation,
  useEditCharacterMutation,
  useDeleteCharacterMutation,
  useGetCharacterQuery,
  useGetCharacterCountQuery,
} = characterApi;
