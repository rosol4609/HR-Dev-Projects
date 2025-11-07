"use client";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { messageApi } from "@/lib/api/messageApi";
import { authApi } from "@/lib/api/authApi";

// Create the Redux store
const store = configureStore({
  reducer: {
    //Add the messageApi reducer to the store
    [messageApi.reducerPath]: messageApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    //Add the messageApi middleware to the default middleware
    getDefaultMiddleware().concat(messageApi.middleware, authApi.middleware),
});

//Enable listeners for refetching data 
setupListeners(store.dispatch);

// Define types for RootState and AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;