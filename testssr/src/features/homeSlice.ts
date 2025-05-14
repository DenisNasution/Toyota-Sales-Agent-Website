import { createSlice } from "@reduxjs/toolkit";
import { homeAction } from "./homeActions";

interface vehicle {
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
  category_id: number;
  category_name: string;
  min_val2: string;
}
interface testimoni {
  testimoni_id: number;
  testimoni_text: string;
  testimoni_img: string;
}
interface banner {
  banner_id: number;
  banner_img: string;
}
interface home {
  testimoni: testimoni[];
  banner: banner[];
  vehicle: vehicle[];
}
interface initialStates {
  dataHome: home;
  loading: boolean;
  error: string | unknown;
  status: boolean;
  message: string;
  statusDelete: boolean;
}

const initialState: initialStates = {
  dataHome: {
    testimoni: [],
    banner: [],
    vehicle: [],
  },
  loading: true,
  error: "",
  status: false,
  message: "",
  statusDelete: false,
};

const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    resetStatus(state) {
      state.loading = false;
      state.status = false;
      state.message = "";
      state.statusDelete = false;
      // state.error =
    },
  },
  extraReducers(builder) {
    builder.addCase(homeAction.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(homeAction.fulfilled, (state, action) => {
      state.loading = false;
      state.dataHome = action.payload;
    });
    builder.addCase(homeAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export default homeSlice.reducer;
export const { resetStatus } = homeSlice.actions;
