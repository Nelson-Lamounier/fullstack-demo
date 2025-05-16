import { Outlet } from "react-router-dom";



import Navbar from "@/components/navbar/Navbar";

const Navigation = () => {
  return (
    <>
      <div className="-z-100">
        <Navbar />
        <Outlet />
      </div>
    </>
  );
};

export default Navigation;
