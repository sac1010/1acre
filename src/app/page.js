"use client"
import CarouselCard from "@/components/CarouselCard";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();
  const [loading, setLoading] = useState(false);
  const [isFetchingNextPage, setIsFetchingNextPage] = useState(false);
  const [initialLoadCompleted, setInitialLoadCompleted] = useState(false);
  const observerTarget = useRef(null);

  useEffect(() => {
    fetchData();
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (initialLoadCompleted && entries[0].isIntersecting && !isFetchingNextPage) {
          setIsFetchingNextPage(true);
          setPage((prevPage) => prevPage + 1);
        }
      },
      { threshold: 1 }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (observerTarget.current) {
        observer.unobserve(observerTarget.current);
      }
    };
  }, [isFetchingNextPage, initialLoadCompleted]); 

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
      setIsFetchingNextPage(false);
      setInitialLoadCompleted(true); 
    } catch (error) {
      console.error("Error fetching data:", error);
      setLoading(false);
      setIsFetchingNextPage(false); 
      setInitialLoadCompleted(true);
    }
  };

  return (
    <div className="2xl:max-w-7xl w-full px-4 2xl:px-0 min-h-screen mx-auto flex flex-col items-center justify-center">
      {count && (
        <div className=" text-center my-4 font-bold text-xl">{`${count} Lands`}</div>
      )}
      <div className="grid grid-cols-12 gap-7 py-5">
        {data.map((plot) => {
          return <CarouselCard key={plot.id} data={plot} />;
        })}
      </div>
      <div ref={observerTarget} className="w-full flex items-center justify-center">
        {loading && (
          <Image
            width={100}
            alt="loader"
            unoptimized
            height={100}
            src={"/loader.gif"}
          />
        )}
      </div>
    </div>
  );
}

