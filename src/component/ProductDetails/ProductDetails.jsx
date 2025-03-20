import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import Loader from "../loader/Loader";
import Category from "./../Category/Category";
import { CartContext } from "../../context/CartContext";
import toast from "react-hot-toast";
import Slider from "react-slick";

export default function ProductDetails() {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  
  let { addProductToCart } = useContext(CartContext);
  let { id } = useParams();
  const [Details, setDetails] = useState(null); 
 
 
  async function getProductsItem(productId) {
    try {
      let response = await addProductToCart(productId);
      toast.success(response.data.message,
        {
          duration: 1000,
          position: 'top-center',
      }); 
    } catch (error) {
      toast.error("Failed to add product to cart");
    }
  }


  function getProductDetails() {
    if (!id) {
      // console.error("Product ID is missing!");
      return;
    }

    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        // console.log(data.data);
        setDetails(data.data);
      })
      .catch((error) => {
        // console.error("Error fetching product details:", error);
      });
  }

  useEffect(() => {
    getProductDetails();
  }, [id]);

  if (!Details) return <Loader />;


  return (
    <>
      <div>
        <div className="flex justify-center flex-row">
          <div className="w-1/4  p-4">

          <Slider {...settings}>
     {Details?.images?.map((src)=>{
      return  <img 
       className="w-full"
       src={src}
       alt=''
     />
     })}
 
    </Slider>
           
          </div>
          <div className="w-1/2 p-4 flex flex-col justify-end">
            <h1 className="text-xl font-semibold text-slate-800 mt-2 ">
              {Details?.title}
            </h1>
            <p className="mt-2">{Details.description}</p>
            <p className="">{Details?.category?.name}</p>
            <div className="flex justify-between mt-2">
              <span>{Details?.price}EGP</span>
              <span>
                {Details?.ratingsQuantity}
                <i className="fas fa-star text-yellow-400"></i>
              </span>
            </div>
            <button
              onClick={() => getProductsItem(Details.id)}
              className="cursor-pointer mt-4 bg-green-500 text-white px-6 py-1 rounded-lg shadow-md hover:bg-green-600 transition"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
      <Category categoryName={Details?.category?.name} />
    </>
  );
}
