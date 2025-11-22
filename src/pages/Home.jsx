import { Suspense } from "react";
import CustomerTestimonials from "../components/home/CustomerTestimonials";
import HeroSection from "../components/home/HeroSection";
import HowHomeHeroWorks from "../components/home/HowHomeHeroWorks";
import JoinUs from "../components/home/JoinUs";
import TopRatedServices from "../components/home/TopRatedServices";
import WhyChooseUs from "../components/home/WhyChooseUs";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const featuredPromise = axiosPublic.get("/featured/services");
  return (
    <div>
      <HeroSection></HeroSection>
      <Suspense fallback={"Loading..."}>
        <TopRatedServices featuredPromise={featuredPromise}></TopRatedServices>
      </Suspense>
      <WhyChooseUs></WhyChooseUs>

      <CustomerTestimonials></CustomerTestimonials>
      <HowHomeHeroWorks></HowHomeHeroWorks>
      <JoinUs></JoinUs>
    </div>
  );
};

export default Home;
