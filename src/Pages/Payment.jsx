import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearData } from "../Functions/dataSlice";
import swal from "sweetalert2";

const Payment = () => {
  const stripe = useStripe();
  const element = useElements();
  const dispatch = useDispatch();
  const nav = useNavigate();
  const [paymentError, setPaymentError] = useState(null);
  const handlepayment = async () => {
    try {
      const { token, error } = await stripe.createToken(
        element.getElement(CardElement)
      );

      if (error) {
        setPaymentError(error.message);
        return;
      }
      console.log(token);
      dispatch(clearData());

      swal.fire({
        icon: "success",
        title: "success!",
        text: "Your payment was successful. Thank you!",
        background: "gray",
        confirmButtonColor: "tomato",
      });
      nav("/");
    } catch (error) {
      console.error("Error processing payment : ", error);
      setPaymentError("Error processing payment. Please try again");
    }
  };
  return (
    <div>
      <h2 className="pay">Payment Informations</h2>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "25px",
              color: "red",
              color: "red",
            },
            invalid: {
              color: "red",
            },
          },
        }}
      />
      {paymentError && <p className="text-red-500">{paymentError}</p>}
      <div className="paycard">
        <button className="clc pay" onClick={handlepayment} disabled={!stripe}>
          Pay Now
        </button>
      </div>
    </div>
  );
};

export default Payment;
