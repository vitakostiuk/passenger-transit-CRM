import { createSlice } from '@reduxjs/toolkit';
import { createTrip } from './tripsOperations';

const initialState = {
  trip: null,
  loading: false,
  error: null,
};

const tripsSlice = createSlice({
  name: 'trips',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // REDUCER FOR CREATE TRIP
      .addCase(createTrip.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTrip.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.trip = payload;
      })
      .addCase(createTrip.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});

export default tripsSlice.reducer;
