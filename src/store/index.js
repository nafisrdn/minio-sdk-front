import { configureStore } from "@reduxjs/toolkit";
import MinIOSlice from "./MinIOSlice";

const Store = configureStore({
  reducer: {
    minIO: MinIOSlice.reducer,
  },
});

export default Store;
