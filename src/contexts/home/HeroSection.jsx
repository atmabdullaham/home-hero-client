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
            title={"Electrician is available for your service"}
            subtitle={"We provide best reasonable service for this"}
          ></BannerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            img={plumberImg}
            title={"Electrician is available for your service"}
            subtitle={"We provide best reasonable service for this"}
          ></BannerSlide>
        </SwiperSlide>
        <SwiperSlide>
          <BannerSlide
            img={cleaningImg}
            title={"Electrician is available for your service"}
            subtitle={"We provide best reasonable service for this"}
          ></BannerSlide>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default HeroSection;
