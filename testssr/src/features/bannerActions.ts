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

interface bannerParams {
  form: object;
}

export const getBanner = createAsyncThunk(
  "banner/getBanner",
  async (_, thunkAPI) => {
    try {
      const response = await axiosPrivate.get(`/api/banner`);
      // console.log(response);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const updateBannerAction = createAsyncThunk(
  "banner/updateBanner",
  async (params: bannerParams, thunkAPI) => {
    // console.log(params.id);
    try {
      const response = await axiosPrivate.put(`/api/banner`, params.form);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const deleteBannerAction = createAsyncThunk<object, object>(
  "banner/deleteBanner",
  async (banner, thunkAPI) => {
    try {
      const response = await axiosPrivate.delete(`/api/banner`, {
        data: banner,
      });
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
