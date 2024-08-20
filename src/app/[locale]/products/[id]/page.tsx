import React from "react";
import supabase from "../../../../utils/supabaseClient";
import ProductDetails from "./components/productDetails";

const ProductPage = async ({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) => {
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
  return (
    <div>
      <ProductDetails Product={Product} />
    </div>
  );
};

export default ProductPage;
