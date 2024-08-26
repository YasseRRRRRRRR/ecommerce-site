import StripeStuff from "./components/stripeStuff";
import { createClient } from "@supabase/supabase-js";
import Testing from "./components/testing";
// import Products from "./components/Products";
import supabase from "../../utils/supabaseClient";
import Link from "next/link";
import { redirect } from "next/navigation";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      <br />
      {user ? <>logged in as {user?.given_name}</> : <>user not logged in</>}
      {isAdmin ? <>admin bravo</> : <>not admin</>}
      {/* button that logs user to the console */}
      <Testing thing={user} />
      {/* welcome {user?.email} */}
      {/* <Link href={`${locale}/products`}>products</Link> */}
      {/* <StripeStuff amount={100} locale={locale} /> */}
      {/* <Link href={`./api/auth/login`}>Sign in</Link>*/}
      {/* <Link href={`${locale}/api/auth/register`} className="text-red-600">
        Sign up
      </Link>
      <Link href={`${locale}/api/auth/login`} className="text-red-600">
        Sign in
      </Link> */}
      <LoginLink>Sign in</LoginLink>
      <Link href="/api/auth/logout">Logout</Link>

      {/* <RegisterLink>Sign up</RegisterLink> */}
    </div>
  );
}
