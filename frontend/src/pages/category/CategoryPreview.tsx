import { useState, useEffect } from "react";
import {Categories} from "@/types";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const CategoryPreview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const variants = {
    hidden: { opacity: 0 },
    visible: (index: number) => ({
      opacity: 1,
      transition: { delay: index * -0.1, duration: 0.9, ease: "easeIn" },
    }),
  };

  useEffect(() => {
    const internal = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Categories[0].images.length
      );
    }, 3000);
    return () => clearInterval(internal);
  }, []);

  return (
    <div className="bg-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ">
        <div className="mx-auto max-w-2xl py-16 sm:py-24 lg:max-w-none lg:py-32">
          <h2 className="text-2xl font-bold text-gray-900">Collections</h2>
          <div className="mt-6 space-y-12 lg:grid lg:grid-cols-3 lg:gap-x-6 lg:space-y-0 ">
            {Categories.map((Category) => (
              <div key={Category.name} className="group relative ">
                <div className="w-full  rounded-lg bg-white flow-root text-sm lg:relative object-cover group-hover:opacity-75 max-sm:h-80 sm:aspect-2/1 lg:aspect-square below-md:h-[50rem]">
                  {Category.images.map((image, index) => (
                    <motion.img
                      key={index}
                      alt={image.imageAlt}
                      src={image.imageSrc}
                      className="absolute top-0 left-0  object-cover h-auto "
                      variants={variants}
                      custom={index} // Pass index for dynamic delay
                      initial="hidden" // Start with hidden variant
                      animate={index === currentIndex ? "visible" : "hidden"}
                    />
                  ))}
                </div>
                <h3 className="mt-6 text-sm text-gray-500">
                  <Link to={`/category/${Category.name.toLowerCase()}`}>
                    <span className="absolute inset-0" />
                    {Category.name}
                  </Link>
                </h3>
                <p className="text-base font-semibold text-gray-900">
                  {Category.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryPreview;
