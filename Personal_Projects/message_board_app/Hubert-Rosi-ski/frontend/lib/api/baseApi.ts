import { fetchBaseQuery } from "@reduxjs/toolkit/query";

export const baseQuery = fetchBaseQuery({
    baseUrl: "http://localhost:8080",
    credentials: "include", // Include cookies with each request
});