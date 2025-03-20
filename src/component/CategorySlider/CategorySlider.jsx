import React, { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";

export default function ProductCarousel() {
  const [categories, setCategories] = useState([]); 

  function getCategories() {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/categories")
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };

  return (
    <div className="container mx-auto my-6 px-4">
    <h2 className="text-2xl font-bold mb-4 text-center">Featured Categories</h2>
    <Slider 
      {...settings}
      responsive={[
        { breakpoint: 1024, settings: { slidesToShow: 4 } }, // Large screens
        { breakpoint: 768, settings: { slidesToShow: 3 } }, // Tablets
        { breakpoint: 640, settings: { slidesToShow: 2 } }  // Mobile
      ]}
    >
      {categories.map((img) => (
        <div key={img._id} className="px-2">
          <img 
            src={img?.image} 
            alt={img?.name} 
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
        </div>
      ))}
    </Slider>
  </div>
  
  );
}
