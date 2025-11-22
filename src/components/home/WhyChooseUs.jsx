import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { AiOutlineSafety } from "react-icons/ai";
import { FaUserCheck } from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";

const cardVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  return (
    <section
      className="bg-linear-to-b from-cyan-50 to-blue-100 
dark:from-gray-900 dark:to-gray-800 py-10 md:py-16"
    >
      <div className="w-11/12 mx-auto">
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
            Why <span className="text-cyan-600">Choose Us</span>
          </h2>
          <p className="text-base md:font-medium text-gray-600">
            Each listing is designed to be clear and concise, providing
            customers
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.2 }}
        >
          {/* Card 1 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg duration-200 text-center "
          >
            <MdOutlineEventAvailable className="text-cyan-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 dark:text-gray-300 mb-2">
              Easy & Fast Booking
            </h3>
            <p className="text-slate-600">
              Book the service you need quickly and effortlessly with just a few
              clicks.
            </p>
          </motion.div>

          {/* Card 2 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg duration-200 text-center"
          >
            <FaUserCheck className="text-cyan-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2 dark:text-gray-300">
              Trusted Service Providers
            </h3>
            <p className="text-slate-600">
              All service providers are verified to ensure quality and reliable
              service.
            </p>
          </motion.div>

          {/* Card 3 */}
          <motion.div
            variants={cardVariant}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 200, damping: 12 }}
            className="bg-base-100 p-6 rounded-xl shadow-md hover:shadow-lg duration-200 text-center"
          >
            <AiOutlineSafety className="text-cyan-600 text-5xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-800 mb-2 dark:text-gray-300">
              Transparent & Reliable
            </h3>
            <p className="text-slate-600">
              Clear pricing, honest reviews, and a safe, secure booking system
              every time.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
