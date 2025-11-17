import { Suspense } from "react";
import CustomerTestimonials from "../components/home/CustomerTestimonials";
import FeaturedServices from "../components/home/FeaturedServices";
import HeroSection from "../components/home/HeroSection";
import WhyChooseUs from "../components/home/WhyChooseUs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const featuredPromise = axiosPublic.get("/featured/services");
  return (
    <div>
      <HeroSection></HeroSection>
      <Suspense fallback={"Loading..."}>
        <FeaturedServices featuredPromise={featuredPromise}></FeaturedServices>
      </Suspense>
      <WhyChooseUs></WhyChooseUs>
      <CustomerTestimonials></CustomerTestimonials>
    </div>
  );
};

export default Home;
