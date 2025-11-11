import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxiosSecure from "../hooks/useAxiosSecure";

const MyServices = () => {
  const { user } = useAuth();
  const axiosInstance = useAxiosSecure();
  const [services, setServices] = useState([]);
  useEffect(() => {
    axiosInstance.get(`/services?email=${user.email}`).then((data) => {
      setServices(data.data);
    });
  }, [user, axiosInstance]);
  console.log(services);

  return <div>This is my services page {services.length}</div>;
};

export default MyServices;
