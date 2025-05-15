import { createSlice } from "@reduxjs/toolkit";
import {
  deleteBannerAction,
  getBanner,
  updateBannerAction,
} from "./bannerActions";
import { AxiosError, AxiosResponse } from "axios";

interface banner {
  banner_id: number;
  banner_img: string;
}
interface initialStates {
  dataBanner: banner[];
  loading: boolean;
  error: string | unknown;
  status: number | undefined;
  message: string;
  statusDelete: boolean;
  errorMessage: string;
}

const initialState: initialStates = {
  dataBanner: [],
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

const bannerSlice = createSlice({
  name: "banner",
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
    builder.addCase(getBanner.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getBanner.fulfilled, (state, action) => {
      state.loading = false;
      state.dataBanner = action.payload.data;
    });
    builder.addCase(getBanner.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.errorMessage = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(deleteBannerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteBannerAction.fulfilled, (state, action) => {
      state.loading = false;
      const datas = action.payload as AxiosResponse;
      state.message = datas.data.message;
      state.status = datas && datas.status;
    });
    builder.addCase(deleteBannerAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(updateBannerAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateBannerAction.fulfilled, (state, action) => {
      state.loading = false;
      // (state.status = action.payload.status);
      state.message = action.payload.data.message;
      state.status = action.payload.status;
    });
    builder.addCase(updateBannerAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
  },
});

export default bannerSlice.reducer;
export const { resetStatus } = bannerSlice.actions;
