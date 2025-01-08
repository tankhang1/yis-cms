import { createApi } from "@reduxjs/toolkit/query/react";
import { TDashboardRES } from "./dashboard.response";
import { TDashboardREQ } from "./dashboard.request";
import baseQuery from "../../middlewares/baseQuery";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getDashboardStatistic: builder.query<TDashboardRES[], TDashboardREQ>({
      query: (params) => ({
        url: "/api/report/dashboard",
        method: "GET",
        params,
      }),
    }),
  }),
});
export const { useGetDashboardStatisticQuery } = dashboardApi;
