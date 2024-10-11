import { createSlice } from "@reduxjs/toolkit";

const datainitailstate = {
  movie: null,
  cinema: null,
  room: null,
  showdate: null,
  showTime: null,
  seat: [],
  totalseatprice: null,
};

export const dataSlice = createSlice({
  name: "data",
  initialState: datainitailstate,
  reducers: {
    addMovie: (state, action) => {
      state.movie = action.payload.movie;
    },
    addCinema: (state, action) => {
      state.cinema = action.payload.cinema;
    },
    addRoom: (state, action) => {
      state.room = action.payload.room;
    },
    addShowdate: (state, action) => {
      state.showdate = action.payload.showdate;
    },
    addShowtime: (state, action) => {
      state.showTime = action.payload.showTime;
    },
    addSeat: (state, action) => {
      state.seat = action.payload.seat;
    },
    addSeatprice: (state, action) => {
      state.totalseatprice = action.payload.totalseatprice;
    },
    clearData: (state) => {
      return {
        ...state,
        movie: "",
        cinema: "",
        room: "",
        showdate: "",
        showTime: "",
        seat: [],
        seatprice: 0,
      };
    },
  },
});

export const {
  addCinema,
  addMovie,
  addRoom,
  addSeat,
  addShowdate,
  addSeatprice,
  addShowtime,
  clearData,
} = dataSlice.actions;

export default dataSlice.reducer;
