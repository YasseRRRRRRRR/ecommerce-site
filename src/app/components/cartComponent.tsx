import { createClient } from "@/utils/supabase/client";
import { ShoppingBagIcon } from "lucide-react";
import React from "react";
import Testing from "../[locale]/components/testing";

const CartComponent = async () => {
  const supabase = createClient();
  const { data: user, error: userFetchError } = await supabase.auth.getUser();
  let { data: order, error: orderFetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();
  let { data: order_items, error: orderItemsFetchingError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order?.id);
  return (
    <div className="ml-4 flow-root lg:ml-6">
      <Testing thing={order_items} />
      <a href="#" className="group -m-2 p-2 flex items-center">
        <ShoppingBagIcon
          className="flex-shrink-0 h-6 w-6 text-gray-400 group-hover:text-gray-500"
          aria-hidden="true"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {order_items ? "1" : "0"}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </a>
    </div>
  );
};

export default CartComponent;
