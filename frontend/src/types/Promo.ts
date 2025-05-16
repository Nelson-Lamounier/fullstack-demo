interface PromoImage {
  src: string;
  alt: string;
}

const promoImages: PromoImage[][] = [
  [
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths6.png",
      alt: "Category 1",
    },
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth20.png",
      alt: "Category 2",
    },
  ],
  [
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth26.png",
      alt: "Favorite 1",
    },
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths7.png",
      alt: "Favorite 2",
    },
  ],
  [
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth27.png",
      alt: "Category 1",
    },
    {
      src: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths1.png",
      alt: "Category 2",
    },
  ],
];

export default promoImages;
