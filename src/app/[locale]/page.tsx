import StripeStuff from "./components/stripeStuff";
import { createClient } from "@supabase/supabase-js";
import Testing from "./components/testing";
// import Products from "./components/Products";
import supabase from "../../utils/supabaseClient";
import Link from "next/link";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {user ? <>logged in</> : <>not logged in</>}
      <br />
      {/* button that logs user to the console */}
      <Testing Products={user} />
      <>welcome back {user?.email}</>
      <Link href={`${locale}/products`}>products</Link>
      <Link href={`${locale}/login`}>Login</Link>
    </div>
  );
}
