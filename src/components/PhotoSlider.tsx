"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";
// Import das imagens
import IMG_01 from "../assets/1.png";
import IMG_02 from "../assets/2.png";
import IMG_03 from "../assets/3.png";
import IMG_04 from "../assets/4.png";
import IMG_05 from "../assets/5.png";
import IMG_06 from "../assets/6.png";
import IMG_07 from "../assets/7.png";
import IMG_08 from "../assets/8.png";
import IMG_09 from "../assets/9.png";
import IMG_10 from "../assets/10.png";
import IMG_11 from "../assets/11.png";
import IMG_12 from "../assets/12.png";
import IMG_13 from "../assets/13.png";
import IMG_14 from "../assets/14.png";
import React from "react";

// Array de imagens
const images = [
  { name: "IMG_01", src: IMG_01 },
  { name: "IMG_02", src: IMG_02 },
  { name: "IMG_03", src: IMG_03 },
  { name: "IMG_04", src: IMG_04 },
  { name: "IMG_05", src: IMG_05 },
  { name: "IMG_06", src: IMG_06 },
  { name: "IMG_07", src: IMG_07 },
  { name: "IMG_08", src: IMG_08 },
  { name: "IMG_09", src: IMG_09 },
  { name: "IMG_10", src: IMG_10 },
  { name: "IMG_11", src: IMG_11 },
  { name: "IMG_12", src: IMG_12 },
  { name: "IMG_13", src: IMG_13 },
  { name: "IMG_14", src: IMG_14 },
];


export default function PhotoSlider() {
  console.log(images); 
  return (
    <div className="w-full flex justify-center">
      <Swiper
        slidesPerView={1} 
        spaceBetween={10}
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full" 
        breakpoints={{
          640: {
            slidesPerView: 2, 
          },
          768: {
            slidesPerView: 3, 
          },
          1024: {
            slidesPerView: 4, 
          },
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={image.src}
              alt={image.name}
              className="w-full h-auto rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}