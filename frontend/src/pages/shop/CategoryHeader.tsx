import { FC, useEffect,  useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import catalogHeader from "@/types/CatalogHeader"

const HeaderCatalog: FC  = () => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % catalogHeader.length);
      }, 5000); // Change slide every 5 seconds
      return () => clearInterval(interval);
    }, []);
  
    return (
      <div className="relative isolate overflow-hidden bg-gray-900 py-24 sm:py-32 -z-20">
      <AnimatePresence>
        {catalogHeader.map((video, index) => (
          index === currentIndex && (
            <motion.div
              key={video.id}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="absolute inset-0 -z-10 size-full object-cover"
            >
              <video
                src={video.url}
                autoPlay
                loop
                muted
                className="w-full h-full object-cover"
              />
              
              {/* Title and Caption */}
              <div className="absolute bottom-16 left-8 text-white space-y-4"> 
              <div className="mx-auto max-w-7xl px-6 lg:px-8 ">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="text-5xl font-semibold tracking-tight text-white sm:text-7xl"
                >
                  {video.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.7, duration: 0.8 }}
                  className="mt-8 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8"
                >
                  {video.caption}
                </motion.p>
              </div>
              </div>
            </motion.div>
          )
        ))}
        </AnimatePresence>

      </div>
    )
  }

  export default HeaderCatalog;