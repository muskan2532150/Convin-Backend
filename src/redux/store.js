import { configureStore } from "@reduxjs/toolkit";
import CarSliceReducer from "./CarSlice";

const store = configureStore({
  reducer: {
    car: CarSliceReducer,
  },
});

export default store;
