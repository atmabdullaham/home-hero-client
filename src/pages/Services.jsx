import { useEffect, useState } from "react";
import ServiceCard from "../components/ServiceCard";
import useAxiosPublic from "../hooks/useAxiosPublic";

const Services = () => {
  const axiosPublic = useAxiosPublic();
  const [allServices, setAllServices] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axiosPublic
      .get("/services")
      .then((data) => {
        setAllServices(data.data);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 100);
      });
  }, [axiosPublic]);

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-100px)]">
        <span className="loading loading-spinner loading-lg text-cyan-600"></span>
      </div>
    );

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
