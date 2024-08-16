import StripeStuff from "./components/stripeStuff";
import { createClient } from "@supabase/supabase-js";
import Testing from "./components/testing";
import Products from "./components/Products";
import supabase from "./config/supabaseClient";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  // const amount = 10.99;

  // Assuming you want to display the price of the first product
  // const Product_prices =
  //   products && products.length > 0 ? products[0].price : 0;
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {/* I request <span className="text-red-500">$ {the_amountfromthedb}</span> */}
      <Products
        params={{
          locale: locale,
        }}
      />
      {/* <Testing Products={Product_prices} /> */}
      {/* <StripeStuff amount={Product_prices} locale={locale} /> */}
    </div>
  );
}
