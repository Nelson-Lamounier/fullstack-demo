import {navigationData} from "@/types";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";

const FlyoutMenus = () => {
  return (
    <>
      <div className="hidden h-full lg:flex">
        {/* Flyout menus */}
        <PopoverGroup className="inset-x-0 bottom-0 px-4">
          <div className="flex h-full justify-center space-x-8 ">
            {navigationData.categories.map((category) => (
              <Popover key={category.name} className="flex">
                <div className="relative flex">
                  <PopoverButton className="relative z-10 -mb-px flex items-center border-b-2 border-transparent pt-px text-sm font-medium text-gray-700 transition-colors duration-200 ease-out hover:text-gray-800 data-open:border-indigo-600 data-open:text-indigo-600">
                    {category.name}
                  </PopoverButton>
                </div>

                <PopoverPanel
                  transition
                  className="absolute inset-x-0 top-full text-sm text-gray-500 transition data-closed:opacity-0 data-enter:duration-200 data-enter:ease-out data-leave:duration-150 data-leave:ease-in"
                >
                  {/* Presentational element used to render the bottom shadow, if we put the shadow on the actual panel it pokes out the top, so we use this shorter element to hide the top of the shadow */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-0 top-1/2 bg-white shadow-sm"
                  />

                  <div className="relative bg-white">
                    <div className="mx-auto max-w-7xl px-8">
                      <div className="grid grid-cols-4 gap-x-8 gap-y-10 py-16">
                        {category.featured.map((item) => (
                          <div key={item.name} className="group relative">
                            <img
                              alt={item.imageAlt}
                              src={item.imageSrc}
                              className="aspect-square w-full rounded-md bg-gray-100 object-cover group-hover:opacity-75"
                            />
                            <Link
                              to={`/category/${item.categoryPath.toLowerCase()}`}
                              className="mt-4 block font-medium text-gray-900"
                            >
                              <span
                                aria-hidden="true"
                                className="absolute inset-0 z-10"
                              />
                              {item.name}
                            </Link>
                            <p aria-hidden="true" className="mt-1">
                              Shop now
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </PopoverPanel>
              </Popover>
            ))}

            {navigationData.pages.map((page) => (
              <Link 
              to={'#'}
                className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800"
              >
                {page.name}
              </Link>
            ))}
          </div>
        </PopoverGroup>
      </div>
    </>
  );
};

export default FlyoutMenus;
