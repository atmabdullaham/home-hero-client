import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Services = () => {
  const axiosPublic = useAxiosPublic();
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    axiosPublic.get("/services").then((data) => {
      setAllServices(data.data);
    });
  }, [axiosPublic]);
  console.log(allServices);
  return (
    <div className="w-11/12 mx-auto">
      This is services page {allServices.length}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {allServices.map((service) => (
          <ServiceCard key={service._id} service={service}></ServiceCard>
        ))}
      </div>
    </div>
  );
};

export default Services;
