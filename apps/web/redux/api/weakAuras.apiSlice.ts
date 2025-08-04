import { apiSlice } from "./config/apiSlice";

export const weakAurasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWeakAura: builder.mutation<any, { url: string; info: string }>({
      query: (data: { url: string; info: string }) => ({
        url: "/weak-aura",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WeakAuras"],
    }),
    getAllWeakAuras: builder.query<any, void>({
      query: () => "/weak-aura",
      providesTags: ["WeakAuras"],
    }),
    deleteWeakAura: builder.mutation<any, { id: string }>({
      query: (data: { id: string }) => ({
        url: `/weak-aura/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WeakAuras"],
    }),
  }),
});

export const { useAddWeakAuraMutation, useGetAllWeakAurasQuery, useDeleteWeakAuraMutation } = weakAurasApi;
