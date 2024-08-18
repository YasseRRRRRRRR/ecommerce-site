"use client";
import React, { useState } from "react";
import { Description, Label, Radio, RadioGroup } from "@headlessui/react";

const ProductSize = ({ sizes }: any) => {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);

  return (
    <div className="sm:flex sm:justify-between">
      {/* Size selector */}
      <RadioGroup value={selectedSize} onChange={setSelectedSize}>
        <Label className="block text-sm font-medium text-gray-700">Size</Label>
        <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
          {sizes?.map((size) => (
            <Radio
              as="div"
              key={size.name}
              value={size}
              className="active:ring-2 active:ring-indigo-500 relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
              //   className={({ active }) =>
              //     classNames(
              //       active ? "ring-2 ring-indigo-500" : "",
              //       "relative block border border-gray-300 rounded-lg p-4 cursor-pointer focus:outline-none"
              //     )
              //   }
            >
              <>
                <Label as="p" className="text-base font-medium text-gray-900">
                  {size.name}
                </Label>
                <Description as="p" className="mt-1 text-sm text-gray-500">
                  {size.description}
                </Description>
                <div
                  className="absolute -inset-px rounded-lg pointer-events-none active:border border-2 checked:border-indigo-500 border-transparent"
                  // className={classNames(
                  //   active ? "border" : "border-2",
                  //   checked ? "border-indigo-500" : "border-transparent",
                  //   "absolute -inset-px rounded-lg pointer-events-none"
                  // )}
                  aria-hidden="true"
                />
              </>
            </Radio>
          ))}
        </div>
      </RadioGroup>
    </div>
  );
};

export default ProductSize;
