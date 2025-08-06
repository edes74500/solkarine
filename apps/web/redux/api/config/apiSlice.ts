import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQueryWithReauth";

export const apiSlice = createApi({
  reducerPath: "apiSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({
    // You can define some common endpoints here if needed
  }),
  tagTypes: ["Dungeons", "WeakAuras", "Addons", "Elvui"],
});
