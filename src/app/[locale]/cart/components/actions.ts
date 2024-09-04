"use server";

import { createClient } from "@/utils/supabase/server";

export const handleIncrement = async (
  productId: string,
  orderId: string,
  quantity: number
): Promise<boolean> => {
  const supabase = createClient();

  const { data: new_order_item, error } = await supabase
    .from("order_items")
    .update({ quantity: quantity + 1 })
    .eq("order_id", orderId)
    .eq("product_id", productId)
    .select();

  if (error) {
    console.error("Error incrementing quantity:", error.message);
    return false;
  }
  console.log(
    "Quantity incremented successfully,",
    new_order_item,
    orderId,
    productId
  );
  return true;
};

export const handleDecrement = async (
  productId: string,
  orderId: string,
  quantity: number
): Promise<boolean> => {
  const supabase = createClient();
  if (quantity >= 1) {
    const { data: new_order_item, error } = await supabase
      .from("order_items")
      .update({ quantity: quantity - 1 })
      .eq("product_id", productId)
      .eq("order_id", orderId)
      .select();

    if (error) {
      console.error("Error decrementing quantity:", error.message);
      return false;
    }
    console.log(
      "Quantity decrement successfully,",
      new_order_item,
      orderId,
      productId
    );
    return true;
  }
  return false;
};

export const handleTestBullShit = async (
  productId: string,
  orderId: string
) => {
  const supabase = createClient();
  let { data: order_items, error } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId)
    .eq("product_id", productId);
  if (error) throw error;
  console.log(order_items);
};
