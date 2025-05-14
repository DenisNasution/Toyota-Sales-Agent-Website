import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// interface homes {
//   testimoni: [];
//   banner: [];
//   vehicle: [];
// }
// const home: homes = {
//   banner: [],
//   vehicle: [],
//   testimoni: [],
// };

export const homeAction = createAsyncThunk(
  "home/getHome",
  async (_, thunkAPI) => {
    try {
      // console.log(process.env.REACT_APP_LINK as string);
      const response = await axios.get(
        `${process.env.REACT_APP_LINK as string}/api/home`
      );
      // console.log(response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);
