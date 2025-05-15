import { createSlice } from "@reduxjs/toolkit";
import {
  deleteVehicle,
  getCategoryAction,
  getVehicle,
  getVehicleIdAction,
  updateVehicleAction,
  uploadVehicleAction,
} from "./vehicleActions";
import { AxiosError, AxiosResponse } from "axios";

interface vehicle {
  vehicle_id: number;
  vehicle_name: string;
  vehicle_idCategory: number;
  vehicle_banner: string;
  vehicle_img: string;
  category_id: number;
  category_name: string;
}
interface category {
  category_id: number;
  category_name: string;
}
interface initialStates {
  dataVehicle: vehicle[];
  loading: boolean;
  error: string;
  status: number | undefined;
  message: string;
  statusDelete: number | null;
  category: category[];
}

const initialState: initialStates = {
  dataVehicle: [],
  category: [],
  loading: true,
  error: "",
  status: 0,
  message: "",
  statusDelete: null,
};
interface message {
  message: string;
}

const vehicleSlice = createSlice({
  name: "vehicle",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = 0;
      state.message = "";
      state.statusDelete = null;
      // state.error =
    },
  },
  extraReducers(builder) {
    builder.addCase(getVehicle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVehicle.fulfilled, (state, action) => {
      state.loading = false;
      state.dataVehicle = action.payload.data;
      // console.log(action.payload.status);
    });
    builder.addCase(getVehicle.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(getVehicleIdAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getVehicleIdAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataVehicle = action.payload.data;
      // console.log(action.payload.status);
    });
    builder.addCase(getVehicleIdAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(getCategoryAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getCategoryAction.fulfilled, (state, action) => {
      state.loading = false;
      state.category = action.payload.data;
      // console.log(action.payload.status);
    });
    builder.addCase(getCategoryAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(deleteVehicle.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteVehicle.fulfilled, (state, action) => {
      state.loading = false;
      const datas = action.payload as AxiosResponse;
      state.message = datas.data.message;
      // console.log(action.payload);
      // console.log(state.message);
      state.status = datas && datas.status;
    });
    builder.addCase(deleteVehicle.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(uploadVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      // (state.status = action.payload.status);
      const datas = action.payload as AxiosResponse;
      state.message = datas.data.message;
      state.status = datas && datas.status;
    });
    builder.addCase(uploadVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(updateVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      // (state.status = action.payload.status);
      const datas = action.payload as AxiosResponse;
      state.message = datas.data.message;
      state.status = datas && datas.status;
    });
    builder.addCase(updateVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
  },
});

export default vehicleSlice.reducer;
export const { resetStatus } = vehicleSlice.actions;
