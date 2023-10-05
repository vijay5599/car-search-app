import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchAllCars, fetchCarById, fetchCarsByFilters } from "./CarsAPI";

const initialState = {
  cars: [],
  allCars: [],
  pageNum: 1,
  status: "idle",
  totalCars: 0,
  selectedCar: null,
};

export const fetchAllCarsAsync = createAsyncThunk(
  "car/fetchAllCars",
  async () => {
    const response = await fetchAllCars();
    return response.data;
  }
);

export const fetchCarsByFiltersAsync = createAsyncThunk(
  "car/fetchCarsByFilters",
  async ({ pagination }) => {
    const response = await fetchCarsByFilters(pagination);
    return response.data;
  }
);

export const CarSlice = createSlice({
  name: "car",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedCar = null;
    },
    updatePage: (state, action) => {
      state.pageNum = action.payload;
    },
    updateCars: (state, action) => {
      state.allCars = state.cars;
      state.cars = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCarsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllCarsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cars = action.payload;
      })
      .addCase(fetchCarsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCarsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.cars = action.payload.cars;
        state.totalCars = action.payload.totalCars;
      });
  },
});

export const selectAllCars = (state) => state.car.cars;
export const selectCars = (state) => state.car.allCars;
export const selectTotalCars = (state) => state.car.totalCars;
export const selectCarById = (state) => state.car.selectedCar;
export const pageNum = (state) => state.car.pageNum;
export const { clearSelectedProduct, updatePage, updateCars } =
  CarSlice.actions;
export default CarSlice.reducer;
