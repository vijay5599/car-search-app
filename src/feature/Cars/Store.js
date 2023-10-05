import { configureStore } from "@reduxjs/toolkit";

import carReducer from "../CarsSlice";

export const store = configureStore({
  reducer: { 
    car: carReducer,
  },
});
