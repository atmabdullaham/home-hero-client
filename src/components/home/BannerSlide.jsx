import { motion } from "framer-motion";
import { Link } from "react-router";

const BannerSlide = ({ img, title, subtitle }) => {
  return (
    <div
      className="h-[510px] md:h-[600px] lg:h-[550px] flex items-center 
bg-linear-to-b from-cyan-50 to-blue-100 
dark:from-gray-900 dark:to-gray-800
overflow-hidden shadow-lg"
    >
      <div className="w-11/12 mx-auto flex flex-col lg:flex-row items-center justify-between gap-10 md:gap-8 lg:gap-0">
        {/* Left section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 text-center lg:text-left 
      text-cyan-700 dark:text-cyan-300 
      space-y-3 md:space-y-5 mt-5 md:mt-0"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight drop-shadow-xl">
            {title}
          </h2>

          <p className="text-sm md:text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            {subtitle}
          </p>

          <Link
            to={"/services"}
            className="btn bg-cyan-600 text-white dark:bg-cyan-500 dark:text-black"
          >
            Explore
          </Link>
        </motion.div>

        {/* Right section */}
        <motion.div
          className="lg:w-1/2 flex justify-center"
          animate={{
            y: [0, -12, 0, 12, 0],
            x: [0, 6, 0, -6, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img
            src={img}
            alt={title}
            className="w-[90%] md:w-[70%] h-auto object-cover 
        rounded-lg shadow-xl brightness-95 dark:brightness-110"
          />
        </motion.div>
      </div>
    </div>
  );
};

export default BannerSlide;
