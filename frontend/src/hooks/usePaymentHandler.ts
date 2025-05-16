import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

import { ifValidCardNumberElement } from "@/utils/helpers";



export const usePaymentHandler = (amount: number, currentUser: any) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const handlePayment = async (
    shippingDetails: any,
    cardNumberElement: any
  ) => {
    if (!stripe || !elements) {
      throw new Error("Stripe has not loaded correctly.");
    }
    setIsProcessingPayment(true);

    try {
      const amountInCents = parseInt((amount * 100).toFixed(0), 10);
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/create-payment-intent`,
        {
          amount: amountInCents,
          currency: "eur",
          shipping: shippingDetails,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const clientSecret = data.paymentIntent.client_secret;
      // Use our new function to confirm it's valid
      if (!ifValidCardNumberElement(cardNumberElement)) {
        throw new Error(
          "Invalid cardNumberElement. It may not be mounted yet."
        );
      }

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: cardNumberElement,
          billing_details: {
            name: currentUser ? currentUser.displayName : "Guest",
          },
        },
      });

      if (paymentResult.error) {
        throw new Error(paymentResult.error.message);
      }

      if (
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        alert("Payment Successful!");
        
      }
      return paymentResult;
    } catch (error: any) {
      console.error("Payment Error:", error);
      alert(error.message || "There was an error processing your payment.");
      throw error;
    } finally {
      setIsProcessingPayment(false);
    }
  };

  return { handlePayment, isProcessingPayment };
};
