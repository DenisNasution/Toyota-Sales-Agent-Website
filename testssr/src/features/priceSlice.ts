import { createSlice } from "@reduxjs/toolkit";
import { getPriceAction } from "./priceActions";
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
interface price {
  vehicleName: string;
  vehicleImage: string;
  vehicleBanner: string;
  vehicle: subVehicle[];
}
interface initialStates {
  dataPrice: price;
  loading: boolean;
  error: string | unknown;
  status: number | undefined;
  message: string;
  statusDelete: boolean;
}

const initialState: initialStates = {
  dataPrice: {
    vehicleName: "",
    vehicleImage: "",
    vehicleBanner: "",
    vehicle: [],
  },
  loading: true,
  error: "",
  status: 0,
  message: "",
  statusDelete: false,
};
interface message {
  message: string;
}

const priceSlice = createSlice({
  name: "price",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = 0;
      state.message = "";
      state.statusDelete = false;
      // state.error =
    },
  },
  extraReducers(builder) {
    builder.addCase(getPriceAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getPriceAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataPrice = action.payload.data;
      // console.log(state.dataPrice);
    });
    builder.addCase(getPriceAction.rejected, (state, action) => {
      state.loading = false;
      const err = action.payload as AxiosError;
      const messg = err.response?.data as message;
      state.message = messg.message;
      state.status = err.response && err.response?.status;
    });
  },
});

export default priceSlice.reducer;
export const { resetStatus } = priceSlice.actions;
