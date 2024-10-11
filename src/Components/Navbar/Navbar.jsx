import React, { useEffect, useState } from "react";
import Datafetching from "../../Data/Datafetching";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addfilteredmovie } from "../../Functions/filterdataSlice";
import "./Navbar.css";
const Navbar = () => {
  const [filterData, setFilterData] = useState("");
  const movieData = Datafetching("Tbl_MovieList");
  const dispatch = useDispatch();

  //   console.log(divHover);

  const moviePath = [
    "https://sportshub.cbsistatic.com/i/2023/07/06/928234b4-1059-4965-8dfd-adfdbdae0864/the-nun-ii-2-poster.jpg?auto=webp&width=1200&height=1500&crop=0.8:1,smart",
    "https://i.redd.it/mo8q8wopu3711.jpg",
    "https://m.media-amazon.com/images/I/91RepypuCTL.jpg",
    "https://m.media-amazon.com/images/I/81QBPvhaWVL._AC_UF894,1000_QL80_.jpg",
    "https://m.media-amazon.com/images/M/MV5BNWZhZjUxZGUtMzM1OC00MjdmLWIzZjUtZTUzODc2ZTI2YzQzXkEyXkFqcGdeQXVyMDc5ODIzMw@@._V1_FMjpg_UX1000_.jpg",
    "https://www.themoviedb.org/t/p/original/u5kboZR4OMi4QdbOhawCZuzMVWJ.jpg",
    "https://m.media-amazon.com/images/M/MV5BMzI0NmVkMjEtYmY4MS00ZDMxLTlkZmEtMzU4MDQxYTMzMjU2XkEyXkFqcGdeQXVyMzQ0MzA0NTM@._V1_FMjpg_UX1000_.jpg",
    "https://www.ecranlarge.com/media/cache/160x213/uploads/image/001/495/1qsbnxlvcfi7kuwxyu7bxjsrajp-538.jpg",
    "https://www.themoviedb.org/t/p/original/fiVW06jE7z9YnO4trhaMEdclSiC.jpg",
    "https://i.etsystatic.com/27062086/r/il/57b1ec/4371998749/il_fullxfull.4371998749_apux.jpg",
  ];
  const updatedMovieLists = movieData?.map((md, index) => ({
    ...md,
    moviePath: moviePath[index % moviePath.length], // Use modulus operator to cycle through colorCodes
  }));
  // console.log(updatedMovieLists);
  useEffect(() => {
    const search = updatedMovieLists
      ? updatedMovieLists.filter((md) => {
          if (md !== undefined && md !== null) {
            if (md.MovieTitle !== null && md.MovieTitle !== undefined) {
              const lowercase = md.MovieTitle.toLowerCase();
              return lowercase.includes(filterData);
            }
          }
        })
      : [];
    if (search) {
      dispatch(addfilteredmovie({ filteredMovie: search }));
    }
  }, [filterData, dispatch, updatedMovieLists]);

  return (
    <div className="nav">
      <div>
        <Link to={"/"}>
          {" "}
          <h4>
            Movie <span className="x">X </span>
            Ticket-Sales
          </h4>
        </Link>
      </div>
      <div>
        <input
          className="search"
          type="text"
          placeholder="search"
          value={filterData}
          onChange={(e) => setFilterData(e.target.value)}
        />
      </div>
    </div>
  );
};

export default Navbar;
//
