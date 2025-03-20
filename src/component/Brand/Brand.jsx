import axios from "axios";
import React from "react";
import Loader from "./../loader/Loader";
import { useQuery } from "@tanstack/react-query";

const getBrand = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/brands");
  return data.data;
};

export default function Brands() {
  let { data, isFetching } = useQuery({
    queryKey: ["brands"],
    queryFn: getBrand,
    // staleTime: 4000,
  });

  return (
    <>
      <div className="text-2xl text-center font-bold py-4">All Brands</div>
      <div className="container mx-auto px-4">
        {!isFetching ? (
          <div className="flex flex-wrap justify-center gap-4">
            {data?.map((brand) => (
              <div
                key={brand?._id}
                className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 block bg-white shadow-md rounded-lg overflow-hidden p-3 transition transform hover:scale-105"
              >
                <img src={brand.image} alt={brand.name} className="w-full h-48 object-cover rounded-md" />
                <span className="block text-md font-semibold text-gray-700 mt-2 text-center">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        ) : (
          <Loader />
        )}
      </div>
    </>
  );
}
