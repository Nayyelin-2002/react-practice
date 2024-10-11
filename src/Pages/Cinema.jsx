import React, { useEffect, useState } from "react";
import Cinemalist from "../Components/Cinemalist/Cinemalist";
import Datafetching from "../Data/Datafetching";
import { Outlet, useParams } from "react-router-dom";
import { motion } from "framer-motion";
const Cinema = () => {
  const cinemalistOG = Datafetching("Tbl_CinemaList");
  const [cinemaList, setCinemaList] = useState([]);
  useEffect(() => {
    if (cinemalistOG) {
      const cinemaImg = [
        "https://elevenmyanmar.com/sites/news-eleven.com/files/news-images/dsc_7715mmk.jpg",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR76J122OzDeSCOgh97N_55Ox2IRLHivObcgA&usqp=CAU",
        "https://lh3.googleusercontent.com/p/AF1QipPGCv8iI8cPn0Ytlgun0GZH4J4q-kItMWDGh8Eh=s1600-w400",
        "https://media.licdn.com/dms/image/C5122AQEhtDqzaVFngQ/feedshare-shrink_800/0/1552097811421?e=2147483647&v=beta&t=-n6Cftt7Fy4DAb2h4nH_UBTNVX-VewHTPiUgQDEjFrA",
        "https://1.bp.blogspot.com/_fgqXBhsYtOM/TH6hB1IFAiI/AAAAAAAADRM/j6UoEomEXJM/s1600/16+Myanmar+3+100.jpg",
        "https://1.bp.blogspot.com/_fgqXBhsYtOM/TI7S3Z7_zTI/AAAAAAAADSs/g2SiBZBfuvU/s1600/16+Myanmar+3+078.jpg",
        "https://i2.wp.com/www.relicsofrangoon.com/wp-content/uploads/2020/10/DSC_4205.jpg?ssl=1",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxlyO8Dl6qm174JHV3Z7bHlp_fmClgT8t1Lw&usqp=CAU",
        "https://fastly.4sqi.net/img/general/600x600/13999881_VFwcusGdDvKTYPu3eaVl3PTo8PEhMYJCnYqM_-I3tMc.jpg",
        "https://elevenmyanmar.com/sites/news-eleven.com/files/news-images/dsc_7715mmk.jpg",
      ];
      const upcinemaList = cinemalistOG
        ? cinemalistOG.map((climg, index) => ({
            ...climg,
            cinemaImg: cinemaImg[index % cinemaImg.length],
          }))
        : [];
      setCinemaList(upcinemaList);
    }
  }, [cinemalistOG]);
  console.log(cinemaList);
  // console.log(showdate);

  //   useEffect(() => {
  //   }, []);
  const cRoom = Datafetching("Tbl_CinemaRoom");
  // console.log(cRoom);
  const [roomnames, setRoomnames] = useState({});
  useEffect(() => {
    let setRooms;
    if (cRoom && cinemaList.length > 0) {
      const fetchfilterroom = (cinemaId) => {
        const filterRoomnames = cRoom.filter((room) => {
          return room.CinemaId === cinemaId;
        });
        setRooms = filterRoomnames.map((room) => ({
          RoomId: room.RoomId,
          RoomName: room.RoomName,
        }));
        setRoomnames((prevRoomnames) => ({
          ...prevRoomnames,
          [cinemaId]: setRooms,
        }));
      };
      cinemaList.forEach((cl) => {
        fetchfilterroom(cl.CinemaId);
      });
    }
  }, [cRoom, cinemaList]);
  console.log(roomnames);

  const { movieid } = useParams();
  const showdates = Datafetching("Tbl_MovieShowDate");
  const [filteredShowdates, setFilteredShowdates] = useState([]);
  useEffect(() => {
    if (showdates && movieid) {
      const filterdate = showdates.filter((showdate) => {
        return showdate.MovieId === parseInt(movieid, 10); // Convert movieid to integer and compare
      });
      setFilteredShowdates(filterdate); // Set the filtered showdates to state
    }
  }, [showdates, movieid]);

  // console.log(date);

  const [finallists, setFinallists] = useState([]);
  useEffect(() => {
    const existCinemalist = filteredShowdates.map((FS) => {
      return FS.CinemaId;
    });
    // console.log(existCinemalist);
    const finalcinnemalist =
      cinemaList && existCinemalist
        ? cinemaList.filter((list) => existCinemalist.includes(list.CinemaId))
        : [];

    setFinallists(finalcinnemalist);
  }, [cinemaList, filteredShowdates]); // d final cinema list ko u mhr
  console.log(finallists);
  return (
    <div className="list">
      {finallists.map((finallist, index) => {
        return (
          <motion.div
            key={index}
            initial={{ y: -100, opacity: 0 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: { duration: 0.5, delay: index * 0.3 },
            }}
            whileHover={{ scale: 1.1 }}
            className="motion"
          >
            <Cinemalist
              cRoom={cRoom}
              movieid={movieid}
              finallist={finallist}
              roomnames={roomnames[finallist.CinemaId] || []}
            />
          </motion.div>
        );
      })}
      <Outlet />
    </div>
  );
};

export default Cinema;
