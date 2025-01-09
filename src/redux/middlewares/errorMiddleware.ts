// import { Alert } from 'react-native';
import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import { redirect } from "react-router-dom";
import NAV_LINK from "../../constants/navLinks";

export const rtkQueryErrorLogger: Middleware =
  () => (next) => async (action) => {
    if (isRejectedWithValue(action)) {
      if (action?.payload?.status === 403) {
        redirect(NAV_LINK.LOGIN);
      }
    }

    return next(action);
  };
