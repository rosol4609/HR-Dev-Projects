import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseApi";

export interface Message {
  id: number;
  content: string;
}

export const messageApi = createApi({
  reducerPath: "messageApi",
  baseQuery,
  tagTypes: ["Messages"],
  endpoints: (builder) => ({
    getMessages: builder.query<Message[], void>({
      query: () => `/messages`,
      providesTags: ["Messages"],
    }),
    addMessage: builder.mutation<Message, Partial<Message>>({
      query: (message) => ({
        url: "/messages",
        method: "POST",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
    editMessage: builder.mutation<Message, { id: number; content: string }>({
      query: ({ id, ...message }) => ({
        url: `/messages/${id}`,
        method: "PUT",
        body: message,
      }),
      invalidatesTags: ["Messages"],
    }),
    deleteMessage: builder.mutation<void, number>({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Messages"],
    }),
  }),
});

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
  useEditMessageMutation,
  useDeleteMessageMutation,
} = messageApi;
