import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  error: null,
};

const MinIOSlice = createSlice({
  name: "minio",
  initialState: initialState,
  reducers: {
    setError(state, action) {
      const { data, status } = action.payload;
      state.error = { data, status };
    },
  },
});

export const MinIOActions = MinIOSlice.actions;

export default MinIOSlice;
