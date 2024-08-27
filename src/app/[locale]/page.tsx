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
import jwt from "jsonwebtoken";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  const isAdmin = user?.email === process.env.ADMIN_EMAIL;

  let { data: orders, error } = await supabase.from("orders").select("*");
  const { getIdToken } = getKindeServerSession();
  const idToken = await getIdToken();
  // const token = jwt.sign(idToken, process.env.NEXT_PUBLIC_SUPABASE_JWT_SECRET!);
  if (error) {
    console.log("error");
  }
  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {/* <br />
      {reviews ? (
        <code>{JSON.stringify(reviews, null, 2)}</code>
      ) : (
        <>L90wada</>
      )}{" "}
      <br /> */}
      {user ? <>logged in as {user?.given_name}</> : <>user not logged in</>}
      <br />
      {/* {isAdmin ? <>admin bravo</> : <>not admin</>} */}
      <Testing thing={idToken} />
      {/* <code>{JSON.stringify(reviews, null, 2)}</code> */}
      <p>
        {orders?.map((order, i) =>
          order ? (
            <ul key={i} className="flex flex-col">
              {" "}
              <li>
                order n0{i + 1}: {order.id}
              </li>
            </ul>
          ) : (
            <>policy is fucked</>
          )
        )}
      </p>{" "}
      <LoginLink>Sign in</LoginLink>
      {/* <RegisterLink>Sign up</RegisterLink> */}
      <Link href="/api/auth/logout">Logout</Link>
      {/* <KindeProvider></KindeProvider> */}
    </div>
  );
}
