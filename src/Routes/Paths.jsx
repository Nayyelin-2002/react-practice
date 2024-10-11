import React from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "../Pages/Homepage";
import Movie from "../Pages/Movie";
import Cinema from "../Pages/Cinema";
import Scheduling from "../Pages/Scheduling";
import Seating from "../Pages/Seating";
import Checkout from "../Pages/Checkout";

const Paths = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Homepage />}>
          <Route index element={<Movie />} />
          <Route path="/cinema/:movieid" element={<Cinema />}>
            <Route
              path="/cinema/:movieid/scheduling/:cinemaid/:roomid"
              element={<Scheduling />}
            />
          </Route>
          <Route path="/seating/:roomid" element={<Seating />} />
          <Route path="/checkout" element={<Checkout />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Paths;
