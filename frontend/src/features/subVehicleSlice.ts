import { createSlice } from "@reduxjs/toolkit";
import {
  deleteSubVehicleAction,
  getSubVehicleAction,
  updateSubVehicleAction,
  uploadSubVehicleAction,
} from "./subVehicleActions";
import { AxiosError } from "axios";

interface subVehicle {
  subVehicle_id: number;
  subVehicle_name: string;
  subVehicle_price: string;
  subVehicle_idVehicle: number;
  subVehicle_idCategory: number;
  vehicle_id: number;
  vehicle_name: string;
  vehicle_idCategory: number;
  vehicle_banner: string;
  vehicle_img: string;
}
interface vehicle {
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  vehicleBanner: string;
  vehicle: subVehicle[];
}
interface initialStates {
  dataSubVehicle: vehicle;
  loading: boolean;
  errorMessage: string | unknown;
  status?: number;
  statusError: number | undefined;
  message: string;
  statusDelete: boolean;
}

const initialState: initialStates = {
  dataSubVehicle: {
    vehicleId: "",
    vehicleName: "",
    vehicleImage: "",
    vehicleBanner: "",
    vehicle: [],
  },
  loading: true,
  errorMessage: "",
  status: 0,
  statusError: undefined,
  message: "",
  statusDelete: false,
};

interface message {
  message: string;
}

const subVehicleSlice = createSlice({
  name: "subVehicle",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = 0;
      state.statusError = undefined;
      state.message = "";
      state.statusDelete = false;
      state.errorMessage = "";
      // state.error =
    },
    reset: () => initialState,
  },
  extraReducers(builder) {
    builder.addCase(getSubVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getSubVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataSubVehicle = action.payload.data;
    });
    builder.addCase(getSubVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(deleteSubVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteSubVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      const datas = action.payload;
      state.message = action.payload.data.message;
      // console.log(state.message);
      state.status = datas && datas.status;
    });
    builder.addCase(deleteSubVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.errorMessage = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(uploadSubVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadSubVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      // console.log(action.payload.status);
      // const datas = action.payload as AxiosResponse;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      // console.log(state.status);
    });
    builder.addCase(uploadSubVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.errorMessage = messg.message;
      state.status = err.response && err.response?.status;
    });
    builder.addCase(updateSubVehicleAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateSubVehicleAction.fulfilled, (state, action) => {
      state.loading = false;
      // const datas = action.payload as AxiosResponse;
      state.message = action.payload.data.message;
      state.status = action.payload.status;
      // console.log(state.status);
    });
    builder.addCase(updateSubVehicleAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.errorMessage = messg.message;
      state.status = err.response && err.response?.status;
    });
  },
});

export default subVehicleSlice.reducer;
export const { resetStatus, reset } = subVehicleSlice.actions;
