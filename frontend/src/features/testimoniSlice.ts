import { createSlice } from "@reduxjs/toolkit";
import {
  deleteTestimoniAction,
  getTestimoni,
  updateTestimoniAction,
  uploadTestimoniAction,
} from "./testimoniActions";
import { AxiosError, AxiosResponse } from "axios";

interface testimoni {
  testimoni_id: number;
  testimoni_text: string;
  testimoni_img: string;
}
interface initialStates {
  dataTestimoni: testimoni[];
  loading: boolean;
  error: string | unknown;
  status: number | undefined;
  message: string;
  errorMessage: string;
  statusDelete: boolean;
}

const initialState: initialStates = {
  dataTestimoni: [],
  loading: true,
  error: "",
  status: 0,
  message: "",
  errorMessage: "",
  statusDelete: false,
};
interface message {
  message: string;
}

const testimoniSlice = createSlice({
  name: "testimoni",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = 0;
      state.message = "";
      state.errorMessage = "";
      state.statusDelete = false;
      // state.error =
    },
  },
  extraReducers(builder) {
    builder.addCase(getTestimoni.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTestimoni.fulfilled, (state, action) => {
      state.loading = false;
      state.dataTestimoni = action.payload.data;
    });
    builder.addCase(getTestimoni.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(uploadTestimoniAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadTestimoniAction.fulfilled, (state, action) => {
      state.loading = false;
      // (state.status = action.payload.status);
      // const datas = action.payload as AxiosResponse;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
    });
    builder.addCase(uploadTestimoniAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(updateTestimoniAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTestimoniAction.fulfilled, (state, action) => {
      state.loading = false;
      // (state.status = action.payload.status);
      // const datas = action.payload as AxiosResponse;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
    });
    builder.addCase(updateTestimoniAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(deleteTestimoniAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTestimoniAction.fulfilled, (state, action) => {
      state.loading = false;
      const datas = action.payload as AxiosResponse;
      state.message = datas.data.message;
      state.status = datas && datas.status;
    });
    builder.addCase(deleteTestimoniAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
  },
});

export default testimoniSlice.reducer;
export const { resetStatus } = testimoniSlice.actions;
