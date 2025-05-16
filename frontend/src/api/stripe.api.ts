import { loadStripe } from "@stripe/stripe-js";

const API_URL = import.meta.env.VITE_API_STRIPE_PUBLISHABLE_KEY;

export const stripePromise = loadStripe(API_URL as string);
