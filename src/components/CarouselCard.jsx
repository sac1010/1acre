import Image from "next/image";
import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const CarouselCard = ({ data }) => {
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
    },
  };

  return (
    <div className="col-span-12 sm:col-span-6 md:col-span-4 rounded-xl overflow-hidden border-2 hover:shadow-md">
      <Carousel infinite responsive={responsive}>
        {data.land_media.map((landMedia) => {
          return (
            <div key={landMedia.image} className="w-full h-[250px] relative">
              <Image
                src={landMedia.image}
                objectFit="cover"
                layout="fill"
                alt="plot image"
              />
            </div>
          );
        })}
      </Carousel>
      <div className=" py-4 w-full px-4">
        <div className="text-lg font-semibold flex items-center gap-5">
          <div className="">
          {data.village_name}, {data.mandal_name} 
          </div>
          <img src="./verified-active.svg" className="w-5 h-5" alt="verified" />
          {data.is_exact && <img src="./property-vote.svg" className="w-5 h-5" alt="vote" />}

        </div>
        <div className="text-lg font-semibold my-1">{data.district_name}</div>
        <div className="text-sm">
          {data.total_land_size_in_acres.acres !== 0 && (
            <span className="font-semibold">{`${data.total_land_size_in_acres.acres} acres .`}</span>
          )}{" "}
          {data.total_land_size_in_acres.guntas !== 0 && (
            <span className="font-semibold">{`${data.total_land_size_in_acres.guntas} guntas . `}</span>
          )}
          {data.price_per_acre_crore.crore !== 0 && (
            <span>{`${data.price_per_acre_crore.crore} crores `}</span>
          )}
          {data.price_per_acre_crore.crore.lakh !== 0 && (
            <span>{`${data.price_per_acre_crore.lakh} lakhs`}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarouselCard;
