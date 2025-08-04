import { apiSlice } from "@/redux/api/config/apiSlice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  // Add other reducers here
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignorer les actions qui contiennent des propriétés non-sérialisables
        ignoredActions: ["persist/PERSIST"],
      },
    }).concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
// Optionnel : setupListeners pour activer les options de refetchOnFocus et refetchOnReconnect
setupListeners(store.dispatch);

// Infer the type of makeStore
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
