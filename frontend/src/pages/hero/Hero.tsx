import heroData from "@/types/Hero";

const Hero: React.FC = () => {
  return (
      <div className="relative isolate pt-14 uppercase font-roboto font-thin -z-10 ">
        <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:gap-x-10 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-2xl lg:mx-0 lg:flex-auto">
            <h1 className="mt-10 text-5xl font-semibold tracking-tight text-gray-900 sm:text-7xl below-md:-mt-20 below-md:w-[25rem] below-md:text-[4rem]">
              {heroData.heroContent.title}
            </h1>
            <p className="mt-8 text-lg font-medium text-gray-500 sm:text-xl below-md:w-[55%] below-md:text-[1rem]">
              {heroData.heroContent.description}
            </p>
            <div className="mt-10 flex items-center gap-x-6">
              <a
                href={heroData.heroContent.cta.href}
                className="text-sm/6 font-semibold text-gray-900"
              >
                {heroData.heroContent.cta.text}{" "}
                <span aria-hidden="true">{heroData.heroContent.cta.icon}</span>
              </a>
            </div>
          </div>
          <div className="mt-16 sm:mt-24 lg:mt-0 lg:grow absolute top-[5rem] left-[50%]">
            <img
              alt={heroData.heroImage.alt}
              src={heroData.heroImage.src}
              className="w-full h-auto object-cover below-md:h-[50rem]"
            />
          </div>
        </div>
      </div>

  );
};

export default Hero;


