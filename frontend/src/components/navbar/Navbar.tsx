import { useState, FC } from "react";
import MobileNavbar from "./MobileBar";
import NavbarTop from "./NavbarTop";
import FlyoutMenus from "./FlyoutMenu";
import MobileSearchBar from "./MobileSearchBar";
import ShoppingCard from "./ShoppingCart";

import Logo from "../logo/Logo";
import LogoSmall from "../logo/LogoSm";



import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";

const Navbar: FC = () => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-white uppercase font-funnel font-[300]">
      {/* Mobile menu */}
      <MobileNavbar open={open} setOpen={setOpen} />
      <header className="relative">
        <nav aria-label="Top">
          <NavbarTop />
          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <Logo />
                  <FlyoutMenus />
                  {/* Mobile menu and search (lg-) */}
                  <MobileSearchBar setOpen={setOpen} />
                  {/* Logo (lg-) */}
                  <LogoSmall />

                  <div className="flex flex-1 items-center justify-end">
                    <a
                      href="#"
                      className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                    >
                      Search
                    </a>

                    <div className="flex items-center lg:ml-8">
                      {/* Help */}
                      <a
                        href="#"
                        className="p-2 text-gray-400 hover:text-gray-500 lg:hidden"
                      >
                        <span className="sr-only">Help</span>
                        <QuestionMarkCircleIcon
                          aria-hidden="true"
                          className="size-6"
                        />
                      </a>
                      <a
                        href="#"
                        className="hidden text-sm font-medium text-gray-700 hover:text-gray-800 lg:block"
                      >
                        Help
                      </a>

                      {/* Cart */}
                      <ShoppingCard />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;


