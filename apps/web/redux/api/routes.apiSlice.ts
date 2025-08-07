import { apiSlice } from "@/redux/api/config/apiSlice";
import { CreateRouteForm, RouteDB, RouteDBWithDungeonPopulated, UpdateRouteForm } from "@repo/types";

export const routesApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRoutesWithPopulatedDungeon: builder.query<{ success: boolean; data: RouteDBWithDungeonPopulated[] }, void>({
      query: () => "/routes/routes-with-populated-dungeon",
      providesTags: ["Routes"],
    }),

    updateRoute: builder.mutation<{ success: boolean; data: RouteDB }, { id: string; route: UpdateRouteForm }>({
      query: (route) => ({
        url: `/routes/update/${route.id}`,
        method: "PUT",
        body: route.route,
      }),
      invalidatesTags: ["Routes"],
    }),

    createRoute: builder.mutation<{ success: boolean; data: RouteDB }, CreateRouteForm>({
      query: (route) => ({
        url: "/routes/create",
        method: "POST",
        body: route,
      }),
      invalidatesTags: ["Routes"],
    }),

    deleteRoute: builder.mutation<{ success: boolean; data: boolean }, string>({
      query: (id) => ({
        url: `/routes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Routes"],
    }),
  }),
});

export const {
  useGetRoutesWithPopulatedDungeonQuery,
  useCreateRouteMutation,
  useDeleteRouteMutation,
  useUpdateRouteMutation,
} = routesApi;
