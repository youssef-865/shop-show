import React from 'react';
import Slider from "react-slick"; // ✅ Import Slider from react-slick
import "slick-carousel/slick/slick.css"; // ✅ Import required styles
import "slick-carousel/slick/slick-theme.css"; // ✅ Import required styles
import img3 from '../../assets/img/slider-image-1.jpeg';
import img1 from '../../assets/img/slider-image-2.jpeg';
import img2 from '../../assets/img/slider-image-3.jpeg';
import img4 from '../../assets/img/slider-2.jpeg';

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
  };

  return (
    <div className="container mx-auto">
      <div className=" flex pb-3">
        <div className="w-1/3 ">
        <img src={img1} alt="Slide 1" className="w-full imgAbove  "/>
        <img src={img2} alt="Slide 2" className="w-full imgAbove "/>
      </div>

      <div className='w-2/3'>
      <Slider {...settings}>
        
          <img src={img3} alt="Slide 3" className="w-full imgNext "/>
          <img src={img4} alt="Slide 4" className="w-full imgNext "/>
          </Slider>
        </div>
      </div>
    </div>
  );
}
