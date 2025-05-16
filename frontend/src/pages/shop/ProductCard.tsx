import { FC } from "react";
import { useDispatch } from "react-redux";

import { addItemToCart } from "../../store/cart/cart.slice";
import { CategoryItem } from "../../store/categories/category.slice";

type ProductCardProps = {
  product: CategoryItem;
};

const ProductCard: FC<ProductCardProps> = ({ product }) => {
  const { name, price, ImageUrl, description } = product;
  const dispatch = useDispatch();

  const addProductToCart = () => dispatch(addItemToCart(product));

  return (
    <>
      <div key={product._id}>
        <div className="relative">
          <div className="relative h-72 w-full overflow-hidden rounded-lg">
            <img
              alt={product.ImageUrl}
              src={ImageUrl}
              className="size-full object-cover"
            />
          </div>
          <div className="relative mt-4">
            <h3 className="text-sm font-medium text-gray-900">{name}</h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <div className="relative mt-4">
            <h3 className="text-sm font-small text-gray-400 mt-2">
              {description}
            </h3>
            <p className="mt-1 text-sm text-gray-500"></p>
          </div>
          <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black opacity-50"
            />
            <p className="relative text-sm font-semibold text-black bg-gray-50 p-1 rounded-md">
              €{price}
            </p>
          </div>
        </div>
        <div className="mt-6">
          <button
            onClick={addProductToCart}
            className="relative flex items-center justify-center rounded-md border border-transparent bg-gray-100 px-8 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200"
          >
            Add to bag<span className="sr-only">, {product.name}</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
