import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL_WITH_AUTH } from "../../constants";

const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BASE_URL_WITH_AUTH,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export default baseQueryWithAuth;
