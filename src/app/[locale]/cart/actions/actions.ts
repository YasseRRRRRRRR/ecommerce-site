"use server";

import { createClient } from "@/utils/supabase/server";

export const handleIncrement = async (
  OrderItemId: React.Key | null | undefined,
  // productId: React.Key | null | undefined,
  // orderId: string,
  // size: string,
  quantity: number
): Promise<boolean> => {
  const supabase = createClient();

  const { data: new_order_item, error } = await supabase
    .from("order_items")
    .update({ quantity: quantity + 1 })
    .eq("id", OrderItemId)
    .select();

  if (error) {
    console.error("Error incrementing quantity:", error.message);
    return false;
  }
  console.log("Quantity incremented successfully,", new_order_item);
  return true;
};

export const handleDecrement = async (
  OrderItemId: React.Key | null | undefined,
  // productId: React.Key | null | undefined,
  // orderId: string,
  // size: string,
  quantity: number
): Promise<boolean> => {
  const supabase = createClient();
  if (quantity >= 1) {
    const { data: new_order_item, error } = await supabase
      .from("order_items")
      .update({ quantity: quantity - 1 })
      .eq("id", OrderItemId)
      .select();

    if (error) {
      console.error("Error decrementing quantity:", error.message);
      return false;
    }
    console.log("Quantity decrement successfully,", new_order_item);
    return true;
  }
  return false;
};

export const handleDelete = async (
  productId: React.Key | null | undefined,
  orderId: string
) => {
  // deletes the order_item from cart, need to make it when the add item to cart is implemented
};
export const handleTestBullShit = async (
  productId: React.Key | null | undefined,
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
