"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/app/lib/converToSubcurrency";

const CheckoutPage = ({
  amount,
  locale,
}: {
  amount: number;
  locale: string;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [clientSecret, setClientSecret] = useState("s");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("api/create-payment-intent", {
      method: "POSt",
      headers: { "Content-Type": "applicaiton/json" },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => setClientSecret(data.clientSecret));
  }, [amount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    if (!stripe || !elements) {
      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://www.localhost:3000/${locale}/payment-success?amount=${amount}`,
      },
    });
    if (error) {
      setErrorMessage(error.message);
    } else {
    }
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-red-600"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  return (
    <form onSubmit={handleSubmit}>
      {clientSecret && <PaymentElement />}
      {errorMessage && <div>{errorMessage}</div>}
      <button
        disabled={!stripe || loading}
        type="submit"
        className="mt-4 w-full py-2 border-2 border-red-600 bg-red-600 text-white hover:bg-white hover:text-red-600 ease-in duration-150 rounded-md disabled:opacity-50 disabled:animate-pulse"
        //   onClick={handleCheckout}
      >
        {!loading ? `Pay Up €${amount}` : `Processing Payment`}
      </button>
    </form>
  );
};

export default CheckoutPage;
