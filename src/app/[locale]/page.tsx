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
  const { data: user, error } = await supabase.auth.getUser();

  let { data: orders } = await supabase
    .from("orders")
    .select()
    .eq("user_id", user.user?.id);

  // this feels hacked toghe
  let user_order = 0;
  if (orders) {
    user_order = orders[0].id;
  }
  let { data: order_items } = await supabase
    .from("order_items")
    .select()
    .eq("order_id", user_order);

  // .eq("", orders?[0].id);
  // if (error || !data?.user) {
  //   redirect(`/${locale}/login`);
  // }

  return (
    <div className="flex flex-col justify-center h-screen items-center">
      {user ? <>logged in as {user?.user?.email}</> : <>user not logged in</>}
      <br />
      <Testing thing={orders} />

      <div>
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
        {order_items?.map((order, i) =>
          order ? (
            <ul key={i} className="flex flex-col">
              {" "}
              <li>
                product n0{i + 1}: {order.price}€
              </li>
            </ul>
          ) : (
            <>policy is fucked</>
          )
        )}
      </div>

      {/* <LoginLink>Sign in</LoginLink> */}
      {/* <RegisterLink>Sign up</RegisterLink> */}
      <Link href={`${locale}/login`}>Login</Link>
      <Link href={`${locale}/products`}>Products</Link>
      <form action={logout}>
        <button type="submit">logout</button>
      </form>
    </div>
  );
}
