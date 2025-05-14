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

interface params {
  id: number;
  banner: string;
  image: string;
}

export const getVehicle = createAsyncThunk(
  "vehicle/getVehicle",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/api/vehicle`);
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getVehicleIdAction = createAsyncThunk(
  "subVehicle/getSubVehicleId",
  async (id: string, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/api/vehicle/${id}`);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const getCategoryAction = createAsyncThunk(
  "vehicle/getCategory",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/api/vehicle/category`);
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deleteVehicle = createAsyncThunk<object, params>(
  "vehicle/deleteVehicle",
  async (params, thunkAPI) => {
    // console.log(params);
    try {
      const response = await axiosPrivate.delete(`/api/vehicle/${params.id}`, {
        data: params,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const uploadVehicleAction = createAsyncThunk<object, object>(
  "vehicle/uploadVehicle",
  async (params, thunkAPI) => {
    // console.log(params);
    try {
      const response = await axiosPrivate.post(
        `/api/vehicle/addvehicle`,
        params
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
interface updateParams {
  id: string;
  form: object;
}
export const updateVehicleAction = createAsyncThunk(
  "vehicle/updateVehicle",
  async (params: updateParams, thunkAPI) => {
    // console.log(params.id);
    try {
      const response = await axiosPrivate.put(
        `/api/vehicle/${params.id}/vehicle`,
        params.form
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
