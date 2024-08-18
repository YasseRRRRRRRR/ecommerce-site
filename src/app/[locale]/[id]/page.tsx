import React from "react";
import supabase from "../config/supabaseClient";

const ProductPage = async ({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) => {
  let { data: Product, error } = await supabase
    .from("Products")
    .select("name")
    .eq("id", `${id}`)
    .limit(1)
    .single();
  return (
    <div>
      Product {id} is {Product?.name}
    </div>
  );
};

export default ProductPage;
