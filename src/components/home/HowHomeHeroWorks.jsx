import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { FaCalendarAlt, FaSearch, FaStar, FaTools } from "react-icons/fa";

const HowHomeHeroWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);
  const steps = [
    {
      title: "Browse Services",
      icon: <FaSearch className="text-cyan-500 w-10 h-10" />,
      description:
        "Explore trusted local providers like electricians, plumbers, and cleaners.",
    },
    {
      title: "Select & Book",
      icon: <FaCalendarAlt className="text-cyan-500 w-10 h-10" />,
      description:
        "Pick your service, choose a convenient date & time, and book instantly.",
    },
    {
      title: "Get it Done",
      icon: <FaTools className="text-cyan-500 w-10 h-10" />,
      description:
        "A verified service provider arrives at your home to complete the job efficiently.",
    },
    {
      title: "Rate & Review",
      icon: <FaStar className="text-cyan-500 w-10 h-10" />,
      description:
        "Share your feedback to help others find the best local heroes.",
    },
  ];

  return (
    <section className="py-10 md:py-16 bg-gray-100 dark:bg-gray-900">
      <div className="w-11/12 mx-auto text-center">
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
            How Home Hero <span className="text-cyan-600">Works?</span>
          </h2>
          <p className="text-base md:font-medium text-gray-600">
            Get your home services done in 4 simple steps
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className="card bg-white dark:bg-gray-800 shadow-md hover:shadow-xl transition-shadow p-6 rounded-xl text-center flex flex-col items-center"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-2">
                {step.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowHomeHeroWorks;
