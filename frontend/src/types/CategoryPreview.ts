type Image =  {
  imageSrc: string;
  imageAlt: string;
}

export type Categories = {
    name: string;
    description: string;
    images: Image[];
   
}

const Categories: Categories[] = [
    {
      name: 'Womens',
      description: 'Stylish activewear.',
      images: [
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths1.png",
          imageAlt: "Women wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths12.png",
          imageAlt: "Women wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths10.png",
          imageAlt: "Women wearing gym clothes",
        },
      ],
      
    },
    {
      name: 'Mens',
      description: 'Performance-ready wear',
      images: [
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth22.png",
          imageAlt: "Man wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth10.png",
          imageAlt: "Man wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth16.png",
          imageAlt: "Man wearing gym clothes",
        },
      ],
      
    },
    {
      name: 'Sales',
      description: 'Exclusive deals, shop now',
      images: [
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths12.png",
          imageAlt: "Man wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth21.png",
          imageAlt: "Man wearing gym clothes",
        },
        {
          imageSrc: "https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth20.png",
          imageAlt: "Women wearing gym clothes",
        },
      ],
    },
  ]

  export default Categories;