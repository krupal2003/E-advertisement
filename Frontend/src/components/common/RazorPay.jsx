import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Razorpay = ({ amount, bookingId, userData }) => {

  const navigate=useNavigate();

  const [orderDetails, setOrderDetails] = useState(null);
  const handleCreateOrder = async () => {
    try {
      const order = await axios.post(
        "http://localhost:8080/payment/create_order",
        {
          amount: Math.round(amount),
          currency: "INR",
          receipt:`receipt_${bookingId}`,
        }
      );

      setOrderDetails(order.data);
      displayRazorpay(order.data);
    } catch (error) {
      console.error("Order creation failed:", error);
    }
  };

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const updateBookingStatus = async (bookingId) => {
    try {
      await axios.put(`/booking/updateStatus/${bookingId}`, {
        bookingStatus: "confirmed"
      });
    } catch (error) {
      console.error("Failed to update booking status:", error);
    }
  };

  const displayRazorpay = async (orderData) => {
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const options = {
      key: "rzp_test_KsLOIsro2sF96Z",
      amount: orderData.amount,
      currency: orderData.currency,
      name: "Test Corp",
      description: "Test Transaction",
      order_id: orderData.id,
      handler: async function (response) {
        const res = await axios.post(
          "http://localhost:8080/payment/verify_order",
          {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          }
        );

        if (res.data.status === "success") {
          //database order table:
          //orderId,
          //rporderid
          //paymentid
          //amount
          //statusc: sucess
          await updateBookingStatus(bookingId);
            alert("Payment verified successfully! Your booking is now confirmed.");
            // window.location.reload(); // Refresh or redirect to a success page
            navigate("/user/mybookings")
        } else {
          alert("Payment verification failed.");
        }
      },
      prefill: {
        name: userData?.bussinessName || "User",
        email: userData?.bookingEmail || "email@example.com",
        contact: userData?.ContactNo || "9999999999",
      },
      theme: {
        color: "#61dafb",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <div>
      <button
        onClick={handleCreateOrder}
        sx={{ width: "100%", marginTop: "20px" }}
      >
        Pay Now
      </button>
    </div>
  );
};