import React, { useEffect, useState } from "react";

const Datafetching = (moviedatakey) => {
  const [datas, setDatas] = useState(null);

  const datafetch = async () => {
    const fetching = await fetch(
      "https://raw.githubusercontent.com/sannlynnhtun-coding/Movie-Ticket-Online-Booking-System/main/MovieTicketOnlineBookingSystem.json"
    );

    const jsonData = await fetching.json();
    if (jsonData !== null && jsonData !== undefined) {
      if (
        jsonData[moviedatakey] !== null &&
        jsonData[moviedatakey] !== undefined
      ) {
        setDatas(jsonData[moviedatakey]);
      }
    }
  };

  useEffect(() => {
    datafetch();
  }, []);

  //   useEffect(() => {
  //     console.log(datas);
  //   }, [datas]);

  return datas;
};

export default Datafetching;
