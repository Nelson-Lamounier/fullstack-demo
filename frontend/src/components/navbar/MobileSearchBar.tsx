/** @format */

import { FC, Dispatch, SetStateAction } from "react";

import { Bars3Icon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface MobileSearchBarProp {
  setOpen: Dispatch<SetStateAction<boolean>>;
}

const MobileSearchBar: FC<MobileSearchBarProp> = ({ setOpen }) => {
  return (
    <>
      {/* Mobile menu and search (lg-) */}
      <div className="flex flex-1 items-center lg:hidden">
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="-ml-2 rounded-md bg-white p-2 text-gray-400"
        >
          <span className="sr-only">Open menu</span>
          <Bars3Icon
            aria-hidden="true"
            className="size-6"
          />
        </button>

        {/* Search */}
        <a
          href="#"
          className="ml-2 p-2 text-gray-400 hover:text-gray-500"
        >
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon
            aria-hidden="true"
            className="size-6"
          />
        </a>
      </div>
    </>
  );
};

export default MobileSearchBar;
