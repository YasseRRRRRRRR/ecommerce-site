import React from "react";

const ProductPage = async ({
  params: { locale, id },
}: {
  params: { locale: string; id: number };
}) => {
  return <div>Product {id}</div>;
};

export default ProductPage;
