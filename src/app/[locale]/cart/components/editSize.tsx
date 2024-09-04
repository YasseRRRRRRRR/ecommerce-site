"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import {
  handleDecrement,
  handleIncrement,
  handleTestBullShit,
} from "./actions";

type EditProps = {
  productId: string;
  orderId: string;
  quantity: number;
};

const EditSize = ({
  productId,
  orderId,
  quantity: initialQuantity,
}: EditProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const decrementQuantity = async () => {
    if (quantity > 1) {
      const success = await handleDecrement(productId, orderId, quantity);
      if (success) {
        setQuantity(quantity - 1);
      }
    }
  };

  const incrementQuantity = async () => {
    const success = await handleIncrement(productId, orderId, quantity);
    if (success) {
      setQuantity(quantity + 1);
    }
  };
  return (
    <div className="my-4 flex items-center justify-between md:order-3 md:justify-center">
      <form className="flex items-center">
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
          onClick={decrementQuantity}
        >
          <Minus className="h-2.5 w-2.5" />
        </button>

        <input
          type="text"
          id="counter-input-2"
          data-input-counter
          className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
          value={`${quantity}`}
          readOnly
        />

        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
          onClick={incrementQuantity}
        >
          <Plus className="h-2.5 w-2.5" />
        </button>
        {/* 
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
          onClick={() => handleTestBullShit(productId, orderId)}
        >
          Test
        </button> */}
      </form>
    </div>
  );
};

export default EditSize;
