import { Suspense } from "react";
import FeaturedServices from "../contexts/home/FeaturedServices";
import HeroSection from "../contexts/home/HeroSection";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Home = () => {
  const axiosPublic = useAxiosPublic();
  const featuredPromise = axiosPublic.get("/featured/services");
  console.log(featuredPromise);
  return (
    <div>
      <HeroSection></HeroSection>
      <Suspense fallback={"Loading..."}>
        <FeaturedServices featuredPromise={featuredPromise}></FeaturedServices>
      </Suspense>
    </div>
  );
};

export default Home;
