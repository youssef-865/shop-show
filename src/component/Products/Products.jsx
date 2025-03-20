import axios from "axios";
import React, { useContext } from "react";
import Loader from './../loader/Loader';
import { Link } from "react-router-dom"; 
import CategorySlider from "../CategorySlider/CategorySlider";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import MainSlider from "../MainSlider/MainSlider";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";

//  getProducts function
const getProducts = async () => {
  const { data } = await axios.get("https://ecommerce.routemisr.com/api/v1/products");
  return data.data;  
};

export default function Products() {
  <Helmet>
  <title>Product</title>
</Helmet>

  let { data, isFetching } = useQuery({
    queryKey: ['recentProduct'],
    queryFn: getProducts,
    // refetchInterval:3000,
    staleTime:4000,
   
  });

  let { addProductToCart } = useContext(CartContext);

  async function getProductsItem(productId) {
    try {
      let response = await addProductToCart(productId);
      toast.success(response.data.message, {
        duration: 1000,
        position: 'top-center',
      });
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }

  return (
    <>
      <MainSlider />
      <CategorySlider />
      <div className="text-2xl text-center font-bold py-4">All products</div>
      <div className="container mx-auto px-4">
        {!isFetching ? (
          <div className="flex flex-wrap justify-center gap-4">
            {data?.map((productInfo) => (
              <div key={productInfo.id} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 block bg-white shadow-md rounded-lg overflow-hidden p-3 transition transform hover:scale-105">
                <Link to={`/productDetails/${productInfo.id}/${productInfo.category.name}`}>
                  <img src={productInfo.imageCover} alt={productInfo.title} className="w-full h-48 object-cover rounded-md" />
                  <span className="block text-sm font-medium text-green-600 mt-2">{productInfo.category.name}</span>
                  <span className="block text-md font-semibold text-gray-700 truncate">
                    {productInfo.title.split(" ").splice(0, 3).join(" ")}
                  </span>
                  <div className="flex justify-between items-center my-3">
                    <span className="text-lg font-bold">{productInfo.price} EGP</span>
                    <span className="flex items-center gap-1">
                      {productInfo.ratingsQuantity}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>
                <div className="my-auto flex justify-center">
                  <button onClick={() => getProductsItem(productInfo.id)} className="cursor-pointer w-60 mx-auto text-center bg-green-400 text-white py-1 rounded-xl shadow-md hover:bg-green-600 transition">
                    Add to Cart
                  </button>
                </div>
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
