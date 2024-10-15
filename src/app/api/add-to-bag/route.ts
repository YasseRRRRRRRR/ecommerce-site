import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = createClient();

  // Check user authentication
  const { data: user, error: userFetchError } = await supabase.auth.getUser();
  const { user_id, product_id, locale, size } = await request.json();
  if (!user || userFetchError) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
    // redirect(`/${locale}/login`);
  }

  try {
    // Check if the user already has an order
    let { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user_id)
      .single();

    if (!order) {
      console.log("this is the user's first order");
      // If no order exists, create a new order for the user
      const { data: newOrder, error: newOrderError } = await supabase
        .from("orders")
        .insert({ user_id })
        .select("*")
        .single();

      if (newOrderError) throw newOrderError;

      order = newOrder;
    }

    // Check if the product with the same size is already in the order_items
    let { data: existingItem, error: existingItemError } = await supabase
      .from("order_items")
      .select("*")
      .eq("order_id", order.id)
      .eq("product_id", product_id)
      .eq("size", size)
      .single();

    if (existingItem) {
      // If the product with the same size already exists, increment the quantity
      const { error: updateError } = await supabase
        .from("order_items")
        .update({ quantity: existingItem.quantity + 1 })
        .eq("id", existingItem.id);

      if (updateError) throw updateError;

      console.log("Quantity updated for the existing product.");
      return NextResponse.json({
        message: "Product quantity updated successfully",
      });
    } else {
      // If the product is not in the order, insert a new row
      const { error: insertError } = await supabase.from("order_items").insert({
        order_id: order.id,
        product_id,
        quantity: 1,
        size: size,
      });

      if (insertError) throw insertError;

      console.log("Added to the bag.");
      return NextResponse.json({
        message: "Product added to the bag successfully",
      });
    }
  } catch (error) {
    return NextResponse.json({ error: error?.message }, { status: 500 });
  }
}
