"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import { Autoplay, Pagination } from "swiper/modules";

// Import das imagens
import IMG_01 from "../assets/IMG_01.jpg";
import IMG_0409 from "../assets/IMG_0409.jpg";
import IMG_1254 from "../assets/IMG_1254.jpg";
import IMG_1256 from "../assets/IMG_1256.jpg";
import IMG_1262 from "../assets/IMG_1262.jpg";
import IMG_1286 from "../assets/IMG_1286.jpg";
import IMG_1382 from "../assets/IMG_1382.jpg";
import IMG_1569 from "../assets/IMG_1569.jpg";
import IMG_2088 from "../assets/IMG_2088.jpg";
import IMG_2202 from "../assets/IMG_2202.jpg";
import IMG_2964 from "../assets/IMG_2964.jpg";
import IMG_2965 from "../assets/IMG_2965.jpg";
import IMG_3361 from "../assets/IMG_3361.jpg";
import IMG_8867 from "../assets/IMG_8867.jpg";

// Array de imagens
const images = [
  { name: "IMG_01", src: IMG_01 },
  { name: "IMG_0409", src: IMG_0409 },
  { name: "IMG_1254", src: IMG_1254 },
  { name: "IMG_1256", src: IMG_1256 },
  { name: "IMG_1262", src: IMG_1262 },
  { name: "IMG_1286", src: IMG_1286 },
  { name: "IMG_1382", src: IMG_1382 },
  { name: "IMG_1569", src: IMG_1569 },
  { name: "IMG_2088", src: IMG_2088 },
  { name: "IMG_2202", src: IMG_2202 },
  { name: "IMG_2964", src: IMG_2964 },
  { name: "IMG_2965", src: IMG_2965 },
  { name: "IMG_3361", src: IMG_3361 },
  { name: "IMG_8867", src: IMG_8867 },
];

export default function PhotoSlider() {
  console.log(images); // Verifica se as imagens estão sendo carregadas corretamente

  return (
    <div className="w-full flex justify-center">
  <Swiper
    slidesPerView={4} 
    spaceBetween={10}
    autoplay={{ delay: 2000, disableOnInteraction: false }}
    loop={true}
    pagination={{ clickable: true }}
    modules={[Autoplay, Pagination]}
    className="w-full" // Garante que o Swiper ocupe toda a largura
  >
    {images.map((image, index) => (
      <SwiperSlide key={index} className="w-full flex justify-center">
        <img              
          src={image.src} 
          alt={image.name}
          className="w-[300px] h-auto rounded-lg shadow-md"
        />
      </SwiperSlide>
    ))}
  </Swiper>
</div>
  );
}
