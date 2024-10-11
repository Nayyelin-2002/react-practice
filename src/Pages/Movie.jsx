import React from "react";
import Moviedisplay from "../Components/Movie/Moviedisplay";
import Navbar from "../Components/Navbar/Navbar";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
const Movie = () => {
  const { filtermovie } = useSelector((state) => state);

  if (!filtermovie.filteredMovie || filtermovie.filteredMovie.length === 0) {
    return <div>No movies found.</div>;
  }
  //   console.log(filtermovie.filteredMovie);
  return (
    <div className="card">
      {" "}
      {filtermovie.filteredMovie.map((moviefilter, index) => {
        return (
          <motion.div
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: index * 0.2 },
            }}
          >
            <Moviedisplay key={index} moviefilter={moviefilter} />{" "}
          </motion.div>
        );
      })}
    </div>
  );
};

export default Movie;
