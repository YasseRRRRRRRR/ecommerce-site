import StripeStuff from "./components/stripeStuff";
import { createClient } from "@/utils/supabase/server";

import Testing from "./components/testing";
// import Products from "./components/Products";

import Link from "next/link";
import { redirect } from "next/navigation";
import { logout } from "./logout/actions";

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const supabase = createClient();

  let { data: orders } = await supabase.from("orders").select("*");
  const { data, error } = await supabase.auth.getUser();
  // if (error || !data?.user) {
  //   redirect(`/${locale}/login`);
  // }

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {/* <br />
      {reviews ? (
        <code>{JSON.stringify(reviews, null, 2)}</code>
      ) : (
        <>L90wada</>
      )}{" "}
      <br /> */}
      {data.user ? (
        <>logged in as {data.user?.email}</>
      ) : (
        <>user not logged in</>
      )}
      <br />
      {/* {isAdmin ? <>admin bravo</> : <>not admin</>} */}
      <Testing thing={orders} />
      {/* <code>{JSON.stringify(reviews, null, 2)}</code> */}
      {/* <div>
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
      </div> */}
      {/* <LoginLink>Sign in</LoginLink> */}
      {/* <RegisterLink>Sign up</RegisterLink> */}
      <Link href={`${locale}/login`}>Login</Link>
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
}
