import { createClient } from "@/utils/supabase/server";
import { Minus, Plus } from "lucide-react";
import React from "react";

type EditProps = {
  productId: String;
  orderId: String;
  quantity: any;
};
const EditSize = ({ productId, orderId, quantity }: EditProps) => {
  const supabase = createClient();

  const decrement = async (
    quantity: any,
    orderId: String,
    productId: String
  ) => {
    try {
      const { data, error } = await supabase
        .from("order_items")
        .select()
        .eq("order_id", orderId)
        .eq("product_id", productId);
      // .update({ quantity: quantity - 1 })

      if (error) throw error;
      console.log("here is the thing:", data?.order_items?.quantity);
    } catch (error) {
      console.error("Error decrementing quantity:", error.message);
      // Handle the error appropriately (e.g., show an alert to the user)
    }
  };
  const increment = async (
    quantity: any,
    orderId: String,
    productId: String
  ) => {
    "use server";
    const { data, error } = await supabase
      .from("order_items")
      .update({ quantity: quantity++ })
      .eq("order_id", orderId)
      .eq("product_id", productId)
      .select();

    if (error) throw error;
    console.log("Quantity incremented successfully");
  };

  return (
    <div className="my-4 flex items-center justify-between md:order-3 md:justify-center">
      <div className="flex items-center">
        <form action={decrement(quantity, orderId, productId)}>
          <button type="submit">
            <Minus className="h-2.5 w-2.5" />
          </button>
        </form>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            decrement(quantity, orderId, productId);
          }}
          type="button"
          id="increment-button-2"
          data-input-counter-increment="counter-input-2"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
        ></button> */}
        <input
          type="text"
          id="counter-input-2"
          data-input-counter
          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-white-900 focus:outline-none focus:ring-0 "
          placeholder=""
          value={`${quantity}`}
          required
        />
        <form action={increment(quantity, orderId, productId)}>
          <button type="submit">
            <Plus className="h-2.5 w-2.5" />
          </button>
        </form>
        {/* <button
          onClick={(e) => {
            e.preventDefault();
            increment(quantity, orderId, productId);
          }}
          type="button"
          id="increment-button-2"
          data-input-counter-increment="counter-input-2"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 "
        >
         
        </button> */}
      </div>
    </div>
  );
};

export default EditSize;
