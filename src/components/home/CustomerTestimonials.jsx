import { motion, useAnimation, useInView } from "framer-motion";
import { FaQuoteLeft, FaStar } from "react-icons/fa";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import { useEffect, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

const CustomerTestimonials = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Regular User",
      review:
        "Booking a service was super fast and easy. I got a reliable provider within minutes!",
      rating: 5,
    },
    {
      name: "Mahir Hossain",
      role: "Home Service User",
      review:
        "A trustworthy platform! The service quality was amazing and the pricing was clear.",
      rating: 4,
    },
    {
      name: "Rakibul Islam",
      role: "Service Provider",
      review:
        "This platform helped me reach more clients and grow my business very quickly.",
      rating: 5,
    },
    {
      name: "Nusrat Jahan",
      role: "Customer",
      review:
        "Loved the experience! The verification system made me feel safe booking services.",
      rating: 5,
    },
    {
      name: "Tamim Khan",
      role: "Premium User",
      review:
        "Clean UI, fast booking, and excellent support. Definitely recommended!",
      rating: 4,
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-gray-100 dark:bg-gray-900">
      <div className="w-11/12 mx-auto lg:px-4">
        <motion.div
          ref={ref}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0 },
          }}
          initial="hidden"
          animate={controls}
          transition={{ duration: 0.7 }}
          className="text-start md:text-center pb-5 md:pb-10 space-y-2"
        >
          <h2 className=" text-2xl md:text-3xl font-bold dark:text-gray-300">
            Customer <span className="text-cyan-600">Testomonials</span>
          </h2>
          <p className="text-base md:font-medium text-gray-600">
            Read real reviews from satisfied customers who found trusted, vetted
            professionals quickly and confidently.
          </p>
        </motion.div>

        <Swiper
          modules={[Pagination, Autoplay]}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 2500 }}
          loop={true}
          spaceBetween={20}
        >
          {testimonials.map((t, index) => (
            <SwiperSlide key={index}>
              <div className="bg-base-100 p-6 md:p-8 rounded-xl  duration-300 w-full lg:w-6/12 mx-auto">
                <FaQuoteLeft className="text-cyan-600 text-3xl mb-3" />

                {/* Review text */}
                <p className="text-slate-600 mb-4 leading-relaxed">
                  “{t.review}”
                </p>

                {/* Star Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-lg" />
                  ))}
                </div>

                {/* Name + Role */}
                <h3 className="text-slate-800 dark:text-slate-200 font-semibold">
                  {t.name}
                </h3>
                <p className="text-slate-500 text-sm">{t.role}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default CustomerTestimonials;
