import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  bookingData: [],
};

export const CarThunk = createAsyncThunk("CarThunk", async () => {
  const Cardata = await (await fetch("api.json")).json();
  return Cardata;
});

export const CarSlice = createSlice({
  name: "Car",
  initialState,
  reducers: {
    updateBookingData: (state, action) => {
      state.bookingData = [...state.bookingData, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(CarThunk.fulfilled, (state, action) => {
      state.data = [...action.payload];
    });
  },
});

export const { updateBookingData } = CarSlice.actions;

export default CarSlice.reducer;
