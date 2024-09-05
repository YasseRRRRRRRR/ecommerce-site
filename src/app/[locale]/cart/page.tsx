import { useUnicycleSizes } from "@/app/hooks/useUnicycleSizes";
import { createClient } from "@/utils/supabase/server";
import { Check, CircleHelp, Clock, Minus, Plus, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import EditSize from "./components/editSize";
import OrderSummary from "./components/cart";
import Testing from "../components/testing";
import Cart from "./components/cart";

const page = async ({ params: { locale } }: { params: { locale: string } }) => {
  // const products = [
  //   {
  //     id: 1,
  //     name: "Basic Tee",
  //     href: "#",
  //     price: "$32.00",
  //     color: "Sienna",
  //     inStock: true,
  //     size: "Large",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-01.jpg",
  //     imageAlt: "Front of men's Basic Tee in sienna.",
  //   },
  //   {
  //     id: 2,
  //     name: "Basic Tee",
  //     href: "#",
  //     price: "$32.00",
  //     color: "Black",
  //     inStock: false,
  //     leadTime: "3–4 weeks",
  //     size: "Large",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-02.jpg",
  //     imageAlt: "Front of men's Basic Tee in black.",
  //   },
  //   {
  //     id: 3,
  //     name: "Nomad Tumbler",
  //     href: "#",
  //     price: "$35.00",
  //     inStock: true,
  //     size: "Default",
  //     imageSrc:
  //       "https://tailwindui.com/img/ecommerce-images/shopping-cart-page-01-product-03.jpg",
  //     imageAlt: "Insulated bottle with white base and black snap lid.",
  //   },
  // ];

  const getOrderItemsAsProducts = () => {
    let product_ids: any[] = [];

    if (order_items && Array.isArray(order_items)) {
      product_ids = order_items
        .map((order_item) => {
          const productId = order_item?.product_id;
          if (productId !== null && productId !== undefined) {
            return productId;
          }
          console.warn(
            `No product_id found for order item: ${JSON.stringify(order_item)}`
          );
          return null;
        })
        .filter((productId) => productId !== null);
    }

    return product_ids;
  };

  const supabase = createClient();
  const { data: user, error: userFetchError } = await supabase.auth.getUser();
  let { data: order, error: orderFetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.user?.id)
    .single();
  let { data: order_items, error: orderItemsFetchingError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", order?.id);

  let { data: Products, error: productFetchingError } = await supabase
    .from("products")
    .select("*")
    .in("id", getOrderItemsAsProducts());

  const updateOrderItem = async (
    orderId: string,
    productId: string,
    newQuantity: number
  ) => {
    const { data, error } = await supabase
      .from("order_items")
      .update({ quantity: newQuantity })
      .eq("order_id", orderId)
      .eq("product_id", productId);

    return { data, error };
  };
  const getTotalAmount = () => {
    let totalAmount = 0;

    if (order_items && Products) {
      order_items.forEach((order_item) => {
        // Find the product that matches the product_id of the order item
        const product = Products.find(
          (product) => product.id === order_item?.product_id
        );

        if (product) {
          // Multiply product price by order_item quantity and add to total
          totalAmount += product.price * order_item?.quantity;
        } else {
          console.warn(`Product not found for order item: ${order_item}`);
        }
      });
    }

    return totalAmount;
  };

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    "use client";
  };

  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto pt-16 pb-24 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          Shopping Cart for{" "}
          {Products ? <>Kaynin {Products.length}</> : <>nothing</>}
          <Testing thing={Products} thing2={order_items} />
          {/* {order?.total_amount} */}
          {/* {Products?.map((order_item, i) => (
            <p key={i} className="mx-2">
              {order_item.price}
            </p>
          ))} */}
        </h1>
        <Cart
          initialProducts={Products}
          initialOrderItems={order_items}
          locale={locale}
          order={order}
        />
      </div>
    </div>
  );
};
export default page;
