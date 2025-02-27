"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import foto from "../assets/foto.jpg"
import foto1 from "../assets/foto1.jpg"

const images = [
  foto,
  foto1,
  foto,
  foto1,
  foto,
  foto1
];


export default function PhotoSlider() {
  return (
    <div className="w-full flex justify-center">
      <Swiper
        slidesPerView={4} // Exibe 3 imagens ao mesmo tempo
        spaceBetween={5} // Espaçamento suave entre imagens
        autoplay={{ delay: 2000, disableOnInteraction: false }}
        loop={true} // Faz o loop infinito das imagens
        modules={[Autoplay]}
        className="w-auto"
      >
        {images.map((src, index) => (
          <SwiperSlide key={index} className="flex justify-center">
            <img
              src={src}
              alt={`Slide ${index}`}
              className="w-[200px] h-auto rounded-lg shadow-md"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
