import { createSlice } from "@reduxjs/toolkit";

import { AxiosError } from "axios";
import {
  checkAuth,
  checkUserAction,
  loginAction,
  logoutAction,
  registerAction,
} from "./userAction";

interface initialStates {
  // dataLogin: login;
  dataLogin: object;
  loading: boolean;
  errorMessage: string | unknown;
  status: number | undefined;
  message: string;
  statusDelete: boolean;
}

const initialState: initialStates = {
  dataLogin: {},
  loading: true,
  errorMessage: "",
  status: 0,
  message: "",
  statusDelete: false,
};

interface message {
  message: string;
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = 0;
      state.message = "";
      state.statusDelete = false;
      state.errorMessage = "";
      // state.error =
    },
  },
  extraReducers(builder) {
    builder.addCase(loginAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataLogin = action.payload.data;
      state.status = action.payload.status;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(registerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.message = action.payload.data.message;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(checkUserAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkUserAction.fulfilled, (state, action) => {
      state.loading = false;
      state.status = action.payload.status;
      state.message = action.payload.data.message;
    });
    builder.addCase(checkUserAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.dataLogin = action.payload.data;
      state.status = action.payload.status;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      // state.login = false
      state.dataLogin = {};
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(logoutAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(logoutAction.fulfilled, (state) => {
      state.loading = false;
      state.dataLogin = {};
      state.status = 0;
    });
    builder.addCase(logoutAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.dataLogin = {};
      state.message = messg.message;
      // state.status = err.response && err.response?.status;
      state.status = 0;
    });
  },
});

export default userSlice.reducer;
export const { resetStatus } = userSlice.actions;
