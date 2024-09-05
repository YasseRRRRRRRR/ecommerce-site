"use client";
import { Minus, Plus } from "lucide-react";
import React, { useState } from "react";
import { handleDecrement, handleIncrement } from "./actions";

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
  const [loading, setLoading] = useState(false); // To prevent multiple clicks during optimistic update

  const decrementQuantity = async () => {
    if (quantity > 1 && !loading) {
      const prevQuantity = quantity;
      setQuantity(prevQuantity - 1); // Optimistically update the UI
      setLoading(true);

      const success = await handleDecrement(productId, orderId, prevQuantity);
      if (!success) {
        setQuantity(prevQuantity); // Revert if there's an error
      }

      setLoading(false);
    }
  };

  const incrementQuantity = async () => {
    if (!loading) {
      const prevQuantity = quantity;
      setQuantity(prevQuantity + 1); // Optimistically update the UI
      setLoading(true);

      const success = await handleIncrement(productId, orderId, prevQuantity);
      if (!success) {
        setQuantity(prevQuantity); // Revert if there's an error
      }

      setLoading(false);
    }
  };

  return (
    <div className="my-4 flex items-center justify-between md:order-3 md:justify-center">
      <form className="flex items-center">
        <button
          type="button"
          className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
          onClick={decrementQuantity}
          disabled={loading}
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
          disabled={loading}
        >
          <Plus className="h-2.5 w-2.5" />
        </button>
      </form>
    </div>
  );
};

export default EditSize;
