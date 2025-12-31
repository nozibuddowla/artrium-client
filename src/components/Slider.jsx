import React from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/effect-fade";

import slide1 from "../assets/slide-1.jpg";
import slide2 from "../assets/slide-2.jpg";
import slide3 from "../assets/slide-3.jpg";
import slide4 from "../assets/slide-4.jpg";
import slide5 from "../assets/slide-5.jpg";
import slide6 from "../assets/slide-6.jpg";
import slide7 from "../assets/slide-7.jpg";
import slide8 from "../assets/slide-8.jpg";
import slide9 from "../assets/slide-9.jpg";

const Slider = () => {
  return (
    <div className="slider-container">
      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        loop={true}
        grabCursor={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
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
        <SwiperSlide>
          <img src={slide1} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide2} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slide3}
            alt="Drone Light Show Over City Skyline at Night"
            loading="lazy"
          />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide4} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide5} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide6} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img
            src={slide7}
            alt="Bright Yellow Frog on a Woodland Log"
            loading="lazy"
          />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide8} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
        <SwiperSlide>
          <img src={slide9} alt="" loading="lazy" />
          <div className="slide-overlay"></div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default Slider;
