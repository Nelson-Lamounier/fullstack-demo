export type Currency = string;

export type FeaturedItem = {
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  categoryPath: string;
};

export type Category = {
  name: string;
  featured: FeaturedItem[];
};

export type NavigationPage = {
  name: string;
  href: string;
};

export type NavigationData = {
  currencies: Currency[];
  categories: Category[];
  pages: NavigationPage[];
};

const navigationData: NavigationData = {
  currencies: ['CAD', 'USD', 'AUD', 'EUR', 'GBP'],
  categories: [
    {
      name: 'WOMEN',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/cloths/women-cloths6.png',
          imageAlt: 'Models sitting back to back, wearing Basic Tee in black and bone.',
          categoryPath:"Arrivals01",
        },
        
        {
          name: 'Basic Tees',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/basic/women-basic9.png',
          imageAlt: 'Close up of Basic Tee fall bundle with off-white, ochre, olive, and black tees.',
          categoryPath:"Basic01"
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesories/women-accesories11.png',
          imageAlt: 'Model wearing minimalist watch with black wristband and white watch face.',
          categoryPath:"Accessories01"
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/women/accesorios/women-accesorios9.png',
          imageAlt: 'Model opening tan leather long wallet with credit card pockets and cash pouch.',
          categoryPath:"Carry01"
        },
      ],
    },
    {
      name: 'MEN',
      featured: [
        {
          name: 'New Arrivals',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/cloths/mens-cloth21.png',
          imageAlt: 'Hats and sweaters on wood shelves next to various colors of t-shirts on hangers.',
          categoryPath:"Arrivals02"
        },
        {
          name: 'Basic Utils',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/basic/men-basic1.png',
          imageAlt: 'Model wearing light heather gray t-shirt.',
          categoryPath:"Basic02"
        },
        {
          name: 'Accessories',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/wallet/mens-wallet2.png',
          imageAlt:
            'Grey 6-panel baseball hat with black brim, black mountain graphic on front, and light heather gray body.',
            categoryPath:"Accessories02"
        },
        {
          name: 'Carry',
          href: '#',
          imageSrc: 'https://freelancer-websites.s3.eu-west-1.amazonaws.com/gymbs-ecommerce/preview/men/accesorios/mens-accessorios2.png',
          imageAlt:
            'Model putting folded cash into slim card holder olive leather wallet with hand stitching.',
            categoryPath:"Carry02"
        },
      ],
    },
  ],
  pages: [
    { name: 'Company', href: '#' },
    { name: 'Stores', href: '#' },
  ],
  
};

export default navigationData;