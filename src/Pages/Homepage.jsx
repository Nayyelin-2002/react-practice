import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import { Outlet } from "react-router-dom";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Homepage;
