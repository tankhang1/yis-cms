import type { Middleware } from "@reduxjs/toolkit";
import { isRejectedWithValue } from "@reduxjs/toolkit";
import NAV_LINK from "../../constants/navLinks";
import { store } from "../store";
import { resetAppInfo } from "../slices/appSlices";

export const rtkQueryErrorLogger: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    console.log("payload", action?.payload);
    //@ts-expect-error no check
    if (action?.payload?.status === 403) {
      store.dispatch(resetAppInfo());
      window.location.href = NAV_LINK.LOGIN;
    }
  }

  return next(action);
};
