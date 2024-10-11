import { createSlice } from "@reduxjs/toolkit";
import { useState } from "react";

const filterinitialstate = {
  filteredMovie: null,
};
// const [filteredmovie, setFilteredmovie] = useState();
export const filterdataSlice = createSlice({
  name: "filterdata",
  initialState: filterinitialstate,
  reducers: {
    addfilteredmovie: (state, action) => {
      state.filteredMovie = action.payload.filteredMovie;
    },
  },
});

export const { addfilteredmovie } = filterdataSlice.actions;

export default filterdataSlice.reducer;
