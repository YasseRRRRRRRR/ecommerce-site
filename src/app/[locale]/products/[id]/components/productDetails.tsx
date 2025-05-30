"use client";
import {
  CheckCircleIcon,
  CheckIcon,
  CircleHelp,
  ShieldCheck,
  StarIcon,
} from "lucide-react";
import React, { useState } from "react";
import Image from "next/image";
import { Description, Label, Radio, RadioGroup } from "@headlessui/react";
import { useUnicycleSizes } from "../../../../hooks/useUnicycleSizes";
interface ProductDetailsProps {
  Product: {
    id: number;
    name: string;
    price: number;
    desc: string;
    image: string;
    image_alt: string;
    sizes: string;
  };
  CurrentUserId: string | undefined;
}
const ProductDetails = ({ Product, CurrentUserId }: ProductDetailsProps) => {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(" ");
  }
  const reviews = { average: 4, totalCount: 1624 };
  const breadcrumbs = [
    { id: 1, name: "Home", href: "/" },
    { id: 2, name: `${Product.name}`, href: "" },
  ];
  const selectedSizes = useUnicycleSizes(Product.sizes);
  // testing the hook
  // console.log(selectedSizes);
  const [selectedSize, setSelectedSize] = useState(selectedSizes[0]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/add-to-bag", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: CurrentUserId,
          product_id: Product.id,
          size: selectedSize.name,
          locale: "en",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add to the bag");
      }

      const result = await response.json();
      console.log(result.message);
      // Optionally, you can show a success message or notification
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white">
      <div className="max-w-2xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:gap-x-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-2">
              {breadcrumbs.map((breadcrumb, breadcrumbIdx) => (
                <li key={breadcrumb.id}>
                  <div className="flex items-center text-sm">
                    <a
                      href={breadcrumb.href}
                      className="font-medium text-gray-500 hover:text-gray-900"
                    >
                      {breadcrumb.name}
                    </a>
                    {breadcrumbIdx !== breadcrumbs.length - 1 ? (
                      <svg
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        aria-hidden="true"
                        className="ml-2 flex-shrink-0 h-5 w-5 text-gray-300"
                      >
                        <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                      </svg>
                    ) : null}
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {Product.name}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                €{Product.price}
              </p>

              <div className="ml-4 pl-4 border-l border-gray-300">
                <h2 className="sr-only">Reviews</h2>
                <div className="flex items-center">
                  <div>
                    <div className="flex items-center">
                      {[0, 1, 2, 3, 4].map((rating) => (
                        <StarIcon
                          key={rating}
                          className={classNames(
                            reviews.average > rating
                              ? "text-yellow-400"
                              : "text-gray-300",
                            "h-5 w-5 flex-shrink-0"
                          )}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <p className="sr-only">{reviews.average} out of 5 stars</p>
                  </div>
                  <p className="ml-2 text-sm text-gray-500">
                    {reviews.totalCount} reviews
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">{Product.desc}</p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="flex-shrink-0 w-5 h-5 text-green-500"
                aria-hidden="true"
              />
              <p className="ml-2 text-sm text-gray-500">
                In stock and ready to ship
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:mt-0 lg:col-start-2 lg:row-span-2 lg:self-center">
          <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden">
            <Image
              width={500}
              height={580}
              src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/product_images/${Product.image}`}
              alt={Product.image_alt}
              className="w-full h-full object-center object-cover"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:max-w-lg lg:col-start-1 lg:row-start-2 lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <form onSubmit={handleSubmit}>
              <div className="sm:flex sm:justify-between">
                {/* Size selector */}
                <fieldset>
                  <legend className="text-sm font-semibold leading-6 text-gray-900">
                    Select A Size
                  </legend>
                  <RadioGroup
                    value={selectedSize}
                    onChange={setSelectedSize}
                    className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4"
                  >
                    {selectedSizes.map((size) => (
                      <Radio
                        key={size.id}
                        value={size}
                        aria-label={size.name}
                        // aria-description={`${mailingList.description} to ${mailingList.users}`}
                        className="group relative flex cursor-pointer rounded-lg border border-gray-300 bg-white p-4 shadow-sm focus:outline-none data-[focus]:border-red-600 data-[focus]:ring-2 data-[focus]:ring-red-600"
                      >
                        <span className="flex flex-1">
                          <span className="flex flex-col">
                            <Label className="block text-base font-medium text-gray-900">
                              {size.name}
                            </Label>
                            <span className="mt-1  text-sm text-gray-500">
                              {size.description}
                            </span>
                            {/* <span className="mt-6 text-sm font-medium text-gray-900">
                              {mailingList.users}
                            </span> */}
                          </span>
                        </span>
                        <CheckCircleIcon
                          aria-hidden="true"
                          className="h-5 w-5 text-red-600 [.group:not([data-checked])_&]:invisible"
                        />
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-lg border-2 border-transparent group-data-[focus]:border group-data-[checked]:border-red-600"
                        />
                      </Radio>
                    ))}
                  </RadioGroup>
                </fieldset>
              </div>
              <div className="mt-4">
                {/* link to a video for unicyles sizes or just a simple explanation then sending to a video for more info */}
                <a
                  href="#"
                  className="group inline-flex text-sm text-gray-500 hover:text-gray-700"
                >
                  <span>What size should I buy?</span>
                  <CircleHelp
                    className="flex-shrink-0 ml-2 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                </a>
              </div>
              <div className="mt-10">
                <button
                  type="submit"
                  disabled={loading}
                  className="mt-8 flex w-full items-center justify-center bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  {loading ? "Adding..." : "Add to Bag"}
                </button>
              </div>
              <div className="mt-6 text-center">
                <a href="#" className="group inline-flex text-base font-medium">
                  <ShieldCheck
                    className="flex-shrink-0 mr-2 h-6 w-6 text-gray-400 group-hover:text-gray-500"
                    aria-hidden="true"
                  />
                  <span className="text-gray-500 hover:text-gray-700">
                    Lifetime Guarantee
                  </span>
                </a>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
