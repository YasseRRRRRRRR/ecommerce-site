import { Minus, Plus, XIcon } from "lucide-react";
import { useState } from "react";
import { handleDecrement, handleIncrement } from "../actions/actions";

type EditProps = {
  OrderItemId: React.Key | null | undefined;
  productId: React.Key | null | undefined;
  orderId: string;
  quantity: number;
  size: string;
  onQuantityChange: (
    productId: React.Key | null | undefined,
    newQuantity: number
  ) => void;
};
const EditSize = ({
  OrderItemId,
  productId,
  orderId,
  quantity: initialQuantity,
  size,
  onQuantityChange,
}: EditProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);
  const [loading, setLoading] = useState(false);

  const decrementQuantity = async () => {
    if (quantity > 1 && !loading) {
      const prevQuantity = quantity;
      setQuantity(prevQuantity - 1);
      setLoading(true);

      const success = await handleDecrement(
        OrderItemId,
        // productId,
        // orderId,
        // size,
        prevQuantity
      );
      if (!success) {
        setQuantity(prevQuantity);
      } else {
        onQuantityChange(productId, prevQuantity - 1); // Send the previous quantity - 1
      }

      setLoading(false);
    }
  };

  const incrementQuantity = async () => {
    if (!loading) {
      const prevQuantity = quantity;
      setQuantity(prevQuantity + 1);
      setLoading(true);

      const success = await handleIncrement(
        OrderItemId,
        // productId,
        // orderId,
        // size,
        prevQuantity
      );
      if (!success) {
        setQuantity(prevQuantity);
      } else {
        onQuantityChange(productId, prevQuantity + 1); // Send the previous quantity + 1
      }

      setLoading(false);
    }
  };

  return (
    <div className="mt-4 sm:mt-0 sm:pr-9">
      <label htmlFor="counter-input" className="sr-only">
        Choose quantity:
      </label>
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
      <div className="absolute top-0 right-0">
        <button
          type="button"
          className="-m-2 p-2 inline-flex text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Remove</span>
          <XIcon className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
};

export default EditSize;
