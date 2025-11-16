import { motion } from "framer-motion";

const BannerSlide = ({ img, title, subtitle }) => {
  return (
    <div className="h-[400px] md:h-[550px] flex flex-col md:flex-row items-center justify-between px-6 md:px-12 bg-gradient-to-r from-cyan-50 to-blue-100 overflow-hidden shadow-lg">
      {/* Left section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7 }}
        className="md:w-1/2 text-center md:text-left text-cyan-700 space-y-3 md:space-y-5 mt-5 md:mt-0"
      >
        <h2 className="text-3xl md:text-5xl font-bold leading-tight drop-shadow-xl">
          {title}
        </h2>

        <p className="text-sm md:text-lg leading-relaxed text-gray-700">
          {subtitle}
        </p>
      </motion.div>

      {/* Right section */}
      <motion.div
        className="md:w-1/2 flex justify-center"
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
          className="w-[90%] md:w-[60%] h-auto object-cover rounded-xl shadow-xl"
        />
      </motion.div>
    </div>
  );
};

export default BannerSlide;
