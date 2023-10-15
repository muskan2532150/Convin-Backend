import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
};

export const CarThunk = createAsyncThunk("CarThunk", async () => {
  const Cardata = await (await fetch("api.json")).json();
  return Cardata;
});

export const CarSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    Booking: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CarThunk.fulfilled, (state, action) => {
      return { data: [...action.payload] };
    });
  },
});

export const { Booking } = CarSlice.actions;

export default CarSlice.reducer;
