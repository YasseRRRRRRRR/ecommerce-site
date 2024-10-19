"use client";
import { Check, CircleHelp, Clock } from "lucide-react";
import React, { useState } from "react";
import EditSize from "./editSize";
import Image from "next/image";
import Link from "next/link";

const Cart = ({ initialProducts, initialOrderItems, locale, order }: any) => {
  const [orderItems, setOrderItems] = useState(initialOrderItems);
  const [Products] = useState(initialProducts);

  const getTotalAmount = () => {
    if (!orderItems || !Products) {
      return 0;
    }

    return orderItems.reduce(
      (
        totalAmount: number,
        order_item: { product_id: any; quantity: number; size: string }
      ) => {
        const product = Products.find(
          (product: { id: any }) => product.id === order_item.product_id
        );

        if (product) {
          return totalAmount + product.price * order_item.quantity;
        } else {
          console.warn(`Product not found for order item: ${order_item}`);
          return totalAmount;
        }
      },
      0
    );
  };

  // Update orderItems when quantity changes
  const handleQuantityChange = (
    productId: React.Key | null | undefined,
    size: string,
    newQuantity: number
  ) => {
    setOrderItems((prevOrderItems: any[]) =>
      prevOrderItems.map((item) =>
        item.product_id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 lg:items-start xl:gap-x-16">
      <section aria-labelledby="cart-heading" className="lg:col-span-7">
        <h2 id="cart-heading" className="sr-only">
          Items in your shopping cart
        </h2>
        <ul
          role="list"
          className="border-t border-b border-gray-200 divide-y divide-gray-200"
        >
          {orderItems?.map((orderItem: any, index: number) => {
            const product = Products.find(
              (product: { id: any }) => product.id === orderItem.product_id
            );

            if (!product) {
              console.warn(`Product not found for order item: ${orderItem}`);
              return null; // Skip rendering if product is not found
            }

            // Use a unique key for each order item
            const uniqueKey = `${product.id}-${orderItem.size}-${index}`;

            return (
              <li key={uniqueKey} className="flex py-6 sm:py-10">
                <div className="flex-shrink-0">
                  <Image
                    width={700}
                    height={700}
                    src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product_images/${product.image}`}
                    alt={product.image_alt}
                    className="w-24 h-24 rounded-md object-center object-cover sm:w-48 sm:h-48"
                  />
                </div>

                <div className="ml-4 flex-1 flex flex-col justify-between sm:ml-6">
                  <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                    <div>
                      <div className="flex justify-between">
                        <h3 className="text-sm">
                          <Link
                            href={`/${locale}/products/${product.id}`}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {product.name}
                          </Link>
                        </h3>
                      </div>
                      <div className="mt-1 flex text-sm">
                        <p className="text-gray-500">{orderItem.size}</p>
                        {product.color ? (
                          <p className="ml-4 pl-4 border-l border-gray-200 text-gray-500">
                            {product.color}
                          </p>
                        ) : null}
                      </div>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        €{product.price}
                      </p>
                    </div>
                    <EditSize
                      OrderItemId={orderItem.id}
                      productId={product.id}
                      orderId={order?.id}
                      quantity={orderItem.quantity}
                      size={orderItem.size}
                      onQuantityChange={(id, qty) =>
                        handleQuantityChange(product.id, orderItem.size, qty)
                      }
                    />
                  </div>

                  <p className="mt-4 flex text-sm text-gray-700 space-x-2">
                    {product.inStock ? (
                      <Check
                        className="flex-shrink-0 h-5 w-5 text-green-500"
                        aria-hidden="true"
                      />
                    ) : (
                      <Clock
                        className="flex-shrink-0 h-5 w-5 text-gray-300"
                        aria-hidden="true"
                      />
                    )}

                    <span>
                      {product.inStock
                        ? "In stock"
                        : `Ships in ${product.restockTime} weeks`}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>

      <section
        aria-labelledby="summary-heading"
        className="mt-16 bg-gray-50 rounded-lg px-4 py-6 sm:p-6 lg:p-8 lg:mt-0 lg:col-span-5"
      >
        <h2 id="summary-heading" className="text-lg font-medium text-gray-900">
          Order summary
        </h2>

        <dl className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <dt className="text-sm text-gray-600">Subtotal</dt>
            <dd className="text-sm font-medium text-gray-900">
              €{getTotalAmount()}
            </dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
              <a
                href="#"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">
                  Learn more about how shipping is calculated
                </span>
                <CircleHelp className="h-5 w-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-gray-900">€5.00</dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="flex text-sm text-gray-600">
              <span>Tax estimate</span>
              <a
                href="#"
                className="ml-2 flex-shrink-0 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">
                  Learn more about how tax is calculated
                </span>
                <CircleHelp className="h-5 w-5" aria-hidden="true" />
              </a>
            </dt>
            <dd className="text-sm font-medium text-gray-900">€8.32</dd>
          </div>
          <div className="border-t border-gray-200 pt-4 flex items-center justify-between">
            <dt className="text-base font-medium text-gray-900">Order total</dt>
            <dd className="text-base font-medium text-gray-900">
              €{getTotalAmount() + 5 + 8.32}
            </dd>
          </div>
        </dl>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="mt-6">
              <a
                href="#"
                className=" flex w-full items-center justify-center rounded-lg bg-red-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 "
              >
                Proceed to Checkout
              </a>
            </div>
            <div className="flex items-center justify-center gap-2">
              <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
                {" "}
                or{" "}
              </span>
              <Link
                href={`./products`}
                title=""
                className="inline-flex items-center gap-2 text-sm font-medium text-red-700 underline hover:no-underline dark:text-red-500"
              >
                Continue Shopping
                <svg
                  className="h-5 w-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 12H5m14 0-4 4m4-4-4-4"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Cart;
