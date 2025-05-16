export type DeliveryMethod = {
  id: string;
  title: string;
  turnaround: string;
  price: number;
};

const deliveryMethods: DeliveryMethod[] = [
  {
    id: "standard",
    title: "Standard",
    turnaround: "4–10 business days",
    price: 5.0,
  },
  {
    id: "express",
    title: "Express",
    turnaround: "2–5 business days",
    price: 16.0,
  },
];

export default deliveryMethods;
