import React from "react";
import { Autoplay, EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";

const slides = [
  {
    id: 1,
    image: slide1,
    subtitle: "Art & Design",
    title: "Let Your Walls Tell Stories",
  },
  {
    id: 2,
    image: slide2,
    subtitle: "Transform Your Space",
    title: "Your Online Shop for Wall Art",
  },
  {
    id: 3,
    image: slide3,
    subtitle: "New Collection",
    title: "Art Prints For Stylish Interiors",
  },
];

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination, EffectFade]}
        effect="fade"
        className="mySwiper"
        breakpoints={{
          320: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          640: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
          1024: {
            slidesPerView: 1,
            spaceBetween: 0,
          },
        }}
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div className="relative w-full h-full">
              <img src={slide.image} alt={slide.title} />

              <div className="absolute inset-0 bg-black/10 flex flex-col items-center justify-center text-center px-4">
                <span className="slide-subtitle">{slide.subtitle}</span>
                <h2 className="slide-title">{slide.title}</h2>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Slider;
