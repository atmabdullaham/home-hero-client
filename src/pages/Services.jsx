import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const Services = () => {
  const axiosInstance = useAxios();
  const [allServices, setAllServices] = useState([]);
  useEffect(() => {
    axiosInstance.get("/services").then((data) => {
      setAllServices(data.data);
    });
  }, [axiosInstance]);
  console.log(allServices);
  return <div>This is services page {allServices.length}</div>;
};

export default Services;
