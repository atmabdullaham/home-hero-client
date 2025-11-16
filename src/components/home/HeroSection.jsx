import "swiper/css";
import "swiper/css/autoplay";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import cleaningImg from "../../assets/cleaning.jpg";
import electritianImg from "../../assets/electrician.jpg";
import plumberImg from "../../assets/plumbing.jpg";
import BannerSlide from "./BannerSlide";

const HeroSection = () => {
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        loop={true}
        slidesPerView={1}
        className="overflow-hidden"
      >
        <SwiperSlide>
          <BannerSlide
            img={electritianImg}
            title={"Expert Electrical Repairs & Installations"}
            subtitle={
              "From wiring to appliance fixes get fast, safe, and certified electrical service for your home or business."
            }
          ></BannerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            img={plumberImg}
            title={"Reliable Plumbing Solutions for Every Home"}
            subtitle={
              "Leak repair, pipeline installation, drain cleaning and more handled by trusted professional plumbers."
            }
          ></BannerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            img={cleaningImg}
            title={"Premium Home & Office Cleaning Services"}
            subtitle={
              "Deep cleaning, regular maintenance, and eco-friendly cleaning solutions experience a spotless space every time."
            }
          ></BannerSlide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
