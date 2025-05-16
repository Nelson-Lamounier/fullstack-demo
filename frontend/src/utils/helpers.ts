import { StripeCardNumberElement } from "@stripe/stripe-js";
/**
 * Type guard that checks if a given value
 * is a valid StripeCardNumberElement (not null).
 */
export const ifValidCardNumberElement = (
    cardNumber: StripeCardNumberElement | null
  ): cardNumber is StripeCardNumberElement => cardNumber !== null;