import { createApi } from "@reduxjs/toolkit/query/react";
import { TTopupRES } from "./topup.response";
import { TTopupRangeTimeREQ } from "./topup.request";
import { TAGS } from "../../../constants";
import baseQuery from "../../middlewares/baseQuery";

export const topupApi = createApi({
  reducerPath: "topupApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.TOPUP],
  endpoints: (builder) => ({
    topupToday: builder.query<TTopupRES[], void>({
      query: () => ({
        url: `/api/report/topup/today`,
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.TOPUP,
                id,
              })),
              TAGS.TOPUP,
            ]
          : [TAGS.TOPUP],
    }),
    topupRangeDate: builder.query<TTopupRES[], Partial<TTopupRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/topup`,
        method: "GET",
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.TOPUP,
                id,
              })),
              TAGS.TOPUP,
            ]
          : [TAGS.TOPUP],
    }),
    topupCounter: builder.query<number, Partial<TTopupRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/topup/counter`,
        method: "GET",
        params,
      }),
    }),
  }),
});
export const {
  useTopupTodayQuery,
  useTopupCounterQuery,
  useTopupRangeDateQuery,
} = topupApi;
