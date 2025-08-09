import { resetAuth, setAppLoading, setCredentials } from "../slices/auth.slice";
import { apiSlice } from "./config/apiSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { success: boolean; accessToken: string },
      { username: string; password: string; rememberMe: boolean }
    >({
      query: (credentials) => ({
        url: "auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;
          dispatch(setCredentials(result.data));
        } catch (error) {
          console.log("Error during queryFulfilled:", error);
        }
      },
    }),

    refreshAccessToken: builder.mutation<{ success: boolean; accessToken: string }, void>({
      query: () => ({
        url: "auth/refresh-access-token",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const result = await queryFulfilled;

          dispatch(setCredentials(result.data));
        } catch (error) {
          console.log("Error during queryFulfilled:", error);
        } finally {
          dispatch(setAppLoading(false));
        }
      },
    }),

    logOut: builder.mutation<void, void>({
      query: () => ({
        url: "auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        console.log("Starting logout");
        try {
          await new Promise((resolve) => setTimeout(resolve, 300));
          console.log("Logout fulfilled");
        } catch (error) {
          console.log("Error during logout:", error);
        } finally {
          dispatch(resetAuth());
          dispatch(apiSlice.util.resetApiState());
        }
      },
    }),
  }),
});

export const { useLoginMutation, useLogOutMutation, useRefreshAccessTokenMutation } = authApiSlice;
