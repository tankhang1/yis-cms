// import { Alert } from 'react-native';
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === 403) {
        redirect("/auth/signin/basic");
      }
    }

    return next(action);
  };
