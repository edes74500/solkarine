import { CreateWeakAuraForm, EditWeakAuraForm, ScrapingResult, WeakAuraClient } from "@repo/types";
import { apiSlice } from "./config/apiSlice";

export const weakAurasApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addWeakAura: builder.mutation<{ success: boolean }, CreateWeakAuraForm>({
      query: (data: CreateWeakAuraForm) => ({
        url: "/weak-aura/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["WeakAuras"],
    }),
    getWeakAuraScrapper: builder.mutation<{ success: boolean; data: ScrapingResult }, { url: string }>({
      query: (data: { url: string }) => ({
        url: "/weak-aura/scrapper",
        method: "POST",
        body: data,
      }),
    }),
    getAllWeakAuras: builder.query<{ success: boolean; data: WeakAuraClient[] }, void>({
      query: () => "/weak-aura",
      providesTags: ["WeakAuras"],
    }),
    deleteWeakAura: builder.mutation<{ success: boolean }, { id: string }>({
      query: (data: { id: string }) => ({
        url: `/weak-aura/${data.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["WeakAuras"],
    }),
    updateWeakAura: builder.mutation<{ success: boolean }, { id: string; data: EditWeakAuraForm }>({
      query: (data: { id: string; data: EditWeakAuraForm }) => ({
        url: `/weak-aura/${data.id}`,
        method: "PUT",
        body: data.data,
      }),
      invalidatesTags: ["WeakAuras"],
    }),
  }),
});

export const {
  useAddWeakAuraMutation,
  useGetAllWeakAurasQuery,
  useDeleteWeakAuraMutation,
  useGetWeakAuraScrapperMutation,
  useUpdateWeakAuraMutation,
} = weakAurasApi;
