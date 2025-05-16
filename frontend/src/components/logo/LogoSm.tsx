import { Link } from "react-router-dom";
const LogoSmall = () => {
  return (
    <>
      {/* Logo (lg-) */}
      <Link to="/" className="lg:hidden">
        <span className="sr-only">GymBS Clothing</span>
        <img
          alt=""
          src="https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/logo/nelson_18055_A_sleek_modern_gym-wear_brand_logo_with_the_name_715b934e-15de-4ba7-93f4-b7cef06de036_2.png"
          className="h-8 w-auto"
        />
      </Link>
    </>
  );
};

export default LogoSmall;
