export type HomeData = {
    backgroundImage: {
        gradient: string;
        url: string;
      };
}

const homeData: HomeData ={
    backgroundImage: {
        gradient: "linear-gradient(rgba(230, 229, 229, 0.718), rgb(235, 235, 235))",
        url: "https://dbsecommerce.s3.eu-west-1.amazonaws.com/images/landscape/Hero-img-02.jpg",
      },
}

export default homeData;