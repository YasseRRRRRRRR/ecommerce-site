"use client";

import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import convertToSubcurrency from "@/app/lib/converToSubcurrency";
import CheckoutPage from "./checkoutPage";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
const StripeStuff = ({
  amount,
  locale,
}: {
  amount: number;
  locale: string;
}) => {
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount:
          amount > 0
            ? convertToSubcurrency(amount)
            : convertToSubcurrency(10.0),
        currency: "eur",
      }}
    >
      <CheckoutPage amount={amount} locale={locale} />
    </Elements>
  );
};

export default StripeStuff;
