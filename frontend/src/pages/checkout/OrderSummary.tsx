import { FC } from "react";
import { useSelector, useDispatch } from "react-redux";

import { selectCartItems, selectCartTotal } from "@/store/cart/cart.selector";
import {
  addItemToCart,
  clearItemFromCart,
  removeItemFromCart,
  CartItem,
} from "@/store/cart/cart.slice";

type OrderSummaryProps = { deliveryFee: number };

import {
  TrashIcon, ChevronDoubleRightIcon, ChevronDoubleLeftIcon
} from "@heroicons/react/20/solid";

const OrderSummary: FC<OrderSummaryProps> = ({ deliveryFee }) => {
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);

  const clearItemHandler = (cartItem: CartItem) =>
    dispatch(clearItemFromCart(cartItem));
  const addItemHandler = (cartItem: CartItem) =>
    dispatch(addItemToCart(cartItem));
  const removeItemHandler = (cartItem: CartItem) =>
    dispatch(removeItemFromCart(cartItem));

  const dispatch = useDispatch();

  return (
    <>
      {/* Order summary */}
      <div className="mt-10 lg:mt-0">
        <h2 className="text-lg font-medium text-gray-900">Order summary</h2>

        <div className="mt-4 rounded-lg border border-gray-200 bg-white shadow-xs">
          <h3 className="sr-only">Items in your cart</h3>
          <ul role="list" className="divide-y divide-gray-200">
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((cartItem: CartItem) => (
                <li key={cartItem._id} className="flex px-4 py-6 sm:px-6">
                  <div className="shrink-0">
                    <img
                      alt={`${cartItem.name}`}
                      src={cartItem.ImageUrl}
                      className="w-20 rounded-md"
                    />
                  </div>

                  <div className="ml-6 flex flex-1 flex-col">
                    <div className="flex">
                      <div className="min-w-0 flex-1">
                        <h4 className="text-sm">
                          <a
                            href={cartItem.ImageUrl}
                            className="font-medium text-gray-700 hover:text-gray-800"
                          >
                            {cartItem.name}
                          </a>
                        </h4>
                        <p className="mt-1 text-sm text-gray-500">color</p>
                        <p className="mt-1 text-sm text-gray-500">size</p>
                      </div>
                      <div className="ml-4 flow-root shrink-0">
                        <button
                          onClick={() => clearItemHandler(cartItem)}
                          type="button"
                          className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <TrashIcon aria-hidden="true" className="size-5" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-1 items-end justify-between ">
                      <p className="mt-1 text-sm font-medium text-gray-900">
                      {cartItem.quantity} × €{cartItem.price.toFixed(2)}
                      </p>
                      <button
                        onClick={() => removeItemHandler(cartItem)}
                        type="button"
                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <ChevronDoubleLeftIcon
                          aria-hidden="true"
                          className="size-5"
                        />
                      </button>
                      <p className="mt-1 text-sm font-medium text-gray-900">
                        {cartItem.quantity}
                      </p>

                      <div className=" grid grid-cols-2">
                        <button
                          onClick={() => addItemHandler(cartItem)}
                          type="button"
                          className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                        >
                          <span className="sr-only">Remove</span>
                          <ChevronDoubleRightIcon
                            aria-hidden="true"
                            className="size-5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </li>
              ))
            ) : (
              <p className="text-gray-500 px-4 py-6">Your cart is empty.</p>
            )}
          </ul>
          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                €{cartTotal.toFixed(2)}
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Shipping</dt>
              <dd className="text-sm font-medium text-gray-900">€{deliveryFee.toFixed(2)}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Taxes</dt>
              <dd className="text-sm font-medium text-gray-900">0.00</dd>
            </div>
            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">
              €{(cartTotal + deliveryFee).toFixed(2)}
              </dd>
            </div>
          </dl>

          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
            >
              Confirm order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderSummary;
