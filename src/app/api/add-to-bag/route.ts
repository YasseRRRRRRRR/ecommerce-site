import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user_id, product_id, locale } = await request.json();
  const supabase = createClient();

  // Check user authentication
  const { data: user, error: userFetchError } = await supabase.auth.getUser();

  if (!user || userFetchError) {
    return NextResponse.json(
      { error: "User not authenticated" },
      { status: 401 }
    );
  }

  try {
    // Check if the user already has an order
    let { data: order, error: orderFetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user_id)
      .single();

    // if (!user) {
    //   redirect(`/${locale}/login`);
    // }
    if (!order) {
      console.log("this is the user's first order");
      // If no order exists, create a new order for the user
      //   const { data: newOrder, error: newOrderError } = await supabase
      //     .from("orders")
      //     .insert({ user_id })
      //     .select("*")
      //     .single();

      //   if (newOrderError) throw newOrderError;

      //   order = newOrder;
    }

    // Add the product to the user's order (assuming an "order_items" table exists)
    // const { error: insertError } = await supabase.from("order_items").insert({
    //   order_id: order.id,
    //   product_id,
    //   quantity: 1,
    // });

    // if (insertError) {
    //   throw insertError;
    // }
    console.log("added to the bag :)");
    return NextResponse.json({
      message: "Product added to the bag successfully",
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
