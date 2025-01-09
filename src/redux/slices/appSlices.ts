import { createSlice, PayloadAction } from "@reduxjs/toolkit";
type TApp = {
  token: string;
  username: string;
  roles: string;
};
const initalValues: TApp = {
  token: "",
  username: "",
  roles: "",
};
const appSlice = createSlice({
  name: "appSlice",
  initialState: initalValues,
  reducers: {
    updateAppInfo: (state, action: PayloadAction<TApp>) => {
      state.token = action.payload.token;
      state.username = action.payload.username;
      state.roles = action.payload.roles;
    },
    resetAppInfo: () => {
      return initalValues;
    },
  },
});
export const { updateAppInfo, resetAppInfo } = appSlice.actions;
export default appSlice.reducer;
