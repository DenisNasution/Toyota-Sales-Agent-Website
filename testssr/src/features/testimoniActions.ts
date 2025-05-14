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

interface deleteParams {
  id: number;
  images: string;
}
interface uploadParams {
  form: object;
}

export const getTestimoni = createAsyncThunk(
  "testimoni/getTestimoni",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/api/testimoni`);
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const uploadTestimoniAction = createAsyncThunk(
  "testimoni/uploadTestimoni",
  async (params: uploadParams, thunkAPI) => {
    // console.log(params);
    try {
      const response = await axiosPrivate.post(`/api/testimoni`, params.form);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const updateTestimoniAction = createAsyncThunk(
  "testimoni/updateTestimoni",
  async (params: uploadParams, thunkAPI) => {
    // console.log(params);
    try {
      const response = await axiosPrivate.put(`/api/testimoni`, params.form);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteTestimoniAction = createAsyncThunk(
  "testimoni/deleteTestimoni",
  async (params: deleteParams, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(`/api/testimoni/`, {
        data: params,
      });
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
