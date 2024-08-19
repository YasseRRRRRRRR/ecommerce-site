import StripeStuff from "./components/stripeStuff";
import { createClient } from "@supabase/supabase-js";
import Testing from "./components/testing";
// import Products from "./components/Products";
import supabase from "./utils/supabaseClient";
import Link from "next/link";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <Link href={`${locale}/products`}>products</Link>
    </div>
  );
}
