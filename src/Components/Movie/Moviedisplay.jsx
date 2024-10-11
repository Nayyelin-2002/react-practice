import React, { useState } from "react";
import "./Moviedisplay.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addMovie } from "../../Functions/dataSlice";
const Moviedisplay = (props) => {
  const dispatch = useDispatch();
  const [ishover, setIshover] = useState(false);
  const mouseenter = () => {
    setIshover(true);
  };

  const mouseout = () => {
    setIshover(false);
  };
  const handleClick = (md) => {
    dispatch(addMovie({ movie: md?.MovieTitle }));
  };
  return (
    <div
      onMouseEnter={mouseenter}
      onMouseLeave={mouseout}
      className="displaycard"
    >
      {ishover && (
        <div className="hovered" onClick={() => handleClick(props.moviefilter)}>
          <Link to={`/cinema/${props.moviefilter.MovieId}`}>
            <button className="book">Book Cinema</button>
          </Link>
        </div>
      )}
      <div>
        <img className="path" src={props.moviefilter.moviePath} alt="" />
      </div>
      <div className="detail">
        <p>{props.moviefilter.Duration}</p>
        <p>{props.moviefilter.ReleaseDate.split("T")[0]}</p>
      </div>
    </div>
  );
};

export default Moviedisplay;
