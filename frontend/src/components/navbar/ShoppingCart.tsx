import { useDispatch, useSelector } from "react-redux";
import { selectCartCount, selectIsCartOpen } from "@/store/cart/cart.selector";
import { setIsCartOpen } from "@/store/cart/cart.slice";

import CartDropdown from "@/pages/cart/CartDropdown";

import { ShoppingBagIcon } from "@heroicons/react/24/outline";

const ShoppingCard = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartCount);
  const isCartOpen = useSelector(selectIsCartOpen);

  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

  return (
    <>
      {/* Cart */}
      <div className="ml-4 flow-root text-sm lg:relative lg:ml-8 ">
        <button
          onClick={toggleIsCartOpen}
          className="group -m-2 flex items-center p-2"
        >
          <ShoppingBagIcon
            aria-hidden="true"
            className="size-6 shrink-0 text-gray-400 group-hover:text-gray-500"
          />

          <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
            {cartCount}
          </span>
          <span className="sr-only">items in cart, view bag</span>
        </button>
        {isCartOpen && <CartDropdown />}
      </div>
    </>
  );
};

export default ShoppingCard;
