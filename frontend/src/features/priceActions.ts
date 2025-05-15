import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface subVehicle {
//   subVehicle_id: number;
//   subVehicle_name: string;
//   subVehicle_price: string;
//   subVehicle_idVehicle: number;
//   subVehicle_idCategory: number;
//   vehicle_id: number;
//   vehicle_name: string;
//   vehicle_idCategory: number;
//   vehicle_banner: string;
//   vehicle_img: string;
// }
// interface price {
//   vehicleName: string;
//   vehicle: subVehicle[];
// }
export const getPriceAction = createAsyncThunk(
  "price/getPrice",
  async (id: string, thunkAPI) => {
    try {
      const response = await axios.get(
        `${
          process.env.REACT_APP_LINK as string
        }/api/vehicle/${id}/vehicle/vehicletype`
      );
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
