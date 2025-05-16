  
  export type HeroData = {
    backgroundImage: {
      gradient: string;
      url: string;
    };
    heroContent: {
      title: string;
      description: string;
      cta: {
        text: string;
        href: string;
        icon: string;
      };
    };
    heroImage: {
      alt: string;
      src: string;
    };
  };
  
  const heroData: HeroData = {
    backgroundImage: {
      gradient: "linear-gradient(rgba(230, 229, 229, 0.718), rgb(235, 235, 235))",
      url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/landscape/Hero-img-02.jpg",
    },
    heroContent: {
      title: "Live a life others don’t understand",
      description:
        "Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua. Anim aute id magna aliqua ad ad non deserunt sunt.",
      cta: {
        text: "Learn more",
        href: "#",
        icon: "→",
      },
    },
    heroImage: {
      alt: "Responsive Image",
      src: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/Man/hero-img.png",
    },
  };
  
  export default heroData;