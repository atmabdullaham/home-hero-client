import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
  baseURL: "http://localhost:3000/",
});

const useAxiosSecure = () => {
  const { user } = useAuth();
  //  token in the header for all the api call using axiosSecure hook
  useEffect(() => {
    const requestInterceptor = axiosSecure.interceptors.request.use(
      (config) => {
        config.headers.authorization = `Bearer ${user.accessToken}`;
        return config;
      }
    );
    return () => {
      axiosSecure.interceptors.request.eject(requestInterceptor);
    };
  }, [user]);
  return axiosSecure;
};

export default useAxiosSecure;
