import React, { useEffect, useState } from "react";
import "./Cinema.css";
import { useDispatch } from "react-redux";
import Datafetching from "../../Data/Datafetching";
import { useNavigate, useParams } from "react-router-dom";
import { addCinema, addRoom } from "../../Functions/dataSlice";
const Cinemalist = ({ finallist, movieid, cRoom, roomnames }) => {
  const dispatch = useDispatch();
  const data = useParams();
  const showdate = Datafetching("Tbl_MovieShowDate");
  console.log(showdate);
  // console.log(props.finallist);
  const testingfilter = showdate?.filter(
    (s) => s?.MovieId == data?.movieid && s?.CinemaId == finallist?.CinemaId
  );
  console.log(testingfilter);
  const requiredRoomId = testingfilter?.map((id) => id?.RoomId);
  console.log(requiredRoomId); //roomId ko u
  // console.log(cRoom);

  const finalRoomName = cRoom?.filter((RN) =>
    requiredRoomId?.includes(RN?.RoomId)
  );
  console.log(finalRoomName);
  const nav = useNavigate();
  return (
    <div>
      <div className="imgdiv">
        <img src={finallist.cinemaImg} alt="" className="cinemas" />
      </div>
      <p className="cinema">{finallist.CinemaName}</p>
      <div className={`${finalRoomName.length > 1 ? "rooms" : "room"}`}>
        {finalRoomName.length > 0 ? (
          finalRoomName.map((r, i) => {
            return (
              <p
                key={i + 1}
                className="row"
                onClick={() => {
                  dispatch(
                    addRoom({
                      room: r.RoomName,
                    })
                  );

                  dispatch(
                    addCinema({
                      cinema: finallist.CinemaName,
                    })
                  );
                  nav(
                    `/cinema/${movieid}/scheduling/${r.CinemaId}/${r.RoomId}`
                  );
                  // /cinema/:movieid/scheduling/:cinemaid/:roomid
                }}
              >
                {r?.RoomName}
              </p>
            );
          })
        ) : (
          <p>No rooms available</p>
        )}
      </div>
    </div>
  );
};

export default Cinemalist;
