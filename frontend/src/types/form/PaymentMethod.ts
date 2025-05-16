export type PaymentMethod = {
    id: string;
    title: string;
  };
  
  
  
const paymentMethods: PaymentMethod[] = [
    { id: "credit-card", title: "Credit card" },
    { id: "paypal", title: "PayPal" },
    { id: "etransfer", title: "eTransfer" },
  ];


  export default paymentMethods;
