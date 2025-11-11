import { useEffect, useState } from "react";
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
  return <div>This is services page {allServices.length}</div>;
};

export default Services;
