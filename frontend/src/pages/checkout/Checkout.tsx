import { useState, ChangeEvent, FormEvent } from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePaymentHandler } from "@hooks/usePaymentHandler";
import { clearCart } from "@/store";
import { useNavigate } from "react-router-dom";
import { selectCartItems } from "@/store/cart/cart.selector";

import ContactInformation from "./ContactInformation";
import ShippingInfo from "./ShippingInfo";
import DeliveryMethod from "./DeliveryMethod";
import OrderSummary from "./OrderSummary";
import Payment from "./Payment";



import { selectCartTotal } from "@/store/cart/cart.selector";

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [paymentElements, setPaymentElements] = useState({
    cardNumberElement: null,
    cardExpiryElement: null,
    cardCvcElement: null,
  });
  const cartTotal = useSelector(selectCartTotal); // Cart total from Redux store
  const currentUser = useSelector((state: any) => state.user.currentUser); // Current user
  const { handlePayment,} = usePaymentHandler(
    cartTotal,
    currentUser
  );

  const [formFields, setFormFields] = useState({
    email: "",
    FullName: "",
    Line1: "",
    Line2: "",
    city: "",
    state: "",
    postal_code: "",
    phone: "",
  });
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedDeliveryMethod, setSelectedDeliveryMethod] = useState("");
  const [deliveryFee, setDeliveryFee] = useState(0);
  const cartItems = useSelector(selectCartItems); // or wherever you're storing them

  // Handle form field changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prev) => ({ ...prev, [name]: value }));
  };

  // Handle country selection
  const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedCountry(e.target.value);
  };

  // Handle delivery method selection
  const handleDeliveryMethodChange = (value: string) => {
    setSelectedDeliveryMethod(value);
  };

  const handleFeeChange = (fee: number) => {
    setDeliveryFee(fee);
  };

  // Validate form fields before submission

  const handlePaymentDetailsChange = (details: any) => {
    setPaymentElements(details);
  };

  const clearLocalStates = () => {
    // Reset form fields
    setFormFields({
      email: "",
      FullName: "",
      Line1: "",
      Line2: "",
      city: "",
      state: "",
      postal_code: "",
      phone: "",
    });
    setSelectedCountry("");
    setSelectedDeliveryMethod("");
    setDeliveryFee(0);
    // Reset payment elements
    setPaymentElements({
      cardNumberElement: null,
      cardExpiryElement: null,
      cardCvcElement: null,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { cardNumberElement } = paymentElements;
    if (!cardNumberElement) {
      console.error("No card number element!");
      return;
    }

    try {
      // Construct shipping details
      const shippingDetails = {
        name: formFields.FullName,
        address: {
          line1: formFields.Line1,
          line2: formFields.Line2 || "", // Default to empty if not provided
          city: formFields.city,
          state: formFields.state || "", // Default to empty if not provided
          postal_code: formFields.postal_code,
          country: selectedCountry || "IE", // Default to "IE" if not selected
        },
        phone: formFields.phone,
      };

      const paymentResult = await handlePayment(
        shippingDetails,
        cardNumberElement
      );
      if (
        paymentResult &&
        paymentResult.paymentIntent &&
        paymentResult.paymentIntent.status === "succeeded"
      ) {
        // Temporarily cast the paymentIntent to 'any' so TS doesn't complain
        const last4 = (paymentResult.paymentIntent as any)?.charges?.data[0]
          ?.payment_method_details?.card?.last4;
        const finalOrderData = {
          orderId: paymentResult.paymentIntent.id,
          shippingDetails,
          cartTotal,
          cartItems: cartItems,
          deliveryFee,
          selectedDeliveryMethod,
          cardLast4: last4, // Store only the last 4 digits
          // ...any other details
        };

        // 2) Store in localStorage
        localStorage.setItem("finalOrder", JSON.stringify(finalOrderData));


        // 3) Navigate + Clear
        navigate("/order-confirmation");
        clearLocalStates();
        dispatch(clearCart());
      }
    } catch (error: any) {
      console.error("Checkout Error:", error);
    }
  };

  return (
    <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:max-w-none">
        <h1 className="sr-only">Checkout</h1>

        <form
          onSubmit={handleSubmit}
          className="lg:grid lg:grid-cols-2 lg:gap-x-12 xl:gap-x-16"
        >
          <div>
            {/* Contact Information */}
            <ContactInformation
              email={formFields.email}
              onInputChange={handleInputChange}
            />
            {/* Shipping Information */}
            <ShippingInfo
              formFields={formFields}
              selectedCountry={selectedCountry}
              onInputChange={handleInputChange}
              onCountryChange={handleCountryChange}
            />
            {/* Delivery Method */}
            <DeliveryMethod
              selectedDeliveryMethod={selectedDeliveryMethod}
              onInputChange={handleDeliveryMethodChange}
              onFeeChange={handleFeeChange}
            />
            {/* Payment */}
            <Payment onPaymentDetailsChange={handlePaymentDetailsChange} />
          </div>
          {/* Order Summary */}
          <OrderSummary deliveryFee={deliveryFee} />
        </form>
      </div>
    </main>
  );
};

export default Checkout;
