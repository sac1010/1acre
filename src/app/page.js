"use client";

import CarouselCard from "@/components/CarouselCard";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, [page]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://prod-be.1acre.in/lands/?ordering=-updated_at&page=${page}&page_size=10`
      );
      const newData = await response.json();
      console.log(newData.count, "res");
      setData((prevData) => [...prevData, ...newData.results]);
      setCount(newData.count);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
    }
  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      console.log("next page")
      setPage(prevPage => prevPage + 1); 
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="xl:max-w-7xl w-full px:4 xl:px-0 min-h-screen mx-auto">
      {count && (
        <div className=" text-center my-4 font-semibold">{`${count} Lands`}</div>
      )}
      <div className="grid grid-cols-12 gap-7 py-5">
        {data.map((plot) => {
          return <CarouselCard key={plot?.id} data={plot} />;
        })}
      </div>
      <div className="w-full flex items-center justify-center">

      {loading && <Image width={100} alt="loader" unoptimized height={100} src={"/loader.gif"}/>}
      </div>
    </div>
  );
}
