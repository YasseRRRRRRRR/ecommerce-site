import React from "react";
import ProductDetails from "./components/productDetails";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

const ProductPage = async ({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) => {
  const supabase = createClient();

  // User Check
  const { data: user, error: userFetchError } = await supabase.auth.getUser();

  // Product fetching
  let { data: Product, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", `${id}`)
    .limit(1)
    .single();
  let { data: Image } = supabase.storage
    .from("bucket")
    .getPublicUrl(Product.image, {
      transform: {
        width: 500,
        height: 600,
      },
    });

  // Order check
  let { data: order, error: orderFetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();

  const submit = async () => {
    "use server";
    if (!user) {
      redirect(`/${locale}/login`);
    }
    if (!order) {
      console.log("this is the user's first order");
    }
    console.log("added to the bag :)");
    // try {
    // } catch (error) {}
  };

  return (
    <div>
      <ProductDetails Product={Product} Submit={submit} />
    </div>
  );
};

export default ProductPage;
