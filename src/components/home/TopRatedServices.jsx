import { motion, useAnimation, useInView } from "framer-motion";
import { use, useEffect, useRef } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import { Link } from "react-router";
import ServiceCard from "../ServiceCard";

const TopRatedServices = ({ featuredPromise }) => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();
  const data = use(featuredPromise);
  console.log(data.data);
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <div className="w-11/12 lg:w-9/12 mx-auto  py-10 md:py-16">
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
        <h2 className="text-2xl md:text-3xl font-bold">
          Top Rated <span className="text-cyan-600">Services</span>
        </h2>
        <p className="text-base md:font-medium text-gray-600">
          Each listing is designed to be clear and concise, providing customers
        </p>
      </motion.div>
      <motion.div
        ref={ref}
        variants={{
          hidden: { opacity: 0, y: 50 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        animate={controls}
        transition={{ duration: 1.5 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {data?.data?.map((d) => (
          <ServiceCard key={d._id} service={d}></ServiceCard>
        ))}
      </motion.div>
      <div className="flex justify-center pt-10">
        <Link to={"/services"} className="btn bg-black text-white">
          View all <FaArrowRightLong />
        </Link>
      </div>
    </div>
  );
};

export default TopRatedServices;
