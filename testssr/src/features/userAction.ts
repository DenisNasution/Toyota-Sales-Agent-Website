import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// const axiosPrivate = axios.create({
//   baseURL: process.env.REACT_APP_LINK as string,
//   headers: {
//     Accept: "application/json",
//     "Content-Type": "multipart/form-data",
//   },
//   withCredentials: true,
// });

interface userParams {
  token: string;
}
export const loginAction = createAsyncThunk(
  "user/login",
  async (params: userParams, thunkAPI) => {
    // console.log(params.token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LINK as string}/api/user/google-login`,
        {
          jwt: params.token,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const logoutAction = createAsyncThunk(
  "user/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LINK as string}/api/user/signout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const registerAction = createAsyncThunk(
  "user/register",
  async (params: userParams, thunkAPI) => {
    // console.log(params.token);
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_LINK as string}/api/user/register`,
        {
          jwt: params.token,
        },
        { withCredentials: true }
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
export const checkUserAction = createAsyncThunk(
  "user/checkUser",
  async (_, thunkAPI) => {
    // console.log(params.token);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LINK as string}/api/user/checkUser`
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const checkAuth = createAsyncThunk(
  "user/checkAuth",
  async (_, thunkApi) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_LINK as string}/api/user/checkAuth`,
        {
          withCredentials: true,
        }
      );
      return response;
    } catch (error) {
      // console.clear()
      return thunkApi.rejectWithValue(error);
    }
  }
);
