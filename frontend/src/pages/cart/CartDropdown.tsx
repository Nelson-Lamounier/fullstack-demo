import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { selectCartItems } from "@/store/cart/cart.selector";
import { setIsCartOpen } from "@/store/cart/cart.slice";


const CartDropdown: FC = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const navigate = useNavigate();


  const goToCheckoutHandler = () => {
    navigate("/checkout");
    dispatch(setIsCartOpen(false));
  };
  return (
    <>
      <div className="absolute inset-x-0 top-10 left-16 mt-px bg-white pb-6 shadow-lg transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in sm:px-2 lg:top-full lg:right-0 lg:left-auto lg:mt-3 lg:-mr-1.5 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black/5 z-10">
        <h2 className="sr-only">Shopping Cart</h2>
        <form className="mx-auto max-w-2xl px-4">
          <ul role="list" className="divide-y divide-gray-200">
            {cartItems.map((item) => (
              <li key={item._id} className="flex items-center py-6">
                <img
                  alt={`${item.name}`}
                  src={item.ImageUrl}
                  className="size-16 flex-none rounded-md border border-gray-200"
                />
                <div className="ml-4 flex-auto">
                  <h3 className="font-medium text-gray-900">
                    <a href={"#"}>{item.name} </a>
                    <br/>
                    <a href={"#"}>{item.quantity} X {item.price}</a>
                  </h3>
                  <p className="text-gray-500">color</p>
                </div>
              </li>
            ))}
          </ul>
          <button
            onClick={goToCheckoutHandler}
            className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-xs hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 focus:outline-hidden"
          >
            Checkout
          </button>
          <p className="mt-6 text-center">
            <a
              href="#"
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            >
              View Shopping Bag
            </a>
          </p>
        </form>
      </div>
    </>
  );
};

export default CartDropdown;
