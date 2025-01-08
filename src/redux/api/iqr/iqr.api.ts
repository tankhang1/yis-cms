import { createApi } from "@reduxjs/toolkit/query/react";
import { TIqrExportRES, TIqrRES, TProvince } from "./iqr.response";
import { TIqrRangeTimeREQ } from "./iqr.request";
import baseQuery from "../../middlewares/baseQuery";
import { TAGS } from "../../../constants";

export const iqrApi = createApi({
  reducerPath: "iqrApi",
  baseQuery: baseQuery,
  tagTypes: [TAGS.IQR],
  endpoints: (builder) => ({
    iqrToday: builder.query<TIqrRES[], Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/today`,
        method: "GET",
        params,
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
    iqrCounterToday: builder.query<number, Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/today/counter`,
        method: "GET",
        params,
      }),
    }),
    iqrRangeDate: builder.query<TIqrRES[], Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr`,
        method: "GET",
        params,
      }),

      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
    iqrCounter: builder.query<number, Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/counter`,
        method: "GET",
        params: {
          ...params,
          gateway: 2,
        },
      }),
    }),
    iqrSearch: builder.query<TIqrRES[], Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/search`,
        method: "GET",
        params,
      }),

      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
    iqrSearchCounter: builder.query<number, Partial<TIqrRangeTimeREQ>>({
      query: (params) => ({
        url: `/api/report/iqr/search/counter`,
        method: "GET",
        params: {
          ...params,
          gateway: 2,
        },
      }),
    }),
    exportIqrData: builder.mutation<TIqrExportRES, Partial<TIqrRangeTimeREQ>>({
      query: (body) => ({
        url: `/api/report/iqr/excel`,
        method: "POST",
        body,
      }),
    }),
    exportIqrNoneData: builder.mutation<
      TIqrExportRES,
      Partial<TIqrRangeTimeREQ>
    >({
      query: (body) => ({
        url: `/api/report/iqr-none/excel`,
        method: "POST",
        body,
      }),
    }),
    getProvinces: builder.query<TProvince[], void>({
      query: () => ({
        url: `/api/report/province`,
        method: "GET",
      }),
      providesTags: (results) =>
        results
          ? [
              ...results.map(({ id }) => ({
                type: TAGS.IQR,
                id,
              })),
              TAGS.IQR,
            ]
          : [TAGS.IQR],
    }),
  }),
});
export const {
  useGetProvincesQuery,
  useIqrSearchCounterQuery,
  useIqrSearchQuery,
  useIqrCounterTodayQuery,
  useIqrTodayQuery,
  useIqrRangeDateQuery,
  useExportIqrDataMutation,
  useIqrCounterQuery,
  useExportIqrNoneDataMutation,
} = iqrApi;
