import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



const CarouselCard = ({data}) => {

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1,

    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,

    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,

    }
  };

  return (
    <div className="col-span-4  rounded-xl overflow-hidden">
      <Carousel responsive={responsive}>
        {data.land_media.map((landMedia)=>{
          return(
            <div key={landMedia.image} className="w-full h-[250px] relative"> 
            
            <Image src={landMedia.image} objectFit="cover" layout="fill" alt="plot image"/>
          </div>
          )
        })}
      </Carousel>
      <div className="h-[120px] bg-red-200 w-full"></div>
    </div>
  );
};

export default CarouselCard;
