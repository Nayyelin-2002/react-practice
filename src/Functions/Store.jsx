import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "./dataSlice";
import filteredmovieReducer from "./filterdataSlice";
export const store = configureStore({
  reducer: {
    dataReducer: dataReducer,
    filtermovie: filteredmovieReducer,
  },
});
