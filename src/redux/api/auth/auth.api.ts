import { createApi } from "@reduxjs/toolkit/query/react";
import { TAuthRES } from "./auth.response";
import { TAuthREQ, TIqrConfirREQ } from "./auth.request";
import { TIqrUpdateREQ } from "../iqr/iqr.request";
import { TAGS } from "../../../constants";
import baseQueryWithAuth from "../../middlewares/baseQueryWithAuth";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithAuth,
  tagTypes: [TAGS.IQR],

  endpoints: (builder) => ({
    login: builder.mutation<TAuthRES, TAuthREQ>({
      query: (body) => ({
        url: `/login`,
        method: "POST",
        body,
      }),
    }),
    confirmIqr: builder.mutation<{ status: number }, TIqrConfirREQ>({
      query: (body) => ({
        url: "/portal/transaction/confirm",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAGS.IQR],
    }),
    rejectIqr: builder.mutation<{ status: number }, TIqrConfirREQ>({
      query: (body) => ({
        url: "/portal/transaction/reject",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAGS.IQR],
    }),
    updateIqr: builder.mutation<{ status: number }, TIqrUpdateREQ>({
      query: (body) => ({
        url: "/portal/transaction/update",
        method: "POST",
        body,
      }),
      invalidatesTags: [TAGS.IQR],
    }),
  }),
});
export const {
  useLoginMutation,
  useConfirmIqrMutation,
  useRejectIqrMutation,
  useUpdateIqrMutation,
} = authApi;
