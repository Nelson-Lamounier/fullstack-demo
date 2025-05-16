import Incentive from "@/pages/incentive/Incentive";
import PromoHeader from "@/pages/promo/PromoHeader";

import Hero from "@/pages/hero/Hero"
import CategoryPreview from "@/pages/category/CategoryPreview"


import homeData from "@/types/Home";


import MotionEffect from "../utils/effect/motion";




import Footer from "@/components/Footer";

const Home = () => {
  return (
    <>
      <div
        className="bg-white w-full h-screen bg-cover bg-center bg-no-repeat relative perspective-[100rem] -z-20"
        style={{
          backgroundImage: `
          ${homeData.backgroundImage.gradient},
          url(${homeData.backgroundImage.url})
        `,
        }}
      >
        <Hero />
        <MotionEffect />
        <CategoryPreview />
        <PromoHeader />
        <Incentive />
        <Footer />
      </div>
    </>
  );
};

export default Home;
