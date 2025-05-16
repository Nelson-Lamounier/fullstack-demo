import promoImages from "@/types/Promo"

const PromoImages = () => {
  return (
    <>
      <div className="absolute -top-32 left-1/2 min-w-max -translate-x-1/2 transform sm:top-6 sm:translate-x-0">
        <div className="ml-24 flex space-x-6 sm:ml-3 lg:space-x-8">
          {promoImages.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="flex space-x-6 sm:flex-col sm:space-y-6 sm:space-x-0 lg:space-y-8"
            >
              {group.map((image, imageIndex) => (
                <div
                  key={imageIndex}
                  className={`shrink-0 ${imageIndex > 0 ? "mt-6 sm:mt-0" : ""}`}
                >
                  <img
                    alt={image.alt}
                    src={image.src}
                    className="size-64 rounded-lg object-cover md:size-72"
                  />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PromoImages;
