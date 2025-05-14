import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
const axiosPrivate = axios.create({
  baseURL: process.env.REACT_APP_LINK as string,
  headers: {
    Accept: "application/json",
    // "Content-Type": "multipart/form-data",
  },
  withCredentials: true,
});
interface uploadParams {
  tipe: string;
  harga: string;
  carId: string;
}
interface updateParams extends uploadParams {
  id: string;
}
export const getSubVehicleAction = createAsyncThunk(
  "subVehicle/getSubVehicle",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(
        `/api/vehicle/${id}/vehicle/vehicletype`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadSubVehicleAction = createAsyncThunk(
  "subVehicle/uploadSubVehicle",
  async (params: uploadParams, thunkAPI) => {
    try {
      const response = await axiosPrivate.post(`/api/vehicle/addvehicletype`, {
        subVehicle_price: params.harga,
        subVehicle_idVehicle: params.carId,
        subVehicle_name: params.tipe,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateSubVehicleAction = createAsyncThunk(
  "subVehicle/updateSubVehicle",
  async (params: updateParams, thunkAPI) => {
    try {
      const response = await axiosPrivate.put(
        `/api/vehicle/${params.id}/vehicletype`,
        {
          subVehicle_price: params.harga,
          subVehicle_idVehicle: params.carId,
          subVehicle_name: params.tipe,
        }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteSubVehicleAction = createAsyncThunk(
  "subVehicle/deleteSubVehicle",
  async (id: number, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(
        `/api/vehicle/${id}/vehicleType`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
