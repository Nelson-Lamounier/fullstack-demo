import React, { useEffect } from "react";
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useElements,
} from "@stripe/react-stripe-js";

import  paymentMethods  from "@/types/form/PaymentMethod";


interface PaymentProps {
  onPaymentDetailsChange: (details: {
    cardNumberElement?: any;
    cardExpiryElement?: any;
    cardCvcElement?: any;
  }) => void; // Callback to pass payment details to the parent
}

const Payment: React.FC<PaymentProps> = ({ onPaymentDetailsChange }) => {
  const elements = useElements();

  const handleCardDetailsChange = () => {
    if (!elements) return;

    // Get references to the card fields
    const cardNumberElement = elements.getElement(CardNumberElement);
    const cardExpiryElement = elements.getElement(CardExpiryElement);
    const cardCvcElement = elements.getElement(CardCvcElement);

    // Pass all card elements to the parent via the callback
    onPaymentDetailsChange({
      cardNumberElement,
      cardExpiryElement,
      cardCvcElement,
    });
  };

  // UseEffect to handle initial setup when elements are mounted
  useEffect(() => {
    handleCardDetailsChange();
  }, [elements]);
  
  return (
    <div className="mt-10 border-t border-gray-200 pt-10">
      <h2 className="text-lg font-medium text-gray-900">Payment</h2>
      <fieldset className="mt-4">
        <legend className="sr-only">Payment type</legend>
        <div className="space-y-4 sm:flex sm:items-center sm:space-y-0 sm:space-x-10">
          {paymentMethods.map((paymentMethod, paymentMethodIdx) => (
            <div key={paymentMethod.id} className="flex items-center">
              <input
                defaultChecked={paymentMethodIdx === 0}
                id={paymentMethod.id}
                name="payment-type"
                type="radio"
                className="relative size-4 appearance-none rounded-full border border-gray-300 bg-white before:absolute before:inset-1 before:rounded-full before:bg-white not-checked:before:hidden checked:border-indigo-600 checked:bg-indigo-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:before:bg-gray-400 forced-colors:appearance-auto forced-colors:before:hidden"
              />
              <label
                htmlFor={paymentMethod.id}
                className="ml-3 block text-sm/6 font-medium text-gray-700"
              >
                {paymentMethod.title}
              </label>
            </div>
          ))}
        </div>
      </fieldset>

      <div className="mt-6 grid grid-cols-4 gap-x-4 gap-y-6">
        <div className="col-span-4">
          <div className="mb-4">
            <label
              htmlFor="card-number"
              className="block text-sm font-medium text-gray-700"
            >
              Card Number
            </label>
            <div className="border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 hover:border-gray-500 focus-within:border-indigo-600 sm:text-sm/6 ">
              <CardNumberElement
                id="card-number"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#32325d",
                    },
                  },
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="card-expiry"
                className="block text-sm font-medium text-gray-700"
              >
                Expiry Date
              </label>
              <div className="border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 hover:border-gray-500 focus-within:border-indigo-600 sm:text-sm/6 ">
                <CardExpiryElement
                  id="card-expiry"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                      },
                    },
                  }}
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="card-cvc"
                className="block text-sm font-medium text-gray-700"
              >
                CVC
              </label>
              <div className="border border-gray-300 block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 hover:border-gray-500 focus-within:border-indigo-600 sm:text-sm/6 ">
                <CardCvcElement
                  id="card-cvc"
                  options={{
                    style: {
                      base: {
                        fontSize: "16px",
                        color: "#32325d",
                      },
                    },
                  }}
                  onChange={handleCardDetailsChange} // Notify parent on change
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
