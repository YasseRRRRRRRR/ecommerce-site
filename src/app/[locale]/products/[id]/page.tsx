import React from "react";
import ProductDetails from "./components/productDetails";
import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { p } from "framer-motion/client";

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

  return (
    <div>
      {/* {Product. == null && <p>there is something going wrong</p>} */}
      <ProductDetails Product={Product} CurrentUserId={user?.user?.id} />
    </div>
  );
};

export default ProductPage;
