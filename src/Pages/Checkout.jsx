import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert2";
import "./checkout.css";
import { Elements } from "@stripe/react-stripe-js";
import Payment from "./Payment";
const stripePromise = loadStripe(
  "pk_test_51PTeXtRsQ25ieRSa2l8ypQBKNc7V3anzODYtnmvjQlzbm6pEJXQf3CK45SkvzkVvEHSvDuKQHnR0nPwUWvu2RGik006e2F1mc5"
);
// loadStripe sets up Stripe with a special key you got from Stripe.
// stripePromise is like a ticket that promises to give you the Stripe object when you need it.
const Checkout = () => {
  const dataReducer = useSelector((state) => state.dataReducer);
  const [userEmail, setUserEmail] = useState("");
  const [userName, SetUserName] = useState("");
  const nav = useNavigate();
  const sendEmail = (toEmail, subject, message, user_name) => {
    const emailParams = {
      to_email: toEmail,
      subject: subject,
      message: message,
      user_name: user_name,
    };

    emailjs
      .sendemail(
        "service_1kvew58",
        "template_18oxj1d",
        emailParams,
        "l8yhVe94lJRWDphg1"
      )
      .then((response) => {
        console.log("Email sent successfully", response);
      })
      .catch((error) => {
        console.error("Email sending failed ", error);
      });
  };

  const handleSendEmail = () => {
    if (!userEmail) {
      swal.fire({
        icon: "error",
        title: "Email required!",
        text: "Please enter an email to proceed",
        background: "#212730",
        confirmButtonColor: "#b52a2a",
      });
      return;
    }
    const emailSubject = "Movie Ticketing Service";
    const emailMessage = `Your booking receipt is as follow : 

        Movie : ${dataReducer.movie} 

        Cinema :  ${dataReducer.cinema}

        Room :  ${dataReducer.room}

        ShowDate :  ${dataReducer.showdate}

        ShowTime  :  ${dataReducer.showTime}

        Seat : ${dataReducer.seat.map((SEAT) => {
          return SEAT;
        })}

        Totalseatprice : ${dataReducer.totalseatprice} MMK

        Please note that if you does not buy these booking within 12 hours ,the booking will be cancelled automatically! Thanks for choosing us !
        `;
    sendEmail(userEmail, emailSubject, emailMessage, userName);
    swal.fire({
      icon: "success",
      title: "Success!",
      text: "Your booking receipt have been sent to your email! Thanks for choosing us !",
      background: "#212730",
      confirmButtonColor: "#b52a2a",
    });
    nav("/");
  };
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [showBookInfo, setShowBookInfo] = useState(false);
  console.log(dataReducer);
  return (
    <div>
      <div>
        <h1 className="checkout">CheckOut</h1>
      </div>
      <div>
        <table className="tt">
          <tr>
            <td>Movie </td>
            <td>{dataReducer.movie}</td>
          </tr>
          <tr>
            <td>Cinema</td>
            <td>{dataReducer.cinema}</td>
          </tr>
          <tr>
            <td> Room </td>
            <td>{dataReducer.room}</td>
          </tr>
          <tr>
            <td> ShowDate</td>
            <td>{dataReducer.showdate}</td>
          </tr>
          <tr>
            <td> ShowTime </td>
            <td>{dataReducer.showTime}</td>
          </tr>
          <tr>
            <td> Seat</td>
            <td>
              {dataReducer.seat.map((SEAT) => {
                return <p className="ss">{SEAT},</p>;
              })}
            </td>
          </tr>{" "}
          <tr>
            <td> Total Price</td>
            <td>{dataReducer.totalseatprice} MMK</td>
          </tr>
        </table>
      </div>
      <div className="checkbtns">
        <button
          className="clc"
          onClick={() => {
            setShowBookInfo((prev) => !prev);
            setShowPaymentForm(false);
          }}
        >
          BOOK NOW
        </button>
        <button
          className="clc"
          onClick={() => {
            setShowPaymentForm((prev) => !prev);
            setShowBookInfo(false);
          }}
        >
          BUY NOW
        </button>
      </div>
      {showBookInfo && (
        <div className="book1">
          <div>
            <h3>Enter Your Email To Receive Booking Informations</h3>
          </div>
          <div className="showinp">
            <input
              type="text"
              placeholder="enter your name"
              id="name"
              name="name"
              value={userName}
              onChange={(e) => {
                SetUserName(e.target.value);
              }}
            />
            <input
              type="email"
              placeholder="enter your email"
              id="email"
              name="email"
              value={userEmail}
              onChange={(e) => {
                setUserEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <button className="clc" onClick={() => handleSendEmail()}>
              SEND EMAIL
            </button>
          </div>
        </div>
      )}

      {showPaymentForm && (
        <div>
          {/* Elements is a special wrapper that provides Stripe's functionality to the payment form. */}
          <Elements stripe={stripePromise}>
            <Payment />
          </Elements>
        </div>
      )}
    </div>
  );
};

export default Checkout;
