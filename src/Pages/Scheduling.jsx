import React, { useState } from "react";
import "./Sch.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import Datafetching from "../Data/Datafetching";
import { addCinema, addShowdate, addShowtime } from "../Functions/dataSlice";
const Scheduling = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const DateTime = [];
  const [selectedTime, setSelectedtime] = useState(null);

  const fetchingShowdateId = Datafetching("Tbl_MovieShowDate");
  const finalfetchingShowdate = Datafetching("Tbl_MovieSchedule");
  console.log(finalfetchingShowdate);
  console.log(fetchingShowdateId);
  const datearray = fetchingShowdateId
    ? fetchingShowdateId.filter((SD) => {
        return (
          SD.CinemaId === parseInt(params.cinemaid) &&
          SD.RoomId === parseInt(params.roomid) &&
          SD.MovieId === parseInt(params.movieid)
          //useParams returns strings , dr kyouk parseInt 3:
        );
      })
    : [];
  console.log(datearray);
  const showDateIds = finalfetchingShowdate
    ? finalfetchingShowdate.filter((FFSD) => {
        return (
          FFSD.ShowDateId ===
          parseInt(
            datearray.map((DA) => {
              return DA.ShowDateId;
            })
          )
        );
      })
    : [];
  console.log(showDateIds);

  showDateIds.map((showdate) => {
    return DateTime.push({
      Time: showdate.ShowDateTime.split("T")[1],
      Date: showdate.ShowDateTime.split("T")[0],
    });
  });

  const [singleDate] = DateTime;
  console.log(singleDate);
  const [click, setClick] = useState(false);
  const handleToggle = () => {
    setClick((prev) => !prev);
    setSelectedtime(null);
  };
  const [isshow, setIsshow] = useState(true);
  const closemenu = () => {
    setIsshow((prev) => !prev);
    setSelectedtime(null);
    nav(`/cinema/${params.cinemaid}`);
  };

  const handleTimeClick = (time) => {
    setSelectedtime((prevTime) => (prevTime === time ? null : time));
  };
  return (
    <div>
      {isshow && (
        <div className="sch">
          <div>
            <div className="title">
              <h3>Select the Date and Seat that u want</h3>
              <button className="x1" onClick={() => closemenu()}>
                ✕
              </button>
            </div>
            <div className="seatandtime">
              <div className="selecttime">
                <p className="drop" onClick={() => handleToggle()}>
                  Select Time
                </p>
                {click && (
                  <ul name="" id="" className="uul">
                    {DateTime.map((DT) => {
                      return (
                        <li
                          onClick={() => handleTimeClick(DT.Time)}
                          className={` ${
                            DT.Time === selectedTime ? "selected" : ""
                          } opt`}
                        >
                          {DT.Time}
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
              <div>
                <button
                  className="seat1"
                  onClick={() => {
                    dispatch(addShowdate({ showdate: singleDate.Date }));
                    dispatch(addShowtime({ showTime: selectedTime }));
                    nav(`/seating/${params.roomid}`);
                  }}
                  disabled={selectedTime === null}
                >
                  Select Seat
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Scheduling;
