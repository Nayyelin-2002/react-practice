import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Datafetching from "../Data/Datafetching";
import "./Seat.css";
import { addSeat, addSeatprice } from "../Functions/dataSlice";
const Seating = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const datareducer = useSelector((state) => state.dataReducer);
  const [selectedseat, setSelectedseat] = useState([]);
  const params = useParams();
  //   console.log(params.roomid);
  const fetchingSeateNumbers = Datafetching("Tbl_RoomSeat");
  const fetchinSeatPrice = Datafetching("Tbl_SeatPrice");
  //   console.log(fetchingSeateNumbers);

  const SEATS = fetchingSeateNumbers
    ? fetchingSeateNumbers.filter((FSN) => {
        return FSN.RoomId === parseInt(params.roomid);
      })
    : [];
  //   console.log(SEATS);

  const SEATSPRICE = fetchinSeatPrice
    ? fetchinSeatPrice.filter((FSP) => {
        return FSP.RoomId === parseInt(params.roomid);
      })
    : [];
  console.log(SEATSPRICE);

  function chunkArray(array, chunkSize) {
    let result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  const chunkedArray = chunkArray(SEATS, 20);
  console.log(chunkedArray);

  const seatNoLoopinng = SEATS.filter((SEAT) => {
    return selectedseat.includes(SEAT.SeatNo);
  });
  console.log(seatNoLoopinng); // m lo boo htin tr pl

  const totalSeatPrice = seatNoLoopinng.reduce((acc, seat) => {
    const SEATPRICE = SEATSPRICE.find((SEAT) => SEAT.RowName === seat.RowName);

    return acc + (SEATPRICE ? SEATPRICE.SeatPrice : 0);
  }, 0);
  console.log(totalSeatPrice);

  //click seatnumber
  const handleSeatClick = (seatno, seatType) => {
    setSelectedseat((prevseat) => {
      if (prevseat.includes(seatno)) {
        return prevseat.filter((prevseatno) => prevseatno !== seatno); // pr pee thr ko click pyn
      } else {
        return [...prevseat, seatno];
      }
    });
  };

  //css
  const getSeatClass = (seatno, seatType) => {
    if (selectedseat.includes(seatno)) {
      return seatType === "single" ? "SS" : seatType === "couple" ? "CC" : "";
    }
    return "";
  };
  console.log(selectedseat);
  return (
    <div className="seating">
      <div className="allrow">
        <div>
          {SEATSPRICE.map((seatno) => {
            return <p className="row1">{seatno.RowName}</p>;
          })}
        </div>
        <div className="seatnumbers">
          {chunkedArray.map((seatnumbers) => {
            return (
              <div
                className={`${seatnumbers.length < 8 ? "littleseat" : ""} SNO`}
              >
                {seatnumbers.map((seatnumber) => {
                  return (
                    <p
                      onClick={() =>
                        `${handleSeatClick(
                          seatnumber.SeatNo,
                          seatnumber.SeatType
                        )}`
                      }
                      className={`${getSeatClass(
                        seatnumber.SeatNo,
                        seatnumber.SeatType
                      )} num`}
                    >
                      {seatnumber.SeatNo}
                    </p>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
      <div className="type">
        <div className="single">
          <div className="redforsingle"></div>
          <p>Single</p>
        </div>
        <div className="couple">
          <div className="blueforcouple"></div>
          <p>Couple</p>
        </div>
      </div>

      <div>
        <div className="showseats">
          {selectedseat.length === 0 ? (
            <p>No seats selected</p>
          ) : (
            <>
              <p>Selected seat - </p>
            </>
          )}
          {selectedseat?.map((seat) => {
            return <p>{seat},</p>;
          })}
        </div>
        {selectedseat.length > 0 && (
          <div className="btn">
            <button
              className="check"
              onClick={() => {
                dispatch(
                  addSeatprice({
                    totalseatprice: totalSeatPrice,
                  })
                );
                dispatch(
                  addSeat({
                    seat: selectedseat,
                  })
                );
                nav("/checkout");
              }}
            >
              Check Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Seating;
